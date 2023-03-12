import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://itiwkuusdezpbjnmgwdb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0aXdrdXVzZGV6cGJqbm1nd2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgyNDYwNjEsImV4cCI6MTk5MzgyMjA2MX0.iZpJCivQG4HMFYhj8FNhLIARzxFMXtXgzV5v-xPoufs';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    }
});