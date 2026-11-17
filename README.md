# 작고 소중한 먼지 키우기 — GitHub Pages 배포본

저장소: https://github.com/crazyjamy/dustgame
배포 주소: https://crazyjamy.github.io/dustgame/

## 업로드 순서

1. ZIP을 압축 해제합니다.
2. `index.html`과 같은 위치의 파일을 모두 저장소의 최상위에 업로드합니다. 압축을 푼 폴더 자체를 업로드하지 마세요. 저장소 최상위에 `index.html`이 보여야 합니다.
3. 저장소의 Add file → Upload files에서 파일을 올리고 Commit changes로 저장합니다. 기존 같은 이름의 파일은 이 배포본으로 갱신합니다.
4. 저장소 Settings → Pages에서 Source를 Deploy from a branch, Branch를 main, 폴더를 /(root)로 선택하고 Save를 누릅니다. 실제 기본 브랜치 이름이 다르면 파일을 올린 브랜치를 고릅니다.
5. Pages 배포가 완료되면 위 배포 주소를 엽니다. 수정 후 이전 화면이 보이면 강력 새로고침합니다.

별도의 설치·npm·빌드·서버·API 키 없이 동작하는 정적 배포본입니다.

`.nojekyll`은 빈 파일이며 함께 올리는 것이 권장됩니다. macOS에서 숨겨져 보이지 않으면 Command + Shift + . 으로 숨김 파일을 표시하거나, GitHub의 Add file → Create new file에서 `.nojekyll`이라는 빈 파일을 추가합니다.

## 포함된 게임

- 먼지 50종, 먼지별 성장 이야기 5편
- 가구 10종, 5단계 업그레이드와 단계별 그림·이야기
- 방 6종, 정원과 보관함 수용 수·업그레이드·방 이야기
- 루미의 모험과 재료 수집
- 모아 구매 후 방·상점에서 준비된 골드 전체 수령
- 재료 미선택 시 빈 아이콘과 빈 값, 재료 없이 랜덤 탄생
- 쓰다듬기·성장·개별 보관·먼지와 가구 이동

## 파일과 경로

`index.html`이 진입점이며 `dust.css`, `dust.mjs` 및 함께 들어 있는 `.mjs` 파일이 게임을 구성합니다. 모든 게임 파일 참조는 상대 경로여서 `/dustgame/` 하위 경로에서도 동작합니다. 먼지·요정·재료·가구 그림은 코드 안의 SVG이므로 별도 이미지 업로드가 필요 없습니다. 외부 Google Fonts가 차단되어도 시스템 기본 글꼴로 표시됩니다.

이 ZIP의 파일들은 평평한 구조이며, 이전 고양이·드래곤 버전의 사용하지 않는 이미지와 스크립트는 포함하지 않았습니다. 기존 저장소의 `_config.yml` 또는 Jekyll용 파일은 필요하지 않습니다.

## 저장 기록 옮기기

게임은 브라우저의 localStorage에 `tiny-dust-club-v1` 키로 자동 저장합니다. 서버나 계정에 저장되는 방식이 아닙니다.
기존 테스트 사이트와 GitHub Pages는 주소가 달라 저장 기록이 자동으로 이동하지 않습니다. 기존 사이트의 작은 기록 → 기록 내보내기로 JSON을 저장한 뒤, 새 배포 주소의 작은 기록 → 기록 가져오기로 불러오세요. 각 플레이어의 기록은 서로 독립적입니다.

HTML 파일을 Finder에서 직접 열면 모듈 보안 정책으로 실행되지 않을 수 있으므로 배포 URL에서 확인하세요.

## 검증

최신 배포 소스 e63dc0e86bcfbdc1220026754c89925e004174ef 기준입니다. ZIP 내부 파일 무결성, 모듈 의존성, 파일 대소문자 및 `/dustgame/` 기준 상대 URL을 확인했습니다. GitHub 저장소 업로드와 Pages 설정 변경은 포함하지 않습니다.

GitHub 공식 설정 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
