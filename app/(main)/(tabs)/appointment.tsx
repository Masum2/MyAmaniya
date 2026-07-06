import React, { useState } from 'react';
import { 
  Text, View, Pressable, ScrollView, TextInput, KeyboardAvoidingView, 
  Platform, Modal, FlatList, useColorScheme 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClientList } from '../../../hooks/useClientListData';
import { useProviders } from '../../../hooks/useGetProviders';
import { useAuthStore } from '../../../store/useAuthStore';
import { useAddNewAppointment } from '../../../hooks/useCreateNewAppointment';
import { Client, IconName, Provider, SelectionState } from '../../../types/createAppointment';
import CustomHeader from '../../../components/CustomHeader';

export default function AppointmentTab() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  
  // --- State ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [provider, setProvider] = useState<SelectionState>({ label: 'Select Provider', id: 3 });
  const [client, setClient] = useState<SelectionState>({ label: 'Select Client', id: 3 });
  const [type, setType] = useState<SelectionState>({ label: 'Select Type', index: 3 });
  const [method, setMethod] = useState<SelectionState>({ label: 'Select Method', index: 1 });
  const [status, setStatus] = useState<SelectionState>({ label: 'Scheduled', index: 1 });

  const [modalData, setModalData] = useState<(Provider | Client | string)[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); // Success Modal State
  const [modalTitle, setModalTitle] = useState('');
  const [activeSelectType, setActiveSelectType] = useState('');

  // --- Hooks ---
  const { token, user } = useAuthStore();
  const { data: clients } = useClientList();
  const { data: providersList } = useProviders(token);
  const { saveAppointment } = useAddNewAppointment();

  const appointmentTypesList = ['Pending', 'Intake', 'Assessment', 'Individual Therapy', 'Group Therapy', 'Medication Management', 'Crisis Visit', 'FollowUp', 'Plan Development', 'Administrative', 'Case Review', 'Evaluation', 'Screening', 'General Counseling'];
  const contactMethodsList = ['Face to Face', 'Phone Call', 'Telehealth', 'Not Applicable', 'Text/Email'];
  const statusList = ['Waiting', 'Scheduled', 'Attended', 'No Show', 'Client Cancelled', 'Rescheduled By Client', 'Rescheduled By Staff', 'Staff Cancelled', 'Not Applicable'];

  const handleSave = async () => {
    const payload = {
      startDate: startDate.toISOString(),
      startDateTime: startTime.toISOString(),
      endDateTime: endTime.toISOString(),
      appUserId: provider.id,
      clientId: client.id,
      title: title,
      description: description,
      appointmentType: type.index,
      contactMethod: method.index,
      appointmentStatus: status.index,
      createdBy: user?.fullName || "Kona_Supervisor",
      createdOn: new Date().toISOString(),
      recordedBy: user?.fullName || "Kona_Supervisor",
      recordedOn: new Date().toISOString()
    };

    const result = await saveAppointment(payload);
    if (result.success) {
      setSuccessModalVisible(true);
    } else {
      // আপনি চাইলে এখানেও এরর মেসেজ কাস্টম মডাল দিয়ে দেখাতে পারেন
      console.log('Failed to save');
    }
  };

  const handleSelectValue = (item: any, index: number) => {
    switch (activeSelectType) {
      case 'provider':
        const providerItem = item as Provider;
        setProvider({ label: providerItem.displayName, id: providerItem.id });
        break;
      case 'client':
        const clientItem = item as Client;
        setClient({ label: clientItem.description, id: clientItem.id });
        break;
      case 'type':
        setType({ label: item as string, index: index });
        break;
      case 'method':
        setMethod({ label: item as string, index: index + 1 });
        break;
      case 'status':
        setStatus({ label: item as string, index: index });
        break;
    }
    setModalVisible(false);
  };

  const getStatusColor = (label: string): string => {
    const colors: Record<string, string> = { 
      'Scheduled': '#3b82f6', 'Waiting': '#f59e0b', 'Attended': '#10b981', 
      'No Show': '#ef4444', 'Client Cancelled': '#8b5cf6', 'Rescheduled By Client': '#f59e0b', 
      'Rescheduled By Staff': '#f59e0b', 'Staff Cancelled': '#ef4444' 
    };
    return colors[label] || '#6b7280';
  };

  const dropdowns = [
    { label: 'Provider', value: provider.label, key: 'provider', icon: 'person-outline' },
    { label: 'Client', value: client.label, key: 'client', icon: 'people-outline' },
    { label: 'Type', value: type.label, key: 'type', icon: 'pricetag-outline' },
    { label: 'Method', value: method.label, key: 'method', icon: 'call-outline' },
  ] as const;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-slate-50 dark:bg-[#121212]">
      <CustomHeader title="Appointment Create" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 100, paddingHorizontal: 20 }}>
        
        {/* Date & Time */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">📅 Date & Time</Text>
          <Pressable onPress={() => setShowDatePicker(true)} className="bg-white dark:bg-slate-800 p-4 rounded-2xl mb-3 border border-slate-200 dark:border-slate-700">
            <Text className="text-slate-800 dark:text-white font-medium">{startDate.toDateString()}</Text>
          </Pressable>
          <View className="flex-row gap-3">
            <Pressable onPress={() => setShowStartTimePicker(true)} className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <Text className="text-xs text-slate-500 dark:text-slate-400">START</Text>
              <Text className="text-slate-800 dark:text-white font-medium">{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </Pressable>
            <Pressable onPress={() => setShowEndTimePicker(true)} className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <Text className="text-xs text-slate-500 dark:text-slate-400">END</Text>
              <Text className="text-slate-800 dark:text-white font-medium">{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </Pressable>
          </View>
        </View>

        {showDatePicker && <DateTimePicker value={startDate} mode="date" onChange={(e, d) => { setShowDatePicker(false); if(d) setStartDate(d); }} />}
        {showStartTimePicker && <DateTimePicker value={startTime} mode="time" onChange={(e, t) => { setShowStartTimePicker(false); if(t) setStartTime(t); }} />}
        {showEndTimePicker && <DateTimePicker value={endTime} mode="time" onChange={(e, t) => { setShowEndTimePicker(false); if(t) setEndTime(t); }} />}

        {/* Title & Description */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">📝 Details</Text>
          <TextInput placeholder="Appointment Title" value={title} onChangeText={setTitle} placeholderTextColor="#94a3b8" className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white mb-3" />
          <TextInput placeholder="Add notes..." value={description} onChangeText={setDescription} multiline numberOfLines={3} placeholderTextColor="#94a3b8" className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 h-24 text-slate-800 dark:text-white" />
        </View>

        {/* Dropdowns */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">⚙️ Additional Info</Text>
          {dropdowns.map((item) => (
            <Pressable key={item.key} onPress={() => {
              let data = item.key === 'provider' ? providersList : item.key === 'client' ? clients : item.key === 'type' ? appointmentTypesList : contactMethodsList;
              setModalTitle(item.label);
              setModalData(data || []);
              setActiveSelectType(item.key);
              setModalVisible(true);
            }} className="bg-white dark:bg-slate-800 p-4 rounded-2xl mb-3 border border-slate-200 dark:border-slate-700 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Ionicons name={item.icon as IconName} size={20} color="#64748b" />
                <Text className="ml-3 text-slate-800 dark:text-white font-medium">{item.value}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#94a3b8" />
            </Pressable>
          ))}
          
          <Pressable onPress={() => { setModalTitle('Status'); setModalData(statusList); setActiveSelectType('status'); setModalVisible(true); }} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-2.5 h-2.5 rounded-full mr-3" style={{ backgroundColor: getStatusColor(status.label) }} />
              <Text className="text-slate-800 dark:text-white font-medium">{status.label}</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#94a3b8" />
          </Pressable>
        </View>

        <Pressable onPress={handleSave} className="bg-blue-900 p-4 rounded-2xl items-center shadow-lg shadow-blue-500/30">
          <Text className="text-white font-bold text-base">Schedule Appointment</Text>
        </Pressable>
      </ScrollView>

      {/* Select Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <Pressable className="flex-1 bg-black/50" onPress={() => setModalVisible(false)} />
        <View className="absolute bottom-0 w-full bg-white dark:bg-slate-900 rounded-t-3xl max-h-[55%] p-6">
          <View className="items-center mb-4">
            <View className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
            <Text className="text-lg font-bold text-slate-800 dark:text-white mt-3">Select {modalTitle}</Text>
          </View>
          <FlatList data={modalData} keyExtractor={(_, i) => i.toString()} renderItem={({ item, index }) => (
            <Pressable onPress={() => handleSelectValue(item, index)} className="py-4 border-b border-slate-100 dark:border-slate-800">
              <Text className="text-slate-800 dark:text-white text-base">
                {typeof item === 'string' ? item : ('displayName' in item ? item.displayName : item.description)}
              </Text>
            </Pressable>
          )} />
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
          <View className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full items-center">
            <View className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={40} color="#10b981" />
            </View>
            <Text className="text-xl font-bold text-slate-800 dark:text-white mb-2">Success!</Text>
            <Text className="text-slate-500 dark:text-slate-400 text-center mb-6">Appointment has been scheduled successfully.</Text>
            <Pressable onPress={() => { setSuccessModalVisible(false); router.back(); }} className="bg-blue-500 w-full p-4 rounded-2xl items-center">
              <Text className="text-white font-bold">Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}