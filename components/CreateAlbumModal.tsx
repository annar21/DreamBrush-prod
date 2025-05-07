import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DraggableBottomModal from './DraggableBottomModal';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

interface CreateAlbumModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onAlbumCreated: () => void;
}

export default function CreateAlbumModal({ visible, setVisible, onAlbumCreated }: CreateAlbumModalProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const API_BASE_URL = 'https://api.shopper.am/api';
    const handleCreateAlbum = async () => {
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        try {
            await axios.post(
                `${API_BASE_URL}/albums`,
                {
                    title: title.trim(),
                    description: description.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setError(null);
            setTitle('');
            setDescription('');
            setVisible(false);
            onAlbumCreated();
        } catch (error: any) {
            console.error('Error creating album:', error.message, error.config);
            setError('Failed to create album. Please try again.');
        }
    };

    return (
        <DraggableBottomModal visible={visible} setVisible={setVisible}>
            <View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>
                        Create a New Album
                    </Text>
                    <Text style={{ fontSize: 13, color: '#5D6371', textAlign: 'center' }}>
                        Add album details below!
                    </Text>
                </View>

                {error && (
                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

                <View style={{ gap: 10 }}>
                    <TextInput
                        placeholder="Title"
                        style={{
                            backgroundColor: '#E5E5E7',
                            borderRadius: 10,
                            paddingLeft: 15,
                            paddingVertical: 15,
                        }}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <TextInput
                        placeholder="Short Description"
                        style={{
                            backgroundColor: '#E5E5E7',
                            borderRadius: 10,
                            paddingLeft: 15,
                            paddingVertical: 15,
                        }}
                        value={description}
                        onChangeText={setDescription}
                        maxLength={30}
                    />

                    <View>
                        <Text style={{ color: '#5D6371', fontSize: 12, textAlign: 'right' }}>
                            {description.length}/30
                        </Text>
                    </View>

                    <View style={{ marginTop: 20, gap: 10 }}>
                        <TouchableOpacity
                            onPress={handleCreateAlbum}
                            style={{
                                backgroundColor: '#6B5FF0',
                                borderRadius: 30,
                                paddingVertical: 15,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                                Create Album
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setVisible(false);
                                setTitle('');
                                setDescription('');
                                setError(null);
                            }}
                            style={{
                                backgroundColor: '#E5E5E7',
                                borderRadius: 30,
                                paddingVertical: 15,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#5D6371', fontSize: 16, fontWeight: '600' }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </DraggableBottomModal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handle: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        borderRadius: 3,
        marginBottom: 15,
    },
});
