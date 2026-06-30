import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function TabsLayout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs 
      screenOptions={{ 
        // headerShown: false,
        tabBarActiveTintColor: isDark ? '#60a5fa' : '#2563eb',
        tabBarInactiveTintColor: isDark ? '#475569' : '#94a3b8',
        // ট্যাব বার স্বাভাবিক রাখা হয়েছে (কোনো ব্লার বা ট্রান্সপারেন্ট নয়)
        tabBarStyle: { 
          height: 60,
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderTopColor: isDark ? '#334155' : '#e2e8f0',
        },
        
        // শুধু হেডারে গ্লাস ইফেক্ট
        headerTransparent: true,
        headerBackground: () => (
          <BlurView 
            tint={isDark ? "dark" : "light"} 
            intensity={80} 
            style={{ flex: 1 }} 
          />
        ),
        headerTitleAlign: 'center',
        headerTitleStyle: { 
          fontWeight: '700', 
          color: isDark ? '#f8fafc' : '#0f172a', 
          fontSize: 18 
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
          headerLeft: () => (
            <Pressable 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className="ml-4 p-2 active:bg-slate-200/50 dark:active:bg-slate-700/50 rounded-xl"
            >
              <Ionicons name="menu-outline" size={26} color={isDark ? '#f8fafc' : '#334155'} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable className="mr-4 p-2 active:bg-slate-200/50 dark:active:bg-slate-700/50 rounded-xl">
              <Ionicons name="notifications-outline" size={22} color={isDark ? '#f8fafc' : '#334155'} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: 'Appointment',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "calendar" : "calendar-outline"} size={22} color={color} />
          ),
          headerLeft: () => (
            <Pressable 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className="ml-4 p-2 active:bg-slate-200/50 dark:active:bg-slate-700/50 rounded-xl"
            >
              <Ionicons name="menu-outline" size={26} color={isDark ? '#f8fafc' : '#334155'} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="treatment"
        options={{
          title: 'Treatment',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "medical" : "medical-outline"} size={22} color={color} />
          ),
          headerLeft: () => (
            <Pressable 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className="ml-4 p-2 active:bg-slate-200/50 dark:active:bg-slate-700/50 rounded-xl"
            >
              <Ionicons name="menu-outline" size={26} color={isDark ? '#f8fafc' : '#334155'} />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}