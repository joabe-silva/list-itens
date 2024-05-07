import { Image, StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";
import Logo from "../../assets/logo.png";

export default function Login() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="E-mail"
        value={text}
        onChangeText={() => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button mode="contained" style={styles.btn}>
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
    marginTop: 8
  }
});
