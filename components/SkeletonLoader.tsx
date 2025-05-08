import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

interface SkeletonLoaderProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: object;
    speed?: number;
    backgroundColor?: string;
    highlightColor?: string;
}

const SkeletonLoader = ({
                            width = 150,
                            height = 150,
                            borderRadius = 16,
                            style = {},
                            speed = 800,
                            backgroundColor = '#e1e1e1',
                            highlightColor = '#f5f5f5'
                        }: SkeletonLoaderProps) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: speed,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: speed,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100],
    });

    return (
        <View
            style={[
                styles.container,
                { width: typeof width === 'string' ? parseFloat(width) : width, height, borderRadius, backgroundColor, overflow: 'hidden' },
                style,
            ]}
        >
            <Animated.View
                style={[
                    // styles.shimmer,
                    {
                        transform: [{ translateX }],
                        backgroundColor: highlightColor,
                    },
                ]}
            >
                <LinearGradient
                    colors={['#e0e0e0', '#f0f0f0', '#e0e0e0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        // borderRadius: 8,
                    }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        overflow: 'hidden',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
});

export default SkeletonLoader;
