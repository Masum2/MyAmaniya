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
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useLogin } from "../../hooks/useLogin";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");

  // TanStack Query Mutation
  const { mutate, isPending } = useLogin();
const setAuth = useAuthStore((state) => state.setAuth);
  const handleLogin = () => {
    if (!loginID || !password) {
      Alert.alert("Error", "Please enter both ID and Password");
      return;
    }



    mutate(
      { loginID, password },
      {
        onSuccess: (data) => {
          // ১. ডেটা যদি স্ট্রিং হিসেবে আসে, তবে তাকে Object-এ কনভার্ট করে নেওয়া
          const responseData = typeof data === 'string' ? JSON.parse(data) : data;

          console.log("Parsed Response:", responseData);

          // ২. চেক করা হচ্ছে টোকেন আসলেই আছে কিনা
          if (responseData && responseData.token) {
            
            // ৩. Zustand স্টোরে সেভ করা
            setAuth({
              token: responseData.token,
              user: responseData.user
            });

            console.log("Successfully Saved to Store!");

            // ৪. সফল লগইনের পর নেভিগেশন
            router.replace('/(main)/(tabs)');
            
          } else {
             Alert.alert("Login Error", "Invalid response from server (Token missing).");
          }
        },
        onError: (error: any) => {
          Alert.alert("Login Failed", error.message || "Something went wrong");
        }
      }
    );

  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      className={`${colorScheme} flex-1 bg-white dark:bg-[#121212]`}
    >
      <StatusBar barStyle={colorScheme === 'dark' ? "light-content" : "dark-content"} />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between">
          
          {/* HERO SECTION */}
          <View className="w-full h-72 bg-blue-50 dark:bg-blue-950 items-center justify-center relative overflow-hidden border-b border-blue-100 dark:border-blue-900">
            <View className="absolute -top-16 -right-16 w-64 h-64 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50" />
            <View className="absolute top-20 -left-10 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30" />
            
            <View className="z-10 w-32 h-32 bg-white dark:bg-slate-800 rounded-full items-center justify-center shadow-lg dark:shadow-none border-4 border-white dark:border-slate-700">
              <Image 
                source={require('../../assets/logo.png')} 
                className="w-24 h-24"
                resizeMode="contain"
              />
            </View>
            
            <Text className="z-10 mt-4 text-blue-900 dark:text-blue-100 font-bold text-xl tracking-wide">
              Welcome To MyAmaniya
            </Text>
          </View>

          {/* BODY SECTION */}
          <View className="flex-1 px-6 justify-center py-8">
            <Text className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 text-center tracking-tight">
              Login to MyAmaniya
            </Text>

            <View className="mb-4">
              <TextInput
                placeholder="Login ID"
                placeholderTextColor={colorScheme === 'dark' ? "#475569" : "#94a3b8"}
                value={loginID}
                onChangeText={setLoginID}
                autoCapitalize="none"
                className="w-full h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 text-slate-800 dark:text-white font-medium shadow-sm"
              />
            </View>

            <View className="mb-6">
              <TextInput
                placeholder="Password"
                placeholderTextColor={colorScheme === 'dark' ? "#475569" : "#94a3b8"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                className="w-full h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 text-slate-800 dark:text-white font-medium shadow-sm"
              />
            </View>

            <TouchableOpacity 
              onPress={handleLogin}
              disabled={isPending}
              activeOpacity={0.8}
              className={`w-full h-14 rounded-2xl items-center justify-center shadow-lg shadow-blue-900/30 ${isPending ? 'bg-blue-400' : 'bg-blue-900 dark:bg-blue-600'}`}
            >
              {isPending ? (
                <Text className="text-white text-[16px] font-bold tracking-wide">
                  Login.....
                </Text>
              ) : (
                <Text className="text-white text-[16px] font-bold tracking-wide">
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <View className="items-center mt-4">
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER SECTION */}
          <View className="pb-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <View className="flex-row items-center justify-center gap-3">
              <View className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl items-center justify-center border border-slate-100 dark:border-slate-700 overflow-hidden">
                <Image 
                  source={require('../../assets/beraten1.png')} 
                  className="w-10 h-10" 
                  resizeMode="contain"
                />
              </View>
              <View className="justify-center">
                <Text className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">MyAmaniya</Text>
                <Text className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wide mt-0.5">
                  A safe space built for care, records, and progress.
                </Text>
                <Text className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
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