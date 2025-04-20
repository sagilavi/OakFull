import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAppDispatch } from '../store/store';
import { setUser, setError } from '../store/slices/authSlice';
import { supabase, signIn, signUp, getCurrentUser } from '../lib/supabase';

export default function SupabaseTest() {
  const dispatch = useAppDispatch();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testConnection = async () => {
    try {
      addTestResult('Testing Supabase connection...');
      // Simple connection test by getting the current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      addTestResult('✅ Connection successful!');
      return true;
    } catch (error: any) {
      addTestResult(`❌ Connection failed: ${error?.message || 'Unknown error'}`);
      return false;
    }
  };

  const testAuth = async () => {
    try {
      addTestResult('Testing authentication...');
      const testEmail = 'sagilaviy@gmail.com';
      const testPassword = 'Test123!@#';

      // First try to sign in
      addTestResult('Attempting sign in...');
      const { data: signInData, error: signInError } = await signIn(testEmail, testPassword);
      
      if (signInError) {
        if (signInError.message === 'Invalid login credentials') {
          addTestResult('⚠️ Account not found. Attempting to create account...');
          
          // Try to sign up
          addTestResult('Attempting sign up...');
          const { data: signUpData, error: signUpError } = await signUp(testEmail, testPassword, 'Test User');
          if (signUpError) {
            addTestResult(`❌ Sign up failed: ${signUpError.message}`);
            throw signUpError;
          }
          addTestResult('✅ Sign up successful!');
          addTestResult('⚠️ Please check your email for the confirmation link.');
          return false;
        }
        if (signInError.message === 'Email not confirmed') {
          addTestResult('⚠️ Email not confirmed. Please check your email for the confirmation link.');
          return false;
        }
        addTestResult(`❌ Sign in failed: ${signInError.message}`);
        throw signInError;
      }

      addTestResult('✅ Sign in successful!');

      // Test get current user
      addTestResult('Getting current user...');
      const { user, error: userError } = await getCurrentUser();
      if (userError) {
        addTestResult(`❌ Get current user failed: ${userError.message}`);
        throw userError;
      }
      if (!user) {
        addTestResult('❌ No user found after sign in');
        throw new Error('No user found');
      }
      
      addTestResult('✅ Get current user successful!');

      // Update Redux store
      dispatch(setUser({
        id: user.id,
        email: user.email!,
        name: user.user_metadata.name,
      }));

      return true;
    } catch (error: any) {
      addTestResult(`❌ Authentication test failed: ${error?.message || 'Unknown error'}`);
      return false;
    }
  };

  const runTests = async () => {
    setTestResults([]);
    addTestResult('Starting Supabase tests...');
    
    const connectionSuccess = await testConnection();
    if (connectionSuccess) {
      await testAuth();
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-frank text-oak-dark mb-4">
        Supabase Connection Test
      </Text>

      <TouchableOpacity
        className="bg-oak-purple px-4 py-2 rounded-full mb-4"
        onPress={runTests}
      >
        <Text className="text-oak-white font-dm text-center">
          Run Tests
        </Text>
      </TouchableOpacity>

      <ScrollView className="flex-1">
        {testResults.map((result, index) => (
          <Text
            key={index}
            className={`font-dm mb-2 ${
              result.includes('✅') ? 'text-green-600' : 
              result.includes('❌') ? 'text-red-600' : 
              result.includes('⚠️') ? 'text-yellow-600' :
              'text-oak-dark'
            }`}
          >
            {result}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
} 