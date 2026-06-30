import React from 'react';
import { Text, View, Pressable, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../store/useAuthStore';
import { useAppointments } from '../../../hooks/useGetAppointments';
import { useClientList } from '../../../hooks/useClientListData';

const appointmentTypeMap: { [key: number]: string } = {
  0: "Pending", 1: "Intake", 2: "Assessment", 3: "Individual Therapy",
  4: "Group Therapy", 5: "Medication Management", 6: "Crisis Visit",
  7: "FollowUp", 8: "Plan Development", 9: "Administrative",
  10: "Case Review", 11: "Evaluation", 12: "Screening", 13: "General Counseling",
};

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();

  const { data: clients } = useClientList();
  const myClient = clients?.find((c: any) => c.description.toLowerCase() === user?.fullName?.toLowerCase());
  const clientId = myClient?.id;

  const { data: appointments } = useAppointments(clientId);

  const nextAppointment = appointments?.find((a: any) => a.recordType === "Next Appointment");
  const pastAppointments = appointments?.filter((a: any) => a.recordType === "Past Appointment") || [];

  return (
    <ScrollView 
      className="flex-1 bg-[#f8fafc] dark:bg-[#121212]" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 60 }}
    >
      <StatusBar barStyle="dark-content" />
      
      <View className="px-5">
        {/* Header */}
        <View className="mb-8 mt-4">
           <Text className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</Text>
           <Text className="text-slate-500">Welcome back, {user?.fullName || "User"}</Text>
        </View>

        {/* New Appointment Button */}
        <Pressable 
          onPress={() => router.push('/(main)/(tabs)/appointment')} 
          className="w-full bg-blue-900 py-6 px-6 rounded-3xl flex-row items-center justify-between mb-10 shadow-lg shadow-blue-200"
        >
          <View>
            <Text className="text-white text-lg font-bold">New Appointment</Text>
            <Text className="text-blue-200 text-xs mt-1">Schedule your next session</Text>
          </View>
          <View className="bg-white/20 p-3 rounded-full">
            <Ionicons name="add" size={24} color="white" />
          </View>
        </Pressable>

        {/* Next Appointment Section */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Next Appointment</Text>
          {nextAppointment ? (
            <View className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl items-center justify-center">
                  <Ionicons name="calendar-outline" size={24} color="#1e3a8a" />
                </View>
                <View className="ml-4">
                  <Text className="text-base font-bold text-slate-900 dark:text-white">
                    {appointmentTypeMap[nextAppointment.appointmentType] || "Session"}
                  </Text>
                </View>
              </View>
              <View className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <Text className="text-slate-600 dark:text-slate-300 text-sm">
                  {new Date(nextAppointment.appointmentDate).toLocaleDateString()} | {new Date(nextAppointment.appointmentTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>
            </View>
          ) : (
            <Text className="text-slate-400">No upcoming appointments.</Text>
          )}
        </View>

        {/* Past Appointment Section */}
     {/* Past Appointment Section */}
        <View>
          <Text className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Past Appointments</Text>
          {pastAppointments.length > 0 ? pastAppointments.map((item: any, index: number) => (
            <View key={`${item.id}-${index}`} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex-row items-center mb-3">
              <View className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl items-center justify-center">
                <Ionicons name="checkmark-circle-outline" size={22} color="#1e3a8a" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {appointmentTypeMap[item.appointmentType] || "Session"}
                </Text>
                {/* এখানে ডেট এবং টাইম একসাথে দেখানো হচ্ছে */}
                <Text className="text-xs text-slate-400 mt-0.5">
                  {new Date(item.appointmentDate).toLocaleDateString()} at {new Date(item.appointmentTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>
              <View className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase">Completed</Text>
              </View>
            </View>
          )) : <Text className="text-slate-400">No past records.</Text>}
        </View>
      </View>
    </ScrollView>
  );
}