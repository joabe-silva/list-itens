import { useNavigation } from "@react-navigation/native";
import { useController, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import Logo from "../../assets/logo.png";
import { login } from "../services/authentication.js";
import useUserStore from "../stores/userStore.js";

const Input = (props) => {
  const { name, control, label, secureTextEntry } = props;

  const { field } = useController({
    name,
    control,
    rules: {
      required: { value: true, message: "Preenchimento obrigatório" },
      pattern:
        name == "email"
          ? { value: /\S+@\S+\.\S+/, message: "Digite um email válido." }
          : undefined,
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

export default function Login() {
  const navigation = useNavigation();

  const { setAuthenticatedUser, authenticatedUser } = useUserStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = async (data) => {
    const response = await login(data.email, data.password);

    if (response) {
      setAuthenticatedUser(response);
      navigation.navigate("Inicio");
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
          style={styles.inpt}
        />
        {errors.password && (
          <HelperText type="error">{errors.password.message}</HelperText>
        )}

        <Button
          mode="contained"
          style={styles.btn}
          onPress={handleSubmit(onLoginSubmit)}
        >
          Entrar
        </Button>

        <Button
          mode="outlined"
          style={styles.btnSecond}
          onPress={() => navigation.navigate("Cadastro")}
        >
          Cadastro
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
    width: "100%",
    padding: 32,
  },
  inpt: {
    marginTop: 60,
  },
  btn: {
    marginTop: 16,
  },
  btnSecond: {
    marginTop: 8,
  },
});
