import { useController, useForm } from "react-hook-form";
import { StyleSheet, View, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { register } from "../services/authentication.js"
import Logo from "../../assets/logo.png";

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

export default function Cadastro() {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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

      <Input name="passwordSecond" control={control} label="Confirme sua senha" secureTextEntry={true} />
      {errors.passwordSecond && <Text>Senha obrigatória.</Text>}

      <Button
        mode="contained"
        style={styles.btn}
        onPress={handleSubmit(onRegisterSubmit)}
      >
        Salvar
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
    marginTop: 16,
  },
});
