import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItem {
  title: string;
  screen: keyof RootStackParamList;
  description: string;
}

export default function LandingScreen() {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  const menuItems: MenuItem[] = [
    {
      title: 'Your Rights',
      screen: 'Rights',
      description: 'Explore and understand your legal rights',
    },
    {
      title: 'Schedule',
      screen: 'ScheduleMonth',
      description: 'Manage your appointments and activities',
    },
    {
      title: 'Technology',
      screen: 'Tech',
      description: 'Discover helpful technology solutions',
    },
    {
      title: 'Community',
      screen: 'Community',
      description: 'Connect with others in similar situations',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>The Oak</Text>
          <Text style={styles.subtitle}>Your Life Transition Guide</Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.footerButtonText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('Account')}
          >
            <Text style={styles.footerButtonText}>Account Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF2',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 8,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    paddingVertical: 20,
  },
  footerButton: {
    padding: 10,
  },
  footerButtonText: {
    color: '#414336',
    fontSize: 16,
  },
});
