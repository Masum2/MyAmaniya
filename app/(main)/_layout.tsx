import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import { useColorScheme } from 'nativewind';

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const labelColor = isDark ? '#cbd5e1' : '#334155';
  const iconColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      {/* Drawer Header: Avatar on left, Name/Email on right */}
      <View className="pt-16 pb-6 px-5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <View className="flex-row items-center">
          {/* Avatar */}
          <View className="w-14 h-14 rounded-full bg-blue-500 items-center justify-center shadow-md">
            <Ionicons name="person" size={28} color="#ffffff" />
          </View>
          
          {/* Name and Email Container */}
          <View className="ml-4 flex-1">
            <Text className="text-base font-bold text-slate-800 dark:text-white" numberOfLines={1}>
              {user?.fullName || "Masum Billah"}
            </Text>
            <Text className="text-xs text-slate-500 dark:text-slate-400 mt-0.5" numberOfLines={1}>
              {/* {user?.email || "developer@example.com"} */}
              masum@gmail.com 
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Items */}
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{ paddingTop: 10 }}
        className="flex-1"
      >
        <DrawerItemList 
          {...props} 
          activeTintColor="#2563eb"
          activeBackgroundColor={isDark ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.08)'}
          inactiveTintColor={labelColor}
        />

        <View className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />

        <DrawerItem
          label="Appointments"
          labelStyle={{ color: labelColor, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium' }}
          icon={({ size }) => (
            <Ionicons name="calendar-outline" size={size - 2} color={iconColor} />
          )}
          onPress={() => router.push('/(main)/(tabs)/appointment')}
        />

        <DrawerItem
          label="Treatments"
          labelStyle={{ color: labelColor, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium' }}
          icon={({ size }) => (
            <Ionicons name="medical-outline" size={size - 2} color={iconColor} />
          )}
          onPress={() => router.push('/(main)/(tabs)/treatment')}
        />
      </DrawerContentScrollView>

      {/* Bottom Logout Section */}
      <View className="border-t border-slate-100 dark:border-slate-800 p-4 mb-2">
        <DrawerItem
          label="Logout"
          labelStyle={{ color: '#ef4444', fontWeight: 'bold' }}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color="#ef4444" />
          )}
          onPress={() => {
            logout();
            router.replace('/(auth)');
          }}
          style={{ marginHorizontal: 0, borderRadius: 12 }}
        />
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#2563eb',
        drawerActiveBackgroundColor: isDark ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.08)',
        drawerStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
          width: 280,
        },
        drawerInactiveTintColor: isDark ? '#cbd5e1' : '#334155',
        drawerLabelStyle: {
          marginLeft: -5,
          fontWeight: '500',
        }
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}