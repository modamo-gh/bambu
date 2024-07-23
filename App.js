import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/MainScreen";
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
						options={{ title: "bamboo", headerStyle: {backgroundColor: "#FEFAE0"}, headerTintColor: "#283618", headerTitleStyle: {fontWeight: "bold"}}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ActionSheetProvider>
	);
};

export default App;
