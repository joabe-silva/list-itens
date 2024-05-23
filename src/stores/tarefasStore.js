import { create } from "zustand";
import {
  listarTarefasPorUsuario,
  listarTarefasCompartilhadas,
  novaTarefa,
  editaTarefa,
  excluiTarefa,
} from "../database/repositories/tarefas";
import useUserStore from "./userStore";
import { Alert } from "react-native";

const useTarefasStore = create((set, get) => ({
  tarefas: [],
  tarefasCompartilhadasComigo: [],
  refreshing: false,
  fetchTarefas: async () => {
    set({ refreshing: true });
    const user = useUserStore.getState().authenticatedUser;
    let data = await listarTarefasPorUsuario(user);
    data.forEach((tarefa) => {
      tarefa.date = new Date(
        tarefa.date.seconds * 1000 + tarefa.date.nanoseconds / 1000000
      ).toISOString();
    });
    set({ tarefas: data, refreshing: false });
  },
  fetchTarefasCompartilhadasComigo: async () => {
    set({ refreshing: true });
    const user = useUserStore.getState().authenticatedUser;
    let data = await listarTarefasCompartilhadas(user);
    data.forEach((tarefa) => {
      tarefa.date = new Date(
        tarefa.date.seconds * 1000 + tarefa.date.nanoseconds / 1000000
      ).toISOString();
    });
    let filteredData = Array.from(data).sort(
      (tarefa1, tarefa2) =>
        new Date(tarefa2.date).getTime() - new Date(tarefa1.date).getTime()
    );
    set({ tarefasCompartilhadasComigo: filteredData, refreshing: false });
  },
  saveTarefa: async (tarefa) => {
    const user = useUserStore.getState().authenticatedUser;
    const newTarefa = { ...tarefa, owner: user.email };
    try {
      await novaTarefa(newTarefa);
      set((state) => ({ tarefas: [...state.tarefas, newTarefa] }));
      return true;
    } catch (error) {
      Alert.alert("Error", "Erro ao cadastrar tarefa");
      return false;
    }
  },
  updateTarefa: async (tarefa) => {
    try {
      await editaTarefa(tarefa);
      const tarefas = get().tarefas;
      const filteredTarefas = tarefas.filter((t) => t.id != tarefa.id);
      set((state) => ({ tarefas: [...filteredTarefas, tarefa] }));
      return true;
    } catch (error) {
      Alert.alert("Error", "Erro ao editar tarefa");
      return false;
    }
  },
  removeTarefa: async (tarefa) => {
    try {
      await excluiTarefa(tarefa);
      const tarefas = get().tarefas;
      const filteredTarefas = tarefas.filter((t) => t.id != tarefa.id);
      set((state) => ({ tarefas: [...filteredTarefas] }));
      return true;
    } catch (error) {
      Alert.alert("Error", "Erro ao excluir tarefa");
      return false;
    }
  },
  tarefasPendentes: () => {
    const tarefas = Array.from(get().tarefas);
    return tarefas
      .filter((tarefa) => !tarefa.flagCompleted)
      .sort(
        (tarefa1, tarefa2) =>
          new Date(tarefa2.date).getTime() - new Date(tarefa1.date).getTime()
      );
  },
  tarefasConcluidas: () => {
    const tarefas = Array.from(get().tarefas);
    return tarefas
      .filter((tarefa) => tarefa.flagCompleted)
      .sort(
        (tarefa1, tarefa2) =>
          new Date(tarefa2.date).getTime() - new Date(tarefa1.date).getTime()
      );
  },
}));

export default useTarefasStore;
