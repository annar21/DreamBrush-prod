import { View, TextInput, Image, Text, FlatList, TouchableOpacity, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';
import SkeletonLoader from '@/components/SkeletonLoader';
// import Loader from '@/components/Loader';
// Define the type for an image item
interface ImageItem {
    id: string;
    url: string; // URL from the database
    prompt: string;
}

const { width } = Dimensions.get('window')

export default function HomeScreen() {
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [recentImages, setRecentImages] = useState<ImageItem[]>([]);
    const { user, token } = useAuth();
    const API_BASE_URL = 'https://api.shopper.am/api';
    // Fetch recent images on component mount
    useEffect(() => {
        const fetchRecentImages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/images/recent`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Assuming token is available in useAuth
                    },
                });
                setRecentImages(response.data);
            } catch (error) {
                console.error('Error fetching recent images:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchRecentImages();
        }
    }, [user]);

    const renderImageItem = ({ item }: { item: ImageItem }) => (
        <TouchableOpacity style={styles.imageItem}>
            <Image
                source={{ uri: item.url }}
                style={styles.gridImage}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    const handleSeeAllPress = () => {
        router.push('/(tabs)/(explore)');
    };

    return (
        <LinearGradient
            colors={['#e0e7ff', '#f5f5f5']}
            style={styles.container}
        >
            <Text style={styles.tagline}>Unleash your creativity, egsdf!</Text>

            <Pressable onPress={() => router.push('/(tabs)/generate')}>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: 'lightgray',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                        marginBottom: 20,
                    }}
                >
                    <TextInput
                        placeholder="Enter an image prompt..."
                        style={{ maxWidth: '80%', maxHeight: 40 }}
                        value={prompt}
                        onChangeText={setPrompt}
                        editable={false}
                    />
                    <TouchableOpacity
                        style={styles.generateButton}
                        onPress={() => router.push('/(tabs)/generate')}
                    >
                        <Icon
                            name="chevron-right"
                            size={20}
                            color="white"
                            style={{ position: 'relative', left: 2 }}
                        />
                    </TouchableOpacity>
                </View>
            </Pressable>

            <View style={styles.recentImagesHeader}>
                <Text style={styles.sectionTitle}>Recent Images</Text>
                <TouchableOpacity
                    onPress={handleSeeAllPress}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
                >
                    <Text style={styles.seeAllText}>SEE ALL</Text>
                    <Icon name="chevron-right" size={12} color="#6200ea" />
                </TouchableOpacity>
            </View>

            {!loading ? <FlatList
                data={recentImages}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
                style={styles.grid}
            /> : 
            <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
                <View style={{width, flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                </View>
            </ScrollView>
            }

            

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    skeletonWrapper: {
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 60,
    },
    tagline: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'left',
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
        height: 50,
    },
    generateButton: {
        backgroundColor: '#6200ea',
        borderRadius: 7,
        width: 40,
        height: 40,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recentImagesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#8D90A7',
    },
    seeAllText: {
        color: '#6200ea',
        fontSize: 14,
        fontWeight: '600',
    },
    grid: {
        width: '100%',
    },
    gridRow: {
        justifyContent: 'space-between',
    },
    imageItem: {
        width: 170,
        height: 170,
        margin: 5,
    },
    gridImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});
