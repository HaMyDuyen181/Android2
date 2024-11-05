import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./(tabs)/Login";
import Home from "./(tabs)/Home";
import Register from "./(tabs)/Register";
import ProductDetail from "./(tabs)/ProductDetail";
import EditProfileScreen from "./(tabs)/EditProfileScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        {/* <Stack.Screen name="Account" component={EditProfileScreen} /> */}
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
