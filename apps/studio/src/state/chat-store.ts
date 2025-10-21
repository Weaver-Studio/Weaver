import { create } from "zustand";

type chatStore = {
    model:string,
	messages:string[]
}

export const useChatStore = create<chatStore>((set) => ({
    model:"",
	messages:[],
    setModel:(model:string) => set({model}),
    addMessage:(message:string) => set((state) => ({messages: [...state.messages, message]})),
}))


