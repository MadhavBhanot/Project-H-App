import { Stack } from 'expo-router';
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { Platform } from 'react-native';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
      appearance={{
        baseTheme: Platform.OS === 'web' ? 'light' : undefined,
        variables: {
          colorPrimary: '#6C63FF',
          colorBackground: '#ffffff',
          colorText: '#000000',
        },
        elements: {
          providerIcon: {
            filter: 'none'
          },
          formButtonPrimary: {
            fontSize: '16px',
            textTransform: 'none',
            borderRadius: '12px',
            backgroundColor: '#6C63FF',
            '&:hover': {
              backgroundColor: '#5b54d6'
            }
          },
          card: {
            boxShadow: 'none',
            backgroundColor: 'transparent'
          }
        }
      }}
    >
      <Stack 
        screenOptions={{ 
          headerShown: false,
          ...(Platform.OS === 'web' ? {
            animation: 'none'
          } : {})
        }} 
      />
    </ClerkProvider>
  );
}

