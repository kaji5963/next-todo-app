import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage
});

export const taskList = atom({
    key: "task",
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const editList = atom({
    key: "edit",
    default: {},
    effects_UNSTABLE: [persistAtom]
});
