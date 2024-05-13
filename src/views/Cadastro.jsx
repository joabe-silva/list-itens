import { useNavigation } from "@react-navigation/native";
import { useController, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import Logo from "../../assets/logo.png";
import { register } from "../services/authentication";

const isTheSamePassword = (pass1, pass2) => {
  return String(pass1).localeCompare(pass2) === 0 ? true : false;
};

const Input = ({ name, control, label, secureTextEntry }) => {
  const { field } = useController({
    name,
    control,
    rules: {
      required: { value: true, message: "Preenchimento obrigatório" },
      pattern:
        name == "email"
          ? { value: /\S+@\S+\.\S+/, message: "Digite um email válido." }
          : undefined,
      minLength: {
        value: name == "password" || name == "passwordSecond" ? 6 : undefined,
        message: "Tamanho mínimo: 6 caracteres",
      },
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
    />
  );
};

export default function Cadastro() {
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = async (data) => {
    if (!isTheSamePassword(data.password, data.passwordSecond)) {
      Alert.alert("As senhas não são iguais.");
      return;
    }

    const response = await register(data.email, data.password);

    if (response) {
      Alert.alert("Cadastro realizado com sucesso.");
      navigation.navigate("Login");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <Image style={styles.tinyLogo} source={Logo} />

        <Input name="email" control={control} label="E-mail" />
        {errors.email && (
          <HelperText type="error">{errors.email.message}</HelperText>
        )}

        <Input
          name="password"
          control={control}
          label="Senha"
          secureTextEntry={true}
        />
        {errors.password && (
          <HelperText type="error">{errors.password.message}</HelperText>
        )}

        <Input
          name="passwordSecond"
          control={control}
          label="Confirme sua senha"
          secureTextEntry={true}
        />
        {errors.passwordSecond && (
          <HelperText type="error">{errors.passwordSecond.message}</HelperText>
        )}

        <Button
          mode="contained"
          style={styles.btn}
          onPress={handleSubmit(onRegisterSubmit)}
        >
          Salvar
        </Button>
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
