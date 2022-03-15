# NextJS Introduction

## Setting

- `cd Documents`
- `npx create-next-app@latest`, ts로 만들거면:`npx create-next-app@latest --typescript`
- eslintrc.json, gitignore, README파일 등 생성됨
- `npm run dev`
- pages폴더에 있는 파일 전부 삭제

---

<br><br><br><br>

# #1. Framework overview

## Framework vs Library

- Framework: 프레임워크가 내 코드를 불어옴. 규칙에 따라야함. 프레임워크가 그 코드를 호출. 커스텀못함
- Library : 내가 불러옴. 커스텀해서 코드작성가능.

## pages

- 해당 파일명이 url이름이 된다. about.js하면 `/about`
- index.js는 url이 `/`다.
- export default를 필수로 해야한다.
- component명은 아무거나 해도 상관없다. `export default Potato() {}`
- react rounter DOM 다운안해도 됨. create react-app에선 직접 만들었었음.

**예외**

- index.js는 앱의 홈화면이다.
- jsx쓰고있다면 `import react from "react"`안해도됨
- useState, useEffect같은 메소드는 `import react from "react"`해야함

## Static pre Rendering

- 앱 페이지들이 미리 렌더링된다.
- static(정적)으로 생성됨.

## CSR : client-side render

> 클라이언트(브라우저)가 js코드 다운 => client-side의 js가 모든 ui를 만드는것. 브라우저가 모든 것을 한다.  
> create react app
>
> - 브라우저가 html가져올때 비어있는 div로 가져온다.
> - 브라우저가 js, react.js 실행하고 나서 ui가 만들어짐
> - 느린인터넷에선 js가 다운되기전까진 흰화면만 보임 로딩되면 데이터가 보임
> - JS 비활성화하면 안보임
> - SEO 필요없는 페이지에 사용 ex) 개인 데시보드 (비공개) 페이지

## SSR : server-side render

> next js
>
> - JS 비활성화해도 보임. 실제 html이 소스코드에 들어있음. react.js동적기능은 안되지만 화면은 보임
> - 페이지는 초기상태로 pre-render해서 생성된 html 봄. => react.js연결되면 기능도 활성화됨
> - SEO에 좋은 구글 검색엔진이다. 유저에게 좋음

- source code보기 ctrl + U

## Link components

> SPA 구현(새로고침없음)하려면` <Link>` 컴포넌트 사용하기

- 이전 <a> : 링크 누르면 새로고침되서 유저사용감 느려짐

```js
<a href="/about">About</a>
```

- 이후 <Link> : 링크 눌러도 새로고침안되는 CSR이라 빠름

```js
import Link from "next/link";
...
<Link href="/about">
  <a style={{ color: router.pathname === "/about" ? "red" : "blue" }}>About</a>
</Link>;
```

## Router

- useRouter : router와 연결하는 Hook
- router설치, router render를 안해도 됨

```js
import { useRouter } from "next/router"; //추가

export default function NavBar() {
  const router = useRouter(); //추가

  return (
    <nav>
      <Link href="/">
        <a style={{ color: router.pathname === "/" ? "red" : "blue" }}>Home</a>
      </Link>
      <Link href="/about">
        <a style={{ color: router.pathname === "/about" ? "red" : "blue" }}>
          About
        </a>
      </Link>
    </nav>
  );
}
```

## CSS Modules

### `style={{}}`로 컴포넌트 내부에 작성하는 방식

```js
<a style={{ color: router.pathname === "/" ? "red" : "blue" }}>Home</a>
```

### CSS Modules 방식 : 기본 CSS 사용가능해짐

- 파일명이 `파일명.module.css`의 방식
- 페이지 빌드시 className을 무작위로 생성 = 자동으로 중복제거해줘서 재사용성 높아짐
- `<nav className="nav">` : 이렇겐 작동안함
- className을 만들어야 하고 복붙해야함

```js
import styles from "./NavBar.module.css"; //추가
...
<nav className={styles.nav}> //작동함
```

**<공통css, 조건부css 둘다 적용하기>**

1. className={`${공통css} ${조건부css}`}

```js
className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}
```

2. className={[공통css, 조건부css,].join(" ")}

- .join(" ") : 배열요소 사이에 " "공백 넣어서 연결

```js
className={[
            styles.link,
            router.pathname === "/about" ? styles.active : "",
          ].join(" ")}
```

## Styles JSX

- 해당 컴포넌트에서만 scoped(한정되어 적용) 됨
- `` <style jsx>{` 태그{ 스타일 적용 } `}</style> ``

```js
<style jsx>{`
  nav {
    background-color: tomato;
  }
  a {
    text-decoration: none;
  }
  .active {
    color: yellow;
  }
`}</style>
```

## 전역 스타일

- App Component, App Page
- reactjs는 각각 구분된 페이지여서 전역CSS가 적용이 안됨
- pages폴더에 `_app.js` 파일에서만 전역CSS 적용가능 (파일명 `_app.js` 필수여야함)
- `_app.js` 컴포넌트명은 아무거나 가능

```js
// pages/_app.js
import NavBar from "../components/NavBar";
import "../styles/globals.css"; //이파일에서만 전역css import가능

export default function MyApp({ Component, PageProps }) {
  //컴포넌트명은 아무거나 가능
  return (
    <>
      <NavBar />
      <Component {...PageProps} />
      <style jsx global>
        {`
          a {
            color: white; //작동안되는 것
          }
        `}
      </style>
    </>
  );
}
```

---

<br><br><br><br>

# #2. Practice project

## Patterns

- `{ children }` : react.js가 제공하는 prop이다. 한 컴포넌트를 다른 컴포넌트 안에 넣을 때 사용함.
- `_app.js`파일에선 전역으로 import할 것이 많아서(google analytics, 검색엔진, 스크립트분석 등) 해당파일이 커지는건 원하지 않으므로, `Layout.js`에서 코드를 작성한다.

```jsx
//Layout.js
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
```

```jsx
//_app.js
import Layout from "../components/Layout";
import "../styles/globals.css"; //이파일에서만 전역css import가능

export default function AnyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

<br><br>

- 헤더타이틀 변경 컴포넌트만들기 : components/Seo.js 생성
- index, about.js 에 Seo컴포넌트 삽입

```js
//about.js
import Seo from "../components/Seo";
  ...
      <Seo title="About" />
```

```jsx
//Seo.js 생성
import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
```

<br><br>

## Fetching Data

- API keys 로 data fetch하기

  1. API key 사이트 : https://www.themoviedb.org/?language=ko
  2. 로그인 - Settings - API - API 키 (v3 auth) 복사
  3. https://developers.themoviedb.org/3/movies/get-popular-movies 에서 사용법보고 `index.js`작성

<br><br>

### 즉시실행함수(IIFE, Immediately Invoked Function Expression)

> 정의되면 즉시 실행되는 함수.  
>  ● 함수표현식(함수이름 정의안된것)으로 사용해야한다. `function(){}`  
>  ● 내부에 정의된 어떤 변수도 바깥에 보이지 않는다.

<br><br>

1. 방식 1 `(function () {})();`

```jsx
(function () {
  statements;
})();
```

1번째 `()`괄호는 익명함수다. 다른 변수들 접근을 막을 수 있다.  
2번째 `()`괄호는 즉시실행함수를 생성한다. 이로 JS는 함수를 즉시 실행한다.

<br><br>

2. 방식 2 `(function () {}());`

```jsx
(function () {
  statements;
})();
```

```jsx
//index.js
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const API_KEY = "1a9274478cb8fe088e108a3681a7582e";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    //fetch response data받아오기
    (async () => {
      const { results } = await //response받기, 데이터받을await 1
      //받아온값.json하는 await 2
      (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })(); // (async익명함수)()즉시실행
  }, []);
  return (
    ...
}
```

- `<img>`태그 대신 next의 `<Image>`사용하기 (이강의에선 안했음)

```jsx
import Image from "next/image";
...
<Image src="me.png" alt="Picture of the author" width={500} height={500} />;
```

<br><br>

## Redirect, Rewrite

> API KEY 숨기기 : 사용량 제한될수도 있어서 공개되면 남용될 수 있음.

### 1. **redirects** : URL 변경됨. 유저가 URL 변화를 확인함 O.

- source : request 경로
- destination : redirect할 경로로 변경
- permanent :
  1. true는 클라이언트/검색엔진이 redirect를 영구적캐시(기억함)하는 308 status code사용
  2. false는 임시적이고 캐시되지(기억안함)않는 307 status code사용

### 2. **rewrites** : URL 변경안됨. 유저가 URL 변화를 확인못함 X.

- source : request 경로
- destination : api key가 담긴 fetch주소

<br>

1. `.env`파일생성후 `API_KEY=키복붙` 입력하기
2. `.gitignore`에 `.env` 마지막에 넣기 => 그래야 github에 push안됨
3. `next.config.js`파일에 **rewrites**로 api key 숨기기
4. `next.config.js`파일 수정하면 터미널 재시작하기. ctrl+c , npm run dev
5. `index.js`에 `` const { results } = await (await fetch(`/api/movies`)).json(); ``로 **/api/movies**로 변경함

```jsx
//next.config.js
const API_KEY = process.env.API_KEY; //.env파일에 api key를 숨긴다

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*", //이 url로 가면 밑url로 자동이동함
        destination: "/new-blog/:path*", //여기로 url 이동
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies", //이 url에 api로 받은 정보를 받아온다. fetch주소임(index.js)
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`, //여기에 api key를 숨긴다
      },
    ];
  },
};

module.exports = nextConfig;
```

<br><br><br><br><br><br>

## async await

```jsx
async function 함수명() {
  await 비동기처리메서드명();
}
```

### 1. async

- async는 function 앞에 위치
- async 붙은 해당 함수는 반드시 Promise를 반환한다
  - Promise가 아닌 값이어도, 이행상태 Promise로 감싸 이행된 Promise 반환되도록 한다
- async는 화살표함수, 함수표현식으로도 정의 가능하다

### 2. await

- await는 async 함수 내에서만 동작한다
- JS가 await 보면, Promise가 처리될때까지 기다리고, 처리되면 결과반환한다
- **await 대상**이 되는 비동기처리메서드는 주로 **Axios, API 호출** 함수다
- 비동기처리메서드가 꼭 Promise 객체를 반환해야 await가 작동된다

### 3. 사용 예시

- **예외처리**는 `try{}cahch(e){}`구문을 사용한다

```jsx
//index.js
//요약버전
useEffect(() => {
  (async () => {
    // async 예약어, ()=>{} 익명함수
    const { results } = await (await fetch(`/api/movies`)).json();
    setMovies(results);
  })(); //()();즉시실행함수 사용
}, []);

// 요약안한 버전
// (async () => {
//   const response =  (await fetch(`/api/movies`));
//   const json = await response.json();
//   console.log(response); //obj안 results에 정보다있음
// })();
```

요약버전> 1번째 await는 .json을 위함 / 2번째 await는 fetch API를 위한 것이다

<br><br><br><br>

## Server side Rendering

### CSR

- Loading화면 보여준다음 데이터 받기. 소스코드 html에 데이터없음
- SEO 관련없는 페이지에서 사용 ex) 사용자 대시보드 페이지(비공개페이지)
- 데이터가 자주 업데이트되며 pre-render할 필요없을때 사용

### SSR

- 데이터API 받기 전까진 빈화면이었다가, 받으면 화면보이고 소스코드 HTML에 데이터담김
- SEO가 필요한 페이지에서 사용(html에 데이터 다 담겨있어서 SEO유리)
- loading화면 안보여주고 싶을 때 사용
- 자바스크립트 비활성화해도 보임. 그냥 html이어서
- 동작순서
  1. nextJS가 백엔드(API)에서 받은 props(data)를 return한다
  2. reactJS가 props(data)인 results 배열 가져와서 프론트엔드에 html보여줌

### SSR하기 : getServerSideProps

- 이름변경안된다
- export는 필수고, async는 선택사항.
- props라는 key가 들어있고 안에 원하는 데이터넣을 수 있음
- 여기서 쓰는 내부코드는 서버(백엔드)에서만 작동함
- API KEY를 여기에 쓰면 절대로 클라이언트(브라우저)에게 안보임

```jsx
// index.js
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results, // props에 원하는 데이터 api 넣기
    },
  };
}
```

- Server side통해 props를 Page로 보낼 수 있다

```jsx
//_app.js
export default function AnyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
// <Component {...pageProps} /> props가 {...pageProps}로 들어온다
// <Home {results} />           예를들면 이렇게 들어오는 것.
```
