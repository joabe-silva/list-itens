import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import useTarefasStore from "../stores/tarefasStore";
import { RefreshControl } from "react-native-gesture-handler";

export default function Compartilhados() {
  const { tarefas, tarefasPendentes, fetchTarefas, saveTarefa, refreshing } = useTarefasStore();

  const [visibleTarefas, setVisibleTarefas] = useState([]);

  useEffect(() => {
    fetchTarefas();
  }, []);

  useEffect(() => {
    setVisibleTarefas(tarefasPendentes());
  }, [tarefas]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ height: "100%" }}
    >
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTarefas} />
        }
      >
        {visibleTarefas.length > 0 &&
          visibleTarefas.map((tarefa, ix) => {
            return <Text key={tarefa.ix}>{tarefa.description}</Text>;
          })}
      </ScrollView>
      <IconButton
        icon={"plus"}
        style={styles.plusButton}
        mode="contained"
        onPress={() => {
          const tarefa = {
            description: "Nova tarefa",
            title: 'Nova tarefa',
            date: new Date(),
            groups: [],
            share: [],
            flagCompleted: false,
          }
          saveTarefa(tarefa);
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  container: {
    padding: 32,
    flex: 1,
    height: "100%",
  },
  btn: {
    marginTop: 16,
  },
  plusButton: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
});
