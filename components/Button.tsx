import { StyleSheet, View, Pressable, Text, } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
  message?: string
};

export default function Button({ label, theme,  message = '', onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
        
        ]}>
        <Pressable  style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#3bbcd8' : '#51c8e6ff' }
        ]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
        
      <Pressable  style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#3bbcd8' : '#51c8e6ff' }
        ]} onPress={onPress}>
        <FontAwesome name="download" size={18} color="#25292e" style={styles.buttonIcon} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 280,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#000000ff',
    fontSize: 16,
  },
});
