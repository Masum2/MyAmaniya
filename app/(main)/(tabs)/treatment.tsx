import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, Text, ScrollView, StatusBar, Dimensions, 
  ActivityIndicator, TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PieChart } from 'react-native-chart-kit';
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../../components/CustomHeader';
import { useClientList } from '../../../hooks/useClientListData';
import { useTreatmentData } from '../../../hooks/useTreatmentProgress';
import { useAuthStore } from '../../../store/useAuthStore';

const screenWidth = Dimensions.get('window').width;

// Status colors memoized
const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    'discontinued': '#3b82f6', 'on hold': '#3b82f6',
    'in progress': '#ff5c8a',
    'accomplished': '#4ecdc4', 'successfully completed': '#4ecdc4',
    'unsuccessful': '#ffd166'
  };
  return colors[status?.toLowerCase()] || '#9ca3af';
};

export default function TreatmentTab() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { token } = useAuthStore();
  
  const { data: clients, isLoading: isClientsLoading } = useClientList();
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    if (clients?.length > 0 && !selectedClientId) {
      setSelectedClientId(clients[0].id);
    }
  }, [clients]);

  const { data: treatmentData, isLoading: isTreatmentLoading } = useTreatmentData(selectedClientId!, token);

  // Optimized Chart Data with useMemo
  const chartConfigs = useMemo(() => [
    { title: 'Goal Outcome Distribution', key: 'goalOutcomeChartData' },
    { title: 'Activity Outcome Distribution', key: 'activityOutcomeChartData' }
  ], []);

  if (isClientsLoading) return <ActivityIndicator className="flex-1" size="large" color="#2563eb" />;

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-[#121212]">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomHeader title="Treatment Plans" />

      <ScrollView contentContainerStyle={{ paddingTop: 110, paddingBottom: 40, paddingHorizontal: 20 }}>
        
        {/* Client Selector */}
        <View className="mb-8">
          <Text className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase mb-3 tracking-widest">Select Client</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {clients?.map((client: any) => (
              <TouchableOpacity
                key={client.id}
                onPress={() => setSelectedClientId(client.id)}
                className={`px-6 py-3 rounded-2xl mr-3 border ${selectedClientId === client.id ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
              >
                <Text className={`font-bold ${selectedClientId === client.id ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                  {client.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isTreatmentLoading ? (
          <ActivityIndicator className="mt-20" size="large" color="#2563eb" />
        ) : treatmentData ? (
          chartConfigs.map((cfg) => (
            <View key={cfg.key} className="bg-white dark:bg-slate-900 p-6 rounded-3xl mb-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <Text className="text-slate-800 dark:text-white font-bold mb-6 text-center">{cfg.title}</Text>
              
              {treatmentData[cfg.key]?.length > 0 ? (
                <PieChart
                  data={treatmentData[cfg.key].map((item: any) => ({
                    name: item.category,
                    population: item.value,
                    color: getStatusColor(item.category),
                    legendFontColor: isDarkMode ? '#94a3b8' : '#64748b',
                    legendFontSize: 11,
                  }))}
                  width={screenWidth - 80}
                  height={200}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="0"
                  chartConfig={{ color: () => isDarkMode ? '#fff' : '#000' }}
                />
              ) : (
                <View className="h-40 items-center justify-center">
                  <Ionicons name="information-circle-outline" size={40} color="#94a3b8" />
                  <Text className="text-slate-400 mt-2 text-sm">No data available</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text className="text-center text-slate-400 mt-10">No records found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}