import { React, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native'
import { Images, Themes } from "../assets/Themes"
import { supabase } from "../env.js"
import { doesUserExist, getUser } from "./utils.js"

export default LoginP = ({ navigation }) => {
    const [user, onChangeUser] = useState('jjhung66@stanford.edu');
    const [pass, onChangePass] = useState('Stanford2025');

    const signUpUser = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({ email: user, password: pass }).then()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const loginUser = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email: user, password: pass })
            return data
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
                        <TextInput
                style={styles.input}
                onChangeText={onChangeUser}
                placeholder="Username"
                value={user}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePass}
                value={pass}
                placeholder="Password"
            />
            <Button title="Register User" onPress={() => {
                signUpUser();
            }} />
            <Button title="Login" onPress={async () => {
                data = await loginUser();
                await getUser({token: data["session"]["access_token"]});
                navigation.navigate('Home')
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})