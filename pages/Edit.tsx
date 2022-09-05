
import Layout from "./components/Layout";
import Head from "next/head";
import taskList from "./components/atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./components/firebase";

// type List = {
//   id: string;
//   title: string;
//   date: string;
//   detail: string;
//   category: string;
// };

// type FormData = {
//   title: string;
//   date: string;
//   detail: string;
//   category: string;
// };

const Edit = () => {
  const [task, setTask] = useRecoilState<any>(taskList);
  const router = useRouter();
  
  // useEffect(() => {
  //   const postData = collection(db, "post");
  //   getDocs(postData).then((snapshot) => {
  //     setTask(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //   });
  // }, []);

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
  // }) => {
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

  return (
    <>
      <Layout>
        <Head>
          <title>Edit Page</title>
        </Head>
        <div className="mt-14  h-auto w-full mx-auto container bg-orange-200 flex justify-center items-start text-base rounded-lg">
          <form
            className="flex flex-col w-full"
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
              placeholder="タスクを編集してください"
              // {...register("title", { required: "true" })}
              value={task.title}
            />
            <div className="flex justify-center items-center mx-auto h-8 container">
              <select
                className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
                // {...register("category")}
              >
                <option value="未着手">未着手</option>
                <option value="進行中">進行中</option>
                <option value="完了">完了</option>
              </select>
              <input
                className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
                type="createdAt"
                // {...register("date")}
              />
            </div>
            <input
              className="w-1/2 h-28 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
              type="textarea"
              placeholder="詳細を編集してください"
              // {...register("detail")}
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
