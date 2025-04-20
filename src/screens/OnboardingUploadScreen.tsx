import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import * as DocumentPicker from 'expo-document-picker';

type OnboardingUploadScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OnboardingUpload'>;

interface Document {
  name: string;
  uri: string;
  type: string;
}

export default function OnboardingUploadScreen() {
  const navigation = useNavigation<OnboardingUploadScreenNavigationProp>();
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const newDocument = {
          name: result.name,
          uri: result.uri,
          type: result.mimeType || '',
        };
        setDocuments([...documents, newDocument]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleRemoveDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
  };

  const handleSubmit = async () => {
    if (documents.length === 0) {
      Alert.alert(
        'No Documents',
        'Would you like to continue without uploading any documents?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Rights'),
          },
        ]
      );
      return;
    }

    try {
      // TODO: Upload documents to Supabase storage
      navigation.navigate('Rights');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload documents');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Upload Documents</Text>
        <Text style={styles.subtitle}>
          Upload any relevant documents such as medical records, legal papers, or identification
        </Text>

        <View style={styles.documentList}>
          {documents.map((doc, index) => (
            <View key={index} style={styles.documentItem}>
              <Text style={styles.documentName} numberOfLines={1}>
                {doc.name}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveDocument(index)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPick}>
          <Text style={styles.uploadButtonText}>Select Document</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 24,
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
  documentList: {
    marginBottom: 24,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  documentName: {
    flex: 1,
    fontSize: 16,
    color: '#414336',
  },
  removeButton: {
    marginLeft: 12,
    padding: 6,
  },
  removeButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#414336',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadButtonText: {
    color: '#414336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#414336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});