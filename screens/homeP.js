import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainP from "./mainP";
import Rules from "./rulesP";
import ProfileP from "./profileP";
import { useEffect, useState } from "react";
import { supabase } from "../env.js"
import { doesUserExist, getUser } from "./utils.js"

const Tab = createBottomTabNavigator();

export default function HomeP({ navigation }) {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const {data: { session },} = await supabase.auth.getSession()
            if (session) {
                setAuth(true);
            } else {
                navigation.navigate('loginP')
            }
        }
        checkUser();
        supabase.auth.onAuthStateChange((_event, session) => {

        });
    }, []);


    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
                iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Rules') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
        >
        <Tab.Screen name="Main" component={MainP} />
        <Tab.Screen name="Rules" component={Rules} />
        <Tab.Screen name="Profile" component={ProfileP} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
},
});
