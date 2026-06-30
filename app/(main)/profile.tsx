import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView className="flex-1 bg-white dark:bg-[#121212]" showsVerticalScrollIndicator={false}>
      {/* প্রোফাইল হেডার */}
      <View className="items-center py-10 bg-blue-50/50 dark:bg-blue-900/20">
        <View className="w-28 h-28 rounded-full bg-white dark:bg-slate-800 items-center justify-center border-4 border-white dark:border-slate-700 shadow-lg shadow-blue-200 dark:shadow-none">
          <Ionicons name="person" size={50} color={isDark ? "#60a5fa" : "#3b82f6"} />
        </View>
        <Text className="text-xl font-bold text-slate-800 dark:text-white mt-4">Patient Name</Text>
        <Text className="text-sm text-slate-500 dark:text-slate-400">patient@email.com</Text>
      </View>

      {/* প্রোফাইল মেনু লিস্ট */}
      <View className="px-6 py-6">
        <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
          Account Settings
        </Text>
        
        <ProfileOption icon="person-outline" title="Edit Profile" isDark={isDark} />
        <ProfileOption icon="shield-checkmark-outline" title="Medical Records" isDark={isDark} />
        <ProfileOption icon="notifications-outline" title="Notifications" isDark={isDark} />
        <ProfileOption icon="lock-closed-outline" title="Privacy & Security" isDark={isDark} />
        
        <View className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

        <TouchableOpacity 
          onPress={() => router.replace('/(auth)')} 
          className="flex-row items-center py-4"
        >
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text className="text-red-500 font-bold text-base ml-4">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// কাস্টম মেনু আইটেম কম্পোনেন্ট
function ProfileOption({ icon, title, isDark }: { icon: any, title: string, isDark: boolean }) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800">
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl items-center justify-center">
          <Ionicons name={icon} size={20} color={isDark ? "#94a3b8" : "#475569"} />
        </View>
        <Text className="text-slate-700 dark:text-slate-200 font-semibold text-base ml-4">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={isDark ? "#475569" : "#94a3b8"} />
    </TouchableOpacity>
  );
}