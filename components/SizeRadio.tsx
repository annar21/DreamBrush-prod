import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

interface SizeRadioProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const SizeRadio = ({selectedSize, setSelectedSize}: SizeRadioProps) => {
  const sizes = ["1024x1024", "1024x1792", "1792x1024"];
  const blockSizes = [
    {width: 25, height: 25},
    {width: 18, height: 25},
    {width: 25, height: 18},
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{gap: 10}}
    >
      {sizes.map((size, index) => (
        <TouchableOpacity
          style={[
            {flexDirection: 'row', alignItems: 'center', gap: 5, padding: 10, borderRadius: 10, backgroundColor: 'white'},
            selectedSize === size && {borderWidth: 1.5, borderColor: '#6B5FF0', backgroundColor: '#D5D3F8'}
          ]}
          onPress={() => setSelectedSize(size)}
        >
          <View style={[
            {width: blockSizes[index].width, height: blockSizes[index].height, borderColor: '#6B5FF0', borderWidth: 1.5, backgroundColor: '#D5D3F8', borderRadius: 2},
            selectedSize === size && {backgroundColor: '#6B5FF0'}
          ]} />
          <Text style={[
            {fontSize: 14, fontWeight: 600},
            selectedSize === size && {color: '#6B5FF0'}
          ]}>{size}</Text>
        </TouchableOpacity>
      ))} 
    </ScrollView>
  )
}

export default SizeRadio