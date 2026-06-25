import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* প্রোফাইল হেডার */}
      <View className="items-center py-10 bg-blue-50/50">
        <View className="w-28 h-28 rounded-full bg-white items-center justify-center border-4 border-white shadow-lg shadow-blue-200">
          <Ionicons name="person" size={50} color="#3b82f6" />
        </View>
        <Text className="text-xl font-bold text-slate-800 mt-4">Patient Name</Text>
        <Text className="text-sm text-slate-500">patient@email.com</Text>
      </View>

      {/* প্রোফাইল মেনু লিস্ট */}
      <View className="px-6 py-6">
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Account Settings</Text>
        
        <ProfileOption icon="person-outline" title="Edit Profile" />
        <ProfileOption icon="shield-checkmark-outline" title="Medical Records" />
        <ProfileOption icon="notifications-outline" title="Notifications" />
        <ProfileOption icon="lock-closed-outline" title="Privacy & Security" />
        
        <View className="h-px bg-slate-100 my-6" />

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
function ProfileOption({ icon, title }: { icon: any, title: string }) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-slate-50">
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-slate-50 rounded-xl items-center justify-center">
          <Ionicons name={icon} size={20} color="#475569" />
        </View>
        <Text className="text-slate-700 font-semibold text-base ml-4">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
    </TouchableOpacity>
  );
}