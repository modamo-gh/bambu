import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/MainScreen";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Main">
				<Stack.Screen
					name="Main"
					component={MainScreen}
					options={{ title: "bamboo" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
