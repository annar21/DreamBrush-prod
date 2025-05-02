import SizeRadio from "@/components/SizeRadio";
import StyleCard from "@/components/StyleCard";
import UpgradePlanModal from "@/components/UpgradePlanModal";
import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";

export default function GenerateScreen() {
  const styles = ["style1", "style2", "style3", "style4", "style5", "style6"];
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("1024x1024");
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {inputRef?.current?.focus()}, [])

  const onPress = (style: string) => {
    setSelectedStyle(style);
  }

  return (
    <ScrollView contentContainerStyle={{backgroundColor: '#F1F4F9', paddingTop: 25, paddingHorizontal: 20}}>
      <View>
        <Text style={{fontSize: 22, fontWeight: 600, marginBottom: 15}}>Generate an AI image</Text>
        <TextInput 
          ref={inputRef}
          style={{
            backgroundColor: '#fff',
            height: 150, 
            verticalAlign: 'top',
            borderRadius: 5,
            paddingLeft: 10
          }}
          placeholder="Enter an image prompt..."
          multiline
        />
      </View>

      <View style={{marginTop: 25}}>
        <Text style={{color: '#8D90A7', fontSize: 16, fontWeight: 500, marginBottom: 10}}>Image style {"(Optional)"}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row', gap: 10}}>
          {styles.map((style) => 
            <StyleCard 
              key={style}
              redirect={false} 
              title={style} 
              image={() => <View style={{width: 100, height: 100, backgroundColor: 'red'}} />}
              onPress={() => onPress(style)} 
              additionalStyle={ style === selectedStyle && {borderWidth: 1, borderColor: '#6B5FF0', backgroundColor: '#D5D3F8'} }
              textAdditionalStyle={ style === selectedStyle && {color: '#6B5FF0'} }
            /> 
          )}
        </ScrollView>
      </View>

      <View style={{marginTop: 35}}>
        <Text style={{color: '#8D90A7', fontSize: 16, fontWeight: 500, marginBottom: 10}}>Image Size</Text>
        <SizeRadio 
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </View>

      <TouchableOpacity 
        style={{marginTop: 30, padding: 10, backgroundColor: '#D5D3F8', borderRadius: 40}}
          onPress={() => setVisible(true)}
      >
        <Text style={{color: '#6B5FF0', fontSize: 14, fontWeight: 500, textAlign: 'center'}}>✨ Upgrade to Unlock Unlimited Images!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: '#6B5FF0', padding: 15, borderRadius: 40, marginTop: 25}}
      >
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 600, textAlign: 'center'}}>Generate Image</Text>
      </TouchableOpacity>

      <Text style={{textAlign: 'center', color: '#8D90A7', fontWeight: 500, marginTop: 10, marginBottom: 25}}>10/10 Images Remaining This Week</Text>
      
      
      
      <UpgradePlanModal visible={visible} setVisible={setVisible} />
    </ScrollView> 
  );
}