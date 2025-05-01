import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useRoute } from '@react-navigation/native'
import UpgradePlanModal from './UpgradePlanModal'

const Header = () => {
  const route = useRoute();
  const [visible, setVisible] = useState<boolean>(false);

  if(route.name === '(explore)/style' || route.name === '(profile)/edit') return null;

  // useEffect(() => {console.log(route.name)}, [route])

  return (
    <View style={{backgroundColor: '#fff', paddingBottom: 10, paddingHorizontal: 15, paddingTop: 40, }}>

      <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',}}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 700}}>{route.name === '(tabs)/albums' ? 'Albums' : 'DreamBrush'}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15}}>
            <View>
              {/* <Icon name="star" size={25} color="#333" /> */}
            </View> 

            <View style={{backgroundColor: '#E4DFFD', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20}}>
              <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={() => setVisible(true) }>
                <Text style={{textAlign: 'center', color: '#6B5FF0', fontWeight: 600}}>✨UPGRADE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F5F8', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity 
              style={{width: 48, height: 48, justifyContent: 'center', alignItems: 'center'}} 
              onPress={() => {}}
            >
              <Icon name="user" size={20} />
            </TouchableOpacity>
          </View>


        </View>

      </View>

      {route.name === '(explore)/explore' && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
          <View style={{width: '85%'}}>
            <TextInput 
              placeholder='Search...'
              style={{backgroundColor: '#F1F4F9', paddingLeft: 10, borderRadius: 15, paddingVertical: 15}}
            />
          </View>
          <TouchableOpacity style={{width: 48, height: 48, borderRadius: 24, backgroundColor: '#6B5FF0', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
            <Icon name="search" size={18} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <UpgradePlanModal visible={visible} setVisible={setVisible} />
    </View>
  );
}

export default Header;