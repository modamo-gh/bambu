import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreenAPI from "expo-splash-screen";
import { useState } from "react";
import BookScreen from "./src/screens/BookScreen";
import MainScreen from "./src/screens/MainScreen";
import SplashScreen from "./src/screens/SplashScreen";

SplashScreenAPI.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  if (!isSplashFinished) {
    {
      SplashScreenAPI.hideAsync();
    }
    return <SplashScreen setIsSplashFinished={setIsSplashFinished} />;
  }

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerStyle: { backgroundColor: "#FEFAE0" },
              headerTintColor: "#283618",
              headerTitleStyle: { fontWeight: "bold" },
              title: "bambü",
            }}
          />
          <Stack.Screen
            name="Book"
            component={BookScreen}
            options={{
              headerStyle: { backgroundColor: "#FEFAE0" },
              headerTintColor: "#283618",
              headerTitleStyle: { fontWeight: "bold" },
              title: "bambü",
            }}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerStyle: { backgroundColor: "#FEFAE0" },
              headerTintColor: "#283618",
              headerTitleStyle: { fontWeight: "bold" },
              title: "bambü",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
};

export default App;
