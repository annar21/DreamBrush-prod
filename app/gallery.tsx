import { View, FlatList, Image, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

interface ImageItem {
    id: string;
    url: string;
    prompt: string;
    date: string;
}

export default function Gallery() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'images'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const imageList: ImageItem[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                imageList.push({ id: doc.id, ...data } as ImageItem);
            });
            setImages(imageList);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching images:', err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    const renderItem = ({ item }: { item: ImageItem }) => (
        <View style={{ margin: 10 }}>
            <Image source={{ uri: item.url }} style={{ width: 150, height: 150 }} />
            <Text>{item.prompt}</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </View>
    );
}
