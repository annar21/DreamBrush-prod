import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import StyleCard from "@/components/StyleCard";
import SizeRadio from "@/components/SizeRadio";
import UpgradePlanModal from "@/components/UpgradePlanModal";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://api.shopper.am/api";

export default function GenerateScreen() {
    const styles = ["style1", "style2", "style3", "style4", "style5", "style6"];
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>("1024x1024");
    const [visible, setVisible] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const { user } = useAuth();
    const inputRef = useRef<TextInput>(null);

    const onPress = (style: string) => {
        if (selectedStyle === style) {
            setSelectedStyle(null);
        } else {
            setSelectedStyle(style);
        }
    };

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt.");
            return;
        }

        setLoading(true);
        setError("");
        setGeneratedImage(null);

        try {
            const storedToken = await AsyncStorage.getItem("token");
            console.log(storedToken)
            if (!storedToken) {
                setError("Authentication token not found. Please sign in again.");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/generate-image`,
                {
                    prompt,
                    albumId: null,
                    style: selectedStyle,
                    size: selectedSize,
                },
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                }
            );
            console.log(response.data)
            setGeneratedImage(response.data.image);
            setPrompt("");
        } catch (err: any) {
            console.error("Image generation error:", err.response?.data || err.message);
            setError(
                err.response?.data?.error || "Failed to generate image. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const imagesRemaining = user?.package?.image_limit
        ? user.package.image_limit - (user?.image_count || 0)
        : 10;

    return (
        <ScrollView contentContainerStyle={{backgroundColor: '#F1F4F9', paddingTop: 25, paddingHorizontal: 20}}>
            <View>
                <Text style={{fontSize: 22, fontWeight: 600, marginBottom: 15}}>
                    Generate an AI image
                </Text>
                <TextInput
                    ref={inputRef}
                    style={{
                        backgroundColor: '#fff',
                        height: 150,
                        verticalAlign: 'top',
                        borderRadius: 5,
                        paddingLeft: 10
                    }}
                    placeholder="Enter an image prompt..."
                    multiline
                    keyboardType="default"
                    returnKeyType="done"
                    value={prompt}
                    onChangeText={setPrompt}
                    onSubmitEditing={() => inputRef.current?.blur()}
                />
            </View>

            <View style={{marginTop: 25}}>
                <Text style={{color: '#8D90A7', fontSize: 16, fontWeight: 500, marginBottom: 10}}>
                    Image style {"(Optional)"}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row', gap: 10}}>
                    {styles.map((style) =>
                        <StyleCard
                            key={style}
                            redirect={false}
                            title={style}
                            image={() => <View style={{width: 100, height: 100, backgroundColor: 'red'}} />}
                            onPress={() => onPress(style)}
                            additionalStyle={ style === selectedStyle && {borderWidth: 1, borderColor: '#6B5FF0', backgroundColor: '#D5D3F8'} }
                            textAdditionalStyle={ style === selectedStyle && {color: '#6B5FF0'} }
                        />
                    )}
                </ScrollView>
            </View>

            <View style={{marginTop: 35}}>
                <Text style={{color: '#8D90A7', fontSize: 16, fontWeight: 500, marginBottom: 10}}>
                    Image Size
                </Text>
                <SizeRadio
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                />
            </View>

            <TouchableOpacity
                style={{marginTop: 30, padding: 10, backgroundColor: '#D5D3F8', borderRadius: 40}}
                onPress={() => setVisible(true)}
                disabled={loading}
            >
                <Text style={{color: '#6B5FF0', fontSize: 14, fontWeight: 500, textAlign: 'center'}}>
                    ✨ Upgrade to Unlock Unlimited Images!
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{backgroundColor: '#6B5FF0', padding: 15, borderRadius: 40, marginTop: 25, opacity: loading || imagesRemaining <= 0 ? 0.6 : 1}}
                onPress={handleGenerateImage}
                disabled={loading || imagesRemaining <= 0}
            >
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 600, textAlign: 'center'}}>
                    Generate Image
                </Text>
            </TouchableOpacity>

            <Text style={{textAlign: 'center', color: '#8D90A7', fontWeight: 500, marginTop: 10, marginBottom: 25}}>
                {imagesRemaining >= 0 ? imagesRemaining : 0}/{user?.package?.image_limit || 10} Images Remaining This Week
            </Text>

            {generatedImage && (
                <View style={{marginTop: 20, alignItems: 'center'}}>
                    <Image
                        source={{ uri: generatedImage }}
                        style={{width: 300, height: 300, borderRadius: 8}}
                        resizeMode="contain"
                    />
                </View>
            )}

            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#6B5FF0"
                    style={{marginTop: 16}}
                />
            )}
            {error && (
                <Text style={{color: 'red', fontSize: 14, marginTop: 16, textAlign: 'center'}}>
                    {error}
                </Text>
            )}

            <UpgradePlanModal visible={visible} setVisible={setVisible} />
        </ScrollView>
    );
}
