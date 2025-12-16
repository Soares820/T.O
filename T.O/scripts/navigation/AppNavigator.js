// scripts/navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";

import Login from "../screens/Login";
import ParentHome from "../screens/ParentHome";
import ClinicHome from "../screens/ClinicHome";

import ToggleTheme from "../../components/ToggleTheme";
import { useTheme } from "../providers/ThemeContext";
import { useAuth } from "../providers/AuthContext";

const Stack = createNativeStackNavigator();

function HeaderLogout({ navigation }) {
  const { logout } = useAuth();
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => {
        logout();
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      }}
      style={{ paddingHorizontal: 10, paddingVertical: 8 }}
    >
      <Text style={{ color: colors.text, fontWeight: "800" }}>Sair</Text>
    </Pressable>
  );
}

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "800" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ParentHome"
        component={ParentHome}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => null,
          headerRight: () => (
            <>
              <ToggleTheme />
              <HeaderLogout navigation={navigation} />
            </>
          ),
        })}
      />

      <Stack.Screen
        name="ClinicHome"
        component={ClinicHome}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => null,
          headerRight: () => (
            <>
              <ToggleTheme />
              <HeaderLogout navigation={navigation} />
            </>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
