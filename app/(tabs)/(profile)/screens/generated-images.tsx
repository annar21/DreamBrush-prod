import { router } from "expo-router";
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const GeneratedImagesScreen = () => {
  return (
    <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Icon name="arrow-left" size={20} color="#000" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitle}>Your Images</Text>
                        <Text style={styles.headerSubtitle}>
                            You have generated 0 images
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/(tabs)/generate')}
                    >
                        <Icon name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
    
                {/* Album Images */}
                {/* <FlatList
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
                /> */}
    
                {/* Modal for Adding Images */}
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


export default GeneratedImagesScreen;