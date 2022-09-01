import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Layout from "./components/Layout";
import taskList from "./components/atom";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";

type List = {
  id: string;
  title: string;
  date: string;
  detail: string;
  category: string;
};

type FormData = {
  title: string;
  date: string;
  detail: string;
  category: string;
};

const Create = () => {
  const [task, setTask] = useRecoilState<any>(taskList);
  const router = useRouter();
  //useForm処理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  //それぞれの値をTopへ送信処理
  const onSubmit: SubmitHandler<FormData> = ({
    title,
    date,
    detail,
    category,
  }) => {
    setTask((addTodo: Array<List>) => [
      ...addTodo,
      {
        id: Math.floor(Math.random() * 1000).toString(16),
        title,
        date,
        detail,
        category,
      },
    ]);
    router.push("/Top");
  };

  return (
    <Layout>
      <Head>
        <title>Create Page</title>
      </Head>
      <div className="mt-14  h-auto w-full mx-auto container bg-blue-200 flex justify-center items-start text-base rounded-lg">
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.title && (
            <span className="text-center mt-5 text-red-500">
              タスクは必須です！入力してください！
            </span>
          )}

          <input
            className="w-1/2 h-14 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
            type="text"
            placeholder="タスクを入力してください"
            {...register("title", { required: "true" })}
          />
          <div className="flex justify-center items-center mx-auto h-8 container">
            <select
              className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
              placeholder="--------"
              {...register("category")}
              // onChange={(e) => setInputValue({...task, category: e.target.value})}
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
            <input
              className="w-1/5 h-10 mt-14 mb-14 mx-16 container text-center rounded-lg border-solid outline-none"
              type="date"
              {...register("date")}
            />
          </div>
          <input
            className="w-1/2 h-28 m-14 mx-auto container text-center rounded-lg border-solid outline-none"
            type="textarea"
            placeholder="詳細を入力してください"
            {...register("detail")}
          />
          <button
            className="m-auto mb-10 w-32 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded active:bg-indigo-600"
            type="submit"
          >
            追加
          </button>
        </form>
      </div>
      <Link href="/Top">
        <a>back</a>
      </Link>
    </Layout>
  );
};

export default Create;