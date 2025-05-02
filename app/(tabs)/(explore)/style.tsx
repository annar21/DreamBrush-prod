import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function StyleDetail() {
  const { title } = useLocalSearchParams();
  

  return (
    <View style={{backgroundColor: '#F1F4F9', flex: 1}}>
      <View style={{paddingTop: 35, paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, marginBottom: 10}}>
        <TouchableOpacity 
        
          onPress={() => router.back()}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        
        <View>
          <Text style={{textAlign: 'center', fontSize: 22, fontWeight: 500}}>{title}</Text>
          <Text style={{color: '#8D90A7'}}>Images in {title} style.</Text>
        </View>

        <TouchableOpacity>
          <Icon name="share-alt" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: '#F1F4F9'}}>
        
      </ScrollView>
    </View>
  );

}