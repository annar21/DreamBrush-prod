import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AlbumView from '@/components/AlbumView';
import CreateAlbumModal from '@/components/CreateAlbumModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';

// Define the type for an album
interface Album {
    id: string;
    title: string;
    previewImage?: string; // Optional preview image URL
}

// Define props for AlbumView
interface AlbumViewProps {
    title: string;
    previewImage?: string;
    onPress: () => void;
}

// Define props for CreateAlbumModal
interface CreateAlbumModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onAlbumCreated: () => void;
}

const AlbumsPage = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [albmusLoading, setAlbumsLoading] = useState<boolean>(false);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user, token } = useAuth();
    const [refresh, setRefresh] = useState(false); // To trigger refetch after album creation
    const API_BASE_URL = 'https://api.shopper.am/api';
    // Fetch albums and their preview images
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                setAlbumsLoading(true);
                const response = await axios.get(`${API_BASE_URL}/albums`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const albumsData = response.data;
                // Fetch preview image for each album
                const albumsWithImages = await Promise.all(
                    albumsData.map(async (album: { id: string; title: string }) => {
                        try {
                            const imageResponse = await axios.get(
                                `${API_BASE_URL}/albums/${album.id}/images`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                    params: { limit: 1 }, // Get the most recent image
                                }
                            );
                            return {
                                ...album,
                                previewImage: imageResponse.data.images[0]?.url || undefined,
                            };
                        } catch (imageError) {
                            console.error(`Error fetching images for album ${album.id}:`, imageError);
                            return { ...album, previewImage: undefined };
                        }
                    })
                );

                setAlbums(albumsWithImages);
                setError(null);
            } catch (error: any) {
                console.error('Error fetching albums:', error.message, error.config);
                setError('Failed to load albums. Please try again.');
            } finally {
                setAlbumsLoading(false);
            }
        };

        if (user && token) {
            fetchAlbums();
        }
    }, [user, token, refresh]);

    const renderAlbumItem = ({ item }: { item: Album }) => (
        <AlbumView
            title={item.title}
            // previewImage={item.previewImage}
            onPress={() =>
                router.push({
                    pathname: '/(tabs)/(albums)/screens/album-detail',
                    params: { albumId: item.id },
                })
            }
        />
    );

    // Trigger refetch after creating an album
    const handleAlbumCreated = () => {
        setModalVisible(false);
        setRefresh((prev) => !prev);
    };

    return (
        <LinearGradient
            colors={[
                'rgba(33, 114, 145, 1)',
                'rgba(26, 41, 115, 1)',
                'rgba(145, 56, 209, 1)',
                'rgba(219, 29, 153, 1)'
            ]}
            start={{ x: 0.1, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
                data={albums}
                renderItem={renderAlbumItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    !error ? (
                        <Text style={styles.emptyText}>
                            No albums found. Create one to get started!
                        </Text>
                    ) : null
                }
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <View style={styles.fabIcon}>
                    <Icon name="plus" size={20} color="#fff" />
                </View>
            </TouchableOpacity>
            <CreateAlbumModal
                visible={modalVisible}
                setVisible={setModalVisible}
                onAlbumCreated={handleAlbumCreated}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F4F9',
        flex: 1,
        padding: 15,
        paddingTop: 25,
    },
    listContainer: {
        paddingBottom: 80, // Space for FAB
    },
    errorText: {
        textAlign: 'center',
        color: '#5D6371',
        marginBottom: 10,
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#5D6371',
        marginTop: 20,
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fabIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6B5FF0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AlbumsPage;
