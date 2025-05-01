import { View, Text, TextInput, ScrollView } from "react-native";

export default function GenerateScreen() {
  return (
    <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#F1F4F9', paddingTop: 25, paddingHorizontal: 20}}>
      <View>
        <Text style={{fontSize: 22, fontWeight: 600, marginBottom: 15}}>Generate an AI image</Text>
        <TextInput 
          style={{
            backgroundColor: '#fff',
            height: 150, 
            verticalAlign: 'top',
            borderRadius: 5
          }}
          placeholder="Enter an image prompt..."
          multiline
        />
      </View>
    </ScrollView>
  );
}