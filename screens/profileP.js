import React, {useEffect, useState} from 'react';
import { Text, Image, StyleSheet, View, ScrollView } from 'react-native';
import { images, Themes } from "../assets/Themes"
import { Button } from 'react-native-paper';
import { supabase } from "../env.js"
import { SafeAreaView } from 'react-native-safe-area-context'

const hundred = '100%';

export default function ProfileP() {
    const [user, setUser] = useState("johndoe@gmail.com");

    useEffect(() => {
        const checkUser = async () => {
            try {
                const data = await supabase.auth.getUser();
                setUser(data["data"]["user"]["email"])
            } catch (err) {
                console.log(err);
            }
        }
        checkUser();
    }, []);

    return (
        <View style={styles.container}>
        <SafeAreaView>
            <ScrollView style={{width: hundred, height: hundred}} contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <Image style={styles.pfp} source = {images.default} >
                    </Image>
                    <Text style={[styles.textSmall, {marginBottom: 15}]}>Default User</Text>
                    <Text style={[styles.textSmall, {marginBottom: 15}]}>{user}</Text>
                </View>
                <View style={[styles.section, {flex: 1, justifyContent: 'flex-start'}]}>
                    <Text style={styles.textLarge}>$100000</Text>
                    <Text style={styles.textMedium}>Total Balance</Text>
                    <View style={styles.spacer}></View>
                    <Button buttonColor={Themes.colors.base} icon="currency-usd" mode="contained" onPress={() => console.log('Pressed')}>
                        Connect your wallet
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    </View>
    );
}

const styles = StyleSheet.create({
    section: {
        width: hundred,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Themes.colors.background,
        borderBottomColor: Themes.colors.darkgray,
        borderBottomWidth: 1,
    },
    container: {
        paddingTop: 50,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Themes.colors.background,
    },
    pfp: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    textSmall: {
        fontSize: 14,
        color: Themes.colors.text,
    },
    textMedium: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Themes.colors.text,
    },
    textLarge: {
        fontSize: 64,
        fontWeight: 'bold',
        color: Themes.colors.text,
    },
    spacer: {
        height: 20,
    },
})
