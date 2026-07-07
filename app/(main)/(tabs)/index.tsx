import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useClientList } from '../../../hooks/useClientListData';
import { useColorScheme } from 'nativewind';
import CustomHeader from '../../../components/CustomHeader';

import { SafeAreaView } from 'react-native-safe-area-context';

const getClientExtraData = (id: number) => {
  const data: any = {
    1: { mrn: "MR000001", status: "Active", sex: "Male", dob: "Feb-25-1996", tribal: "No", lang: "Bengali" },
    2: { mrn: "MR000002", status: "Active", sex: "Male", dob: "Jan-04-2010", tribal: "Yes", lang: "English" },
    3: { mrn: "MR000003", status: "Active", sex: "Male", dob: "Feb-25-2002", tribal: "No", lang: "English" },
    4: { mrn: "MR000004", status: "Active", sex: "Female", dob: "N/A", tribal: "Unknown", lang: "English" },
  };
  return data[id] || { mrn: "N/A", status: "Active", sex: "N/A", dob: "N/A", tribal: "N/A", lang: "N/A" };
};

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  const { data: clients } = useClientList();

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-[#0a0a0a]">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomHeader title="All Clients" />
      
      <FlatList
        data={clients}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingTop: 120, paddingHorizontal: 20, paddingBottom: 50 }}
        renderItem={({ item }) => {
          const extra = getClientExtraData(item.id);
          return (
            <TouchableOpacity 
              activeOpacity={0.7}
              className="bg-white dark:bg-slate-900 p-5 rounded-3xl mb-4 shadow-sm border border-slate-100 dark:border-slate-800"
              onPress={() => router.push({
                pathname: '/(main)/AppointmentsList', 
                params: { 
                    clientId: item.id, 
                    clientName: item.description,
                    mrn: extra.mrn,
                    sex: extra.sex,
                    dob: extra.dob,
                    tribal: extra.tribal,
                    lang: extra.lang,
                    status: extra.status
                }
              })}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-2xl bg-blue-500/10 items-center justify-center">
                  <Ionicons name="person" size={20} color="#3b82f6" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-bold text-slate-800 dark:text-white">{item.description}</Text>
                  <Text className="text-blue-500 text-xs font-bold uppercase">{extra.mrn}</Text>
                </View>
                <View className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                  <Text className="text-green-600 dark:text-green-400 text-[10px] font-bold">{extra.status}</Text>
                </View>
              </View>

              <View className="flex-row mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <View className="mr-6">
                  <Text className="text-slate-400 text-[10px] uppercase font-bold">Sex</Text>
                  <Text className="text-slate-700 dark:text-slate-300 font-semibold">{extra.sex}</Text>
                </View>
                <View>
                  <Text className="text-slate-400 text-[10px] uppercase font-bold">DOB</Text>
                  <Text className="text-slate-700 dark:text-slate-300 font-semibold">{extra.dob}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}