import { View, TouchableOpacity, Text, Animated, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useEffect, useRef } from 'react';
import mone_logo from '../assets/images/mone_logo.png'

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -15,
            duration: 600,
            delay: 5000,
            useNativeDriver: false,
          }),
          Animated.timing(rotate, {
            toValue: .03,
            duration: 600,
            delay: 5000,
            useNativeDriver: false,
          }),
        ]),
        Animated.timing(rotate, {
          toValue: -.03,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
          }),
          Animated.timing(rotate, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
          }),
        ])
      ])
    ).start();
  }, []);
  

  return (
    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#452362' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // const label = options.tabBarLabel ?? route.name;
        const label = options.title;
        const isFocused = state.index === index;
        let iconName: string;

        switch(label) {
          case 'Home':
            iconName = 'home'
            break;
          case 'Explore':
            iconName = 'th-large'
            break;
          case 'Albums':
            iconName = 'images'
            break;
          case 'Profile':
            iconName = 'user-alt'
            break;
        }

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              { flex: 1, alignItems: 'center', padding: 10 },
            ]}
          >
            {
            label !== 'Generate' ? 
              (
                <>
                  <Icon name={iconName!} size={18} color={isFocused ? '#6f61ef' : '#fff'} style={{marginBottom: 3}} />
                  <Text style={[
                    {fontSize: 12},
                    { color: isFocused ? '#6f61ef' : '#fff' }
                  ]}>
                    {label} 
                  </Text>
                </>
              ) : (
                <Animated.View style={[
                  {width: 65, height: 65, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', position: 'relative', bottom: 35},
                  {transform: [{translateY: translateY}, {rotate: rotateInterpolate}]}
                ]}>
                  {/* <Text style={{textAlign: 'center'}}>✨</Text> */}
                  <Image source={mone_logo} style={{width: 50, height: 50}} />
                </Animated.View>
              )
            }
            
          </TouchableOpacity>
        );
      })}
    </View>
  );
}