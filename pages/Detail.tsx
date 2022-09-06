import Head from "next/head";
import Layout from "./components/Layout";
import { editList } from "./components/atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const Detail = () => {
  const detailTask = useRecoilValue<any>(editList);
  const router = useRouter();

  return (
    <>
      <Layout>
        <Head>
          <title>Detail Page</title>
        </Head>
        <div className="mt-14  h-auto w-full mx-auto container bg-rose-100 text-base rounded-lg  flex justify-center flex-col">
          <input
            className="w-2/3 h-48 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
            type="textarea"
            value={detailTask.detail}
            readOnly
          />
          <div className="flex">
            <button
              className="mx-auto mb-10 w-32 bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded active:bg-sky-600"
              type="submit"
              onClick={() => router.push("/Top")}
            >
              戻る
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Detail;
