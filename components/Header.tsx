import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import { useRoute } from '@react-navigation/native'

import UpgradePlanModal from './UpgradePlanModal'
import { router, usePathname } from 'expo-router'
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

const Header = () => {
  // const route = useRoute();
  const [visible, setVisible] = useState<boolean>(false);
  const route = useRoute();
  const pathname = usePathname();

  // if(route.name === '(explore)/style' || route.name === '(profile)/screens/edit' || route.name === '/(tabs)/(albums)/screens/album-detail') return null;
  // switch(pathname) {
  //   case 'screens/style':
  //     return null;
  // }
  // useEffect(() => {console.log(route.name)}, [route.name]);

  const hiddenPaths = [
    '/screens/style',
    '/screens/edit',
    '/screens/album-detail',
  ];

  useEffect(() => {
    console.log('Pathname:', pathname);
  }, [pathname]);

  if(hiddenPaths.includes(pathname)) return null;
  return (
    <LinearGradient 
      colors={['#64338f', '#7b31bd', ]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{backgroundColor: '#fff', paddingBottom: 10, paddingHorizontal: 15, paddingTop: 40, }}
    >

      <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',}}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 700, color: '#fff'}}>DreamBrush</Text>
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

          <View style={{width: 48, height: 48, borderRadius: 24, backgroundColor: '#E4DFFD', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: 48, height: 48, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                if(route.name !== "(profile)") router.push('/(tabs)/(profile)')
              }}
            >
              <Icon name="user" size={20} color={"#452362"} />
            </TouchableOpacity>
          </View>


        </View>

      </View>

      {/* {route.name === '(explore)' && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingBottom: 10}}>
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
      )} */}

      <UpgradePlanModal visible={visible} setVisible={setVisible} />
    </LinearGradient>
  );
}

export default Header;
