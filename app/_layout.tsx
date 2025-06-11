// app/(tabs)/_layout.tsx
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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
      {/* Sửa lại tên screen từ 'index' thành 'dashboard' để làm màn hình chính */}
      <Tabs.Screen
        name="dashboard" // <-- Đổi thành 'dashboard'
        options={{
          title: 'Dashboard', // <-- Đổi title
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.pie.fill" color={color} />, // Icon mới
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      {/* Ẩn màn hình index cũ đi vì chúng ta không dùng nữa */}
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Thêm dòng này để ẩn tab
        }}
      />
    </Tabs>
  );
}