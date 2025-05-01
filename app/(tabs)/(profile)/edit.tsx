import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function EditProfile() {
  const [name, setName] = useState<string>('Narek');
  const [surname, setSurname] = useState<string>('Ananyan');
  const [nickname, setNickname] = useState<string>('narek_08');

  return (
    <View style={{ backgroundColor: '#fff', flex: 1,  }}>
      
      <View style={{  paddingHorizontal: 20, paddingTop: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 }}>  
        <TouchableOpacity onPress={() => router.back()}><Icon name="arrow-left" size={20} color="000" /></TouchableOpacity>
        <View><Text style={{fontSize: 22, fontWeight: 500}}>Edit Profile</Text></View>
        <View></View>
      </View>

      <View style={{ paddingHorizontal: 20}}>

        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15}}>
          <View style={{width: 120, height: 120, borderRadius: '50%', backgroundColor: '#000'}}></View>
          <View>
            <Text style={{fontSize: 10, color: '#8D90A7', fontWeight: 500, marginBottom: 10}}>PICTURE IDEAS</Text>
            <View style={{flexDirection: 'row', gap: 10, paddingBottom: 10}}>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', gap: 10, paddingBottom: 10}}>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
              <TouchableOpacity style={{width: 40, height: 40, borderRadius: '50%',backgroundColor: 'red'}}></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{gap: 15, marginTop: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput 
              placeholder='Name...'
              value={name}
              onChangeText={setName}
              style={{backgroundColor: '#F1F4F9', paddingLeft: 10, borderRadius: 15, paddingVertical: 15, width: '48%'}}
            />
            <TextInput 
              placeholder='Surname...'
              value={surname}
              onChangeText={setSurname}
              style={{backgroundColor: '#F1F4F9', paddingLeft: 10, borderRadius: 15, paddingVertical: 15, width: '48%'}}
            />
          </View>
          <TextInput 
            placeholder='Nickname...'
            value={nickname}
            onChangeText={setNickname}
            style={{backgroundColor: '#F1F4F9', paddingLeft: 10, borderRadius: 15, paddingVertical: 15, }}
          />
          {/* select language... */}
        </View>

        <TouchableOpacity style={{backgroundColor: '#6F61EF', paddingVertical: 15, borderRadius: 30, marginTop: 45}}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: 600}}>Save Changes</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}