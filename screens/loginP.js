import { React, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native'
import { Images, Themes } from "../assets/Themes"
import { supabase } from "../env.js"
import { doesUserExist, getUser } from "./utils.js"
import { Button as NButton, TextInput as NTextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default LoginP = ({ navigation }) => {
    const [user, onChangeUser] = useState('jjhung66@stanford.edu');
    const [pass, onChangePass] = useState('Stanford2025');

    const signUpUser = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({ email: user, password: pass })
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
        <SafeAreaView style={styles.container}>
            <NTextInput
            style={styles.input}
            mode="outlined"
            label="Username"
            placeholder="Username"
            onChangeText={onChangeUser}
            value={user}
            />
            <NTextInput
            style={styles.input}
            mode="outlined"
            label="Password"
            placeholder="Password"
            onChangeText={onChangePass}
            value={pass}
            />
            <NButton style={styles.btn} buttonColor={Themes.colors.base} icon="account-plus-outline" mode="contained" onPress={() => {
                signUpUser();
            }} >
                Sign Up
            </NButton>
            <NButton style={styles.btn} buttonColor={Themes.colors.base} icon="account-circle-outline" mode="contained" onPress={async () => {
                data = await loginUser();
                await getUser({token: data["session"]["access_token"]});
                navigation.navigate('HomeP')
            }} >
                Login
            </NButton>
        </SafeAreaView>
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
        width: '80%',
        margin: 12,
    },
    btn: {
        width: '80%',
        margin: 12,
    }
})