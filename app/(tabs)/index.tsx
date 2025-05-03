// app/(tabs)/index.tsx
import { View, TextInput, Image, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; // For background gradient
import { router } from 'expo-router'; // Use expo-router for navigation
import Icon from 'react-native-vector-icons/FontAwesome5'; // For icons

// Define the type for an image item
interface ImageItem {
    id: string;
    source: number; // For local image sources (result of require)
    prompt: string;
}

export default function HomeScreen() {
    const [prompt, setPrompt] = useState<string>('');
    // const { user } = useAuth(); // Get the current user from useAuth

    // Import images from assets
    const recentImages: ImageItem[] = [
        { id: '1', source: require('../../assets/images/adaptive-icon.png'), prompt: 'Colorful fox' },
        { id: '2', source: require('../../assets/images/partial-react-logo.png'), prompt: 'Futuristic car' },
        { id: '3', source: require('../../assets/images/splash-icon.png'), prompt: 'Soccer game' },
        { id: '4', source: require('../../assets/images/react-logo.png'), prompt: 'Broken glass' },
    ];

    const renderImageItem = ({ item }: { item: ImageItem }) => (
        <TouchableOpacity style={styles.imageItem}>
            <Image
                source={item.source}
                style={styles.gridImage}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    // Handle navigation for the user/profile icon
    // const handleUserIconPress = () => {
    //     if (user) {
    //         router.push('/profile'); // Navigate to Profile if user is authenticated
    //     } else {
    //         router.push('/auth/login'); // Navigate to Login if user is not authenticated
    //     }
    // };

    // Handle navigation for the UPGRADE button
    // const handleUpgradePress = () => {
    //     router.push('/subscription'); // Navigate to Subscription page
    // };

    // Handle navigation for the SEE ALL button
    const handleSeeAllPress = () => {
        router.push('/(tabs)/(explore)'); // Navigate to Gallery page
    };

    return (
        <LinearGradient
            colors={['#e0e7ff', '#f5f5f5']} // Subtle gradient from light blue to gray
            style={styles.container}
        >
            <Text style={styles.tagline}>Unleash your creativity, egsdf!</Text>

            {/* Prompt Input */}
            {/* <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter an image prompt..."
                    placeholderTextColor="#888"
                    value={prompt}
                    onChangeText={setPrompt}
                />
                <TouchableOpacity style={styles.generateButton}>
                    <Text style={styles.generateButtonText}>→</Text>
                </TouchableOpacity>
            </View> */}

            <Pressable onPress={() => router.push('/(tabs)/generate')}>
							<View 
									style={{borderWidth: 1, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 5, justifyContent: 'space-between', backgroundColor: '#fff', marginBottom: 20 }}
									
							>
									<TextInput 
											placeholder='Enter an image prompt...'
											style={{maxWidth: '80%', maxHeight: 40}}
											value={prompt}
											onChangeText={setPrompt}
											editable={false}
									/>
									<TouchableOpacity style={styles.generateButton} onPress={() => router.push('/(tabs)/generate')}>
											<Icon name='chevron-right' size={20} color='white' style={{position: 'relative', left: 2}} />
									</TouchableOpacity>
							</View>
						</Pressable>

            {/* Recent Images Section */}
            <View style={styles.recentImagesHeader}>
                <Text style={styles.sectionTitle}>Recent Images</Text>
                <TouchableOpacity onPress={handleSeeAllPress} style={{flexDirection: 'row', alignItems: 'center', gap:5}}> 
                    <Text style={styles.seeAllText}>SEE ALL</Text>
                    <Icon name="chevron-right" size={12} color="#6200ea" />
                </TouchableOpacity>
            </View>

            {/* Image Grid */}
            <FlatList
                data={recentImages}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.gridRow}
                style={styles.grid}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 60, // Add padding to avoid overlap with the tab bar
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        height: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upgradeButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upgradeText: {
        color: '#6200ea',
        fontSize: 14,
        fontWeight: '600',
    },
    profileIcon: {
        padding: 8,
    },
    profileIconText: {
        fontSize: 20,
        color: '#666',
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
    generateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recentImagesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 500,
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
