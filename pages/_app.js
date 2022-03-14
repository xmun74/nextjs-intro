import Layout from "../components/Layout";
import "../styles/globals.css"; //이파일에서만 전역css import가능

export default function AnyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
