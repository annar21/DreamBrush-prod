import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5'
import StyleCard from '@/components/StyleCard';
import RadioButtons from '@/components/RadioButtons';


// bg - F1F4F9, chevron-right   
// dark purple - 6B5FF0
// light purple - D5D3F8
// dark gray - 5D6371 
// light gray - E5E5E7
// 

const ExplorePage = () => {
  const [filter, setFilter] = React.useState<string | null>('TOP');

  return (
    <SafeAreaView style={{backgroundColor: '#F1F4F9', height: '100%'}}>
      <ScrollView>
        <View style={{padding: 15, paddingTop: 10}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View><Text style={{color: "#5D6371", fontWeight: 600, fontSize: 15}}>Images by Style</Text></View>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 8, justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
              <Text style={{color: '#6B5FF0', fontWeight: 600, fontSize: 14}}>SEE ALL</Text>
              <Icon name="chevron-right" size={12} color="#6B5FF0" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row', gap: 10, marginTop: 10}}>
          <StyleCard image={<View style={{width: 80, height: 90, backgroundColor: 'red'}}></View>} title='image' />
          <StyleCard image={<View style={{width: 80, height: 90, backgroundColor: 'red'}}></View>} title='image' />
          <StyleCard image={<View style={{width: 80, height: 90, backgroundColor: 'red'}}></View>} title='image' />
          <StyleCard image={<View style={{width: 80, height: 90, backgroundColor: 'red'}}></View>} title='image' />
          <StyleCard image={<View style={{width: 80, height: 90, backgroundColor: 'red'}}></View>} title='image' />
          <StyleCard image={<View style={{width: 80, height: 90, backgroundColor: 'red'}}></View>} title='image' />
        </ScrollView>
        
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <RadioButtons 
            options={['TOP', 'NEW']}
            selectedOption={filter}
            onSelect={(option) => setFilter(option)}
          />
        </View>

        {/* <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text>
        <Text style={{fontSize: 90}}>dfweg</Text> */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ExplorePage;