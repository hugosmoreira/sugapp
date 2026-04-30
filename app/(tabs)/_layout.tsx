/**
 * Tab Layout — Bottom tab navigation
 * Home | Events | News | Athletes
 */
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/constants/theme';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: {
  name: string;
  title: string;
  iconFocused: IoniconsName;
  iconDefault: IoniconsName;
}[] = [
  {
    name: 'index',
    title: 'HOME',
    iconFocused: 'home',
    iconDefault: 'home-outline',
  },
  {
    name: 'events',
    title: 'EVENTS',
    iconFocused: 'calendar',
    iconDefault: 'calendar-outline',
  },
  {
    name: 'news',
    title: 'NEWS',
    iconFocused: 'newspaper',
    iconDefault: 'newspaper-outline',
  },
  {
    name: 'athletes',
    title: 'ATHLETES',
    iconFocused: 'people',
    iconDefault: 'people-outline',
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.iconDefault}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
