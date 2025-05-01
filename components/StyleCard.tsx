import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
// import { router } from 'expo-router/build/imperative-api';

interface StyleCardProps {
  image: React.ReactNode | (() => React.ReactNode);
  title: string;
  redirect?: boolean;
  onPress?: () => void;
  additionalStyle?: StyleProp<ViewStyle>; 
  textAdditionalStyle?: StyleProp<TextStyle>;
}


const StyleCard = ({image, title, redirect=true, onPress, additionalStyle, textAdditionalStyle}: StyleCardProps) => {

  const router = useRouter();
  return (
    <TouchableOpacity 
      style={[
        {borderRadius: 10, padding: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'},
        additionalStyle,
      ]}
      onPress={() => {
        if(redirect) {
          router.push({
            pathname: '/(tabs)/(explore)/style',
            params: {title}
          });
        }

        if(onPress) onPress();

      }}
    >
      <View style={{overflow: 'hidden', borderRadius: 10}}>
        {image && typeof image === 'function' ? image() : image}
      </View>
      <Text style={[
        {color: '#000', fontWeight: 600},
        textAdditionalStyle,
      ]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default StyleCard;