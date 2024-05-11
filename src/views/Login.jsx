import { useController, useForm } from "react-hook-form";
import { StyleSheet, View, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { login, register } from "../services/authentication.js"
import Logo from "../../assets/logo.jpeg";

const Input = ({ name, control, label, secureTextEntry }) => {
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
      secureTextEntry={secureTextEntry} 
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
      <Image style={styles.tinyLogo} source={Logo} />

      <Input name="email" control={control} label="E-mail" />
      {errors.email && <Text>Email obrigatório.</Text>}

      <Input name="password" control={control} label="Senha" secureTextEntry={true} />
      {errors.password && <Text>Senha obrigatória.</Text>}

      <Button
        mode="contained"
        style={styles.btn}
        onPress={handleSubmit(onLoginSubmit)}
      >
        Entrar
      </Button>

      <Button 
        mode="outlined" style={styles.btn} 
        onPress={handleSubmit(onRegisterSubmit)}
      >
        Cadastro
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  container: {
    padding: 32,
  },
  btn: {
    marginTop: 8,
  },
});
