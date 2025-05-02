import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function AlbumDetail() {
  return (
    <View style={{flex: 1, backgroundColor: '#F1F4F9'}}>
      <View style={{  paddingHorizontal: 20, paddingTop: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 }}>  
        <TouchableOpacity style={{padding: 0, justifyContent: 'center', alignItems: 'center'}} onPress={() => router.back()}><Icon name="arrow-left" size={20} color="000" /></TouchableOpacity>
        <View>
          <Text style={{fontSize: 22, fontWeight: 500, textAlign: 'center'}}>Uncategorized</Text>
          <Text style={{textAlign: 'center'}}>All uncategorized AI images.</Text>
        </View>
        <View></View>
      </View>

      <View style={{paddingHorizontal: 15, paddingTop: 10}}>
        <View style={{height: '90%', backgroundColor: '#fff', borderRadius: 15}}>
          <Text style={{fontSize: 22, fontWeight: 500, textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: [{translateX: '-50%'}, {translateY: '-50%'}]}}>Empty album...</Text>
        </View>
      </View>
    </View>
  )
}