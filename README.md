# 웨딩 카드 (이승훈 ♥ 이새롬)

모바일 화면에 최적화된 우아한 웹(Web) 모바일 청첩장 프로젝트입니다. 결혼식 정보 제공은 물론, React(Vite) 기반의 모던 웹 기술과 카카오맵, 생성형 AI(Gemini) 방명록 등을 통합하였습니다.

## 주요 기능
- **메인 히어로(Hero)**: 웨딩 날짜 및 신랑/신부 소개
- **초대장(Invitation)**: 진심을 담은 인사말 및 연락처(전화번호/문자) 연동
- **갤러리(Gallery)**: 웨딩 사진 슬라이드 및 모달 뷰어 제공
- **오시는 길(Location)**: 카카오 지도 API 연동 및 카카오내비, 티맵, 네이버 지도 외부 앱 열기 지원
- **마음 전할 곳(Accounts)**: 양가 부모님 및 신랑/신부 계좌번호 복사 및 카카오페이, 토스페이 송금 링크 연결 연동
- **방명록(GuestbookAI)**: 구글 Gemini AI 모델을 활용해 자동으로 센스 있는 축하 메시지를 추천하고 작성할 수 있는 기능
- **공유하기(Share)**: 카카오톡 공유하기 API 연동 및 현재 브라우저 URL 복사 기능
- **배경음악(BGM)**: 잔잔한 웨딩 분위기를 위한 오디오 재생/정지 버튼 (우측 하단)

## 프로젝트 폴더 구조 (Clean Architecture)
```text
wedding-card/
├── public/                 # 이미지 및 정적 에셋들
├── src/                    
│   ├── assets/             # 글로벌 CSS (index.css)
│   ├── components/         # 분할된 React UI 컴포넌트 목록
│   ├── config/             # 상수 값, 내용, 설정 등 (constants.ts)
│   ├── services/           # 외부 API (Gemini, 카카오) 연동 로직
│   ├── types/              # TypeScript 타입 선언 파일
│   ├── App.tsx             # 메인 앱 레퍼런스
│   └── index.tsx           # 메인 렌더링 파일 시작점
├── index.html              
├── vite.config.ts          # Vite 웹팩 설정 파일 (경로 Alias 포함)
└── .github/workflows       # GitHub Actions 자동 배포 세팅
```

## 로컬 실행 방법 (Run Locally)

**준비 사항:** Node.js (v20 이상 권장)

1. 최신 의존성(Packages)을 설치합니다.
   ```bash
   npm install
   ```
2. 루트 위치에 `.env.local` 파일을 생성한 뒤 환경 변수를 설정합니다. (`GEMINI_API_KEY` 발급 필요)
   ```env
   GEMINI_API_KEY=당신의_제미나이_API_키를_넣으세요
   KAKAO_JAVASCRIPT_KEY=당신의_카카오_JS_키를_넣으세요
   ```
3. 로컬 개발 서버를 기동합니다.
   ```bash
   npm run dev
   ```
4. `http://localhost:3000` 등 출력되는 로컬 터미널 링크로 접속하세요.

## 배포 방법 (Deployment)

이 프로젝트는 현재 **GitHub Pages**를 통해 호스팅되고 있으며, **GitHub Actions**에 의해 메인(`main`) 브랜치로 소스코드가 푸시(Push)될 때마다 자동으로 빌드되고 배포되도록 구성되어 있습니다. 

### 🚀 자동 배포 가이드
1. GitHub 리포지토리의 **기본 설정(Settings) > Secrets and variables > Actions** 메뉴에서 다음 두 가지 `Repository secrets`를 추가합니다.
   - `GEMINI_API_KEY`
   - `KAKAO_JAVASCRIPT_KEY`
2. 로컬에서 작업한 코드를 커밋하고 레포지토리에 푸시합니다.
   ```bash
   git add .
   git commit -m "Update styling"
   git push origin main
   ```
3. 코드가 올라가면 자동으로 `.github/workflows/deploy.yml` 파일이 동작해 `gh-pages` 브랜치에 결과물을 배포하게 됩니다.

> 🛠 만약 로컬 터미널에서 당장 수동으로 빌드/배포하실 일이 있다면 `npm run deploy` 명령어를 사용할 수도 있습니다.
