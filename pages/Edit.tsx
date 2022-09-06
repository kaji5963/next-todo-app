import Head from "next/head";
import Layout from "./components/Layout";
import { taskList, editList } from "./components/atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./components/firebase";

const Edit = () => {
  const [task, setTask] = useRecoilState<any>(taskList);
  const [editTask, setEditTask] = useRecoilState<any>(editList);

  const router = useRouter();
  //firebaseのデータ更新処理
  const handleUpdateSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const newUpdateDoc = doc(db, "post", id);
    updateDoc(newUpdateDoc, {
      title: editTask.title,
      createdAt: editTask.createdAt,
      detail: editTask.detail,
      category: editTask.category,
    });
    router.push("/Top");
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Edit Page</title>
        </Head>
        <div className="mt-14  h-auto w-full mx-auto container bg-orange-200 flex justify-center items-start text-base rounded-lg">
          <form
            className="flex flex-col w-full"
            onSubmit={(e) => handleUpdateSubmit(e, editTask.id)}
          >
            <input
              className="w-1/2 h-14 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
              type="text"
              placeholder="タスクを編集してください"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
            <div className="flex justify-center items-center mx-auto h-8 container">
              <select
                className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
                value={editTask.category}
                onChange={(e) =>
                  setEditTask({ ...editTask, category: e.target.value })
                }
              >
                <option value="未着手">未着手</option>
                <option value="進行中">進行中</option>
                <option value="完了">完了</option>
              </select>
              <input
                className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
                type="createdAt"
                value={editTask.createdAt}
                onChange={(e) =>
                  setEditTask({ ...editTask, createdAt: e.target.value })
                }
              />
            </div>
            <input
              className="w-1/2 h-28 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
              type="textarea"
              placeholder="詳細を編集してください"
              value={editTask.detail}
              onChange={(e) =>
                setEditTask({ ...editTask, detail: e.target.value })
              }
            />
            <div className="flex justify-center">
              <button
                className="mr-10 mb-10 w-32 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded active:bg-green-600"
                type="submit"
              >
                編集
              </button>
              <button
                className="ml-10 mb-10 w-32 bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded active:bg-green-500"
                type="button"
                onClick={() => router.push("/Top")}
              >
                戻る
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Edit;
