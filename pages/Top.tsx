import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase";
import Layout from "./components/Layout";

const Top = () => {
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter()
  //ReactDOM.hydrate()対策
  useEffect(() => {
    setIsClient(true);
  }, []);
  //ログアウト処理
  const handleLogout =() => {
    auth.signOut()
    router.push("/")
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Top Page</title>
        </Head>
        <div className="flex justify-end items-center mr-10">
        <button className="text-xs w-1/8 m-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          ログアウト
        </button>
        </div>
        <div className="font-serif">
          <div className="flex justify-center mt-4 mb-2 ">
            <button className="m-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
              追加
            </button>
            <button className="m-4 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
              編集
            </button>
            <button className="m-4 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
              削除
            </button>
          </div>
          <table className="border-separate border border-slate-500 border-spacing-px w-1/3 mx-auto container text-center font-bold">
            <thead>
              <tr className="bg-gray-300 h-16">
                <th className="border border-slate-600">タスク</th>
                <th className="border border-slate-600 w-1/4">進行状態</th>
                <th className="border border-slate-600">作成日</th>
              </tr>
            </thead>
            {isClient && (
              <tbody>
                <tr className="h-12">
                  <td className="border border-slate-600">散歩をする</td>
                  <td className="border border-slate-600">進行中</td>
                  <td className="border border-slate-600">2022/8/30</td>
                </tr>
                <tr className="h-12">
                  <td className="border border-slate-600">散歩をする</td>
                  <td className="border border-slate-600">進行中</td>
                  <td className="border border-slate-600">2022/8/30</td>
                </tr>

                <tr className="h-12">
                  <td className="border border-slate-600">散歩をする</td>
                  <td className="border border-slate-600">進行中</td>
                  <td className="border border-slate-600">2022/8/30</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div>
          <p>{auth.currentUser?.displayName}</p>
        </div>
      </Layout>
    </>
  );
};

export default Top;
