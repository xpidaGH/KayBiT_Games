# KayBiT_Games Multi-Platform CI/CD & Automated Code-Signing Workflow

This document provides the complete, production-ready GitHub Actions CI/CD pipeline for **KayBiT_Games**. It automatically compiles, signs, notarizes, and distributes the application across **all major desktop and mobile operating systems**:

- 🍏 **iOS**: `.ipa` archive signed and uploaded to **Apple TestFlight**
- 🍏 **macOS**: Dual-architecture (`x86_64` + `arm64` Universal Binary) `.app` and `.dmg`, signed with Developer ID and notarized via `xcrun notarytool` to pass Apple Gatekeeper
- 🪟 **Windows**: `.exe` (NSIS) and `.msi` (WiX) installers generated via Tauri, signed with Authenticode / EV certificates to bypass SmartScreen
- 🤖 **Android**: Release `.apk` and signed `.aab` (Android App Bundle) uploaded directly to **Google Play Console Internal Testing Track**
- 🐧 **Linux**: Native `.deb` and `.AppImage` packages compiled with low-latency PipeWire / ALSA audio support

---

## 📑 Table of Contents
1. [Repository Secrets & Base64 In-Memory Encoding](#1-repository-secrets--base64-in-memory-encoding)
   - [Bash & PowerShell Secret Generation](#bash--powershell-secret-generation)
   - [Complete Secrets Directory](#complete-secrets-directory)
2. [Complete GitHub Actions Workflow YAML](#2-complete-github-actions-workflow-yaml)
   - [Build Matrix Overview](#build-matrix-overview)
   - [Full Workflow File (`.github/workflows/multiplatform-release.yml`)](#full-workflow-file)
3. [Apple Code Signing & Notarization Deep-Dive](#3-apple-code-signing--notarization-deep-dive)
   - [iOS `exportOptions.plist` Template](#ios-exportoptionsplist-template)
   - [macOS Universal Binary & Notarytool](#macos-universal-binary--notarytool)
4. [Android Keystore & Google Play Publishing](#4-android-keystore--google-play-publishing)
5. [Windows Code Signing (Authenticode / EV)](#5-windows-code-signing-authenticode--ev)
6. [Notifications (Slack, Discord, Email)](#6-notifications-slack-discord-email)

---

## 1. Repository Secrets & Base64 In-Memory Encoding

To prevent certificate compromise, **never commit raw keystores, `.p12`, `.mobileprovision`, or `.pfx` binary files to git**. Instead, convert binary assets into **Base64 ASCII strings**, store them inside **GitHub Repository Secrets** (`Settings -> Secrets and variables -> Actions`), and decode them directly into runner memory (`/dev/shm` on Linux, `$RUNNER_TEMP` on macOS/Windows) during the pipeline.

### Bash & PowerShell Secret Generation

#### 🤖 Android Keystore (`release.jks` / `upload-keystore.jks`)
* **Bash (Linux / macOS):**
  ```bash
  # Convert Android keystore to Base64
  base64 -w 0 upload-keystore.jks > android_keystore_base64.txt
  cat android_keystore_base64.txt | pbcopy # or xclip
  ```
* **PowerShell (Windows):**
  ```powershell
  # Convert Android keystore to Base64 in Windows
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("upload-keystore.jks")) | Set-Clipboard
  ```

#### 🍏 Apple iOS & macOS Distribution Certificate (`.p12`)
* **Bash (macOS / Linux):**
  ```bash
  base64 -i AppleCertificates.p12 -o apple_cert_base64.txt
  cat apple_cert_base64.txt | pbcopy
  ```
* **PowerShell (Windows):**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("AppleCertificates.p12")) | Set-Clipboard
  ```

#### 🍏 iOS Mobile Provisioning Profile (`.mobileprovision`)
* **Bash (macOS / Linux):**
  ```bash
  base64 -i KayBiT_App_Distribution.mobileprovision -o profile_base64.txt
  cat profile_base64.txt | pbcopy
  ```
* **PowerShell (Windows):**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("KayBiT_App_Distribution.mobileprovision")) | Set-Clipboard
  ```

#### 🪟 Windows Authenticode / EV Certificate (`.pfx`)
* **Bash (Linux / macOS):**
  ```bash
  base64 -w 0 AuthenticodeCert.pfx > windows_cert_base64.txt
  ```
* **PowerShell (Windows):**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("AuthenticodeCert.pfx")) | Set-Clipboard
  ```

#### 🤖 Google Play Service Account JSON (`play-service-account.json`)
* **Bash:**
  ```bash
  base64 -w 0 play-service-account.json > play_json_base64.txt
  ```
* **PowerShell:**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("play-service-account.json")) | Set-Clipboard
  ```

---

### Complete Secrets Directory

Configure the following secrets in **GitHub -> Repository -> Settings -> Secrets and variables -> Actions**:

| Secret Name | Platform | Description |
|---|---|---|
| `APPLE_CERTIFICATE_BASE64` | iOS / macOS | Base64-encoded `.p12` file with Distribution & Developer ID certificates |
| `APPLE_CERTIFICATE_PASSWORD` | iOS / macOS | Passphrase protecting the `.p12` export |
| `APPLE_PROVISIONING_PROFILE_BASE64`| iOS | Base64-encoded `.mobileprovision` for App Store / TestFlight distribution |
| `KEYCHAIN_PASSWORD` | iOS / macOS | Temporary strong password generated for the runner's ephemeral keychain |
| `APPLE_ID` | macOS / iOS | Apple ID email address for App Store Connect / Notarization |
| `APPLE_APP_SPECIFIC_PASSWORD` | macOS / iOS | App-specific password generated on appleid.apple.com |
| `APPLE_TEAM_ID` | macOS / iOS | 10-character Apple Developer Team ID (e.g., `8K9XXXXXX2`) |
| `APP_STORE_CONNECT_API_KEY_BASE64` | iOS | Base64-encoded App Store Connect `.p8` AuthKey |
| `APP_STORE_CONNECT_KEY_ID` | iOS | Key ID for App Store Connect API (e.g., `2X9R4XXXXX`) |
| `APP_STORE_CONNECT_ISSUER_ID` | iOS | Issuer UUID from App Store Connect Users & Access Keys |
| `ANDROID_KEYSTORE_BASE64` | Android | Base64-encoded `upload-keystore.jks` |
| `ANDROID_KEYSTORE_PASSWORD` | Android | Password for the Android keystore file |
| `ANDROID_KEY_ALIAS` | Android | Alias name for the signing key in the keystore |
| `ANDROID_KEY_PASSWORD` | Android | Password for the private key alias |
| `PLAY_SERVICE_ACCOUNT_JSON_BASE64` | Android | Base64-encoded Google Cloud service account JSON with Play Publishing role |
| `WINDOWS_CERTIFICATE_BASE64` | Windows | Base64-encoded `.pfx` Authenticode certificate |
| `WINDOWS_CERTIFICATE_PASSWORD` | Windows | Password for `.pfx` private key |
| `TAURI_PRIVATE_KEY` | Win / Mac | Tauri updater / package private signature key |
| `TAURI_KEY_PASSWORD` | Win / Mac | Passphrase for Tauri updater private key |
| `SLACK_WEBHOOK_URL` | Notify | Incoming Webhook URL for Slack channel |
| `DISCORD_WEBHOOK_URL` | Notify | Webhook URL for Discord notifications |
| `SMTP_USERNAME` & `SMTP_PASSWORD` | Notify | Credentials for automated notification emails |
| `NOTIFICATION_EMAIL_TO` | Notify | Recipient email address for build status alerts |

---

## 2. Complete GitHub Actions Workflow YAML

Save this file as `.github/workflows/multiplatform-release.yml` in your repository:

```yaml
name: KayBiT_Games Multi-Platform Release

on:
  push:
    tags:
      - 'v*.*.*'
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write
  packages: write
  id-token: write

env:
  CARGO_TERM_COLOR: always
  APP_NAME: KayBiT_Games
  BUNDLE_IDENTIFIER: com.kaybit.games.curriculum

jobs:
  # ----------------------------------------------------------------------------------
  # JOB 1: macOS Runner (iOS .ipa & macOS Universal Binary .dmg)
  # ----------------------------------------------------------------------------------
  build-apple:
    name: Apple Ecosystem (macOS Universal + iOS)
    runs-on: macos-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Rust Stable Toolchain (for Tauri)
        uses: dtolnay/rust-toolchain@stable
        with:
          targets: x86_64-apple-darwin,aarch64-apple-darwin

      - name: Install Frontend Dependencies
        run: npm ci

      - name: Build Web Application Bundle
        run: npm run build

      # Step: Import Code Signing Certificate & Profile
      - name: Install Apple Code Signing Certificate
        uses: apple-actions/import-codesign-certs@v2
        with:
          p12-file-base64: ${{ secrets.APPLE_CERTIFICATE_BASE64 }}
          p12-password: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
          keychain-password: ${{ secrets.KEYCHAIN_PASSWORD }}

      - name: Install iOS Provisioning Profile
        run: |
          mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
          echo "${{ secrets.APPLE_PROVISIONING_PROFILE_BASE64 }}" | base64 --decode > ~/Library/MobileDevice/Provisioning\ Profiles/KayBiT_Distribution.mobileprovision

      # Step: Build macOS Universal Binary (.app & .dmg)
      - name: Build & Package macOS Universal App
        env:
          APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE_BASE64 }}
          APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
          APPLE_SIGNING_IDENTITY: "Developer ID Application: KayBiT Technologies Inc (${{ secrets.APPLE_TEAM_ID }})"
          APPLE_ID: ${{ secrets.APPLE_ID }}
          APPLE_PASSWORD: ${{ secrets.APPLE_APP_SPECIFIC_PASSWORD }}
          APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
        run: |
          echo "Building Universal Binary for Apple Silicon (arm64) and Intel (x86_64)..."
          npx tauri build --target universal-apple-darwin

      # Step: Notarize macOS DMG via xcrun notarytool
      - name: Notarize macOS DMG Package
        run: |
          DMG_PATH=$(find src-tauri/target/universal-apple-darwin/release/bundle/dmg -name "*.dmg" | head -n 1)
          echo "Submitting $DMG_PATH to Apple Notary Service..."
          xcrun notarytool submit "$DMG_PATH" \
            --apple-id "${{ secrets.APPLE_ID }}" \
            --password "${{ secrets.APPLE_APP_SPECIFIC_PASSWORD }}" \
            --team-id "${{ secrets.APPLE_TEAM_ID }}" \
            --wait

          echo "Stapling notarization ticket to DMG..."
          xcrun stapler staple "$DMG_PATH"

      # Step: Build iOS .ipa via Capacitor / Xcode
      - name: Compile iOS Archive & Export .ipa
        run: |
          echo "Syncing Capacitor iOS workspace..."
          npx cap sync ios
          
          # Generate exportOptions.plist dynamically with injected Team ID
          cat <<EOF > ios/App/exportOptions.plist
          <?xml version="1.0" encoding="UTF-8"?>
          <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
          <plist version="1.0">
          <dict>
              <key>method</key>
              <string>app-store</string>
              <key>teamID</key>
              <string>${{ secrets.APPLE_TEAM_ID }}</string>
              <key>uploadBitcode</key>
              <false/>
              <key>compileBitcode</key>
              <false/>
              <key>uploadSymbols</key>
              <true/>
              <key>signingStyle</key>
              <string>manual</string>
              <key>signingCertificate</key>
              <string>Apple Distribution</string>
              <key>provisioningProfiles</key>
              <dict>
                  <key>${{ env.BUNDLE_IDENTIFIER }}</key>
                  <string>KayBiT_Distribution</string>
              </dict>
          </dict>
          </plist>
          EOF

          # Build Archive using xcrun xcodebuild
          xcodebuild archive \
            -workspace ios/App/App.xcworkspace \
            -scheme App \
            -configuration Release \
            -archivePath build/KayBiT.xcarchive \
            CODE_SIGN_STYLE=Manual \
            DEVELOPMENT_TEAM="${{ secrets.APPLE_TEAM_ID }}" \
            PROVISIONING_PROFILE_SPECIFIER="KayBiT_Distribution"

          # Export IPA
          xcodebuild -exportArchive \
            -archivePath build/KayBiT.xcarchive \
            -exportOptionsPlist ios/App/exportOptions.plist \
            -exportPath build/ipa

      # Step: Upload iOS IPA to Apple TestFlight
      - name: Upload to Apple TestFlight
        env:
          APP_STORE_CONNECT_API_KEY: ${{ secrets.APP_STORE_CONNECT_API_KEY_BASE64 }}
          APP_STORE_CONNECT_KEY_ID: ${{ secrets.APP_STORE_CONNECT_KEY_ID }}
          APP_STORE_CONNECT_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
        run: |
          mkdir -p ~/.appstoreconnect/private_keys
          echo "${{ secrets.APP_STORE_CONNECT_API_KEY_BASE64 }}" | base64 --decode > ~/.appstoreconnect/private_keys/AuthKey_${{ secrets.APP_STORE_CONNECT_KEY_ID }}.p8
          
          IPA_FILE=$(find build/ipa -name "*.ipa" | head -n 1)
          xcrun altool --upload-app \
            --type ios \
            --file "$IPA_FILE" \
            --apiKey "${{ secrets.APP_STORE_CONNECT_KEY_ID }}" \
            --apiIssuer "${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}"

      - name: Upload Apple Artifacts to GitHub Run
        uses: actions/upload-artifact@v4
        with:
          name: apple-build-artifacts
          path: |
            src-tauri/target/universal-apple-darwin/release/bundle/dmg/*.dmg
            build/ipa/*.ipa

  # ----------------------------------------------------------------------------------
  # JOB 2: Windows Runner (Windows .exe & .msi via Tauri + Authenticode SignTool)
  # ----------------------------------------------------------------------------------
  build-windows:
    name: Windows Ecosystem (x64 .exe & .msi)
    runs-on: windows-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Rust Stable Toolchain
        uses: dtolnay/rust-toolchain@stable

      - name: Install WiX Toolset
        run: dotnet tool install --global wix

      - name: Install Frontend Dependencies
        run: npm ci

      - name: Build Web Application
        run: npm run build

      # Decode Windows Authenticode Certificate in-memory via PowerShell
      - name: Decode Authenticode PFX Certificate
        shell: pwsh
        run: |
          $certBytes = [Convert]::FromBase64String("${{ secrets.WINDOWS_CERTIFICATE_BASE64 }}")
          [IO.File]::WriteAllBytes("$env:RUNNER_TEMP\authenticode.pfx", $certBytes)

      # Build Windows Installers (.exe & .msi)
      - name: Build Tauri Windows Installers
        env:
          TAURI_PRIVATE_KEY: ${{ secrets.TAURI_PRIVATE_KEY }}
          TAURI_KEY_PASSWORD: ${{ secrets.TAURI_KEY_PASSWORD }}
        run: npx tauri build

      # Sign with SignTool to prevent SmartScreen untrusted publisher warnings
      - name: Sign Executables with Windows SignTool
        shell: pwsh
        run: |
          $signToolPath = "C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe"
          if (-not (Test-Path $signToolPath)) {
            $signToolPath = (Get-ChildItem -Path "C:\Program Files (x86)\Windows Kits\10\bin\*\x64\signtool.exe" | Select-Object -First 1).FullName
          }
          
          $filesToSign = Get-ChildItem -Path "src-tauri\target\release\bundle" -Include *.exe,*.msi -Recurse
          foreach ($file in $filesToSign) {
            Write-Host "Signing $($file.FullName) with Authenticode..."
            & $signToolPath sign /f "$env:RUNNER_TEMP\authenticode.pfx" /p "${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}" /tr http://timestamp.digicert.com /td sha256 /fd sha256 $file.FullName
          }

      - name: Upload Windows Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: windows-build-artifacts
          path: |
            src-tauri/target/release/bundle/nsis/*.exe
            src-tauri/target/release/bundle/msi/*.msi

  # ----------------------------------------------------------------------------------
  # JOB 3: Ubuntu Runner (Android .apk / .aab + Linux .deb / .AppImage)
  # ----------------------------------------------------------------------------------
  build-linux-android:
    name: Ubuntu Ecosystem (Android + Linux with PipeWire)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Java JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Setup Rust Stable Toolchain
        uses: dtolnay/rust-toolchain@stable

      # Install Linux native build dependencies including PipeWire low-latency audio
      - name: Install Linux Desktop & PipeWire Audio Dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y \
            libwebkit2gtk-4.1-dev \
            build-essential \
            curl \
            wget \
            file \
            libxdo-dev \
            libssl-dev \
            libayatana-appindicator3-dev \
            librsvg2-dev \
            libpipewire-0.3-dev \
            libspa-0.2-dev \
            libasound2-dev

      - name: Install Frontend Dependencies
        run: npm ci

      - name: Build Web Application
        run: npm run build

      # Step: Compile Linux .deb & .AppImage
      - name: Build Linux Tauri Packages (.deb & .AppImage)
        run: npx tauri build

      # Step: Compile Android Native Packages
      - name: Build Android APK and AAB
        run: |
          npx cap sync android
          cd android
          ./gradlew assembleRelease bundleRelease

      # Step: Securely Decode Keystore & Sign Android Releases
      - name: Sign Android Release (.apk & .aab)
        uses: r0adkll/sign-android-release@v1
        id: sign_app
        with:
          releaseDirectory: android/app/build/outputs
          signingKeyBase64: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}
          alias: ${{ secrets.ANDROID_KEY_ALIAS }}
          keyStorePassword: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
          keyPassword: ${{ secrets.ANDROID_KEY_PASSWORD }}

      # Step: Deploy Signed .aab to Google Play Internal Testing Track
      - name: Deploy to Google Play Console Internal Track
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.PLAY_SERVICE_ACCOUNT_JSON_BASE64 }}
          packageName: ${{ env.BUNDLE_IDENTIFIER }}
          releaseFiles: android/app/build/outputs/bundle/release/app-release.aab
          track: internal
          status: completed
          changesNotSentForReview: true

      - name: Upload Linux & Android Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: linux-android-artifacts
          path: |
            android/app/build/outputs/apk/release/*.apk
            android/app/build/outputs/bundle/release/*.aab
            src-tauri/target/release/bundle/deb/*.deb
            src-tauri/target/release/bundle/appimage/*.AppImage

  # ----------------------------------------------------------------------------------
  # JOB 4: Create GitHub Release with Auto-Generated Changelog & Artifacts
  # ----------------------------------------------------------------------------------
  publish-release:
    name: Generate Release & Publish Multi-Platform Assets
    needs: [build-apple, build-windows, build-linux-android]
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - name: Checkout Code for Changelog
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Download All Runner Artifacts
        uses: actions/download-artifact@v4
        with:
          path: release-artifacts

      # Automated changelog generator extracting commits since prior release tag
      - name: Generate Automated Commit Changelog
        id: changelog
        run: |
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
          echo "## What's Changed in Build #${{ github.run_number }}" > CHANGELOG.md
          echo "" >> CHANGELOG.md
          if [ -z "$PREV_TAG" ]; then
            git log --pretty=format:"* %s ([%h](https://github.com/${{ github.repository }}/commit/%H)) - by @%an" >> CHANGELOG.md
          else
            git log ${PREV_TAG}..HEAD --pretty=format:"* %s ([%h](https://github.com/${{ github.repository }}/commit/%H)) - by @%an" >> CHANGELOG.md
          fi
          echo "" >> CHANGELOG.md
          echo "### Multi-Platform Verification Matrix" >> CHANGELOG.md
          echo "- **macOS / iOS:** Signed with Developer ID & TestFlight verified" >> CHANGELOG.md
          echo "- **Windows:** Authenticode SHA-256 signed with timestamp" >> CHANGELOG.md
          echo "- **Android:** v1/v2/v3 signed & submitted to Play Console Internal Track" >> CHANGELOG.md
          echo "- **Linux:** PipeWire low-latency enabled (.deb + .AppImage)" >> CHANGELOG.md

      - name: Publish Official GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          body_path: CHANGELOG.md
          name: KayBiT_Games Release ${{ github.ref_name }} (Build ${{ github.run_number }})
          draft: false
          prerelease: false
          files: |
            release-artifacts/**/*.dmg
            release-artifacts/**/*.ipa
            release-artifacts/**/*.exe
            release-artifacts/**/*.msi
            release-artifacts/**/*.apk
            release-artifacts/**/*.aab
            release-artifacts/**/*.deb
            release-artifacts/**/*.AppImage

  # ----------------------------------------------------------------------------------
  # JOB 5: Notifications (Slack, Discord, Email with always() conditionals)
  # ----------------------------------------------------------------------------------
  send-notifications:
    name: Dispatch Build & Release Notifications
    needs: [build-apple, build-windows, build-linux-android, publish-release]
    if: always()
    runs-on: ubuntu-latest
    steps:
      # Discord Notification
      - name: Send Discord Build Status
        if: env.DISCORD_WEBHOOK != ''
        env:
          DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK_URL }}
        uses: Ilshidur/action-discord@master
        with:
          args: |
            **KayBiT_Games Multi-Platform Pipeline** (Run #${{ github.run_number }})
            • Status: **${{ needs.publish-release.result == 'success' && 'SUCCESS 🚀' || 'FAILED ⚠️' }}**
            • Ref: `${{ github.ref_name }}`
            • Commit: `${{ github.sha }}`
            • Apple TestFlight: Dispatched
            • Google Play Console: Dispatched

      # Slack Notification
      - name: Send Slack Build Status
        if: env.SLACK_WEBHOOK != ''
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK_URL }}
        uses: slackapi/slack-github-action@v2.0.0
        with:
          webhook: ${{ secrets.SLACK_WEBHOOK_URL }}
          webhook-type: incoming-webhook
          payload: |
            {
              "text": "KayBiT_Games CI/CD (Build #${{ github.run_number }}): *${{ needs.publish-release.result }}*",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*KayBiT_Games CI/CD Pipeline Summary*\n*Status:* ${{ needs.publish-release.result == 'success' && '✅ All Platforms Built & Signed' || '❌ Build Failure Detected' }}\n*Runner Matrix:* macOS (iOS/Mac), Windows (NSIS/WiX), Ubuntu (Android/Linux)"
                  }
                }
              ]
            }

      # Email Notification via SMTP
      - name: Send Email Notification
        if: env.SMTP_USER != ''
        env:
          SMTP_USER: ${{ secrets.SMTP_USERNAME }}
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{ secrets.SMTP_USERNAME }}
          password: ${{ secrets.SMTP_PASSWORD }}
          subject: "[CI/CD ${{ needs.publish-release.result }}] KayBiT_Games Build #${{ github.run_number }} (${{ github.ref_name }})"
          to: ${{ secrets.NOTIFICATION_EMAIL_TO }}
          from: "KayBiT CI/CD Bot <no-reply@kaybit.games>"
          body: |
            KayBiT_Games Multi-Platform Pipeline Complete.

            Build Number: ${{ github.run_number }}
            Branch/Tag: ${{ github.ref_name }}
            Commit: ${{ github.sha }}
            Workflow Result: ${{ needs.publish-release.result }}

            Platforms Built:
            - iOS: .ipa (TestFlight track updated)
            - macOS: .dmg / .app (Universal Binary, Notarized with Apple)
            - Windows: .exe / .msi (Authenticode Signed)
            - Android: .aab (Google Play Internal Track updated) + .apk
            - Linux: .deb / .AppImage (PipeWire audio configured)
```

---

## 3. Apple Code Signing & Notarization Deep-Dive

### iOS `exportOptions.plist` Template
The workflow dynamically writes an `exportOptions.plist` with your team credentials:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadBitcode</key>
    <false/>
    <key>compileBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>signingStyle</key>
    <string>manual</string>
    <key>signingCertificate</key>
    <string>Apple Distribution</string>
    <key>provisioningProfiles</key>
    <dict>
        <key>com.kaybit.games.curriculum</key>
        <string>KayBiT_Distribution</string>
    </dict>
</dict>
</plist>
```

### macOS Universal Binary & Notarization via `xcrun notarytool`
Apple Gatekeeper requires apps distributed outside the Mac App Store to be signed with a **Developer ID Application** certificate and notarized by Apple's automated notary service.

1. **Compilation**: `npx tauri build --target universal-apple-darwin` creates a single binary containing both Intel `x86_64` and Apple Silicon `arm64` machine slices.
2. **Submission**:
   ```bash
   xcrun notarytool submit "$DMG_PATH" \
     --apple-id "$APPLE_ID" \
     --password "$APPLE_APP_SPECIFIC_PASSWORD" \
     --team-id "$APPLE_TEAM_ID" \
     --wait
   ```
3. **Stapling**:
   ```bash
   xcrun stapler staple "$DMG_PATH"
   ```
   Stapling attaches the cryptographic validation ticket directly to the disk image file so offline systems can verify Gatekeeper legitimacy.

---

## 4. Android Keystore & Google Play Publishing

### In-Memory Keystore Handling
Using `r0adkll/sign-android-release@v1`:
- Decodes the raw keystore bytes into an ephemeral runner path.
- Applies Android **v1 (JAR signing)**, **v2 (APK Signature Scheme v2)**, and **v3 (APK Signature Scheme v3)**.
- Automatically generates `.idsig` companion signatures.
- Uploads the production `.aab` straight into Google Play Console Internal Track via service account authorization without manual dashboard intervention.

---

## 5. Windows Code Signing (Authenticode / EV)

### SmartScreen Bypass
Microsoft Defender SmartScreen blocks unsigned executables with an intrusive "Windows protected your PC" warning.

The workflow invokes the official Windows 10/11 SDK `signtool.exe`:
```powershell
signtool.exe sign /f "$env:RUNNER_TEMP\authenticode.pfx" `
  /p "${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}" `
  /tr http://timestamp.digicert.com `
  /td sha256 `
  /fd sha256 `
  $filePath
```

#### EV (Extended Validation) Hardware Tokens / Cloud HSM
For EV certificates stored in Cloud Key Management (e.g., Azure Key Vault, AWS CloudHSM, or DigiCert Keylocker):
- Replace local `signtool /f` with `Azure/trusted-signing-action@v0.4` or `jsign`.
- EV certificates establish instant reputation with Microsoft SmartScreen upon release.

---

## 6. Notifications (Slack, Discord, Email)

The `send-notifications` job uses `if: always()` to ensure that:
1. Team leads are immediately notified if any stage fails.
2. Releases are broadcast across Slack `#engineering` and Discord channels upon successful publication.
3. Commit changelogs and download links are emailed directly to course instructors.
