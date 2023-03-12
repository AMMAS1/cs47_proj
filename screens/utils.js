import { supabase } from "../env.js"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async ({token}) => {
    const user = await supabase.auth.getUser(token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
}

export const doesUserExist = async () => {
    const user = await AsyncStorage.getItem('user');
    return user
}