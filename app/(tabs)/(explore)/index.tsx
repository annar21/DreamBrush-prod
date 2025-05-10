import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyleCard from '@/components/StyleCard';
import RadioButtons from '@/components/RadioButtons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { router } from 'expo-router';

// Define the type for an image item
interface ImageItem {
  id: string;
  url: string;
  prompt: string;
}

const ExplorePage = () => {
  const [filter, setFilter] = useState<string | null>('TOP');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();
  const API_BASE_URL = 'https://api.shopper.am/api';
  const { recentImages } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  // Fetch images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
            `${API_BASE_URL}/images`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                page,
                limit: 10,
              },
            }
        );
        setImages((prev) => [...prev, ...response.data.images]);
        setTotalPages(response.data.pagination.pages);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching images:', error.message, error.config);
        setError('Failed to load images. Please try again.');
      }
    };

    if (user) {
      fetchImages();
    }
  }, [user, page]);

  const renderImageItem = ({ item }: { item: ImageItem }) => (
      <TouchableOpacity style={styles.imageItem} onPress={() => router.push({pathname: '/(tabs)/(explore)/screens/image-detail', params: {id: item.id}})}>
        <Image
            source={{ uri: item.url }}
            style={styles.gridImage}
            resizeMode="cover"
        />
      </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const renderHeader = () => (
      <View>
        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingTop: 10,
              marginBottom: 25
            }}
        >
          <View>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>
              Images by Style
            </Text>
          </View>
          {/* <TouchableOpacity>
            <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}
            >
              <Text style={{ color: '#6B5FF0', fontWeight: '600', fontSize: 14 }}>
                SEE ALL
              </Text>
              <Icon name="chevron-right" size={12} color="#6B5FF0" />
            </View>
          </TouchableOpacity> */}
        </View>

        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              { id: '1', title: 'Anime' },
              { id: '2', title: 'Cartoon' },
              { id: '3', title: 'Photorealistic' },
              { id: '4', title: 'Fantasy' },
              { id: '5', title: 'Cyberpunk' },
              { id: '6', title: 'Pixel Art' },
            ]}
            
            renderItem={({ item }) => (
                <StyleCard
                    image={
                      // <View style={{ width: 80, height: 90, backgroundColor: 'red' }}></View>
                      <View>
                        <Image style={{width: 80, height: 'auto'}} resizeMode="cover" source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s'}} />
                      </View>
                    }
                    title={item.title}
                />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexDirection: 'row', gap: 10, paddingHorizontal: 15 }}
            style={{ marginTop: 10 }}
        />

        {/* <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 15, marginBottom: 20 }}>
          <RadioButtons
              options={['TOP', 'NEW']}
              selectedOption={filter}
              onSelect={(option) => setFilter(option)}
          />
        </View> */}

        {error && (
            <Text
                style={{
                  textAlign: 'center',
                  color: '#5D6371',
                  marginTop: 20,
                  paddingHorizontal: 15,
                }}
            >
              {error}
            </Text>
        )}
      </View>
  );

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
        style={{flex: 1}}
    >
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        style={styles.grid}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          images.length === 0 && !error ? (
              <Text
                  style={{
                    textAlign: 'center',
                    color: '#5D6371',
                    marginTop: 20,
                    paddingHorizontal: 15,
                  }}
              >
                No images found.
              </Text>
          ) : null
        }
        ListFooterComponent={
          page < totalPages ? (
              <TouchableOpacity
                  onPress={handleLoadMore}
                  style={[styles.loadMoreButton, { marginHorizontal: 15 }]}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: '100%',
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
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
  loadMoreButton: {
    backgroundColor: '#6B5FF0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExplorePage;
