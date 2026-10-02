# KayBiT_Games: Multi-Platform Native Installation Guide
## Complete Step-by-Step Guide for Students & Instructors (INSTALLATION.md)

---

## 1. Overview & Packaging Architecture
**KayBiT_Games: Sandbox Systems Programming Lab** is engineered to run seamlessly across all primary student operating systems and mobile devices:
* **Android**: Standalone Native APK & Google Play App Bundle (AAB)
* **iOS / iPadOS**: Apple Home Screen PWA & Native Xcode IPA Bundle
* **Windows**: Native `.exe` (NSIS) & `.msi` Windows Installers
* **macOS**: Apple Silicon & Intel Universal `.dmg` & `.app` Image
* **Web**: Instant Progressive Web App (PWA) with 100% offline capability

```
                                  [ KayBiT_Games Web Core ]
                                (React 19 + TypeScript + Vite)
                                              |
            +-------------------+-------------+-------------+-------------------+
            |                   |                           |                   |
            v                   v                           v                   v
     [ Android Build ]    [ iOS Build ]              [ Windows Build ]    [ macOS Build ]
      Capacitor / TWA     Capacitor / Xcode           Electron / Tauri     Electron / Tauri
            |                   |                           |                   |
            v                   v                           v                   v
      .apk / .aab         .ipa / PWA                  .exe / .msi             .dmg
```

---

## 2. Universal Web & Progressive Web App (PWA) Direct Install

### Instant Browser Installation (No App Store Required)
1. **Desktop (Google Chrome / Microsoft Edge / Brave)**:
   * Open the app URL in your browser.
   * Click the **Install** icon in the browser address bar (or click the in-app **Install App** button).
   * Confirm **Install**. The app will launch in a dedicated standalone window with its own application icon and taskbar entry.
2. **Mobile (Android Chrome)**:
   * Tap the **Add to Home screen** or **Install app** banner at the bottom of the screen.
   * Confirm prompt. An icon will be added to your app drawer and home screen.
3. **Mobile (iPhone & iPad Safari)**:
   * Open the app URL in **Safari** (Webkit engine required for iOS PWAs).
   * Tap the **Share** button (box with upward arrow) in the Safari toolbar.
   * Scroll down and tap **Add to Home Screen**.
   * Tap **Add** in the top right corner.

---

## 3. Android Installation (APK / AAB)

Students can install the native APK directly via Android sideloading or compile release bundles (AAB) for Google Play.

### Prerequisites
* **Node.js**: v18.x or v20.x LTS
* **Java Development Kit (JDK)**: JDK 17 (Eclipse Temurin or OpenJDK)
* **Android Studio**: Ladybug / Iguana or later with Android SDK 34+

### Step-by-Step Build Instructions

#### Step 1: Install Capacitor Native Runtime
Inside the project root directory, install Capacitor core and CLI:
```bash
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
```

#### Step 2: Initialize Capacitor Configuration
```bash
npx cap init "KayBiT Games" "games.kaybit.systems" --web-dir dist
```

#### Step 3: Build Web Production Assets
```bash
npm run build
```

#### Step 4: Add Android Platform & Synchronize Assets
```bash
npx cap add android
npx cap sync android
```

#### Step 5: Configure Android Permissions for Audio & Background Execution
Open `android/app/src/main/AndroidManifest.xml` and verify network and audio permissions:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme.NoActionBar"
        android:usesCleartextTraffic="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### Step 6: Compile the Standalone APK via Command Line
```bash
cd android
# Build Debug APK for immediate testing:
./gradlew assembleDebug

# Output APK Location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

#### Step 7: Generate Signed Production Release (AAB) for App Stores
Generate a release keystore:
```bash
keytool -genkey -v -keystore kaybit-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias kaybit-alias
```
Compile the signed release bundle:
```bash
./gradlew bundleRelease
# Output AAB Location:
# android/app/build/outputs/bundle/release/app-release.aab
```

#### Step 8: Distribute Direct Download Link on your Website
Upload `app-debug.apk` or `KayBiT_Games.apk` to your web server:
```html
<a href="https://your-domain.edu/downloads/KayBiT_Games.apk" class="download-btn">
  Download Android APK (Direct Install)
</a>
```

---

## 4. iOS / iPadOS Installation Guidelines

### Prerequisites
* **macOS**: Sonoma 14+ or Sequoia 15+
* **Xcode**: 15.0+ with iOS 17 SDK
* **CocoaPods**: `sudo gem install cocoapods`

### Step-by-Step Build Instructions

#### Step 1: Install iOS Runtime Dependencies
```bash
npm install @capacitor/ios
npm run build
npx cap add ios
npx cap sync ios
```

#### Step 2: Configure iOS Background Audio & Permissions
Open `ios/App/App/Info.plist` and add background audio capabilities to ensure the Text-to-Speech synthesis continues playing when the screen dims:
```xml
<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>
<key>NSMicrophoneUsageDescription</key>
<string>Audio playback and TTS synthesis</string>
```

#### Step 3: Launch in Xcode & Archive
```bash
npx cap open ios
```
1. Select your target device (e.g., Any iOS Device (arm64)).
2. Under **Signing & Capabilities**, select your Apple Developer Team.
3. Click **Product** -> **Archive**.
4. Distribute via **TestFlight**, **Ad-Hoc Enterprise**, or direct device install.

---

## 5. Windows Desktop Installation (.exe / .msi)

### Method A: Electron Forge / Electron Builder (Standard)

#### Step 1: Install Electron Dependencies
```bash
npm install -D electron electron-builder
```

#### Step 2: Add Main Electron Process (`electron-main.cjs`)
Create `electron-main.cjs` in the project root:
```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#020617',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: 'KayBiT_Games: Sandbox Systems Programming Lab',
  });

  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  win.removeMenu();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

#### Step 3: Compile Windows Executable (.exe)
```bash
npm run build
npx electron-builder --win --x64
```
**Output Artifact**: `dist/KayBiT_Games-Setup-2.4.0.exe` (NSIS Installer) and standalone portable executable.

### Method B: Lightweight Tauri Engine (Alternative < 15MB binary)
```bash
npm install -D @tauri-apps/cli
npx tauri init
npm run build
npx tauri build --bundles msi,nsis
```

---

## 6. macOS Desktop Installation (.dmg / .app)

### Step-by-Step Universal DMG Generation

#### Step 1: Build the Universal macOS App
Run electron-builder targeting both Apple Silicon (M1/M2/M3/M4) and Intel architectures:
```bash
npm run build
npx electron-builder --mac dmg --universal
```

#### Step 2: Ad-Hoc Signing (for Student Workstations)
If distributing directly without an Apple Developer ID certificate:
```bash
codesign --force --deep --sign - dist/mac-universal/KayBiT_Games.app
```

#### Step 3: Student Installation on macOS
1. Double-click `KayBiT_Games-2.4.0-universal.dmg`.
2. Drag **KayBiT_Games** into the **Applications** folder.
3. *Note*: On first launch, if macOS Gatekeeper alerts "unidentified developer", right-click the app icon in Applications and select **Open**.

---

## 7. Automated CI/CD GitHub Actions Workflow

Save this file as `.github/workflows/build-installers.yml` to automatically generate all 4 platform binaries on every release tag:

```yaml
name: Build Cross-Platform Native Installers

on:
  push:
    tags:
      - 'v*'

jobs:
  build-web-and-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
      - run: npm install
      - run: npm run build
      - name: Build Android APK
        run: |
          npx cap add android || true
          npx cap sync android
          cd android && ./gradlew assembleDebug
      - uses: actions/upload-artifact@v4
        with:
          name: KayBiT-Android-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk

  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - run: npx electron-builder --win --x64
      - uses: actions/upload-artifact@v4
        with:
          name: KayBiT-Windows-EXE
          path: dist/*.exe
```

---

## 8. Summary Table of Installer Packages

| Platform | File Extension | Installation Method | Offline Mode |
| :--- | :--- | :--- | :--- |
| **Android** | `.apk` / `.aab` | Sideload APK or Google Play internal test | 100% Offline |
| **iOS / iPadOS** | `.ipa` / PWA | Safari "Add to Home Screen" or Xcode deploy | 100% Offline |
| **Windows** | `.exe` / `.msi` | Standard Windows Installer | 100% Offline |
| **macOS** | `.dmg` / `.app` | Drag & Drop to Applications | 100% Offline |
| **Web Browser** | Instant PWA | URL address bar install prompt | 100% Offline |

---
*© 2026 KayBiT_Games Academic Initiative. All rights reserved.*
