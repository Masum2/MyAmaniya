import React, { useState } from "react";
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  StatusBar
} from "react-native";
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // লগইন সফল হলে ড্যাশবোর্ডে নিয়ে যাবে
    router.replace('/(main)/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between">
          
          {/* ================= HERO SECTION ================= */}
          <View className="w-full h-72 bg-blue-50 items-center justify-center relative overflow-hidden border-b border-blue-100">
            <View className="absolute -top-16 -right-16 w-64 h-64 bg-blue-100 rounded-full opacity-50" />
            <View className="absolute top-20 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-30" />
            
            <View className="z-10 w-32 h-32 bg-white rounded-full items-center justify-center shadow-lg shadow-blue-200/50 border-4 border-white">
              <Image 
                source={require('../../assets/logo.png')} 
                className="w-24 h-24"
                resizeMode="contain"
              />
            </View>
            
            <Text className="z-10 mt-4 text-blue-900 font-bold text-xl tracking-wide">
              Welcome To MyAmaniya
            </Text>
          </View>

          {/* ================= BODY SECTION (FORMS) ================= */}
          <View className="flex-1 px-6 justify-center py-8">
            <Text className="text-xl font-extrabold text-slate-800 mb-6 text-center tracking-tight">
              Login to MyAmaniya
            </Text>

            {/* Username Field */}
            <View className="mb-4">
              <TextInput
                placeholder="Username or Email"
                placeholderTextColor="#94a3b8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-slate-800 font-medium shadow-sm focus:border-blue-500 focus:bg-white"
              />
            </View>

            {/* Password Field */}
            <View className="mb-6">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-slate-800 font-medium shadow-sm focus:border-blue-500 focus:bg-white"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              onPress={handleLogin}
              activeOpacity={0.8}
              className="w-full h-14 bg-blue-900 rounded-2xl items-center justify-center shadow-lg shadow-blue-900/30"
            >
              <Text className="text-white text-[16px] font-bold tracking-wide">
                Login
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <View className="items-center mt-4">
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-blue-600">Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= FOOTER SECTION ================= */}
         {/* ================= FOOTER SECTION ================= */}
<View className="pb-8 pt-4 border-t border-slate-50">
  <View className="flex-row items-center justify-center gap-3">
    
    {/* ইমেজ কন্টেইনার - ফিক্সড সাইজ এবং সেন্টারড */}
    <View className="w-12 h-12 bg-slate-50 rounded-xl items-center justify-center border border-slate-100 overflow-hidden">
      <Image 
        source={require('../../assets/beraten1.png')} 
        className="w-14 h-14"
        resizeMode="contain"
      />
    </View>
    
    {/* টেক্সট কন্টেইনার - ভার্টিক্যালি সেন্টারড */}
    <View className="justify-center">
      <Text className="text-sm font-black text-slate-800 tracking-tight">MyAmaniya</Text>
      <Text className="text-[11px] font-bold text-blue-600 tracking-wide mt-0.5">
        A safe space built for care, records, and progress.
      </Text>
      <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
        ALL RIGHTS RESERVED © 2026
      </Text>
    </View>
    
  </View>
</View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}