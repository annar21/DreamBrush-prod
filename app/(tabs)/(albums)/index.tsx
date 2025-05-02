import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AlbumView from '@/components/AlbumView';
import Icon from 'react-native-vector-icons/FontAwesome5'
import CreateAlbumModal from '@/components/CreateAlbumModal';
import { router } from 'expo-router';


// bg - F1F4F9

const AlbumsPage = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <View style={{backgroundColor: '#F1F4F9', height: '100%', padding: 15, paddingTop: 25}}>
            <AlbumView 
              title='Album 1' 
              onPress={() => router.push('/(tabs)/(albums)/screens/album-detail')} 
            //   onPress={() => {}} 
            />

            <TouchableOpacity 
              style={{position: 'absolute', bottom: 20, right: 20}} 
              onPress={() => setModalVisible(true)}
            >
                <View style={{width: 50, height: 50, borderRadius: '50%', backgroundColor: '#6B5FF0', justifyContent: 'center', alignItems: 'center', }}>
                    <Icon name="plus" size={20} color="#fff" />
                </View>
            </TouchableOpacity>

            <CreateAlbumModal visible={modalVisible} setVisible={setModalVisible} />
        </View>
    );
}

export default AlbumsPage;
