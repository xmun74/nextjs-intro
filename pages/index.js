import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="active">Hello</h1> //active적용안됨
      <style jsx>
        {`
          a {
            color: white; //작동안되는 것
          }
        `}
      </style>
    </div>
  );
}
