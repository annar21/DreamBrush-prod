import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import DraggableBottomModal from './DraggableBottomModal';

interface UpgradePlanModalProps {
  visible: boolean; 
  setVisible: (visible: boolean) => void;
}


// bg - F1F4F9, chevron-right   
// dark purple - 6B5FF0
// light purple - D5D3F8
// dark gray - 5D6371 
// light gray - E5E5E7
const UpgradePlanModal = ({visible, setVisible}: UpgradePlanModalProps) => {
  return (
    <DraggableBottomModal visible={visible} setVisible={setVisible}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        <View style={{backgroundColor: '#D5D3F8', padding: 8, paddingHorizontal: 15, borderRadius: 25}}>
          <Text style={{color: "#6B5FF0", fontWeight: 600, textAlign: 'center', fontSize: 12}}>UPGRADE TO PRO</Text>
        </View>

        <Text style={{fontSize: 20, fontWeight: 700, textAlign: 'center', marginVertical: 10}}>
          Increased Limit, Private Images, and more with Pro!
        </Text>

        <View style={{marginTop: 20, gap: 10}}>

          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center',}}> 
            <View style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: '#D5D3F8'}}></View>
            <View><Text style={{color: '#69707A', fontWeight: 600}}>100 Image Generations Per Week</Text></View>
          </View>

          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center',}}> 
            <View style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: '#D5D3F8'}}></View>
            <View><Text style={{color: '#69707A', fontWeight: 600}}>Hide Images From Public View</Text></View>
          </View>

          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center',}}> 
            <View style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: '#D5D3F8'}}></View>
            <View><Text style={{color: '#69707A', fontWeight: 600}}>View Public Image Prompts</Text></View>
          </View>

          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center',}}> 
            <View style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: '#D5D3F8'}}></View>
            <View><Text style={{color: '#69707A', fontWeight: 600}}>Save AI Images</Text></View>
          </View>

        </View>

        <View style={{marginTop: 20, gap: 10, borderColor: '#E6E6E6', borderWidth: 2, padding: 20, borderRadius: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 700}}>Pro Monthly - $8.99</Text>
          <TouchableOpacity style={{backgroundColor: '#D5D3F8', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, width: '100%', alignItems: 'center'}} onPress={() => {}}>
            <Text style={{color: '#6B5FF0', fontSize: 16, fontWeight: 600}}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20, borderColor: '#6B5FF0', borderWidth: 2, padding: 20, borderRadius: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 700, marginBottom: 5}}>Pro Annual - $89.99</Text>
          <Text style={{color: '#6B5FF0', fontSize: 12, fontWeight: 600, marginBottom: 12}}>TWO MONTHS FREE</Text>
          <TouchableOpacity style={{backgroundColor: '#6B5FF0', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, width: '100%', alignItems: 'center'}} onPress={() => {}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 600}}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{marginTop: 20}} onPress={() => setVisible(false)}>
          <Text style={{color: '#69707A', fontWeight: 600}}>Nevermind, I'll stick with limits.</Text>
        </TouchableOpacity>

      </View>
    </DraggableBottomModal>
  )
}

export default UpgradePlanModal