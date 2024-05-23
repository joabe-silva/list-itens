import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";
const CardTarefa = (props) => {
  const { navigate } = useNavigation();
  const { tarefa } = props;
  return (
    <>
      <List.Item
        title={tarefa.title}
        description={Intl.DateTimeFormat("pt-br").format(new Date(tarefa.date))}
        left={(props) => (
          <List.Icon
            {...props}
            icon={!tarefa.flagCompleted ? "clock-fast" : "check"}
          />
        )}
        onPress={() => {
          navigate("EditaTarefa", tarefa);
        }}
      />
    </>
  );
};

export default CardTarefa;
