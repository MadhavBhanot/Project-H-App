import { View, Text } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export default function Home() {
  const { userId } = useAuth();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>Welcome {userId}!</Text>
    </View>
  );
} 