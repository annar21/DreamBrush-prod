import { View, Text, Touchable, TouchableOpacity } from "react-native";

interface AlbumViewProps {
  title: string;
}

export default function AlbumView({title}: AlbumViewProps) {
  return (
    <TouchableOpacity>
      <View style={{width: '48%', aspectRatio: 1, borderRadius: 10, padding: '5%', justifyContent: 'center', alignItems: 'center', position: 'relative', backgroundColor: "#fff"}}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10%'}}>
          <View style={{width: '45%', aspectRatio: 1, backgroundColor: '#F1F4F9', borderRadius: 5}}></View>
          <View style={{width: '45%', aspectRatio: 1, backgroundColor: '#F1F4F9', borderRadius: 5}}></View>
          <View style={{width: '45%', aspectRatio: 1, backgroundColor: '#F1F4F9', borderRadius: 5}}></View>
        </View>

        {/* <View style={{position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: '-50%' }, { translateY: '-50%' }], display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{textAlign: 'center'}}>{title}</Text>
        </View> */}
        <Text style={{position: 'absolute', fontSize: 16, fontWeight: 600}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}