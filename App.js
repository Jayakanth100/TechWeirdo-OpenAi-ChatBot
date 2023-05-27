import { StyleSheet,View } from 'react-native';
import ChatGpt from './src';
export default function App() {
  return (
    <View style={styles.container}>
      <ChatGpt/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
   
  },
});
