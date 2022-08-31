import { atom } from "recoil";

const todoList = atom({
    key: "todo",
    default: []
});

export default todoList