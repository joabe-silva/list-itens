import { Text, View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Logo from '../assets/logo.png'; // Ensure path is correct

export default function Login() {
  return (
    <View>
      <Image
        style={styles.tinyLogo}
        source={Logo}
      />
      <Text>List Itens</Text>
      <Button mode="contained" onPress={() => console.log('Pressed')}>Press me</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100
  }
});
