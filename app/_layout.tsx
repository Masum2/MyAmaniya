import { Stack } from 'expo-router';
import React from 'react';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* (auth)/index কে সরাসরি মেইন এন্ট্রি হিসেবে পয়েন্ট করা */}
      <Stack.Screen name="(auth)/index" /> 
      <Stack.Screen name="(main)" />
    </Stack>
  );
}