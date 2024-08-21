import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreenAPI from "expo-splash-screen";
import { useState } from "react";
import BookScreen from "./src/screens/BookScreen";
import MainScreen from "./src/screens/MainScreen";
import SplashScreen from "./src/screens/SplashScreen";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Feather";
import { Alert, Text, TouchableOpacity, View } from "react-native";

SplashScreenAPI.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const App = () => {
	const [isSplashFinished, setIsSplashFinished] = useState(false);

	if (!isSplashFinished) {
		{
			SplashScreenAPI.hideAsync();
		}
		return <SplashScreen setIsSplashFinished={setIsSplashFinished} />;
	}

	const drawerItem = {
		drawerLabel: (config) => (
			<View
				style={{
					flexDirection: "row",
					flex: 1,
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				<Text>Main</Text>
				<TouchableOpacity onPress={() => Alert.prompt("Change List Name?")}>
					<Icon
						name="edit"
						style={{
							color: "#283618",
							fontSize: 24
						}}
					/>
				</TouchableOpacity>
			</View>
		)
	};

	return (
		<ActionSheetProvider>
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Main">
					<Drawer.Screen
						name="Main"
						component={MainScreen}
						options={drawerItem}
					/>
					<Drawer.Screen
						name="Book"
						component={BookScreen}
						options={{
							headerStyle: { backgroundColor: "#FEFAE0" },
							headerTintColor: "#283618",
							headerTitleStyle: { fontWeight: "bold" },
							title: "bambü"
						}}
					/>
				</Drawer.Navigator>
				{/* <Stack.Navigator initialRouteName="Main">
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
        </Stack.Navigator> */}
			</NavigationContainer>
		</ActionSheetProvider>
	);
};

export default App;
