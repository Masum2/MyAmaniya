
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

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <View className="w-full h-64 bg-slate-50 items-center justify-center relative overflow-hidden border-b border-slate-100">
            {/* ব্যাকগ্রাউন্ড ওয়াশমার্ক বা ফিল্টার ইফেক্ট */}
            <View className="absolute inset-0 bg-slate-100/50 opacity-60" />
            
            {/* লোগো কন্টেইনার */}
            <View className="z-10 w-24 h-24 bg-white rounded-3xl items-center justify-center shadow-sm border border-slate-100/80 p-2">
              <Image 
                source={{ uri: "https://amaniyatest.azurewebsites.net/favicon.png" }} 
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          </View>

          {/* ================= BODY SECTION (FORMS) ================= */}
          <View className="flex-1 px-6 justify-center py-8">
            <Text className="text-xl font-extrabold text-slate-800 mb-6 text-center tracking-tight">
              Enter MyAmaniya Credentials
            </Text>

            {/* ইউজারনেম ফিল্ড */}
            <View className="mb-3.5">
              <TextInput
                placeholder="Username"
                placeholderTextColor="#94a3b8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-slate-800 font-medium shadow-sm shadow-slate-100/50"
              />
            </View>

            {/* পাসওয়ার্ড ফিল্ড */}
            <View className="mb-4">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-slate-800 font-medium shadow-sm shadow-slate-100/50"
              />
            </View>

            {/* লগইন বাটন */}
            <TouchableOpacity 
              activeOpacity={0.8}
              className="w-full h-12 bg-blue-600 rounded-xl items-center justify-center shadow-md shadow-blue-600/10"
            >
              <Text className="text-white text-base font-bold">
                Login
              </Text>
            </TouchableOpacity>

            {/* ফরগট পাসওয়ার্ড লিংক */}
            <View className="items-center mt-4">
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-blue-600">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ================= FOOTER SECTION ================= */}
          <View className="pb-8 pt-4 border-t border-slate-50">
            <View className="flex-row items-center justify-center gap-3">
              {/* ছোট ব্র্যান্ড আইকন */}
              <View className="w-10 h-10 bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                <Image 
                  source={{ uri: "https://amaniyatest.azurewebsites.net/favicon.png" }} 
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              
              {/* ব্র্যান্ড টেক্সট কলাম */}
              <View className="items-start">
                <Text className="text-sm font-black text-slate-800 tracking-tight">
                  MyAmaniya
                </Text>
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