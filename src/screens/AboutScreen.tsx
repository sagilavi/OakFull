import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';

export default function AboutScreen() {
  const handleContactPress = async () => {
    try {
      await Linking.openURL('mailto:support@theoak.app');
    } catch (error) {
      console.error('Error opening mail client:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>About The Oak</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            The Oak is dedicated to supporting elderly individuals and their families
            through life transitions. We provide tools and resources to make these
            changes more manageable and less stressful.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Rights awareness and advocacy</Text>
            <Text style={styles.featureItem}>• Schedule management tools</Text>
            <Text style={styles.featureItem}>• Technology recommendations</Text>
            <Text style={styles.featureItem}>• Community support network</Text>
            <Text style={styles.featureItem}>• Resource directory</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Version</Text>
          <Text style={styles.text}>1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <TouchableOpacity onPress={handleContactPress}>
            <Text style={styles.link}>support@theoak.app</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Terms of Service</Text>
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
    marginBottom: 24,
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
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    lineHeight: 28,
  },
  link: {
    fontSize: 16,
    color: '#0066CC',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
}); 