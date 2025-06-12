import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // SỬA ĐỔI Ở ĐÂY:
        // Thay vì thay đổi màu theo theme, chúng ta sẽ cố định màu active
        // để đảm bảo nó luôn hiển thị tốt trên nền sáng của thanh tab.
        tabBarActiveTintColor: Colors.light.tint, 

        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {/* Tab 1: Dashboard */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      {/* Tab 2: Carbon Footprint */}
      <Tabs.Screen
        name="carbon"
        options={{
          title: 'Carbon',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="leaf.fill" color={color} />,
        }}
      />
      {/* Tab 3: Rewards (Ưu đãi) */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Ưu đãi',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gift.fill" color={color} />,
        }}
      />
      <Tabs.Screen name="compensation" options={{ href: null }} /> 
    </Tabs>
  );
}