import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";
import useTarefasStore from "../stores/tarefasStore";

export default function Pendentes() {
  const { tarefas, fetchTarefas } = useTarefasStore();

  // const addTarefa = () => {
  //   novaTarefa({
  //     tittle: "Nova tarefa",
  //     description: "Nova tarefa",
  //     flagCompleted: false,
  //     date: new Date(),
  //     groups: [],
  //     share: [],
  //     owner: authenticatedUser.uid,
  //   });
  // };

  useEffect(() => {
    fetchTarefas();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        {tarefas.length > 0 &&
          tarefas.map((tarefa) => {
            return (
              <>
                <Text key={tarefa.id}>{tarefa.description}</Text>
              </>
            );
          })}
      </ScrollView>
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
  },
  btn: {
    marginTop: 16,
  },
});
