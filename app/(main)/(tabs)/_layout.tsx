import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 4 },
        tabBarStyle: { height: 60, paddingTop: 6, paddingBottom: 6 },
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#ffffff', elevation: 0, shadowOpacity: 0 },
        headerTitleStyle: { fontWeight: '700', color: '#0f172a', fontSize: 18 }
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
              className="ml-4 p-2 active:bg-slate-100 rounded-xl"
            >
              <Ionicons name="menu-outline" size={26} color="#334155" />
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
              className="ml-4 p-2 active:bg-slate-100 rounded-xl"
            >
              <Ionicons name="menu-outline" size={26} color="#334155" />
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
              className="ml-4 p-2 active:bg-slate-100 rounded-xl"
            >
              <Ionicons name="menu-outline" size={26} color="#334155" />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}