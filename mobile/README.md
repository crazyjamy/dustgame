# 모바일 앱 개발

앱은 저장소 루트의 웹 게임을 `www/`에 복사해 내부 WebView에서 실행합니다. GitHub Pages는 기존처럼 루트의 정적 파일로 실행됩니다. 앱 번들 ID는 `io.github.crazyjamy.dustgame`입니다.

## Xcode에서 실행

Node.js 22 이상, Xcode 26 이상과 Xcode에 설치한 iOS 시뮬레이터 런타임을 사용합니다. Swift 패키지는 Xcode가 처음 빌드할 때 내려받습니다.

저장소 루트에서 실행합니다.

```sh
npm ci
npm run ios:sync
npm run ios:open
```

Xcode에서 **App** 스킴과 iPhone 시뮬레이터를 선택한 뒤 **Run (⌘R)**을 누릅니다. Xcode 27에서는 시뮬레이터 화면을 Device Hub에서 볼 수 있습니다. 웹 파일이나 플러그인이 바뀌면 `npm run ios:sync`를 다시 실행한 뒤 앱을 실행합니다. `www/`와 `ios/App/App/public/`은 빌드에서 생성되므로 게임 수정은 저장소 루트에서 합니다.

실기기 서명에는 Git에서 제외되는 `ios/Signing.local.xcconfig`에 `DEVELOPMENT_TEAM`을 설정할 수 있습니다.

별 합치기에 성공하면 iOS에서 가벼운 햅틱이 한 번 울립니다. iOS 26 이상에서는 기존 아이콘 네 개로 Liquid Glass 탭 바를 표시합니다. 웹 방문 측정용 태그는 모바일 앱 번들에서 제외됩니다.

## 브라우저 기록 옮기기

1. 기존 브라우저 게임에서 **작은 기록 → 기록 내보내기**를 눌러 JSON을 저장합니다.
2. JSON을 앱에서 접근할 수 있는 **파일** 위치에 둡니다.
3. iOS 앱에서 **작은 기록 → 기록 불러오기**로 JSON을 선택한 뒤 미리보기를 확인하고 적용합니다.

앱과 브라우저는 각자 자동 저장 공간을 사용합니다. JSON을 불러오기 전에 앱의 현재 기록을 복구용으로 남깁니다. 앱에서 JSON을 내보낼 때는 iOS 공유 시트에서 **파일에 저장**을 선택할 수 있습니다. 앱을 삭제하거나 번들 ID 및 WebView 출처를 바꾸기 전에 JSON을 별도로 보관합니다.

## 확장

- Android는 같은 웹 빌드와 JSON 기록 형식을 사용합니다. Android 개발을 시작할 때 `npm install --save-exact @capacitor/android@8.6.3`으로 iOS와 같은 Capacitor 버전을 설치하고, `npm run build:mobile`, `npx cap add android` 순으로 실행합니다. 이후 갱신은 `npm run build:mobile`과 `npx cap sync android`로 합니다.
- Apple Watch는 별도의 watchOS 동반 앱을 만들고 [WatchConnectivity](https://developer.apple.com/documentation/watchconnectivity)를 통해 필요한 게임 상태를 iOS 앱에서 전달하는 구성을 고려합니다. iOS 앱에서 전체 기록을 관리하고 Watch에는 표시나 간단한 상호작용에 필요한 상태를 전달할 수 있습니다.

## 검증 기록

2026-11-27 기준 게임 소스는 [공개 커밋 411dbe2](https://github.com/crazyjamy/dustgame/commit/411dbe23e20e7c60148090d8ff1165c71f52b7be)의 빌드 `1.13.81-882a5d3f`입니다. 검증 절차는 [개발 위키](https://github.com/crazyjamy/lmmwiki/blob/4b953374f313937733935613fed36c6c39f6178c/wiki/save-release.md#development-workflow)를 따릅니다.

- Xcode 27.2와 iPhone 18 Pro 시뮬레이터(iOS 27.2)에서 앱 빌드와 첫 화면을 확인했습니다. 작은 기록에서 JSON을 파일에 저장하고 다시 불러왔으며, 앱을 종료한 뒤 재실행해 복구용 기록이 유지되는 것을 확인했습니다.
- 로컬 Chrome에서 기존 방식으로 JSON을 내보냈습니다. v1.11.0 기록을 불러온 뒤 새로고침해 골드가 유지되는 것을 확인했습니다. 자동 검사에서 스키마 2·3과 구형 상태 JSON, 저장 쓰기 실패 시 복구를 확인했습니다.
- 검증은 로컬 브라우저와 시뮬레이터에서 진행했습니다. 실기기와 Android·watchOS 검증은 남아 있습니다.
