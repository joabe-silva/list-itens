import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "@expo/vector-icons/Ionicons";

import Cadastro from "../views/Cadastro";
import Concluidas from "../views/Concluidas";
import Estatisticas from "../views/Estatisticas";
import Login from "../views/Login";
import Pendentes from "../views/Pendentes";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let tabs = {
              Pendentes: focused ? "time" : "time-outline",
              Concluidas: focused ? "checkmark-circle" : "checkmark-circle-outline",
              Estatisticas: focused ? "stats-chart" : "stats-chart-outline",
            }
            // You can return any component that you like here!
            return <Ionicons name={tabs[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen name="Pendentes" component={Pendentes} />
      <Tab.Screen name="Concluidas" component={Concluidas} />
      <Tab.Screen name="Estatisticas" component={Estatisticas} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
