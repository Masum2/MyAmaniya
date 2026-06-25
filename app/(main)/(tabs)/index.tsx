import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const nextAppointment = {
    id: '1',
    doctor: 'Dr. Md. Masum Billah',
    specialty: 'Cardiologist Specialist',
    date: 'June 28, 2026',
    time: '10:30 AM',
    hospital: 'Square Hospital, Room 402'
  };

  const pastAppointments = [
    { id: '1', doctor: 'Dr. Hasan Mahmud', specialty: 'Dentist', date: 'May 12, 2026', type: 'Checkup' },
    { id: '2', doctor: 'Dr. Sarah Rahman', specialty: 'Dermatologist', date: 'April 05, 2026', type: 'Follow-up' },
    { id: '3', doctor: 'Dr. Samiya Kona', specialty: 'General Physician', date: 'March 20, 2026', type: 'Emergency' },
    { id: '4', doctor: 'Dr. Masum Billah', specialty: 'General Physician', date: 'March 20, 2026', type: 'Completed' },
  ];

  return (
    <ScrollView className="flex-1 bg-[#f8fafc]" showsVerticalScrollIndicator={false}>
      <View className="px-5 pt-10 pb-10">
        
       
        
        {/* ১. New Appointment Button - প্রফেশনাল রাইট সাইড অ্যারো ডিজাইন */}
        <Pressable 
          onPress={() => router.push('/(main)/(tabs)/appointment')}
          className="w-full bg-blue-900 py-5 px-6 rounded-2xl shadow-lg shadow-blue-900/20 flex-row items-center justify-between mb-10"
        >
          <View>
            <Text className="text-white text-lg font-bold">Book Appointment</Text>
            <Text className="text-blue-200 text-xs mt-0.5">Schedule your next consultation</Text>
          </View>
          <View className="bg-white/20 p-2 rounded-full">
            <Ionicons name="arrow-forward" size={20} color="white" />
          </View>
        </Pressable>

        {/* ২. Next Appointment Section */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-slate-800 mb-4 tracking-tight">Upcoming Consultation</Text>
          <View className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <View className="flex-row items-center mb-5">
              <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center">
                <Ionicons name="medical" size={24} color="#1e3a8a" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-base font-bold text-slate-900">{nextAppointment.doctor}</Text>
                <Text className="text-xs text-blue-600 font-semibold">{nextAppointment.specialty}</Text>
              </View>
            </View>

            <View className="space-y-3">
              <View className="flex-row items-center">
                <Ionicons name="location" size={16} color="#94a3b8" />
                <Text className="text-slate-600 text-sm ml-3">{nextAppointment.hospital}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="calendar" size={16} color="#94a3b8" />
                <Text className="text-slate-600 text-sm ml-3">{nextAppointment.date} | {nextAppointment.time}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ৩. History Section */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-slate-800 tracking-tight">Recent History</Text>
            <Pressable>
              <Text className="text-sm font-bold text-blue-900">See All</Text>
            </Pressable>
          </View>
          
          <View>
            {pastAppointments.map((item) => (
              <View key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex-row items-center mb-3">
                <View className="bg-slate-100 w-12 h-12 rounded-xl items-center justify-center">
                  <Ionicons name="document-text" size={20} color="#64748b" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-sm font-bold text-slate-800">{item.doctor}</Text>
                  <Text className="text-xs text-slate-400 mt-0.5">{item.specialty} • {item.date}</Text>
                </View>
                <View className="bg-emerald-50 px-3 py-1 rounded-lg">
                  <Text className="text-[10px] font-bold text-emerald-600 uppercase">{item.type}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </View>
    </ScrollView>
  );
}