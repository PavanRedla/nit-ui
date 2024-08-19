import { deflate } from "zlib";
import { init } from "./init";

export const appReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "MODAL":
      return {
        ...state,
        isShowModal: action.payload,
      };
    default:
      return state;
  }
};
