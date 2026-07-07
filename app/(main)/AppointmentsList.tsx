import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppointments } from '../../hooks/useGetAppointments';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
const appointmentTypeMap: { [key: number]: string } = {
  0: "Pending", 1: "Intake", 2: "Assessment", 3: "Individual Therapy",
  4: "Group Therapy", 5: "Medication Management", 6: "Crisis Visit",
  7: "FollowUp", 8: "Plan Development", 9: "Administrative",
  10: "Case Review", 11: "Evaluation", 12: "Screening", 13: "General Counseling",
};

export default function AppointmentsList() {
  const { clientId, clientName, mrn, sex, dob, tribal, status } = useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const { data: appointments } = useAppointments(Number(clientId));
  const nextAppointment = appointments?.find((a: any) => a.recordType === "Next Appointment");
  const pastAppointments = appointments?.filter((a: any) => a.recordType === "Past Appointment") || [];

  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc] dark:bg-[#121212]">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Professional Header */}
      <View className="px-5 pt-12 pb-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-700">
          <Ionicons name="arrow-back" size={20} color={isDarkMode ? "#fff" : "#0f172a"} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-slate-800 dark:text-white">Client Appointment</Text>
        <View className="w-10" /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
         
 

        {/* New Appointment Action */}
        <Pressable 
          onPress={() => router.push('/(main)/(tabs)/appointment')} 
          className="w-full bg-white dark:bg-slate-900 p-5 rounded-3xl flex-row items-center justify-between mb-8 border border-slate-100 dark:border-slate-800 shadow-sm"
        >
          <View className="flex-row items-center">
            <View className="bg-blue-600 p-3 rounded-2xl mr-4">
              <Ionicons name="add" size={24} color="white" />
            </View>
            <View>
              <Text className="text-slate-900 dark:text-white font-bold">New Appointment</Text>
              <Text className="text-slate-400 text-xs">Schedule a new session</Text>
            </View>
          </View>
        </Pressable>

        {/* Next Appointment */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-slate-800 dark:text-white mb-4">Next Appointment</Text>
          {nextAppointment ? (
            <View className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl items-center justify-center">
                  <Ionicons name="calendar" size={24} color="#2563eb" />
                </View>
                <Text className="ml-4 text-base font-bold text-slate-900 dark:text-white">
                  {appointmentTypeMap[nextAppointment.appointmentType] || "Session"}
                </Text>
              </View>
              <View className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <Text className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                  {new Date(nextAppointment.appointmentDate).toLocaleDateString()} • {new Date(nextAppointment.appointmentTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>
            </View>
          ) : <Text className="text-slate-400 italic">No upcoming appointments.</Text>}
        </View>

        {/* Past Appointments List */}
        <View>
          <Text className="text-lg font-bold text-slate-800 dark:text-white mb-4">Past Appointments</Text>
          {pastAppointments.length > 0 ? pastAppointments.map((item: any, index: number) => (
            <View key={`${item.id}-${index}`} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex-row items-center mb-3">
              <View className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl items-center justify-center">
                <Ionicons name="checkmark-circle" size={22} color="#475569" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {appointmentTypeMap[item.appointmentType] || "Session"}
                </Text>
                <Text className="text-xs text-slate-400 mt-0.5">
                  {new Date(item.appointmentDate).toLocaleDateString()}
                </Text>
              </View>
              <View className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-green-700 dark:text-green-300 uppercase">Done</Text>
              </View>
            </View>
          )) : <Text className="text-slate-400 italic">No past records.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}