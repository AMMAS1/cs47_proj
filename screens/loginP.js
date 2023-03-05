import { React, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native'
import { Images, Themes } from "../assets/Themes"

export default LoginP = () => {
    const [user, onChangeUser] = useState('Username');
    const [pass, onChangePass] = useState('Password');

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
            <Button title="Login" onPress={() => Alert.alert('Simple Button pressed')} />
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