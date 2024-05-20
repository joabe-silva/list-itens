import { create } from "zustand";
import { listarTarefasPorUsuario, novaTarefa } from "../database/repositories/tarefas";
import useUserStore from "./userStore";
import { Alert } from "react-native";


const useTarefasStore = create((set, get) => ({
  tarefas: [],
  refreshing: false,
  // setTarefas: (tarefas) => set({tarefas: tarefas}),
  fetchTarefas: async () => {
    set({refreshing: true});
    const user = useUserStore.getState().authenticatedUser;
    let data = await listarTarefasPorUsuario(user);
    set({ tarefas: data, refreshing: false });
  },
  saveTarefa: async (tarefa) => {
    const user = useUserStore.getState().authenticatedUser;
    try {
      await novaTarefa({...tarefa, owner: user.uid});
      set((state) => ({tarefas: state.tarefas.push(tarefa)}))
    } catch (error) {
      Alert.alert("Error", "Erro ao cadastrar tarefa");
    }
  },
  tarefasPendentes: () => {
    const tarefas = get().tarefas;
    return tarefas.filter((tarefa) =>!tarefa.flagCompleted);
  },
}));

export default useTarefasStore;
