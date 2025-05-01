import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
    return (
        <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#F5F6FA',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 16,
        fontSize: 16,
        color: '#000',
        height: 44,
        width: '100%',
    },
});
