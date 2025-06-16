// AllPaymentMethodsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Smartphone,
  Building,
  CreditCard,
} from 'lucide-react-native';

const AllPaymentMethodsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    // Mobile Money Services (Ghana & Africa)
    { id: 'mtn_momo', name: 'MTN Mobile Money', type: 'mobile', country: 'Ghana', icon: 'mobile', color: '#FFCC02' },
    { id: 'telecel_cash', name: 'Telecel Cash', type: 'mobile', country: 'Ghana', icon: 'mobile', color: '#00C087' },
    { id: 'at_money', name: 'AT Money', type: 'mobile', country: 'Ghana', icon: 'mobile', color: '#FF6B6B' },
    { id: 'vodafone_cash', name: 'Vodafone Cash', type: 'mobile', country: 'Ghana', icon: 'mobile', color: '#E60000' },
    { id: 'momo', name: 'MoMo', type: 'mobile', country: 'Ghana', icon: 'mobile', color: '#F0B90B' },
    
    // Banks (Ghana)
    { id: 'gcb_bank', name: 'Ghana Commercial Bank (GCB)', type: 'bank', country: 'Ghana', icon: 'bank', color: '#007AFF' },
    { id: 'ecobank', name: 'Ecobank Ghana', type: 'bank', country: 'Ghana', icon: 'bank', color: '#0066CC' },
    { id: 'absa_bank', name: 'Absa Bank Ghana', type: 'bank', country: 'Ghana', icon: 'bank', color: '#FF0000' },
    { id: 'standard_chartered', name: 'Standard Chartered Bank', type: 'bank', country: 'Ghana', icon: 'bank', color: '#0F4C81' },
    { id: 'fidelity_bank', name: 'Fidelity Bank Ghana', type: 'bank', country: 'Ghana', icon: 'bank', color: '#8B0000' },
    { id: 'cal_bank', name: 'CAL Bank', type: 'bank', country: 'Ghana', icon: 'bank', color: '#1E3A8A' },
    { id: 'access_bank', name: 'Access Bank Ghana', type: 'bank', country: 'Ghana', icon: 'bank', color: '#FF6600' },
    { id: 'zenith_bank', name: 'Zenith Bank Ghana', type: 'bank', country: 'Ghana', icon: 'bank', color: '#DC143C' },
    
    // Other African Mobile Money
    { id: 'mpesa', name: 'M-Pesa', type: 'mobile', country: 'Kenya', icon: 'mobile', color: '#00A651' },
    { id: 'orange_money', name: 'Orange Money', type: 'mobile', country: 'Multiple', icon: 'mobile', color: '#FF7900' },
    { id: 'airtel_money', name: 'Airtel Money', type: 'mobile', country: 'Multiple', icon: 'mobile', color: '#FF0000' },
    
    // International
    { id: 'paypal', name: 'PayPal', type: 'digital', country: 'International', icon: 'card', color: '#0070BA' },
    { id: 'wise', name: 'Wise (formerly TransferWise)', type: 'digital', country: 'International', icon: 'card', color: '#37517E' },
    { id: 'skrill', name: 'Skrill', type: 'digital', country: 'International', icon: 'card', color: '#862165' },
  ];

  const filteredMethods = paymentMethods.filter(method =>
    method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'mobile':
        return Smartphone;
      case 'bank':
        return Building;
      default:
        return CreditCard;
    }
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      navigation.navigate('AddPaymentDetails', {
        paymentMethod: selectedMethod,
        onPaymentMethodAdded: route.params?.onPaymentMethodAdded,
      });
    }
  };

  const renderPaymentMethod = ({ item }) => {
    const IconComponent = getIcon(item.icon);
    const isSelected = selectedMethod?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.methodItem,
          isSelected && styles.selectedMethodItem
        ]}
        onPress={() => handleMethodSelect(item)}
      >
        <View style={[styles.methodIcon, { backgroundColor: item.color }]}>
          <IconComponent stroke="#FFFFFF" width={20} height={20} />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodName}>{item.name}</Text>
          <Text style={styles.methodCountry}>{item.country}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <View style={styles.selectedDot} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All payment methods</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search stroke="#8E8E93" width={20} height={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Please enter a payment method"
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Payment Methods List */}
      <FlatList
        data={filteredMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={(item) => item.id}
        style={styles.methodsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Not Found Text */}
      {filteredMethods.length === 0 && searchQuery.length > 0 && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Payment method not found?</Text>
        </View>
      )}

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedMethod && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedMethod}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedMethod && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
  },
  methodsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  selectedMethodItem: {
    backgroundColor: 'rgba(240, 185, 11, 0.1)',
    borderRadius: 8,
    borderBottomWidth: 0,
    marginBottom: 1,
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  methodCountry: {
    fontSize: 14,
    color: '#8E8E93',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F0B90B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F0B90B',
  },
  notFoundContainer: {
    padding: 16,
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  bottomContainer: {
    padding: 16,
  },
  continueButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#2A2D35',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  continueButtonTextDisabled: {
    color: '#8E8E93',
  },
});

export default AllPaymentMethodsScreen;