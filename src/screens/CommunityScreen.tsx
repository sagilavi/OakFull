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

type CommunityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Community'>;

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
}

const mockGroups: CommunityGroup[] = [
  {
    id: '1',
    name: 'Caregivers Support',
    description: 'A group for family caregivers to share experiences and support each other',
    members: 128,
    category: 'Support',
  },
  {
    id: '2',
    name: 'Tech Tips & Tricks',
    description: 'Share and learn about helpful technology for seniors',
    members: 256,
    category: 'Technology',
  },
  {
    id: '3',
    name: 'Local Activities',
    description: 'Find and join activities in your area',
    members: 512,
    category: 'Activities',
  },
];

export default function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>
          Connect with others in similar situations and share experiences
        </Text>

        <View style={styles.groupsContainer}>
          {mockGroups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupCard}
              onPress={() => {
                // TODO: Navigate to group detail screen
              }}
            >
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupCategory}>{group.category}</Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
              <Text style={styles.groupMembers}>{group.members} members</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create New Group</Text>
        </TouchableOpacity>
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
  },
  groupsContainer: {
    marginBottom: 24,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 4,
  },
  groupCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  groupMembers: {
    fontSize: 14,
    color: '#414336',
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#414336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 