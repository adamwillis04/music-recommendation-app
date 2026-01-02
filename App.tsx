import { View, Text, Button } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './src/firebase/config';

export default function App() {
  const addTestDoc = async () => {
    try {
      await addDoc(collection(db, 'test'), {
        message: 'Hello Firebase',
        createdAt: new Date(),
      });
      console.log('Document added');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Firebase Test</Text>
      <Button title="Add Test Doc" onPress={addTestDoc} />
    </View>
  );
}
