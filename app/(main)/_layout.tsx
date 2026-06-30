import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <DrawerContentScrollView {...props} className={isDark ? 'bg-[#121212]' : 'bg-white'}>
      <View className="mt-4">
        <DrawerItemList 
          {...props} 
          activeTintColor="#2563eb"
          inactiveTintColor={isDark ? '#d1d5db' : '#374151'}
        />
      </View>

      <DrawerItem
        label="Appointments"
        labelStyle={{ color: isDark ? '#d1d5db' : '#374151' }}
        icon={({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={isDark ? '#d1d5db' : '#374151'} />
        )}
        onPress={() => router.push('/(main)/(tabs)/appointment')}
      />

      <DrawerItem
        label="Treatments"
        labelStyle={{ color: isDark ? '#d1d5db' : '#374151' }}
        icon={({ color, size }) => (
          <Ionicons name="medical-outline" size={size} color={isDark ? '#d1d5db' : '#374151'} />
        )}
        onPress={() => router.push('/(main)/(tabs)/treatment')}
      />

      {/* <DrawerItem
        label="Profile"
        labelStyle={{ color: isDark ? '#d1d5db' : '#374151' }}
        icon={({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={isDark ? '#d1d5db' : '#374151'} />
        )}
        onPress={() => router.push('/(main)/profile')}
      /> */}

      <DrawerItem
        label="Logout"
        labelStyle={{ color: '#ef4444' }}
        icon={({ size }) => (
          <Ionicons name="log-out-outline" size={size} color="#ef4444" />
        )}
        onPress={() => {
          logout();
          router.replace('/(auth)');
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#2563eb',
        drawerStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
          width: 280,
        },
        drawerInactiveTintColor: isDark ? '#d1d5db' : '#374151',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}