# S-FLEX (NETFLEX CLONE CODING)

S-FLEX 프로젝트를 소개합니다!
이 프로젝트는 React, TypeScript, Node.js 및 MongoDB를 사용하여 구축된 넷플릭스 클론입니다. React Query, React Hook, Styled Components 등과 같은 강력한 라이브러리를 활용하여 최적화된 사용자 인터페이스를 제공해 보았습니다.

## 목차

- [기능](#기능)
- [사용 기술](#사용-기술)
- [프로젝트 구조](#프로젝트-구조)
- [API 엔드포인트](#api-엔드포인트)
- [기여](#기여)
- [라이선스](#라이선스)

---

## 기능

1. **영화 및 TV 프로그램 탐색**

   - 영화 및 TV 프로그램 목록 탐색.
   - 각 영화 또는 TV 프로그램에 대한 상세 정보 보기.

   <br>

   <div style="display: flex; flex-direction: column; justify-content: space-around;">
       <div style="text-align: center;">
           <h4>영화 페인 페이지</h4>
           <img src="https://github.com/user-attachments/assets/2785c4c2-7555-400d-bd1e-ae04ee12e6ec" alt="영화 페인 페이지" width="400">
       </div>
       <div style="text-align: center;">
           <h4>영화 상세 정보</h4>
           <img src="https://github.com/user-attachments/assets/b617e308-5916-4e9d-9266-bc229f957a9d" alt="영화 상세 정보" width="400">
       </div>
   </div>

   <div style="display: flex; flex-direction: column; justify-content: space-around;">
       <div style="text-align: center;">
           <h4>TV 페인 페이지</h4>
           <img src="https://github.com/user-attachments/assets/68642942-9e8c-46f3-8695-7d866139b62f" alt="TV 페인 페이지" width="400">
       </div>
       <div style="text-align: center;">
           <h4>TV 상세 정보</h4>
           <img src="https://github.com/user-attachments/assets/e0666a5d-35a7-43d8-8a96-34034e8a8852" alt="TV 상세 정보" width="400">
       </div>
   </div>

   <div style="text-align: center;">
       <br>
       <h4>TV Season 별 상세 정보</h4>
       <img src="https://github.com/user-attachments/assets/54b4e17e-798a-49ae-9445-a85b6b4cd3da" alt="TV Season 별 상세 정보" width="400">
   </div>

2. **장르 선택**

   - 장르별로 영화 및 TV 프로그램 필터링.
   - 선택한 장르와 관련된 콘텐츠 표시.

   <br>

   <div style="display: flex; flex-direction: column; justify-content: space-around;">
       <div style="text-align: center;">
           <h4>영화 장르 선택</h4>
           <img src="https://github.com/user-attachments/assets/84980932-dacf-4114-adaa-4cad017391bd" alt="영화 장르 선택" width="400">
       </div>
       <div style="text-align: center;">
           <h4>TV 장르 선택</h4>
           <img src="https://github.com/user-attachments/assets/02bcbbb3-d305-4f73-a0d5-9298a46ad88c" alt="TV 장르 선택" width="400">
       </div>
   </div>

3. **검색 기능**

   - 영화 및 TV 프로그램 검색.
   - 검색 결과를 영화와 TV 프로그램으로 구분하여 표시.

   <br>

   <div style="text-align: center;">
       <h4>검색 기능</h4>
       <img src="https://github.com/user-attachments/assets/d35053ec-1253-46b1-b862-5c2045fbfc2d" alt="검색 기능" width="400">
   </div>

4. **마이 페이지**

   - 아이콘으로 프로필 커스터마이징.
   - 좋아하는 장르 선택.
   - `sessionStorage`에 정보를 저장하여 페이지 새로고침 후에도 유지.

   <br>

   <div style="text-align: center;">
       <h4>나의 프로필 - 아이콘과 장르 선택 가능</h4>
       <img src="https://github.com/user-attachments/assets/64abc8c9-8b8c-4c95-a76c-df36a4f2bd17" alt="나의 프로필 - 아이콘과 장르 선택 가능" width="400">
   </div>

5. **인증**

   - 사용자 로그인 및 로그아웃 기능.
   - Node.js와 MongoDB를 사용한 안전한 사용자 데이터 관리.

   <br>

   <div style="display: flex; flex-direction: column; justify-content: space-around;">
       <div style="text-align: center;">
           <h4>로그인</h4>
           <img src="https://github.com/user-attachments/assets/da491017-1619-4613-b4b2-34e83cae4fd7" alt="로그인" width="400">
       </div>
       <div style="text-align: center;">
           <h4>회원가입</h4>
           <img src="https://github.com/user-attachments/assets/058fef3c-8e3a-4d2d-9862-19d624fde7a9" alt="회원가입" width="400">
       </div>
   </div>

---

## 사용 기술

### 프론트엔드

- React: 사용자 인터페이스 구축을 위한 JavaScript 라이브러리.
- TypeScript: JavaScript의 상위 집합으로 타입을 지원하는 언어.
- React Query: React를 위한 데이터 페칭 및 상태 관리 라이브러리.
- React Hook: 컴포넌트 로직을 관리하기 위한 커스텀 훅.
- Styled Components: 템플릿 리터럴을 사용하여 React 컴포넌트를 스타일링하는 라이브러리.
- Font Awesome: 다양한 아이콘을 제공하는 라이브러리.
- Axios: HTTP 클라이언트 라이브러리.
- Framer Motion: 애니메이션 라이브러리.
- React Router: 라우팅 라이브러리.
- React Hook Form: 폼 관리를 위한 라이브러리.
- ApexCharts: 차트 라이브러리.
- Recoil: 상태 관리 라이브러리.

### 백엔드

- Node.js: Chrome V8 JavaScript 엔진을 기반으로 하는 JavaScript 런타임.
- MongoDB: 사용자 데이터 및 콘텐츠 정보를 저장하기 위한 NoSQL 데이터베이스.
- Express: Node.js를 위한 웹 애플리케이션 프레임워크.
- Mongoose: MongoDB를 위한 ODM(Object Data Modeling) 라이브러리.
- JWT: JSON 웹 토큰을 사용한 인증.
- Bcrypt: 비밀번호 해싱 라이브러리.
- Nodemailer: 이메일 전송 라이브러리.
- Cors: 교차 출처 리소스 공유(CORS)를 위한 미들웨어.
- Dotenv: 환경 변수 로드 라이브러리.
- Express Validator: 요청 데이터 유효성 검사를 위한 라이브러리.
- Express Session: 세션 관리를 위한 라이브러리.

---

#### 프로젝트 구조

📦 프론트앤드<br>
┣ 📂 Api<br>
┃ ┣ 📜 Api.ts<br>
┃ ┣ 📜 GenreApi.ts<br>
┃ ┣ 📜 MovieApi.ts<br>
┃ ┗ 📜 TvApi.ts<br>
┣ 📂 Components<br>
┃ ┣ 📂 Genre<br>
┃ ┃ ┣ 📜 GenreBigMovie.tsx<br>
┃ ┃ ┣ 📜 GenreBigTv.tsx<br>
┃ ┃ ┣ 📜 SliderGenre.tsx<br>
┃ ┃ ┗ 📜 SliderGenreTv.tsx<br>
┃ ┣ 📂 Loading<br>
┃ ┃ ┣ 📜 Loading.tsx<br>
┃ ┃ ┗ 📜 MainLoading.tsx<br>
┃ ┣ 📂 Movie<br>
┃ ┃ ┣ 📜 Movie.tsx<br>
┃ ┃ ┗ 📜 Slider.tsx<br>
┃ ┣ 📂 Tv<br>
┃ ┃ ┣ 📜 SeasonModal.tsx<br>
┃ ┃ ┣ 📜 SeasonSelector.tsx<br>
┃ ┃ ┣ 📜 SliderTv.tsx<br>
┃ ┃ ┗ 📜 TvComponent.tsx<br>
┃ ┣ 📜 CategoryFont.tsx<br>
┃ ┣ 📜 Footer.tsx<br>
┃ ┣ 📜 Header.tsx<br>
┃ ┣ 📜 ProfileContext.tsx<br>
┃ ┣ 📜 Video.tsx<br>
┃ ┗ 📜 profil.tsx<br>
┣ 📂 Routes<br>
┃ ┣ 📜 DropdownMenu.tsx<br>
┃ ┣ 📜 GenreMovie.tsx<br>
┃ ┣ 📜 GenreTv.tsx<br>
┃ ┣ 📜 Home.tsx<br>
┃ ┣ 📜 Search.tsx<br>
┃ ┣ 📜 SearchSlider.tsx<br>
┃ ┣ 📜 TV.tsx<br>
┃ ┣ 📜 login.tsx<br>
┃ ┗ 📜 signup.tsx<br>
┣ 📂 styled<br>
┃ ┗ 📜 loginCss.tsx<br>
┣ 📂 utils<br>
┃ ┣ 📜 PrivateRoute.tsx<br>
┃ ┣ 📜 apiUtils.tsx<br>
┃ ┗ 📜 authUtils.tsx<br>
┣ 📜 App.tsx<br>
┣ 📜 atom.tsx<br>
┣ 📜 index.tsx<br>
┣ 📜 styled.d.ts<br>
┣ 📜 theme.ts<br>
┗ 📜 utils.ts<br>

📦 백앤드<br>
┣ 📂 Api<br>
┣ 📂 middleware<br>
┃ ┣ 📜 loginAuth.js<br>
┃ ┗ 📜 validator.js<br>
┣ 📂 models<br>
┃ ┗ 📜 User.js<br>
┣ 📜 .env<br>
┣ 📜 db.js<br>
┣ 📜 emailAuth.js<br>
┣ 📜 index.js<br>
┗ 📜 server.js<br>

---

### API 엔드포인트

#### 인증

<table>
  <tr>
    <td>POST /sendVerification</td>
    <td>사용자 이메일 인증 전송</td>
  </tr>
  <tr>
    <td>POST /verifyCode</td>
    <td>인증번호 일치 검증</td>
  </tr>
  <tr>
    <td>POST /user</td>
    <td>사용자 회원가입</td>
  </tr>
  <tr>
    <td>POST /login</td>
    <td>사용자 로그인</td>
  </tr>
  <tr>
    <td>GET /user</td>
    <td>사용자 정보 가져오기</td>
  </tr>
</table>

#### 영화

<table>
  <tr>
    <td>GET /api/movie/now_playing</td>
    <td>현재 상영중인 영화 가져오기</td>
  </tr>
  <tr>
    <td>GET /api/movie/upcoming</td>
    <td>개봉 예정 영화 가져오기</td>
  </tr>
  <tr>
    <td>GET /movie/top_rated</td>
    <td>순위권 영화 가져오기</td>
  </tr>
</table>

#### TV 프로그램

<table>
  <tr>
    <td>GET /api/tv/popular</td>
    <td>인기 순위별 tv show 가져오기</td>
  </tr>
  <tr>
    <td>GET /api/tv/on_the_air</td>
    <td>현재 방영중인 tv show 가져오기</td>
  </tr>
  <tr>
    <td>GET /api/tv/top_rated</td>
    <td>순위권 tv show 가져오기</td>
  </tr>
  <tr>
    <td>GET /api/search</td>
    <td>콘텐츠 검색</td>
  </tr>
</table>

#### 장르

<table>
  <tr>
    <td>GET /api/genre/movie/list</td>
    <td>영화 장르 list 가져오기 </td>
  </tr>
  <tr>
    <td>GET /api/genre/tv/list</td>
    <td>tv show 장르 list 가져오기 </td>
  </tr>
  <tr>
    <td>GET /api/discover/movie</td>
    <td>장르 별 영화 상세 정보 가져오기</td>
  </tr>
  <tr>
    <td>GET /api/discover/tv</td>
    <td>장르 별 tv show 상세 정보 가져오기</td>
  </tr>
</table>

#### 이외의 것들

<table>
  <tr>
    <td>GET /api/search/multi?query=${keyword}</td>
    <td>keyword 검색 결과 가져오기 </td>
  </tr>
  <tr>
    <td>GET /api/movie/${movieId}/videos</td>
    <td>영화 예고편 가져오기 </td>
  </tr>
  <tr>
    <td>GET /api/tv/${tvId}/videos</td>
    <td>tv 예고편 가져오기</td>
  </tr>
</table>

## 기여

커뮤니티의 기여를 환영합니다. 레포지토리를 포크하고 개선 사항이나 버그 수정을 위한 풀 리퀘스트를 제출해주시면 감사하겠습니다 :)

## 라이선스

프로젝트는 MIT 라이선스를 따릅니다. 자세한 사항은 LICENSE 파일을 참조하세요.

GitHub 배포 주소: https://seoyeon1123.github.io/S-FLEX/
