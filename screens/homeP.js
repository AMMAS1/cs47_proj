import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainP from "./mainP";
import NewsP from "./newsP";
import ProfileP from "./profileP";
import { useEffect, useState } from "react";
import { supabase } from "../env.js"
import { doesUserExist, getUser } from "./utils.js"

const Tab = createBottomTabNavigator();

export default function HomeP({ navigation }) {

    useEffect(() => {
        const checkUser = async () => {
            try {
                const session = await supabase.auth.getSession()
                if (session) {
                    
                } else {
                    navigation.navigate('loginP')
                }
            } catch (err) {
                console.log(err)
            }
        }
        checkUser();
    }, []);


    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
                iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'News') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
            }
            else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        })}
        >
        <Tab.Screen name="Main" component={MainP} />
        <Tab.Screen name="News" component={NewsP} />
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
