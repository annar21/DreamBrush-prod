import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router/build/imperative-api';

interface StyleCardProps {
  image: React.ReactNode | (() => React.ReactNode);
  title: string;
}

const StyleCard = ({image, title}: StyleCardProps) => {
  return (
    <TouchableOpacity 
      style={{borderRadius: 10, padding: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}
      onPress={() => router.push('/(tabs)/(explore)/style')}
    >
      <View style={{overflow: 'hidden', borderRadius: 10}}>
        {image && typeof image === 'function' ? image() : image}
      </View>
      <Text style={{color: '#000', fontWeight: 600}}>{title}</Text>
    </TouchableOpacity>
  );
}

export default StyleCard;