import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Stack = createStackNavigator();

const App = () => {
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
							title: "bamboo"
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ActionSheetProvider>
	);
};

export default App;
