import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import useTarefasStore from "../stores/tarefasStore";
import { RefreshControl } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CardTarefa from "../components/card-tarefa";

export default function Compartilhados() {
  const { navigate } = useNavigation();

  const {
    tarefasCompartilhadasComigo,
    fetchTarefasCompartilhadasComigo,
    refreshing,
  } = useTarefasStore();

  useEffect(() => {
    fetchTarefasCompartilhadasComigo();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ height: "100%" }}
    >
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchTarefasCompartilhadasComigo}
          />
        }
      >
        {tarefasCompartilhadasComigo.length > 0 &&
          tarefasCompartilhadasComigo.map((tarefa, ix) => {
            return (
              <View key={ix}>
                <CardTarefa tarefa={tarefa} />
              </View>
            );
          })}
      </ScrollView>
      <IconButton
        icon={"plus"}
        style={styles.plusButton}
        mode="contained"
        onPress={() => navigate("EditaTarefa")}
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
