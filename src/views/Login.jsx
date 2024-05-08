import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Login() {
  const [textPass, setTextPass] = useState("");
  const [textEmail, setTextEmail] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="E-mail"
        value={textEmail}
        onChangeText={setTextEmail}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        textContentType="password"
        value={textPass}
        onChangeText={setTextPass}
      />
      <Button
        mode="contained"
        style={styles.btn}
        onPress={() => console.log(textEmail, textPass)}
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
