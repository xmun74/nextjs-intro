# NextJS Introduction

## Setting

- `cd Documents`
- `npx create-next-app@latest`, ts로 만들거면:`npx create-next-app@latest --typescript`
- eslintrc.json, gitignore, README파일 등 생성됨
- `npm run dev`
- pages폴더에 있는 파일 전부 삭제

## Framework vs Library

- Framework: 내 코드를 불어옴. 규칙에 따라야함. 프레임워크가 그 코드를 호출. 커스텀못함
- Library : 내가 불러옴. 커스텀해서 코드작성가능.

## pages

- 해당 파일명이 url이름이 된다. about.js하면 `http~~/about`
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

## CSR: client-side render

> 브라우저가 js코드 다운받고 client-side의 js가 모든 ui를 만드는것. 브라우저가 모든 것을 한다.
> create react app
> 브라우저가 html가져올때 비어있는 div로 가져온다.
> 브라우저가 js, react.js 실행하고 나서 ui가 만들어짐
> 느린인터넷에선 js가 다운되기전까진 흰화면만 보임 로딩되면 데이터가 보임
> js비활성화하면 안보임

## SSR: server-side render

> next js
> js비활성화해도 보임. 실제 html이 소스코드에 들어있음. react.js기능은 안되지만 화면은 보임
> 페이지는 초기상태로 미리 렌더링해서 생성된 html 봄. => react.js연결되면 기능도 활성화됨
> SEO에 좋은 구글 검색엔진, 유저에게 좋음

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
