import { useNavigation } from "@react-navigation/native";
import { Controller, useController, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Chip,
  Switch,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import Logo from "../../assets/logo.png";
// import { register } from "../services/authentication";
import { useEffect, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { getValue } from "firebase/remote-config";

// const isTheSamePassword = (pass1, pass2) => {
//   return String(pass1).localeCompare(pass2) === 0 ? true : false;
// };

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

export default function EditaTarefa() {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [share, setShare] = useState([]);
  const removeShare = (index) => {
    const copy = Array.from(share);
    copy.splice(index, 1);
    setShare(copy);
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
    console.log(data);
    // if (!isTheSamePassword(data.password, data.passwordSecond)) {
    //   Alert.alert("As senhas não são iguais.");
    //   return;
    // }
    // setLoading(true);
    // const response = await register(data.email, data.password);
    // setLoading(false);
    // if (response) {
    //   Alert.alert("Cadastro realizado com sucesso.");
    //   navigate("Login");
    // }
  };

  let currentSwitchFlagCompleted = watch("flagCompleted");
  let currentSelectedDate = watch("date")
    ? new Date(watch("date")).toLocaleDateString("pt-br")
    : "";

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
              setValue("date", date);
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

          <Input name="shareWith" control={control} label="Compartilhar com:" />

          <Button onPress={() => {
            const value = getValues('shareWith');
            if (value) {
              setShare([...share, getValues("shareWith")])
            } else {
              Alert.alert("Atenção", "Digite um email para compartilhar a tarefa.");
            }
            }}>
            Add share
          </Button>
          <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {share &&
              share.map((el, ix) => {
                return (
                  <Chip
                    key={ix}
                    compact
                    onClose={() => removeShare(ix)}
                    style={{ margin: 4, width: "auto"}}
                    ellipsizeMode="tail"
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
