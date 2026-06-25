import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      {/* Default Drawer Items */}
      <DrawerItemList {...props} />

      {/* Appointment */}
      <DrawerItem
        label="Appointments"
        icon={({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        )}
        onPress={() => router.push('/(main)/(tabs)/appointment')}
      />

      {/* Treatment */}
      <DrawerItem
        label="Treatments"
        icon={({ color, size }) => (
          <Ionicons name="medical-outline" size={size} color={color} />
        )}
        onPress={() => router.push('/(main)/(tabs)/treatment')}
      />

      {/* Profile */}
      <DrawerItem
        label="Profile"
        icon={({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        )}
        onPress={() => router.push('/(main)/profile')}
      />

      {/* Logout */}
      <DrawerItem
        label="Logout"
        labelStyle={{ color: '#ef4444' }}
        icon={({ size }) => (
          <Ionicons
            name="log-out-outline"
            size={size}
            color="#ef4444"
          />
        )}
        onPress={() => router.replace('/(auth)')}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#2563eb',
      }}
    >
      {/* Tabs Group */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => (
            <Ionicons
              name="home-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />

      {/* Profile Screen */}
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color }) => (
            <Ionicons
              name="person-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}