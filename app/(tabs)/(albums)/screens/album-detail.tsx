import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
// import { Image}

interface Image {
    id: string;
    url: string;
    createdAt: string;
}

export default function AlbumDetail() {
    const { albumId } = useLocalSearchParams();
    const { user, token } = useAuth();
    const [albumImages, setAlbumImages] = useState<Image[]>([]);
    const [availableImages, setAvailableImages] = useState<Image[]>([]);
    const [albumTitle, setAlbumTitle] = useState<string>('Uncategorized');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const API_BASE_URL = 'https://api.shopper.am/api';

    // Fetch album details and images
    useEffect(() => {
        const fetchAlbumData = async () => {
            if (!user || !token || !albumId) return;

            try {

                setLoading(true);
                console.log(32)
                // Fetch album details
                const albumResponse = await axios.get(`${API_BASE_URL}/albums/${albumId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(albumResponse.data)
                setAlbumTitle(albumResponse.data.title);
                console.log(`${API_BASE_URL}/albums/${albumId}/images`)
                // Fetch album images

                setAlbumImages(albumResponse.data.images || []);
            } catch (err) {
                console.error('Error fetching album data:', err);
                setError('Failed to load album data');
            } finally {
                setLoading(false);
            }
        };

        fetchAlbumData();
    }, [user, token, albumId]);

    // Fetch available images (user's generated images not in this album)
    const fetchAvailableImages = async () => {
        if (!user || !token) return;

        try {
            setLoading(true);
            // Fetch all user-generated images
            const response = await axios.get(`${API_BASE_URL}/images`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userImages = response.data.images || [];

            // Filter out images already in the current album
            const albumImageIds = albumImages.map((img) => img.id);
            const filteredImages = userImages.filter((img: Image) => !albumImageIds.includes(img.id));
            setAvailableImages(filteredImages);
        } catch (err) {
            console.error('Error fetching available images:', err);
            setError('Failed to load available images');
        } finally {
            setLoading(false);
        }
    };

    // Handle adding an image to the album
    const addImageToAlbum = async (imageId: string) => {
        try {
            await axios.post(
                `${API_BASE_URL}/albums/${albumId}/images`,
                { imageId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Refresh album images
            const imagesResponse = await axios.get(`${API_BASE_URL}/albums/${albumId}/images`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAlbumImages(imagesResponse.data.images || []);
            // Update available images
            setAvailableImages((prev) => prev.filter((img) => img.id !== imageId));
        } catch (err) {
            console.error('Error adding image to album:', err);
            setError('Failed to add image to album');
        }
    };

    // Render album image
    const renderAlbumImage = ({ item }: { item: Image }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.url }} style={styles.image} />
        </View>
    );

    // Render available image in modal
    const renderAvailableImage = ({ item }: { item: Image }) => (
        <TouchableOpacity
            style={styles.availableImageContainer}
            onPress={() => addImageToAlbum(item.id)}
        >
            <Image source={{ uri: item.url }} style={styles.availableImage} />
            <Text style={styles.addText}>Add to Album</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="arrow-left" size={20} color="#000" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{albumTitle}</Text>
                    <Text style={styles.headerSubtitle}>
                        {albumImages.length} {albumImages.length === 1 ? 'image' : 'images'}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        fetchAvailableImages();
                        setIsModalVisible(true);
                    }}
                >
                    <Icon name="plus" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Album Images */}
            <FlatList
                data={albumImages}
                renderItem={renderAlbumImage}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.imageList}
                ListEmptyComponent={
                    !loading && !error ? (
                        <Text style={styles.emptyText}>Empty album...</Text>
                    ) : null
                }
            />

            {/* Modal for Adding Images */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add Images to {albumTitle}</Text>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Icon name="times" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={availableImages}
                        renderItem={renderAvailableImage}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.imageList}
                        ListEmptyComponent={
                            !loading ? (
                                <Text style={styles.emptyText}>
                                    No available images to add.
                                </Text>
                            ) : null
                        }
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F4F9',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
    },
    headerSubtitle: {
        textAlign: 'center',
        color: '#5D6371',
    },
    errorText: {
        textAlign: 'center',
        color: '#5D6371',
        marginVertical: 10,
        fontSize: 16,
    },
    imageList: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    imageContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    emptyText: {
        textAlign: 'center',
        color: '#5D6371',
        marginTop: 20,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#F1F4F9',
        paddingTop: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
    availableImageContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    availableImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    addText: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
    },
});
