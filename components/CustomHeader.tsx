import React from 'react';
import { View, Text, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

interface CustomHeaderProps {
  title: string;
}

export default function CustomHeader({ title }: CustomHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{ paddingTop: insets.top }} className="absolute top-0 w-full z-50">
      <BlurView 
        intensity={90} 
        tint={isDark ? "dark" : "light"} 
        style={{ paddingHorizontal: 20, paddingVertical: 16 }}
        className="flex-row items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50"
      >
        {/* Menu Icon - Drawer Trigger */}
        <Pressable 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="p-2.5 bg-blue-50 dark:bg-slate-800 rounded-xl active:bg-blue-100"
        >
          <Ionicons name="menu" size={24} color={isDark ? '#e2e8f0' : '#1e3a8a'} />
        </Pressable>

        {/* Title */}
        <Text className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          {title}
        </Text>

        {/* Notification Icon */}
        <Pressable className="p-2.5 bg-blue-50 dark:bg-slate-800 rounded-xl active:bg-blue-100">
          <Ionicons name="notifications-outline" size={22} color={isDark ? '#e2e8f0' : '#1e3a8a'} />
        </Pressable>
      </BlurView>
    </View>
  );
}