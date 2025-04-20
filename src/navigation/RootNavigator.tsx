import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Auth screens
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main screens
import LandingScreen from '../screens/LandingScreen';
import OnboardingFormScreen from '../screens/OnboardingFormScreen';
import OnboardingUploadScreen from '../screens/OnboardingUploadScreen';
import RightsScreen from '../screens/RightsScreen';
import RightsCategoryScreen from '../screens/RightsCategoryScreen';
import ScheduleMonthScreen from '../screens/ScheduleMonthScreen';
import ScheduleWeekScreen from '../screens/ScheduleWeekScreen';
import ScheduleDayScreen from '../screens/ScheduleDayScreen';
import TechScreen from '../screens/TechScreen';
import CommunityScreen from '../screens/CommunityScreen';
import AboutScreen from '../screens/AboutScreen';
import AccountScreen from '../screens/AccountScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth Stack */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Main Stack */}
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="OnboardingForm" component={OnboardingFormScreen} />
        <Stack.Screen name="OnboardingUpload" component={OnboardingUploadScreen} />
        <Stack.Screen name="Rights" component={RightsScreen} />
        <Stack.Screen name="RightsCategory" component={RightsCategoryScreen} />
        <Stack.Screen name="ScheduleMonth" component={ScheduleMonthScreen} />
        <Stack.Screen name="ScheduleWeek" component={ScheduleWeekScreen} />
        <Stack.Screen name="ScheduleDay" component={ScheduleDayScreen} />
        <Stack.Screen name="Tech" component={TechScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
