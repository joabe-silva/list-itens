import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import useTarefasStore from "../stores/tarefasStore";
import { RefreshControl } from "react-native-gesture-handler";

export default function Pendentes() {
  const { tarefas, fetchTarefas, saveTarefa, refreshing } = useTarefasStore();

  useEffect(() => {
    fetchTarefas();
  }, []);

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
        {tarefas.length > 0 &&
          tarefas.map((tarefa) => {
            return <Text key={tarefa.id}>{tarefa.description}</Text>;
          })}
      </ScrollView>
      <IconButton
        icon={"plus"}
        style={styles.plusButton}
        mode="contained"
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
