<div align="center">
<img src="https://user-images.githubusercontent.com/66371206/184502359-9e21d760-282d-4d0e-a19b-d3814cbb9aa8.png" title="modoco"/>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FSWM-FIRE%2Fmodoco-frontend&count_bg=%2396CEB4&title_bg=%23555555&icon=codeigniter.svg&icon_color=%23F58A7D&title=modoco&edge_flat=false)](https://hits.seeyoufarm.com)

</div>

# 모도코

> **모여서 도란도란 코딩👨‍💻👩‍💻** <br/> **개발기간: 2022.06 ~ 2022.11**

## 배포 주소

> **정식 버전** : [https://modocode.com](https://modocode.com) <br /> **개발 버전** : [https://dev.modocode.com](https://dev.modocode.com)

## TEAM 🔥FIRE🔥 소개

|                                                                                                                       윤영기 : FE                                                                                                                       |                                                                                                                       고주형 : BE                                                                                                                       |                                                                                                                       이하령 : FE                                                                                                                       |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                     <img width="160px" src="https://avatars.githubusercontent.com/u/66371206?v=4">                                                                                      |                                                            <img width="160px" src="https://user-images.githubusercontent.com/64428916/195526068-33be2cd0-066c-4584-9ae9-8c3344a60fb9.jpg" />                                                            |                                                                                     <img width="160px" src="https://avatars.githubusercontent.com/u/64428916?v=4">                                                                                      |
|                                                                                                         [@071yoon](https://github.com/071yoon)                                                                                                          |                                                                                                    [@IamGroooooot](https://github.com/IamGroooooot)                                                                                                     |                                                                                                        [@halang](https://github.com/haryung-lee)                                                                                                        |
| [![wakatime](https://wakatime.com/badge/user/4292264a-e9dd-4cc1-8ab6-1ada6ddb177a/project/79b7e168-b8e8-41f9-a790-c41967365f78.svg)](https://wakatime.com/badge/user/4292264a-e9dd-4cc1-8ab6-1ada6ddb177a/project/79b7e168-b8e8-41f9-a790-c41967365f78) | [![wakatime](https://wakatime.com/badge/user/95486c3b-017e-41e8-8d9c-20de1b876bf5/project/dabe2a55-4c66-49ab-ae59-8eba6b898e6f.svg)](https://wakatime.com/badge/user/95486c3b-017e-41e8-8d9c-20de1b876bf5/project/dabe2a55-4c66-49ab-ae59-8eba6b898e6f) | [![wakatime](https://wakatime.com/badge/user/02d79381-005e-489b-b7f0-5fdf9dc2a088/project/d5dd888b-da07-4723-bc9d-f7c07c44307a.svg)](https://wakatime.com/badge/user/02d79381-005e-489b-b7f0-5fdf9dc2a088/project/d5dd888b-da07-4723-bc9d-f7c07c44307a) |

## 프로젝트 소개

**모도코**(모여서 도란도란 코딩) 프로젝트는 모각코를 하고 싶은 사람들이 모여 도란도란 코딩할 수 있게 해주는 플랫폼입니다. 개발자 친화적인 기능을 갖추고 모각코로 만들어진 인연이 이어질 수 있게 만들고자 합니다.

---

## 실행방법

### Project Setting

환경변수 세팅

```shell
# ************************************************* #
#  This is an example env file for modoco frontend  #
# ************************************************* #

# backend server
REACT_APP_BASE_URL=your_backend_server

# channel talk key
REACT_APP_CHANNEL_IO_KEY=your_channel_talk_key

# oauth
# oauth client id
REACT_APP_GITHUB_CLIENT_ID=your_github_oauth_client_id
REACT_APP_KAKAO_CLIENT_ID=your_kakao_oauth_client_id
REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
# oauth redirect uri
REACT_APP_KAKAO_REDIRECT_URI=your_kakao_redirect_uri
REACT_APP_GOOGLE_REDIRECT_URI=your_google_redirect_uri

# turn server
REACT_APP_TURN_URL=your_turn_server_url
REACT_APP_TURN_CREDENTIAL=your_turn_server_credential
REACT_APP_TURN_USERNAME=your_turn_server_username

# lambda server
REACT_APP_LAMBDA_INVITE=your_lambda_server_url
```

### Installation

#### 1. Install npm dependency

```shell
# install packages
$ yarn install

# clean install packages
$ yarn ci
```

#### 2. Run React

```shell
# run app
yarn start

# run app in https
# need SSL_CRT_FILE=cert.pem SSL_KEY_FILE=key.pem in root
yarn start:https

# check style lint
yarn lint:css
```

### Build

```shell
# build app
yarn build
```

### Testing

```shell
# start test mode
yarn test

# run app and open cypress
yarn cypress

# open cypress without opening app
npx cypress open
```

---

## Stacks 🚀

### Environment

![VSC](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) ![iTerm](https://img.shields.io/badge/iTerm2-000000?style=for-the-badge&logo=iterm2&logoColor=white) ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![Gitlab](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white) ![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![ReactQuery](https://img.shields.io/badge/React--Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=61DAFB) ![Styled](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![ChartJS](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white) ![SocketIO](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white) ![WebRTC](https://img.shields.io/badge/WebRTC-333333?&style=for-the-badge&logo=WebRTC&logoColor=white)

### Lint

![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![StyleLint](https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white)

### Test

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

### Communication

![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white) ![Confluence](https://img.shields.io/badge/Confluence-172B4D?style=for-the-badge&logo=Confluence&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![GC](https://img.shields.io/badge/Google--Calendar-4285F4?style=for-the-badge&logo=GoogleCalendar&logoColor=white)

### Analytics

![GA](https://img.shields.io/badge/Google%20Analytics-E37400?style=for-the-badge&logo=google%20analytics&logoColor=white) ![Wakatime](https://img.shields.io/badge/WakaTime-000000?style=for-the-badge&logo=WakaTime&logoColor=white) ![NewRelic](https://img.shields.io/badge/New--Relic-008C99?style=for-the-badge&logo=NewRelic&logoColor=white)

---

## 동작 화면 💻

### 화면 구성

| <img src="https://user-images.githubusercontent.com/66371206/184502873-49230f1e-0317-489e-8bec-96c0c71053a2.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184502903-155d0c32-ce91-472c-ae75-6c30590636a5.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184502965-a51c409b-8bdc-4ef9-94ee-6ac9e4c416e9.png" /> |  <img src="https://user-images.githubusercontent.com/66371206/184502995-bb3378a7-bd06-4cc1-b5c5-02d46d043d77.png">  |
| :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
|                                                      첫 페이지                                                      |                                                       로그인                                                        |                                                      회원가입                                                       |                                                     메인페이지                                                      |
|  <img src="https://user-images.githubusercontent.com/66371206/184503035-c86ea336-837a-42c5-8ac2-f91ce4661c56.png">  | <img src="https://user-images.githubusercontent.com/66371206/184503095-cf0910c0-9afc-4a34-aa4a-2766594c0038.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184503129-2f0b4358-e974-4a5a-bb6b-80b62a76ef59.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184503155-0fff3142-75ae-442e-8219-cba00b8ac8c0.png" /> |
|                                                    방 입장 준비                                                     |                                                       방 입장                                                       |                                                        채팅                                                         |                                                      화면 확대                                                      |

### 테마

| <img src="https://user-images.githubusercontent.com/66371206/184503229-872ef0ec-eab2-4152-94a8-58bb7c28a75b.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184503245-1f3b6c41-e327-413b-baeb-f879ca0fb410.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184503291-2fee6898-2dc8-48cc-8d09-078f4d335431.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184503310-6224d543-3bb3-4812-9f40-d2f66e431ee2.png" /> | <img src="https://user-images.githubusercontent.com/66371206/184503380-3f9eaaba-17d9-4889-8fc8-c6ff24c419a2.png" /> |
| :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
|                                                        바다                                                         |                                                        캠핑                                                         |                                                       모닥불                                                        |                                                        우주                                                         |                                                        여행                                                         |

---

## 주요 기능 ✨

### ⭐️ 진행중인 모각코 방에 입장

- 현재 진행중인 모각코 방들을 메인화면에서 찾을 수 있어요
- 방에대한 정보(제목, 태그, 테마)등을 통하여 원하는 방에 입장 할 수 있어요
- 초대하기 링크를 통해 입장하면 비밀번호가 있는 방에 바로 접속 가능해요

### ⭐️ 모각코 방 생성

- 원하는 모각코방이 없으시다면? 방을 직접 만들 수 있어요
- 친구들만 모으고싶다면, 비밀번호를 설정하세요!

### ⭐️ 친구 추가

- 모각코중에 마음에 드는 사람을 만났나요? 친구로 등록해보세요
- 친구 신청, 친구 수락 및 거절, 친구 삭제 모두 가능해요!

### ⭐️ 화면 공유

- 어떤것을 코딩하는지 공유하고 싶다면, 화면을 공유해보세요
- 화면만으로 부족하다면, 음성을 키고 대화해보세요

### ⭐️ 채팅

- 모각코 방에서 여러 사람들과 채팅을 할 수 있어요
- 친구들과 1:1 채팅 또한 가능해요!

### ⭐️ 유튜브 플레이리스트 듣기

- 나만의 플레이리스트로 커스텀하여 친구들과 노래를 들을 수 있어요
- 원하지 않는 노래는 삭제도 가능해요

### ⭐️ 프로필 설정

- 나의 깃허브와 개인 페이지 혹은 블로그 링크를 등록할 수 있어요
- 간단한 한줄 소개로 자신을 표현해봐요!

### ⭐ 로비 입장

- 현재 모도코에 있는 모든 사람들을 확인할 수 있어요
- 전체 채팅을 통해 같이 모각코할 사람을 구해보세요!

---

## 아키텍쳐 ⚒

### Full Architecture

![full arch](https://user-images.githubusercontent.com/66371206/185145423-00937aee-eb35-46e7-85e0-a5aa5e372794.png)

### WebRTC Flow

![WebRTC Sequence Diagram](https://user-images.githubusercontent.com/66371206/185143244-142999a6-9f58-4e56-90ef-598782d7f420.png)

### DM Flow

![direct_message_sequence_diagram](https://user-images.githubusercontent.com/66371206/201030305-c85815f3-5b42-4f10-9a1a-a3135aa3305a.png)

---

## 개발로그 ✏️

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=모도코에서-코드-리뷰-하실분)](https://velog.io/@lhr4884/%EB%AA%A8%EB%8F%84%EC%BD%94%EC%97%90%EC%84%9C-%EC%BD%94%EB%93%9C-%EB%A6%AC%EB%B7%B0-%ED%95%98%EC%8B%A4%EB%B6%84)
[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=모여서-각자-코딩모각코할분-들어오세요-i9lbb30z)](https://velog.io/@lhr4884/%EB%AA%A8%EC%97%AC%EC%84%9C-%EA%B0%81%EC%9E%90-%EC%BD%94%EB%94%A9%EB%AA%A8%EA%B0%81%EC%BD%94%ED%95%A0%EB%B6%84-%EB%93%A4%EC%96%B4%EC%98%A4%EC%84%B8%EC%9A%94-i9lbb30z)
[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=FIRE는-이렇게-협업했다)](https://velog.io/@071yoon/FIRE%EB%8A%94-%EC%9D%B4%EB%A0%87%EA%B2%8C-%ED%98%91%EC%97%85%ED%96%88%EB%8B%A4)

<details>
<summary>영기</summary>

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=Typescript-에서-Zustand-배우기)](https://velog.io/@071yoon/Typescript-%EC%97%90%EC%84%9C-Zustand-%EB%B0%B0%EC%9A%B0%EA%B8%B0)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=Typescript-React-Styled-Component-환경에서-Font-적용하기)](https://velog.io/@071yoon/Typescript-React-Styled-Component-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Font-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=React-Horizontal-Scroll-구현)](https://velog.io/@071yoon/React-Horizontal-Scroll-%EA%B5%AC%ED%98%84)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=React-Volume-Slide-만들기)](https://velog.io/@071yoon/React-Volume-Slide-%EB%A7%8C%EB%93%A4%EA%B8%B0)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=커스텀-드랍다운-애니메이션을-만들어보자)](https://velog.io/@071yoon/%EC%BB%A4%EC%8A%A4%ED%85%80-%EB%93%9C%EB%9E%8D%EB%8B%A4%EC%9A%B4-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=브라우저에서-오디오-입출력-제어하기)](https://velog.io/@071yoon/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EC%98%A4%EB%94%94%EC%98%A4-%EC%9E%85%EC%B6%9C%EB%A0%A5-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=리액트-unit-test를-진행해보자)](https://velog.io/@071yoon/%EB%A6%AC%EC%95%A1%ED%8A%B8-unit-test%EB%A5%BC-%EC%A7%84%ED%96%89%ED%95%B4%EB%B3%B4%EC%9E%90)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=React로-오디오-비주얼라이저-만들기)](https://velog.io/@071yoon/React%EB%A1%9C-%EC%98%A4%EB%94%94%EC%98%A4-%EB%B9%84%EC%A3%BC%EC%96%BC%EB%9D%BC%EC%9D%B4%EC%A0%80-%EB%A7%8C%EB%93%A4%EA%B8%B0)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=Cypress로-e2e-테스트-진행하기)](https://velog.io/@071yoon/Cypress%EB%A1%9C-e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A7%84%ED%96%89%ED%95%98%EA%B8%B0)

[![071yoon's GitHub stats](https://velog-readme-stats.vercel.app/api?name=071yoon&slug=APM-로그로-문제-해결하기)](https://velog.io/@071yoon/APM-%EB%A1%9C%EA%B7%B8%EB%A1%9C-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)

</details>

<details>
<summary>하령</summary>

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=Chart.js를-이용해-그래프를-만들어보자)](https://velog.io/@lhr4884/Chart.js%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EA%B7%B8%EB%9E%98%ED%94%84%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90)

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=모달창-만들기-드롭다운-구현하기)](https://velog.io/@lhr4884/모달창-만들기-드롭다운-구현하기)

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=velog에서-사용하는-태그-입력-기능-만들기)](https://velog.io/@lhr4884/velog%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%ED%83%9C%EA%B7%B8-%EC%9E%85%EB%A0%A5-%EA%B8%B0%EB%8A%A5-%EB%A7%8C%EB%93%A4%EA%B8%B0)

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=초대-링크-만들기-AWS-Lambda와-API-gateway로-api-만들기)](https://velog.io/@lhr4884/%EC%B4%88%EB%8C%80-%EB%A7%81%ED%81%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-AWS-Lambda%EC%99%80-API-gateway%EB%A1%9C-api-%EB%A7%8C%EB%93%A4%EA%B8%B0)

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=초대-링크-만들기-1)](https://velog.io/@lhr4884/%EC%B4%88%EB%8C%80-%EB%A7%81%ED%81%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-1)

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=E2E-Test-with-Cypress-방-생성-테스트-코드-작성하기)](https://velog.io/@lhr4884/E2E-Test-with-Cypress-%EB%B0%A9-%EC%83%9D%EC%84%B1-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0)

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=초대-링크-만들기-2)](https://velog.io/@lhr4884/%EC%B4%88%EB%8C%80-%EB%A7%81%ED%81%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-2)

[![halang's GitHub stats](https://velog-readme-stats.vercel.app/api?name=lhr4884&slug=React-Carousel-이용한-Carousel-만들기)](https://velog.io/@lhr4884/React-Carousel-%EC%9D%B4%EC%9A%A9%ED%95%9C-Carousel-%EB%A7%8C%EB%93%A4%EA%B8%B0)

</details>

<p align="center">
  <img src="https://user-images.githubusercontent.com/63354527/201853029-e92aa913-882f-47b7-be43-5878cb3af169.png" width="30%" >
</p>

<br/>

<p align="center"><i>This Project is Sponsored by <b>Software Maestro</b></i></p>

<p align="center">This work was supported by the Institute of Information & Communications Technology Planning & Evaluation(IITP) grant funded by the Ministry of Science and ICT(MSIT) (IITP-0000-SW Maestro training course).</p>
