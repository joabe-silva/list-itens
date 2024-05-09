import { useController, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";

import { login, register } from "../services/authentication.js"
 
const Input = ({ name, control, label }) => {

  const { field } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });
  return (
    <TextInput
      label={label}
      mode="outlined"
      value={field.value}
      onChangeText={field.onChange}
    />
  );
};

export default function Login() {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = async (data) => {
    const response = await login(data.email, data.password);

    if (response) {
      console.log(JSON.stringify(response));
    }
  };

  const onRegisterSubmit = async (data) => {
    const response = await register(data.email, data.password);

    if (response) {
      console.log(JSON.stringify(response));
    }
  };

  return (
    <View style={styles.container}>
      <Input name="email" control={control} label="E-mail" />
      {errors.email && <Text>Email obrigatório.</Text>}
      <Input name="password" control={control} label="Senha" />
      {errors.password && <Text>Senha obrigatória.</Text>}
      <Button
        mode="contained"
        style={styles.btn}
        onPress={handleSubmit(onLoginSubmit)}
      >
        Entrar
      </Button>
      <Button mode="outlined" style={styles.btn} onPress={handleSubmit(onRegisterSubmit)}>
        Cadastro
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100,
  },
  container: {
    padding: 32,
  },
  btn: {
    marginTop: 8,
  },
});
