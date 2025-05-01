import { View, Image, Text } from 'react-native';

interface ImageCardProps {
    url: string;
    prompt: string;
    date: string;
}

export default function ImageCard({ url, prompt, date }: ImageCardProps) {
    return (
        <View style={{ margin: 10 }}>
            <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
            <Text>{prompt}</Text>
            <Text>{new Date(date).toLocaleDateString()}</Text>
        </View>
    );
}