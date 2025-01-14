import { ClerkProvider as BaseClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useUser } from '@clerk/clerk-expo';

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

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      {children}
    </BaseClerkProvider>
  );
}

export const updateUserProfile = async (userData: {
  firstName?: string;
  lastName?: string;
  username?: string;
}) => {
  try {
    const { user } = useUser();
    if (!user) throw new Error("No user found");
    await user.update(userData);
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error };
  }
};