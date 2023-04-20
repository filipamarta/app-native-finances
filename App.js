import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ExpensesContextProvider, {
  useExpenses,
} from './context/ExpensesContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/expenses/AllExpenses';
import RecentExpenses from './screens/expenses/RecentExpenses';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from './screens/expenses/ManageExpense';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from './components/ui/IconButton';
import Colors from './contants/colors';
import { getExpensesApi } from './services/expensesApi';
import LoadingOverlay from './components/ui/LoadingOverlay';
import ErrorOverlay from './components/ui/ErrorOverlay';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import LogoutScreen from './screens/auth/LogoutScreen';
import AuthContextProvider, { useAuth } from './context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: Colors.primary300,
        },
        headerTintColor: Colors.primary600,
        contentStyle: { backgroundColor: Colors.tertiary500 },
      })}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const ExpensesOverview = () => {
  const { token } = useAuth();
  const manageExpenseHandler = (navigation) =>
    navigation.navigate('ManageExpense');

  const logoutHandler = (navigation) => navigation.navigate('LogoutScreen');

  const { setExpenses } = useExpenses();
  const [isFetchingDataFromApi, setIsFetchingDataFromApi] = useState(true);
  const [fetchingDataFromApiError, setFetchingDataFromApiError] = useState('');

  const getExpenses = async () => {
    try {
      setIsFetchingDataFromApi(true);
      const expenses = await getExpensesApi(token);
      setExpenses(expenses);
      setIsFetchingDataFromApi(false);
    } catch (error) {
      setIsFetchingDataFromApi(false);
      setFetchingDataFromApiError('Could not fetch expenses.');
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const errorHandler = () => {
    setFetchingDataFromApiError(null);
    getExpenses();
  };

  if (fetchingDataFromApiError && !isFetchingDataFromApi) {
    return (
      <ErrorOverlay
        message={fetchingDataFromApiError}
        onConfirm={errorHandler}
      />
    );
  }

  if (isFetchingDataFromApi) {
    return <LoadingOverlay />;
  }

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
        headerLeft: () => (
          <View style={styles.logoutContainer}>
            <IconButton
              iconName="settings-outline"
              iconColor={Colors.primary700}
              iconSize={30}
              onPress={() => logoutHandler(navigation)}
            />
          </View>
        ),
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
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ExpensesScreens = () => {
  return (
    <>
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
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="LogoutScreen"
          component={LogoutScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </>
  );
};

const Navigation = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <ExpensesScreens />}
    </NavigationContainer>
  );
};

const Root = () => {
  /* 
  HACK to have access to auth context 
  and use getData func from there to get the token.
  With this we don't pass throught LOGINScreen anymore
  */
  const { authenticate } = useAuth();

  const fetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken !== null) {
      authenticate(storedToken);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return <Navigation />;
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <ExpensesContextProvider>
          <Root />
        </ExpensesContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: { marginRight: 16 },
  logoutContainer: { marginLeft: 16 },
});
