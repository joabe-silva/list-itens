import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BottomNavigation, Text } from 'react-native-paper';

export default function Inicio() {

  const PendentesRoute = () => <Text>Pendentes</Text>;
  const ConcluidasRoute = () => <Text>Concluidas</Text>;
  const EstatisticaRoute = () => <Text>Estatisticas</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pendentes', title: 'Pendentes', focusedIcon: 'clock-time-three-outline', unfocusedIcon: 'clock-time-three-outline'},
    { key: 'concluidas', title: 'Concluidas', focusedIcon: 'check-underline-circle-outline' },
    { key: 'estatisticas', title: 'Estatisticas', focusedIcon: 'chart-arc' },

  ]);

  const renderScene = BottomNavigation.SceneMap({
    pendentes: PendentesRoute,
    concluidas: ConcluidasRoute,
    estatisticas: EstatisticaRoute,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>

        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />

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
