import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/Header';
import BottomTabBar from '@/components/BottomTabBar';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function TabLayout() {
    // const colorScheme = useColorScheme();

    // return (

    return (
        <Tabs
            screenOptions={{
                header: () => <Header />,
                // tabBarActiveTintColor: '#6f61ef',
                // tabBarInactiveTintColor: '#8d90a7'
            }}
            tabBar={(props: any) => <BottomTabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="(explore)" options={{ title: 'Explore' }} />
            <Tabs.Screen name="generate" options={{ title: 'Generate' }} />
            <Tabs.Screen name="(albums)" options={{ title: 'Albums' }} />
            <Tabs.Screen name="(profile)" options={{ title: 'Profile' }} />
        </Tabs>
    )
    //     <Tabs
    //         screenOptions={{
    //             tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //             header: () => <Header />,
    //             tabBarButton: HapticTab,
    //             tabBarBackground: TabBarBackground,
    //             tabBarStyle: Platform.select({
    //                 ios: {
    //                     position: 'absolute',
    //                     height: 60, // Match the screenshot's height
    //                     borderTopWidth: 1,
    //                     borderTopColor: '#ddd',
    //                     backgroundColor: '#fff',
    //                 },
    //                 default: {
    //                     height: 60,
    //                     borderTopWidth: 1,
    //                     borderTopColor: '#ddd',
    //                     backgroundColor: '#fff',
    //                 },
    //             }),
    //         }}
    //     >
    //         <Tabs.Screen
    //             name="index"
    //             options={{
    //                 title: 'Home',
    //                 tabBarIcon: ({ color }) => <IconSymbol size={22} name="house.fill" color={color} />,
    //             }}
    //         />
    //         <Tabs.Screen
    //             name="explore"
    //             options={{
    //                 title: 'Explore',
    //                 tabBarIcon: ({ color }) => <IconSymbol size={22} name="paperplane.fill" color={color} />,
    //             }}
    //         />
    //         <Tabs.Screen
    //             name="generate"
    //             options={{
    //                 title: '',
    //                 tabBarIcon: ({ color, focused }) => (
    //                     <View style={[styles.centralTab, focused && styles.centralTabActive]}>
    //                         <IconSymbol size={26} name="sparkles" color={focused ? '#fff' : color} />
    //                     </View>
    //                 ),
    //                 tabBarLabel: () => null, // Hide label for the central tab
    //             }}
    //         />
    //         <Tabs.Screen
    //             name="albums"
    //             options={{
    //                 title: 'Albums',
    //                 tabBarIcon: ({ color }) => <IconSymbol size={22} name="photo.fill.on.rectangle.fill" color={color} />,
    //             }}
    //         />
    //         <Tabs.Screen
    //             name="profile"
    //             options={{
    //                 title: 'Profile',
    //                 tabBarIcon: ({ color }) => <IconSymbol size={22} name="person.fill" color={color} />,
    //             }}
    //         />
    //     </Tabs>
    // );
}

// const styles = StyleSheet.create({
//     centralTab: {
//         marginTop: -30, // Overlap the main content
//         backgroundColor: '#666', // Inactive state
//         borderRadius: 20,
//         padding: 10,
//     },
//     centralTabActive: {
//         backgroundColor: '#6200ea', // Active state (purple)
//         borderWidth: 2,
//         borderColor: '#fff',
//     },
// });
