import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, Appearance } from 'react-native';
import { useColorScheme } from 'nativewind';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ইমপোর্ট করা হলো
import '../global.css';

// QueryClient টি এখানে বাইরে তৈরি করুন
const queryClient = new QueryClient();

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    setColorScheme(systemTheme || 'light');

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme || 'light');
    });

    return () => subscription.remove();
  }, []);

  return (
    // QueryClientProvider দিয়ে পুরো অ্যাপটিকে র‍্যাপ করে দিন
    <QueryClientProvider client={queryClient}>
      <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/index" /> 
          <Stack.Screen name="(main)" />
        </Stack>
      </View>
    </QueryClientProvider>
  );
}