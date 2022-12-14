import Layout from "./components/Layout";
import Head from "next/head";
import {taskList} from "./components/atom";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
// import { useForm, SubmitHandler } from "react-hook-form";
import { db } from "./components/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { format } from "date-fns";

//コメントアウト部分はuseFormのコード、formやバリデーションは上手く機能したがfirebaseと連携できず、再度チャレンジするため残しておく

//formのデータの型
// type List = {
//   key: string;
//   title: string;
//   createdAt: string;
//   detail: string;
//   category: "未着手" | "進行中" | "完了";
// };

// type FormData = {
//   title: string;
//   date: string;
//   detail: string;
//   category: string;
// };

const Create = () => {
  const [formValue, setFormValue] = useState({
    key: Math.floor(Math.random() * 1000).toString(16),
    title: "",
    createdAt: format(new Date(), "yyyy/MM/dd"),
    detail: "",
    category: "未着手",
  });
  const setTask = useSetRecoilState(taskList);
  const router = useRouter();

  //useForm処理
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>();
  // //それぞれの値をTopへ送信処理
  // const onSubmit: SubmitHandler<FormData> = ({
  //   title,
  //   date,
  //   detail,
  //   category,
  // }) =>
  // {
  //   setTask((addTodo: Array<List>) => [
  //     ...addTodo,
  //     {
  //       id: Math.floor(Math.random() * 1000).toString(16),
  //       title,
  //       date,
  //       detail,
  //       category,
  //     },
  //   ]);
  //   router.push("/Top");
  // };

  //firebaseへデータ格納、Topへ送信処理
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { key, title, createdAt, detail, category } = formValue;
    if (formValue.title === "") return;
    addDoc(collection(db, "post"), {
      key,
      title,
      createdAt,
      detail,
      category,
      timeStamp: serverTimestamp(),
    });

    setTask((task: any) => [
      ...task,
      {
        key,
        title,
        createdAt,
        detail,
        category,
      },
    ]);
    router.push("/Top");
  };

  // const docRef = addDoc(collection(db, "post"),{
  //   id: Math.floor(Math.random() * 1000).toString(16),
  //   title: "",
  //   date: "",
  //   detail: "",
  //   category:"",
  // })

  return (
    <Layout>
      <Head>
        <title>Create Page</title>
      </Head>
      <h1 className="text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-300 text-xl">
        タスク登録
      </h1>
      <div className="mt-4  h-auto w-full mx-auto container bg-blue-200 flex justify-center items-start text-base rounded-lg">
        <form
          className="flex flex-col w-full"
          onSubmit={(e) => handleSubmit(e)}
          // onSubmit={handleSubmit(onSubmit)}
        >
          {/* {errors.title && (
            <span className="text-center mt-5 text-red-500">
              タスクは必須です！入力してください！
            </span>
          )} */}
          <input
            className="w-1/2 h-14 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
            type="text"
            name="task"
            placeholder="タスクを入力してください"
            value={formValue.title}
            onChange={(e) =>
              setFormValue({ ...formValue, title: e.target.value })
            }
            // {...register("title", { required: "true" })}
          />
          <div className="flex justify-center items-center mx-auto h-8 container">
            <select
              className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
              value={formValue.category}
              onChange={(e) =>
                setFormValue({ ...formValue, category: e.target.value })
              }
              // {...register("category")}
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
            <input
              className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
              type="text"
              value={formValue.createdAt}
              onChange={(e) =>
                setFormValue({ ...formValue, createdAt: e.target.value })
              }
              // {...register("date")}
            />
          </div>
          <input
            className="w-1/2 h-28 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
            type="textarea"
            placeholder="詳細を入力してください"
            value={formValue.detail}
            onChange={(e) =>
              setFormValue({ ...formValue, detail: e.target.value })
            }
            // {...register("detail")}
          />
          <div className="flex justify-center">
            <button
              className="mr-10 mb-10 w-32 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded active:bg-indigo-600"
              type="submit"
            >
              追加
            </button>
            <button
              className="ml-10 mb-10 w-32 bg-indigo-300 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded active:bg-indigo-500"
              type="button"
              onClick={() => router.push("/Top")}
            >
              戻る
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;