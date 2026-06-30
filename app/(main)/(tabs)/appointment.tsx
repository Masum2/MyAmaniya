import React, { useState } from 'react';
import { 
  Text, View, Pressable, ScrollView, TextInput, KeyboardAvoidingView, 
  Platform, Modal, FlatList, useColorScheme, StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClientList } from '../../../hooks/useClientListData';
import { useProviders } from '../../../hooks/useGetProviders';
import { useAuthStore } from '../../../store/useAuthStore';
import { useAddNewAppointment } from '../../../hooks/useCreateNewAppointment';

export default function AppointmentTab() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  // --- স্টেটসমূহ ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [provider, setProvider] = useState({ label: 'Select Provider', id: 3 });
  const [client, setClient] = useState({ label: 'Select Client', id: 3 });
  const [type, setType] = useState({ label: 'Select Type', index: 3 });
  const [method, setMethod] = useState({ label: 'Select Method', index: 1 });
  const [status, setStatus] = useState({ label: 'Scheduled', index: 1 });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [activeSelectType, setActiveSelectType] = useState('');

  // --- হুক এবং ডাটা ---
  const { token } = useAuthStore();
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
      createdBy: "Kona_Supervisor",
      createdOn: new Date().toISOString(),
      recordedBy: "Kona_Supervisor",
      recordedOn: new Date().toISOString()
    };

    const result = await saveAppointment(payload);
    if (result.success) {
      alert('Appointment Saved Successfully!');
      router.back();
    } else {
      alert('Failed to save appointment.');
    }
  };

  const handleSelectValue = (item: any, index: number) => {
    if (activeSelectType === 'provider') setProvider({ label: item.displayName, id: item.id });
    else if (activeSelectType === 'client') setClient({ label: item.description, id: item.id });
    else if (activeSelectType === 'type') setType({ label: item, index: index });
    else if (activeSelectType === 'method') setMethod({ label: item, index: index + 1 });
    else if (activeSelectType === 'status') setStatus({ label: item, index: index });
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-[#f8fafc] dark:bg-[#121212]">
      <ScrollView showsVerticalScrollIndicator={false}

        contentContainerStyle={{ paddingTop: insets.top + 60, paddingBottom: 100, paddingHorizontal: 20 }}>
        <Text className="text-xl font-black text-slate-800 dark:text-white mb-6">Create New Appointment</Text>

        {/* --- ডেট ও টাইম পিকচার --- */}
        <View className="mb-4">
          <Text className="text-xs font-bold text-slate-500 mb-2 uppercase">Date & Time</Text>
          <Pressable onPress={() => setShowDatePicker(true)} className="bg-white dark:bg-slate-800 p-4 rounded-xl mb-2 border border-slate-200 dark:border-slate-700">
            <Text className="text-slate-800 dark:text-white">Date: {startDate.toDateString()}</Text>
          </Pressable>
          <View className="flex-row gap-2">
            <Pressable onPress={() => setShowStartTimePicker(true)} className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <Text className="text-slate-800 dark:text-white">Start: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </Pressable>
            <Pressable onPress={() => setShowEndTimePicker(true)} className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <Text className="text-slate-800 dark:text-white">End: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </Pressable>
          </View>
        </View>

        {/* ডেটপিকার মডাল লজিক */}
        {showDatePicker && <DateTimePicker value={startDate} mode="date" onChange={(e, d) => {setShowDatePicker(false); if(d) setStartDate(d)}} />}
        {showStartTimePicker && <DateTimePicker value={startTime} mode="time" onChange={(e, t) => {setShowStartTimePicker(false); if(t) setStartTime(t)}} />}
        {showEndTimePicker && <DateTimePicker value={endTime} mode="time" onChange={(e, t) => {setShowEndTimePicker(false); if(t) setEndTime(t)}} />}

        {/* --- ইনপুট ফিল্ডস --- */}
        <View className="mb-4">
          <Text className="text-xs font-bold text-slate-500 mb-1 uppercase">Title</Text>
          <TextInput placeholder="Appointment Title" value={title} onChangeText={setTitle} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white" />
        </View>

        <View className="mb-4">
          <Text className="text-xs font-bold text-slate-500 mb-1 uppercase">Description</Text>
          <TextInput placeholder="Add notes..." value={description} onChangeText={setDescription} multiline numberOfLines={4} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 h-24 text-slate-800 dark:text-white" />
        </View>

        {/* --- ড্রপডাউন বাটনসমূহ --- */}
        {[
          { label: 'Provider', value: provider.label, key: 'provider' },
          { label: 'Client', value: client.label, key: 'client' },
          { label: 'Type', value: type.label, key: 'type' },
          { label: 'Method', value: method.label, key: 'method' },
          { label: 'Status', value: status.label, key: 'status' }
        ].map((item, idx) => (
          <Pressable key={idx} onPress={() => {
            let data = item.key === 'provider' ? providersList : item.key === 'client' ? clients : item.key === 'type' ? appointmentTypesList : item.key === 'method' ? contactMethodsList : statusList;
            setModalTitle(item.label);
            setModalData(data || []);
            setActiveSelectType(item.key);
            setModalVisible(true);
          }} className="bg-white dark:bg-slate-800 p-4 mb-4 rounded-xl border border-slate-200 dark:border-slate-700 flex-row justify-between">
            <Text className="text-slate-800 dark:text-white">{item.value}</Text>
            <Ionicons name="chevron-down" size={20} color="#94a3b8" />
          </Pressable>
        ))}

        <Pressable onPress={handleSave} className="bg-blue-600 p-4 rounded-xl items-center mt-4">
          <Text className="text-white font-bold uppercase">Save Appointment</Text>
        </Pressable>
      </ScrollView>

      {/* --- মডাল --- */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <Pressable style={StyleSheet.absoluteFill} className="bg-black/50" onPress={() => setModalVisible(false)} />
        <View className="absolute bottom-0 w-full bg-white dark:bg-slate-900 rounded-t-3xl max-h-[50%] p-5">
          <FlatList
            data={modalData}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => handleSelectValue(item, index)} className="py-4 border-b border-slate-100">
                <Text className="text-slate-800 dark:text-white">
                  {activeSelectType === 'provider' ? item.displayName : activeSelectType === 'client' ? item.description : item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}