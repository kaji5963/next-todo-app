import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

type taskType = {
  id: string;
  key: string;
  title: string;
  createdAt: string;
  detail: string;
  category: "未着手" | "進行中" | "完了";
};

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

export const taskList: RecoilState<taskType[]> = atom({
  key: "task",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const editList: RecoilState<taskType> = atom({
  key: "edit",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
