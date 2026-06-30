import React from 'react';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../../components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTreatmentDetails } from '../../../hooks/useTreatmentProgress';

export default function TreatmentTab() {
  const { data, isLoading } = useTreatmentDetails();
  const insets = useSafeAreaInsets();

  if (isLoading) return <View className="flex-1 justify-center items-center"><Text>Loading...</Text></View>;

  return (
    <View className="flex-1 bg-slate-50 dark:bg-[#121212]">
      <StatusBar barStyle="light-content" />
      <CustomHeader title="Treatment Details" />

      <ScrollView 
        contentContainerStyle={{ paddingTop: insets.top + 90, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Plan Header */}
        <View className="mb-8">
          <Text className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Active Plan</Text>
          <Text className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{data?.planName}</Text>
        </View>

        {/* Goals Section */}
        <Text className="text-lg font-bold text-slate-800 dark:text-white mb-4">🎯 Treatment Goals</Text>
        {data?.goals.map((g) => (
          <View key={g.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl mb-4 border border-slate-100 dark:border-slate-700 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center mr-3">
                <Ionicons name="flag" size={18} color="#2563eb" />
              </View>
              <Text className="text-base font-bold text-slate-800 dark:text-white flex-1">{g.goal}</Text>
            </View>
            <View className="flex-row justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
              <Text className="text-xs font-bold text-slate-500">TARGET: {g.targetDate}</Text>
              <Text className="text-xs font-bold text-blue-600 dark:text-blue-400">{g.outcome}</Text>
            </View>
          </View>
        ))}

        {/* Progress Notes Section */}
        <Text className="text-lg font-bold text-slate-800 dark:text-white mb-4 mt-4">📝 Progress Notes</Text>
        {data?.notes.map((n) => (
          <View key={n.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl mb-3 border-l-4 border-l-blue-500 shadow-sm">
            <View className="flex-row justify-between mb-2">
              <Text className="text-xs font-bold text-blue-500">{n.date}</Text>
              <Text className="text-xs font-bold text-slate-400">CPT: {n.cptCode}</Text>
            </View>
            <Text className="text-base font-semibold text-slate-800 dark:text-white">{n.intervention}</Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400 mt-1">{n.modality}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}