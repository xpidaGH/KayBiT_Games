import { PlatformInstallGuide } from '../types';

export const APP_CONFIG = {
  appName: 'KayBiT_Games',
  appTitle: 'Sandbox Systems Programming & Architecture Lab',
  appDescription:
    'Advanced interactive systems programming laboratory mapping 6 iconic sandbox architectures across 21 programming languages to distributed backends, compiler engines, and low-level computing.',
  author: 'KayBiT Academic Initiative',
  version: '2.4.0',
  year: 2026,
  githubRepo: 'https://github.com/kaybit/kaybit-games-systems-lab',
  audioBackgroundEnabled: true,
  defaultLang: 'en',
  defaultSimSpeed: 1,
  speechChunkMaxLength: 160, // Max character boundary to avoid WebKit / Chromium speech freeze
  keepAliveIntervalMs: 10000, // Interval to cycle pause/resume for long playback
};

export const PLATFORM_INSTALL_GUIDES: PlatformInstallGuide[] = [
  {
    id: 'android',
    name: 'Android',
    format: 'APK / AAB',
    platform: 'Android 8.0+ (ARM64 / x86_64)',
    badge: 'Mobile Native',
    requirements: 'Android Studio / JDK 17 / Node.js 18+',
    summary:
      'Package as a high-performance standalone Android APK or Google Play App Bundle (AAB) using Capacitor or Bubblewrap Trusted Web Activity (TWA).',
    steps: [
      'Install Capacitor Android CLI in project root: npm install @capacitor/core @capacitor/android && npm install -D @capacitor/cli',
      'Initialize Capacitor project: npx cap init "KayBiT Games" "games.kaybit.systems" --web-dir dist',
      'Build web production distribution: npm run build',
      'Add Android native project: npx cap add android',
      'Sync assets and plugins: npx cap sync android',
      'Open in Android Studio: npx cap open android (or build release APK via gradle: cd android && ./gradlew assembleRelease)',
    ],
    commandSnippets: [
      {
        title: 'Quick Build & Generate APK via CLI',
        command: `npm run build\nnpx cap sync android\ncd android && ./gradlew assembleDebug\n# Output: android/app/build/outputs/apk/debug/app-debug.apk`,
      },
      {
        title: 'Generate Production Release Bundle (AAB)',
        command: `cd android && ./gradlew bundleRelease\n# Output: android/app/build/outputs/bundle/release/app-release.aab`,
      },
    ],
    offlineNotice: 'Includes Service Worker precache for 100% offline lab access in mobile webviews.',
  },
  {
    id: 'ios',
    name: 'iOS / iPadOS',
    format: 'iOS App / PWA',
    platform: 'iOS 15.0+ / iPadOS (Apple Silicon / A-series)',
    badge: 'Apple Ecosystem',
    requirements: 'macOS Sonoma+, Xcode 15+, CocoaPods',
    summary:
      'Deploy to iPhone and iPad via Xcode using Capacitor iOS container, or install instantaneously as an Apple PWA directly from Safari.',
    steps: [
      'Method 1 (Instant Home Screen PWA): Open URL in Safari on iPhone/iPad -> Tap Share icon -> Tap "Add to Home Screen".',
      'Method 2 (Native Xcode IPA): Install Capacitor iOS: npm install @capacitor/ios',
      'Build web project: npm run build',
      'Add iOS project: npx cap add ios',
      'Update CocoaPods & Sync: npx cap sync ios',
      'Launch Xcode workspace: npx cap open ios',
      'Select Development Team and build archive for TestFlight or Direct Device install.',
    ],
    commandSnippets: [
      {
        title: 'Capacitor iOS CLI Pipeline',
        command: `npm run build\nnpx cap add ios\nnpx cap sync ios\nnpx cap open ios`,
      },
    ],
    offlineNotice: 'Hardware audio acceleration and silent unlock enabled for iOS Safari background playback.',
  },
  {
    id: 'windows',
    name: 'Windows Desktop',
    format: '.exe / .msi Installer',
    platform: 'Windows 10 / 11 (x64 & ARM64)',
    badge: 'Desktop Executable',
    requirements: 'Node.js 18+ / Visual Studio C++ Build Tools (optional for Tauri)',
    summary:
      'Compile as a native Windows desktop executable (.exe / .msi) using Electron Forge or lightweight Tauri Rust engine with native hardware graphics.',
    steps: [
      'Method 1 (Lightweight Tauri / Rust): npm install -D @tauri-apps/cli && npx tauri init',
      'Build web distribution: npm run build',
      'Compile Windows MSI installer: npx tauri build --bundles msi,nsis',
      'Method 2 (Electron): npm install -D electron electron-builder',
      'Run builder command: npx electron-builder --windows nsis:x64',
      'Output installers will be saved in /dist_electron or /src-tauri/target/release/bundle.',
    ],
    commandSnippets: [
      {
        title: 'Build Windows Installer (.exe / .msi)',
        command: `npm run build\nnpx electron-builder --win --x64\n# Output: dist/KayBiT_Games-Setup-2.4.0.exe`,
      },
    ],
    offlineNotice: 'Native Windows Speech API (SAPI / OneCore voices) automatically mapped.',
  },
  {
    id: 'macos',
    name: 'macOS Desktop',
    format: '.dmg / .app Bundle',
    platform: 'macOS 12+ (Apple Silicon M1-M4 & Intel x64)',
    badge: 'macOS Application',
    requirements: 'macOS, Node.js 18+, Apple Developer Certificate (optional for ad-hoc)',
    summary:
      'Distribute as an Apple Silicon universal disk image (.dmg) or application bundle (.app) with native metal compute shader visual acceleration.',
    steps: [
      'Install electron-builder or tauri: npm install -D electron-builder',
      'Compile web frontend: npm run build',
      'Package macOS Universal DMG: npx electron-builder --mac dmg --universal',
      'Ad-hoc code sign for local student distribution: codesign --force --deep --sign - dist/mac-universal/KayBiT_Games.app',
      'Double-click the generated .dmg and drag KayBiT_Games into Applications folder.',
    ],
    commandSnippets: [
      {
        title: 'Generate macOS Universal DMG',
        command: `npm run build\nnpx electron-builder --mac dmg --arm64 --x64\n# Output: dist/KayBiT_Games-2.4.0-universal.dmg`,
      },
    ],
    offlineNotice: 'High-fidelity macOS Speech Synthesis voices (Samantha, Daniel, Thomas, Ting-Ting, etc.) natively supported.',
  },
  {
    id: 'pwa',
    name: 'Progressive Web App (PWA)',
    format: 'Direct Browser Install',
    platform: 'Chrome, Edge, Safari, Firefox, Opera, Brave',
    badge: 'Universal Web',
    requirements: 'Any modern desktop or mobile browser',
    summary:
      'Install directly from the browser URL bar or prompt with zero app store downloads. Runs offline with full hardware acceleration.',
    steps: [
      'Desktop Chrome / Edge: Click the "Install" icon in the address bar (or in-app Install button).',
      'Mobile Android: Tap the "Install App" banner or browser menu -> "Install App".',
      'Mobile iOS Safari: Tap "Share" -> "Add to Home Screen".',
      'The app launches in standalone mode without browser chrome or URL bar.',
    ],
    commandSnippets: [
      {
        title: 'PWA Verification Audit',
        command: `npx lighthouse-ci collect --url=http://localhost:3000\n# Validates 100% PWA installability, service worker & manifest`,
      },
    ],
    offlineNotice: 'Complete client-side offline execution. No remote backend needed for simulations.',
  },
];
