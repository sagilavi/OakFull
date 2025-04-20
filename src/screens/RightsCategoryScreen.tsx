import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type RightsCategoryScreenRouteProp = RouteProp<RootStackParamList, 'RightsCategory'>;

interface ResourceLink {
  title: string;
  url: string;
}

interface CategoryContent {
  id: string;
  overview: string;
  services: string[];
  resources: ResourceLink[];
  helplines: ResourceLink[];
}

const categoryContent: Record<string, CategoryContent> = {
  healthcare: {
    id: 'healthcare',
    overview: 'Healthcare rights ensure that elderly individuals have access to quality medical care and can make informed decisions about their health. This includes rights related to Medicare, medical privacy, and treatment choices.',
    services: [
      'Medicare coverage and benefits',
      'Medical decision-making rights',
      'Access to medical records',
      'Right to choose healthcare providers',
      'Emergency medical treatment',
    ],
    resources: [
      { title: 'Medicare Rights Center', url: 'https://www.medicarerights.org' },
      { title: 'Healthcare.gov', url: 'https://www.healthcare.gov/older-americans' },
    ],
    helplines: [
      { title: 'Medicare Helpline', url: 'tel:1-800-633-4227' },
      { title: 'Elder Care Locator', url: 'tel:1-800-677-1116' },
    ],
  },
  legal: {
    id: 'legal',
    overview: 'Legal protections safeguard elderly individuals from abuse, fraud, and discrimination. These rights cover areas such as power of attorney, guardianship, and estate planning.',
    services: [
      'Legal aid services',
      'Elder abuse prevention',
      'Estate planning assistance',
      'Power of attorney guidance',
      'Consumer protection services',
    ],
    resources: [
      { title: 'Legal Services for the Elderly', url: 'https://www.lse.org' },
      { title: 'National Center on Law & Elder Rights', url: 'https://ncler.acl.gov' },
    ],
    helplines: [
      { title: 'Elder Abuse Hotline', url: 'tel:1-800-677-1116' },
      { title: 'Legal Aid Helpline', url: 'tel:1-800-342-9092' },
    ],
  },
  // Add more categories as needed
};

export default function RightsCategoryScreen() {
  const route = useRoute<RightsCategoryScreenRouteProp>();
  const { id } = route.params;
  
  const content = categoryContent[id] || categoryContent.healthcare;

  const handleLinkPress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{route.params.category}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>{content.overview}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          {content.services.map((service, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>{service}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Helpful Resources</Text>
          {content.resources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={styles.link}
              onPress={() => handleLinkPress(resource.url)}
            >
              <Text style={styles.linkText}>{resource.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Helplines</Text>
          {content.helplines.map((helpline, index) => (
            <TouchableOpacity
              key={index}
              style={styles.helplineButton}
              onPress={() => handleLinkPress(helpline.url)}
            >
              <Text style={styles.helplineButtonText}>{helpline.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.getHelpButton}>
          <Text style={styles.getHelpButtonText}>Get Help Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF2',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#414336',
    marginRight: 8,
    marginTop: 2,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  link: {
    marginBottom: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#0066CC',
    textDecorationLine: 'underline',
  },
  helplineButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  helplineButtonText: {
    fontSize: 16,
    color: '#414336',
    textAlign: 'center',
  },
  getHelpButton: {
    backgroundColor: '#414336',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  getHelpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
