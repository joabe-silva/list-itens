import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from "@expo/vector-icons/Ionicons"

import Cadastro from "../views/Cadastro";
import Login from "../views/Login";
import Inicio from "../views/Inicio";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let tabs = {
              Inicio: focused ? "home" : "home-outline",
            }
            // You can return any component that you like here!
            return <Ionicons name={tabs[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen name="Inicio" component={Inicio} />
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
