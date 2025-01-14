import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSignIn } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import Svg, { Path, Circle } from 'react-native-svg';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useColorScheme() ?? 'light';
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: githubAuth } = useOAuth({ strategy: "oauth_github" });

  const onSelectAuth = async (strategy: 'oauth_google' | 'oauth_github') => {
    const selectedAuth = strategy === 'oauth_google' ? googleAuth : githubAuth;
    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  const handleSignIn = async () => {
    if (!isLoaded) return;

    // Validate inputs
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.log("Sign in status:", completeSignIn.status);
        // Handle other status cases
        switch (completeSignIn.status) {
          case "needs_identifier":
            Alert.alert('Error', 'Please enter your email.');
            break;
          case "needs_first_factor":
            Alert.alert('Error', 'Please enter your password.');
            break;
          case "needs_second_factor":
            Alert.alert('Error', 'Two-factor authentication is required.');
            break;
          default:
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      // Handle specific error cases
      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].message;
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert(
          'Error',
          'Unable to sign in. Please check your credentials and try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.illustrationContainer}>
        <Svg height="180" width="180" viewBox="0 0 100 100">
          <Circle cx="50" cy="50" r="45" stroke="#6C63FF" strokeWidth="0.5" fill="none" />
          <Path
            d="M30,50 L45,65 L70,35"
            stroke="#6C63FF"
            strokeWidth="3"
            fill="none"
          />
        </Svg>
      </View>

      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[theme].text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
          Sign in to continue your journey
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, { 
            backgroundColor: Colors[theme].background,
            borderColor: Colors[theme].border,
            color: Colors[theme].text
          }]}
          placeholder="Email"
          placeholderTextColor={Colors[theme].text}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <TextInput
          style={[styles.input, { 
            backgroundColor: Colors[theme].background,
            borderColor: Colors[theme].border,
            color: Colors[theme].text
          }]}
          placeholder="Password"
          placeholderTextColor={Colors[theme].text}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={[styles.dividerText, { color: Colors[theme].text }]}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: Colors[theme].background }]}
            onPress={() => onSelectAuth('oauth_google')}
          >
            <Text style={[styles.socialButtonText, { color: Colors[theme].text }]}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: Colors[theme].background }]}
            onPress={() => onSelectAuth('oauth_github')}
          >
            <Text style={[styles.socialButtonText, { color: Colors[theme].text }]}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: Colors[theme].text }]}>
          Don't have an account?{' '}
        </Text>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 