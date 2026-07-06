import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import { useColorScheme } from 'nativewind';
import CustomHeader from '../../../components/CustomHeader';

import { useClientList } from '../../../hooks/useClientListData';
import { useTreatmentData } from '../../../hooks/useTreatmentProgress';
import { useAuthStore } from '../../../store/useAuthStore';

const screenWidth = Dimensions.get('window').width;

export default function TreatmentTab() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const { token } = useAuthStore();

  const { data: clients } = useClientList();

  const clientId =
    Array.isArray(clients) && clients.length > 0 ? clients[0].id : null;

  console.log('First Client ID:', clientId);

  const {
    data: treatmentData,
    isLoading,
    error,
  } = useTreatmentData(2, token);

  const textColor = isDarkMode ? '#FFFFFF' : '#1e293b';
  const cardBg = isDarkMode ? '#1e293e' : '#FFFFFF';
  const summaryBg = isDarkMode ? '#0f172a' : '#1e293b';

  const chartConfig = {
    color: (opacity = 1) =>
      isDarkMode
        ? `rgba(255,255,255,${opacity})`
        : `rgba(0,0,0,${opacity})`,
    strokeWidth: 2,
  };

  // Status wise colors
  const getColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'discontinued':
        return '#3b82f6'; // Blue

      case 'on hold':
        return '#3b82f6'; // Blue

      case 'in progress':
        return '#ff5c8a'; // Pink

      case 'accomplished':
        return '#4ecdc4'; // Teal

      case 'successfully completed':
        return '#4ecdc4'; // Teal

      case 'unsuccessful':
        return '#ffd166'; // Yellow

      default:
        return '#9ca3af'; // Gray
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-100 dark:bg-[#121212]">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!treatmentData || error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-100 dark:bg-[#121212]">
        <Text style={{ color: textColor }}>
          No data available or error occurred.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100 dark:bg-[#121212]">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <CustomHeader title="Treatment Plans" />

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 90,
          padding: 20,
        }}
      >
        {/* Goal Distribution */}
        <View
          style={{ backgroundColor: cardBg }}
          className="p-5 rounded-3xl mb-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <Text
            style={{ color: textColor }}
            className="text-base font-bold mb-4 text-center"
          >
            Goal Outcome Distribution
          </Text>

          <PieChart
            data={
              treatmentData.goalOutcomeChartData?.map((item: any) => ({
                name: item.category,
                population: item.value,
                color: getColor(item.category),
                legendFontColor: isDarkMode
                  ? '#cbd5e1'
                  : '#334155',
                legendFontSize: 13,
              })) || []
            }
            width={screenWidth - 70}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            chartConfig={chartConfig}
          />
        </View>

        {/* Activity Distribution */}
        <View
          style={{ backgroundColor: cardBg }}
          className="p-5 rounded-3xl mb-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <Text
            style={{ color: textColor }}
            className="text-base font-bold mb-4 text-center"
          >
            Activity Outcome Distribution
          </Text>

          <PieChart
            data={
              treatmentData.activityOutcomeChartData?.map(
                (item: any) => ({
                  name: item.category,
                  population: item.value,
                  color: getColor(item.category),
                  legendFontColor: isDarkMode
                    ? '#cbd5e1'
                    : '#334155',
                  legendFontSize: 13,
                }),
              ) || []
            }
            width={screenWidth - 70}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            chartConfig={chartConfig}
          />
        </View>

        {/* Summary */}
        <View className="mb-8">
          {treatmentData.statusSummary?.map(
            (sum: any, index: number) => (
              <View
                key={index}
                style={{ backgroundColor: summaryBg }}
                className="p-6 rounded-3xl mb-5 shadow-lg"
              >
                <View className="flex-row items-center justify-between mb-5">
                  <Text className="text-lg font-bold text-white">
                    📊 {sum.type}
                  </Text>

                  <Text className="text-slate-300">
                    Total: {sum.total}
                  </Text>
                </View>

                <View className="flex-row flex-wrap justify-between">
                  {Object.entries(sum.statusCounts || {}).map(
                    ([status, count]: any) => (
                      <View
                        key={status}
                        className="w-[48%] rounded-2xl p-4 mb-3"
                        style={{
                          backgroundColor: `${getColor(status)}20`,
                          borderWidth: 1,
                          borderColor: getColor(status),
                        }}
                      >
                        <Text
                          style={{ color: getColor(status) }}
                          className="text-xs font-bold uppercase"
                        >
                          {status}
                        </Text>

                        <Text className="text-white text-2xl font-bold mt-2">
                          {count}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              </View>
            ),
          )}
        </View>
      </ScrollView>
    </View>
  );
}