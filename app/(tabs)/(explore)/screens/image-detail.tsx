import { useAppSelector } from "@/hooks/useAppSelector";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import mone_logo from '../../../../assets/images/mone_logo.png';
import ImageViewing from "react-native-image-viewing";
import { ImageItem } from "../../(home)";

export default function ImageDetailPage() {
  const { id } = useLocalSearchParams();
  const { recentImages } = useAppSelector(state => state.user);
  const [data, setData] = useState<ImageItem | null>(null);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = recentImages.find(item => item?.id?.toString() === id?.toString()) as ImageItem;
    setData(t);
    console.log(t)
  }, []);
  return (
    <View style={{flex: 1}}>
      {/* <Image source={{uri: data?.url}} style={{width: 160, height: 'auto'}} />
      <Text>{data?.id}</Text> */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Image source={mone_logo} style={{width: 200, height: 200}} />
      </TouchableOpacity>

       <ImageViewing
        images={[{uri: Image.resolveAssetSource(mone_logo).uri}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
}