import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function Button({ title, style, ...props }: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} {...props}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6200EE',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        height: 50,
        marginBottom: 16,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
