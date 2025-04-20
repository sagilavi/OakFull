import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type RightsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Rights'>;

interface RightsCategory {
  id: string;
  title: string;
  description: string;
  color: string;
}

const categories: RightsCategory[] = [
  {
    id: 'healthcare',
    title: 'Healthcare Rights',
    description: 'Understanding your medical rights and healthcare decisions',
    color: '#FFE0E0',
  },
  {
    id: 'legal',
    title: 'Legal Protection',
    description: 'Essential legal rights and protections for elderly individuals',
    color: '#E0E0FF',
  },
  {
    id: 'financial',
    title: 'Financial Rights',
    description: 'Managing finances and protecting assets',
    color: '#E0FFE0',
  },
  {
    id: 'housing',
    title: 'Housing Rights',
    description: 'Rights related to housing and living arrangements',
    color: '#FFE0FF',
  },
  {
    id: 'care',
    title: 'Care Services',
    description: 'Rights regarding care services and support',
    color: '#FFFDE0',
  },
];

export default function RightsScreen() {
  const navigation = useNavigation<RightsScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Rights</Text>
        <Text style={styles.subtitle}>
          Explore different categories to learn about your rights and available resources
        </Text>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() =>
                navigation.navigate('RightsCategory', {
                  category: category.title,
                  id: category.id,
                })
              }
            >
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>
                {category.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need Immediate Help?</Text>
          <Text style={styles.helpText}>
            If you're facing an emergency or need immediate assistance, don't hesitate to reach out.
          </Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Contact Support</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  categoriesContainer: {
    marginBottom: 32,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  helpSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: '#414336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
