import Head from "next/head";
import Layout from "./components/Layout";
import { editItem } from "./components/atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const Detail = () => {
  const editTask = useRecoilValue(editItem);
  const router = useRouter();

  return (
    <>
      <Layout>
        <Head>
          <title>Detail Page</title>
        </Head>
        <h1 className="text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-300 text-xl">タスク詳細</h1>
        <div className="mt-4  h-auto w-full mx-auto container bg-rose-100 text-base rounded-lg  flex justify-center flex-col">
          <input
            className="w-2/3 h-16 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
            type="text"
            value={editTask.title}
            readOnly
          />
          <input
            className="w-2/3 h-48 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
            type="textarea"
            value={editTask.detail}
            readOnly
          />
          <div className="flex mx-auto container justify-center">
            <button
              className="mr-10 mb-10 w-32 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded active:bg-green-600"
              type="submit"
              onClick={() => router.push("/Edit")}
            >
              編集
            </button>
            <button
              className="ml-10 mb-10 w-32 bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded active:bg-sky-600"
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
