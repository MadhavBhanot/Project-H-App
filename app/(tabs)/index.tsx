import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

export default function TabOneScreen() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  const displayName = user?.firstName || user?.username || 'there';
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {displayName}!</Text>
      <Text style={styles.subtitle}>You're signed in successfully</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
}); 