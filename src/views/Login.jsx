import { useController, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

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
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Input name="email" control={control} label="E-mail" />
      <Input name="password" control={control} label="Senha" />
      <Button
        mode="contained"
        style={styles.btn}
        onPress={handleSubmit(onSubmit)}
      >
        Entrar
      </Button>
      <Button mode="outlined" style={styles.btn}>
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
