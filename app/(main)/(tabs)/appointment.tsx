import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Pressable, 
  ScrollView, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AppointmentTab() {
  const router = useRouter();

  // ফর্ম স্টেটসমূহ
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  
  const [provider, setProvider] = useState('Select Provider');
  const [client, setClient] = useState('Select Client');
  const [type, setType] = useState('Select Type');
  const [method, setMethod] = useState('Select Method');
  const [status, setStatus] = useState('Scheduled');

  // পিকার ও মোডাল শো করার স্টেটসমূহ
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<string[]>([]);
  const [activeSelectType, setActiveSelectType] = useState('');

  // ড্রপডাউন লিস্টের ডামি ডাটাসমূহ
  const providersList = ['Dr. Md. Masum Billah', 'Dr. Hasan Mahmud', 'Dr. Sarah Rahman', 'Dr. Amit Das'];
  const clientsList = ['John Doe', 'Rahim Uddin', 'Karim Sheikh', 'Emily Watson'];
  const appointmentTypesList = ['General Checkup', 'Follow-up Consultation', 'Emergency', 'Dental Treatment', 'Therapy Session'];
  const contactMethodsList = ['In-Person (Hospital)', 'Video Consultation', 'Audio Call', 'Home Visit'];
  const statusList = ['Scheduled', 'Pending', 'In Progress', 'Completed', 'Canceled'];

  // ডেট ও টাইম ফরম্যাটার
  const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const formatTime = (time: Date) => {
    let hours = time.getHours();
    let minutes: string | number = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 কে 12 বানাবে
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  // ড্রপডাউন মোডাল ওপেন করার ফাংশন
  const openDropdown = (title: string, data: string[], typeKey: string) => {
    setModalTitle(title);
    setModalData(data);
    setActiveSelectType(typeKey);
    setModalVisible(true);
  };

  // ড্রপডাউন থেকে আইটেম সিলেক্ট করার ফাংশন
  const handleSelectValue = (value: string) => {
    if (activeSelectType === 'provider') setProvider(value);
    if (activeSelectType === 'client') setClient(value);
    if (activeSelectType === 'type') setType(value);
    if (activeSelectType === 'method') setMethod(value);
    if (activeSelectType === 'status') setStatus(value);
    setModalVisible(false);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter an appointment title');
      return;
    }
    alert('Appointment Saved Successfully!');
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-[#f8fafc]"
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-5 pb-10">
          
          <View className="mb-6">
            <Text className="text-xl font-black text-slate-800">Create New Appointment</Text>
            <Text className="text-xs font-medium text-slate-400 mt-0.5">Fill up with proper info</Text>
          </View>

          {/* Title Input */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Appointment Title</Text>
            <View className="flex-row items-center bg-white px-4 rounded-xl border border-slate-100 shadow-sm">
              <Ionicons name="bookmark-outline" size={18} color="#64748b" />
              <TextInput
                placeholder="e.g., General Consultation"
                value={title}
                onChangeText={setTitle}
                className="flex-1 text-sm text-slate-800 py-3.5 ml-2.5 font-medium"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Start Date Picker */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Start Date</Text>
            <Pressable 
              onPress={() => setShowDatePicker(true)}
              className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm active:bg-slate-50"
            >
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={18} color="#64748b" />
                <Text className="text-sm ml-2.5 text-slate-800 font-medium">{formatDate(startDate)}</Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </Pressable>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          {/* Time Pickers Row */}
          <View className="flex-row mb-1">
            {/* Start Time */}
            <View className="flex-1 mr-2">
              <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Start Time</Text>
              <Pressable 
                onPress={() => setShowStartTimePicker(true)}
                className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm active:bg-slate-50"
              >
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={18} color="#64748b" />
                  <Text className="text-sm ml-2 text-slate-800 font-medium">{formatTime(startTime)}</Text>
                </View>
              </Pressable>
            </View>

            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, selectedTime) => {
                  setShowStartTimePicker(false);
                  if (selectedTime) setStartTime(selectedTime);
                }}
              />
            )}

            {/* End Time */}
            <View className="flex-1">
              <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">End Time</Text>
              <Pressable 
                onPress={() => setShowEndTimePicker(true)}
                className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm active:bg-slate-50"
              >
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={18} color="#64748b" />
                  <Text className="text-sm ml-2 text-slate-800 font-medium">{formatTime(endTime)}</Text>
                </View>
              </Pressable>
            </View>

            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, selectedTime) => {
                  setShowEndTimePicker(false);
                  if (selectedTime) setEndTime(selectedTime);
                }}
              />
            )}
          </View>

          {/* Dynamic Dropdown Selectors */}
          <View className="mt-3">
            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Provider / Doctor</Text>
            <Pressable onPress={() => openDropdown('Select Provider', providersList, 'provider')} className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm mb-4">
              <Text className={`text-sm ${provider.includes('Select') ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>{provider}</Text>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </Pressable>

            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Client / Patient</Text>
            <Pressable onPress={() => openDropdown('Select Client', clientsList, 'client')} className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm mb-4">
              <Text className={`text-sm ${client.includes('Select') ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>{client}</Text>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </Pressable>

            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Appointment Type</Text>
            <Pressable onPress={() => openDropdown('Select Appointment Type', appointmentTypesList, 'type')} className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm mb-4">
              <Text className={`text-sm ${type.includes('Select') ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>{type}</Text>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </Pressable>

            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Contact Method</Text>
            <Pressable onPress={() => openDropdown('Select Contact Method', contactMethodsList, 'method')} className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm mb-4">
              <Text className={`text-sm ${method.includes('Select') ? 'text-slate-400' : 'text-slate-800 font-medium'}`}>{method}</Text>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </Pressable>

            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Appointment Status</Text>
            <Pressable onPress={() => openDropdown('Select Appointment Status', statusList, 'status')} className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-xl border border-slate-100 shadow-sm mb-6">
              <Text className="text-sm text-slate-800 font-medium">{status}</Text>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </Pressable>
          </View>

          {/* Description Field */}
          <View className="mb-8">
            <Text className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Description / Notes</Text>
            <View className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
              <TextInput
                placeholder="Add medical notes or symptoms..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="text-sm text-slate-800 font-medium h-24"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-4 items-center">
            <Pressable onPress={() => router.back()} className="flex-1 bg-slate-100 active:bg-slate-200 py-4 rounded-xl items-center mr-3">
              <Text className="text-slate-600 font-bold text-sm">Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSave} className="flex-2 bg-blue-600 active:bg-blue-700 py-4 rounded-xl items-center flex-row justify-center px-8 flex-grow">
              <Text className="text-white font-bold text-sm">Save Appointment</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>

      {/* Smart Bottom Sheet Dropdown Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl max-h-[50%] p-5">
            <View className="flex-row justify-between items-center pb-4 border-b border-slate-100 mb-2">
              <Text className="text-base font-bold text-slate-800">{modalTitle}</Text>
              <Pressable onPress={() => setModalVisible(false)} className="p-1">
                <Ionicons name="close" size={22} color="#64748b" />
              </Pressable>
            </View>
            
            <FlatList
              data={modalData}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable 
                  onPress={() => handleSelectValue(item)}
                  className="py-4 border-b border-slate-50 active:bg-slate-50 px-2 flex-row justify-between items-center"
                >
                  <Text className="text-sm text-slate-700 font-medium">{item}</Text>
                  {/* যদি আগে থেকে সিলেক্ট করা থাকে তবে টিক মার্ক দেখাবে */}
                  {(provider === item || client === item || type === item || method === item || status === item) && (
                    <Ionicons name="checkmark-sharp" size={18} color="#2563eb" />
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}