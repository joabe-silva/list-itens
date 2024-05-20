import { create } from "zustand";
import { listarTarefasPorUsuario } from "../database/repositories/tarefas";
import useUserStore from "./userStore";


const useTarefasStore = create((set) => ({
  tarefas: [],
  // setTarefas: (tarefas) => set({tarefas: tarefas}),
  fetchTarefas: async () => {
    const user = useUserStore.getState().authenticatedUser;
    let data = await listarTarefasPorUsuario(user);
    set({ tarefas: data });
  },
}));

export default useTarefasStore;
