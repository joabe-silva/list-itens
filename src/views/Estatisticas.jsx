import * as React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import useTarefasStore from "../stores/tarefasStore";
import { PieChart } from "react-native-chart-kit";
import { Card, Divider } from "react-native-paper";
export default function Estatisticas() {
  const { tarefas } = useTarefasStore();

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const dataPieChart = [
    {
      name: "Pendentes",
      population: Array.from(tarefas).filter((tarefa) => !tarefa.flagCompleted)
        .length,
      color: "red",
      legendFontSize: 10,
    },
    {
      name: "Concluídas",
      population: Array.from(tarefas).filter((tarefa) => tarefa.flagCompleted)
        .length,
      color: "blue",
      legendFontSize: 10,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <Card mode="outlined">
          <Card.Title
            title={Array.from(tarefas).length || "0"}
            titleVariant="displayLarge"
            subtitle={`Tarefas cadastradas`}
          />
        </Card>
        <Divider />
        <PieChart
          data={dataPieChart}
          width={screenWidth}
          height={176}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"5"}
          center={[5, 10]}
          absolute
        />
        <Divider />
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
