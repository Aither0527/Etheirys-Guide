import { atom } from "recoil";
import { MountItemProps } from "../data/mountData";

export const mountDataState = atom<MountItemProps[]>({
  key: "mountDataState",
  default: [],
});
