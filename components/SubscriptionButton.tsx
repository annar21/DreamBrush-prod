import { Button } from 'react-native';

interface SubscriptionButtonProps {
    title: string;
    onPress: () => void;
    disabled: boolean;
}

export default function SubscriptionButton({ title, onPress, disabled }: SubscriptionButtonProps) {
    return (
        <Button title={title} onPress={onPress} disabled={disabled} />
    );
}