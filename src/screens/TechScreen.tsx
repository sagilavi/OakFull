import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type TechScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tech'>;

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  link: string;
  features: string[];
}

const CATEGORIES = ['All', 'Safety', 'Health', 'Home', 'Communication'];

// Base64 placeholder image (gray square)
const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fall Detection Watch',
    description: 'Smart watch with advanced fall detection and emergency alert system',
    category: 'Safety',
    price: '$199.99',
    image: placeholderImage,
    link: 'https://example.com/fall-detection-watch',
    features: [
      'Automatic fall detection',
      'Emergency SOS button',
      'GPS tracking',
      'Heart rate monitoring',
      'Long battery life',
    ],
  },
  {
    id: '2',
    name: 'Medication Reminder',
    description: 'Smart pill dispenser with automatic reminders and tracking',
    category: 'Health',
    price: '$149.99',
    image: placeholderImage,
    link: 'https://example.com/medication-reminder',
    features: [
      'Automatic dispensing',
      'Mobile app notifications',
      'Multiple medication slots',
      'Refill alerts',
      'Medication adherence tracking',
    ],
  },
  {
    id: '3',
    name: 'Smart Home Hub',
    description: 'Central control system for home automation and security',
    category: 'Home',
    price: '$299.99',
    image: placeholderImage,
    link: 'https://example.com/smart-home-hub',
    features: [
      'Voice control',
      'Security camera integration',
      'Temperature control',
      'Lighting automation',
      'Emergency services connection',
    ],
  },
];

export default function TechScreen() {
  const navigation = useNavigation<TechScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'All'
    ? mockProducts
    : mockProducts.filter(product => product.category === selectedCategory);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleLearnMore = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Technology Discovery</Text>
        <Text style={styles.subtitle}>
          Explore helpful technology solutions for independent living
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.description}
                </Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedProduct && (
        <View style={styles.productDetails}>
          <View style={styles.productDetailsHeader}>
            <Text style={styles.productDetailsTitle}>{selectedProduct.name}</Text>
            <TouchableOpacity
              onPress={() => setSelectedProduct(null)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.productDetailsPrice}>{selectedProduct.price}</Text>
          <Text style={styles.productDetailsDescription}>
            {selectedProduct.description}
          </Text>

          <Text style={styles.featuresTitle}>Key Features:</Text>
          {selectedProduct.features.map((feature, index) => (
            <Text key={index} style={styles.featureItem}>
              • {feature}
            </Text>
          ))}

          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => handleLearnMore(selectedProduct.link)}
          >
            <Text style={styles.learnMoreButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#414336',
    marginHorizontal: 16,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#414336',
    borderColor: '#414336',
  },
  categoryButtonText: {
    color: '#414336',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  productsGrid: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
  },
  productDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#414336',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  productDetailsPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 12,
  },
  productDetailsDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414336',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 24,
  },
  learnMoreButton: {
    backgroundColor: '#414336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  learnMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 