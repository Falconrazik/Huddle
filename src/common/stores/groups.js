import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export const useGroupsFeed = create((set) => ({
  groupsFeed: {},
  setGroupsFeed: (groups) => set((state) => ({ groupsFeed: groups })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("groupsFeed", useGroupsFeed);
}
