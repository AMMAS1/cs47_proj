import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NewsfeedP from "./newsfeedP";
import ArticleP from "./articleP";

const Stack = createStackNavigator();

const NewsP = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="NewsfeedP" component={NewsfeedP} options={{ headerShown: false }} />
        <Stack.Screen name="ArticleP" component={ArticleP} options={{ headerBackTitle: "Back" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NewsP;