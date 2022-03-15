import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {
  // { results } :props받기
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>
        {`
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 20px;
          }
          .movie {
            cursor: pointer;
          }
          .movie img {
            max-width: 100%;
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .movie:hover img {
            transform: scale(1.05) translateY(-10px);
          }
          .movie h4 {
            font-size: 18px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

// getServerSideProps : 이름변경안됨. export하고, async는 선택사항. props라는 key가 들어있고 안에 원하는 데이터넣을 수 있음
// Server side통해 props를 Page로 보낼 수 있다
export async function getServerSideProps() {
  // 여기서 쓰는 코드는 서버(백엔드)에서만 작동함
  // API KEY를 여기에 쓰면 절대로 클라이언트(브라우저)에게 안보임
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
