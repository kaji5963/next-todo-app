import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase";
import Layout from "./components/Layout";
import taskList from "./components/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Modal from "./components/Modal";

const Top = () => {
  const [editValue, setEditValue] = useState();
  const [task, setTask] = useRecoilState<any>(taskList);
  // const task = useRecoilValue<any>(taskList);
  const [isClient, setIsClient] = useState(false);
  const [filterTask, setFilterTask] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  //ReactDOM.hydrate()対策
  useEffect(() => {
    setIsClient(true);
  }, []);
  //ログアウト処理
  const handleLogout = () => {
    auth.signOut();
    router.push("/");
  };
  //削除処理
  const handleDelete = (id: string) => {
    const deleteTask = task.filter((task: { id: string }) => task.id !== id);
    setTask(deleteTask);
  };

  //絞り込み処理
  const handleFilter = (e: string) => {
    switch (e) {
      case "全て":
        setFilterTask("全て");
        break;
      case "未着手":
        setFilterTask("未着手");
        break;
      case "進行中":
        setFilterTask("進行中");
        break;
      case "完了":
        setFilterTask("完了");
        break;
    }
  };

  //編集ページへルーティング
  const handleEdit = (
    id: string,
    title: string,
    date: string,
    detail: string,
    category: string
  ) => {
    const editTask = task.map((task: any) => {
      task.id === id
        ? {
            ...task,
            title: title,
            date: date,
            detail: detail,
            category: category,
          }
        : task;
    });
    // setTask(editTask)
    router.push("/Edit", editTask);
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Top Page</title>
        </Head>
        <div className="flex justify-end items-center mr-10">
          <button
            className="text-xs w-1/8 m-4 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            ログアウト
          </button>
          <p>ログイン名：{auth.currentUser?.displayName} </p>
        </div>
        <div className="font-serif">
          <div className="flex justify-center mt-4 mb-2">
            <button
              className="m-4 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded active:bg-indigo-600"
              onClick={() => router.push("/Create")}
            >
              タスク追加
            </button>
          </div>

          <select
            className="bg-gray-200 w-1/5 h-10 mt-4 mb-8 mx-16 container text-center rounded-lg border-solid outline-none"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="全て">全て</option>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>

          <table className="border-separate border border-slate-500 border-spacing-xl  w-full mx-auto container text-center font-bold">
            <thead>
              <tr className="bg-gray-300 h-16 w-1/2">
                <th className="border border-slate-600 w-auto">タスク</th>
                <th className="border border-slate-600 w-1/6">進行状態</th>
                <th className="border border-slate-600 w-1/6">期限</th>
                <th className="border border-slate-600 w-1/12">詳細</th>
                <th className="border border-slate-600 w-1/12">編集</th>
                <th className="border border-slate-600 w-1/12">削除</th>
              </tr>
            </thead>
            {isClient && (
              <tbody>
                {task.map((task: any) => {
                  if (filterTask === "未着手" && task.category !== "未着手")
                    return;
                  if (filterTask === "進行中" && task.category !== "進行中")
                    return;
                  if (filterTask === "完了" && task.category !== "完了") return;

                  return (
                    <tr className="h-12" key={task.id}>
                      <td className="border border-slate-600">{task.title}</td>

                      <td className="border border-slate-600">
                        {task.category}
                      </td>
                      <td className="border border-slate-600">{task.date}</td>
                      <td
                        className="m-4 text-white font-bold py-2 px-4 rounded cursor-pointer bg-sky-300 hover:bg-sky-500 active:bg-sky-700"
                        onClick={() => setIsOpen(true)}
                      >
                        詳細
                      </td>
                      <td
                        className="m-4 bg-green-300 hover:bg-green-400 active:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={() =>
                          handleEdit(
                            task.id,
                            task.title,
                            task.date,
                            task.detail,
                            task.category
                          )
                        }
                      >
                        編集
                      </td>
                      <td
                        className="m-4 bg-red-400 hover:bg-red-500 active:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={() => handleDelete(task.id)}
                      >
                        削除
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          <div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <p >{task.title}</p>
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
};;;

export default Top;
