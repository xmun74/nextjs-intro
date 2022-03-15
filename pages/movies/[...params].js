import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

// url로 영화제목만 가져옴
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
