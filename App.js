import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ExpensesContextProvider from "./context/ExpensesContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpense from "./screens/ManageExpense";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./components/ui/IconButton";
import Colors from "./contants/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensesOverview = () => {
  const manageExpenseHandler = (navigation) =>
    navigation.navigate("ManageExpense");

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary300 },
        headerTintColor: Colors.primary600,
        tabBarStyle: {
          backgroundColor: Colors.primary300,
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: Colors.primary600,
        tabBarInactiveTintColor: Colors.primary400,
        headerRight: () => (
          <View style={styles.iconContainer}>
            <IconButton
              iconName="add-circle"
              iconColor={Colors.tertiary500}
              iconSize={32}
              onPress={() => manageExpenseHandler(navigation)}
            />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={() => ({
              headerStyle: {
                backgroundColor: Colors.primary300,
              },
              headerTintColor: Colors.primary600,
            })}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: { marginRight: 16 },
});
