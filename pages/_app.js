import NavBar from "../components/NavBar";
import "../styles/globals.css"; //이파일에서만 전역css import가능

export default function AnyApp({ Component, PageProps }) {
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
