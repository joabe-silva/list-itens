import { useNavigation } from "@react-navigation/native";
import { useController, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Chip,
  HelperText,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import { useEffect, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import useTarefasStore from "../stores/tarefasStore";

const Input = ({
  name,
  control,
  label,
  secureTextEntry,
  disabled,
  multiline,
  numberOfLines,
}) => {
  const { field } = useController({
    name,
    control,
    rules: {
      required: { value: true, message: "Preenchimento obrigatório" },
      pattern:
        name == "email"
          ? { value: /\S+@\S+\.\S+/, message: "Digite um email válido." }
          : undefined,
      // minLength: {
      //   value: name == "password" || name == "passwordSecond" ? 6 : undefined,
      //   message: "Tamanho mínimo: 6 caracteres",
      // },
    },
    defaultValue: "",
  });

  return (
    <TextInput
      label={label}
      mode="outlined"
      value={field.value}
      onChangeText={field.onChange}
      secureTextEntry={secureTextEntry}
      disabled={disabled}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

export default function EditaTarefa({ navigation }) {
  const { saveTarefa } = useTarefasStore();

  // const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [share, setShare] = useState([]);
  const [shareWith, setShareWith] = useState("");

  const [groups, setGroups] = useState([]);
  const [groupInput, setGroupInput] = useState("");

  const removeShare = (index) => {
    const copy = Array.from(share);
    copy.splice(index, 1);
    setShare(copy);
  };

  const removeGroup = (index) => {
    const copy = Array.from(groups);
    copy.splice(index, 1);
    setGroups(copy);
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = async (data) => {
    const newTarefa = { ...data, share: share, groups: groups };
    console.log(newTarefa);
    setLoading(true);
    const response = await saveTarefa(newTarefa);
    setLoading(false);
    if (response) {
      Alert.alert("Tarefa salva com sucesso.");
      navigation.goBack();
    }
  };

  let currentSwitchFlagCompleted = watch("flagCompleted");
  let currentSelectedDate = watch("date")
    ? new Date(watch("date")).toLocaleDateString("pt-br")
    : "";

  useEffect(() => setValue("flagCompleted", false), []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <View style={{ border: "solid 1px red" }}>
          <Input name="title" control={control} label="Título" />
          {errors.title && (
            <HelperText type="error">{errors.title.message}</HelperText>
          )}

          <Input
            name="description"
            control={control}
            label="Descrição"
            multiline
            numberOfLines={2}
          />
          {errors.description && (
            <HelperText type="error">{errors.description.message}</HelperText>
          )}

          {currentSelectedDate && (
            <TextInput
              label="Data"
              mode="outlined"
              disabled
              value={currentSelectedDate}
            />
          )}
          <Button onPress={() => setOpen(true)}>Definir a Data</Button>
          <DateTimePicker
            {...register("date", {
              required: {
                value: true,
                message: "Obrigatorio definir uma data",
              },
            })}
            isVisible={open}
            mode="date"
            onConfirm={(date) => {
              setValue("date", new Date(date));
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
          {errors.date && (
            <HelperText type="error">{errors.date.message}</HelperText>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Switch
              {...register("flagCompleted")}
              onValueChange={() => {
                let current = getValues("flagCompleted");
                setValue("flagCompleted", !current);
              }}
              value={currentSwitchFlagCompleted}
            />
            <Text>Concluído ?</Text>
          </View>

          <TextInput
            label="Compartilhar com:"
            onChangeText={setShareWith}
            mode="outlined"
            value={shareWith}
          />

          <Button
            onPress={(e) => {
              e.preventDefault();
              if (shareWith) {
                setShare([...share, shareWith]);
                setShareWith("");
              } else {
                Alert.alert(
                  "Atenção",
                  "Digite um email para compartilhar a tarefa."
                );
              }
            }}
          >
            Add share
          </Button>
          <View
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {share &&
              share.map((el, ix) => {
                return (
                  <Chip
                    key={ix}
                    onClose={() => removeShare(ix)}
                    style={{ margin: 4, width: "auto" }}
                    ellipsizeMode="tail"
                    compact
                  >
                    {el}
                  </Chip>
                );
              })}
          </View>

          <TextInput
            label="Adicionar grupo:"
            value={groupInput}
            onChangeText={setGroupInput}
            mode="outlined"
          />

          <Button
            onPress={(e) => {
              e.preventDefault();
              if (groupInput) {
                setGroups([...groups, groupInput]);
                setGroupInput("");
              } else {
                Alert.alert("Atenção", "Digite uma categoria para a tarefa.");
              }
            }}
          >
            Add grupo
          </Button>
          <View
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {groups &&
              groups.map((el, ix) => {
                return (
                  <Chip
                    key={ix}
                    onClose={() => removeGroup(ix)}
                    style={{ margin: 4, width: "auto" }}
                    ellipsizeMode="tail"
                    compact
                  >
                    {el}
                  </Chip>
                );
              })}
          </View>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={handleSubmit(onRegisterSubmit)}
            loading={loading}
          >
            Salvar
          </Button>
        </View>
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
    padding: 18,
  },
  btn: {
    marginBottom: 30,
    marginTop: 30,
  },
});
