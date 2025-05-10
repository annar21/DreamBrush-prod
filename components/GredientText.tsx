import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, StyleSheet } from 'react-native';

interface GradientTextProps {
  children?: React.ReactNode;
}

export default function GradientText({ children }: GradientTextProps) {
  return (
    <MaskedView
      maskElement={
        <Text style={styles.text}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={['#ff00cc', '#3333ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black', // important for masking
  },
});
