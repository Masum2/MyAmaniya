import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

// কাস্টম ড্রয়ার কন্টেন্ট
function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      {/* ডিফল্ট মেনু আইটেমগুলো (Dashboard, Appointment, etc) */}
      <DrawerItemList {...props} />
      
      {/* প্রোফাইল মেনু */}
      <DrawerItem
        label="Profile"
        icon={({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />}
        onPress={() => router.push('/(main)/profile')}
      />
      
      {/* লগআউট মেনু */}
      <DrawerItem
        label="Logout"
        labelStyle={{ color: '#ef4444' }} // লাল কালার
        icon={({ size }) => <Ionicons name="log-out-outline" size={size} color="#ef4444" />}
        onPress={() => router.replace('/(auth)')} // লগইন পেজে নিয়ে যাবে
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerShown: false,
        drawerActiveTintColor: '#2563eb',
      }}
    >
      {/* আপনার আগের মেনু আইটেমগুলো এখানে থাকবে */}
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Home', drawerIcon: ({color}) => <Ionicons name="home" size={20} color={color}/> }} />
      <Drawer.Screen name="(tabs)/appointment" options={{ drawerLabel: 'Appointments', drawerIcon: ({color}) => <Ionicons name="calendar" size={20} color={color}/> }} />
      <Drawer.Screen name="(tabs)/treatment" options={{ drawerLabel: 'Treatments', drawerIcon: ({color}) => <Ionicons name="medical" size={20} color={color}/> }} />
    </Drawer>
  );
}