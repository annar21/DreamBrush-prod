import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

interface ProfileLinkProps {
  icon: React.ReactNode | (() => React.ReactNode);
  title: string;
  onPress: () => void;
}

const ProfileLink = ({icon, title, onPress}: ProfileLinkProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20,}}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <View>{icon && typeof icon === 'function' ? icon() : icon}</View>
        <View><Text style={{color: '#5D6371'}}>{title}</Text></View>
      </View>

      <View>
        <Icon name="chevron-right" size={12} color="#5D6371" />
      </View>
    </TouchableOpacity>
  );
}

export default ProfileLink;