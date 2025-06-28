// PaymentMethodsScreen.js (Updated)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Edit,
  Trash2,
  CreditCard,
  Smartphone,
  Building,
  Plus,
} from 'lucide-react-native';

const PaymentMethodsScreen = ({ navigation, route }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'MoMo',
      name: 'DANIEL AMOAKO KODUA',
      details: '0530603394',
      icon: 'mobile',
      color: '#F0B90B',
    },
    {
      id: '2',
      type: 'Telecel Cash',
      name: 'DANIEL AMOAKO KODUA',
      details: '0205058262',
      icon: 'mobile',
      color: '#00C087',
    },
    {
      id: '3',
      type: 'MTN Mobile Money',
      name: 'DANIEL AMOAKO KODUA',
      details: '0559847050',
      icon: 'mobile',
      color: '#FFCC02',
    },
    {
      id: '4',
      type: 'Bank Transfer',
      name: 'DANIEL AMOAKO KODUA',
      details: '6031250037954',
      bankName: 'GHANA COMMERCIAL BANK (GCB)',
      branch: 'KNUST BRANCH',
      icon: 'bank',
      color: '#007AFF',
    },
  ]);

  // Handle adding new payment method
  const handleAddPaymentMethod = (newMethod) => {
    setPaymentMethods((prev) => [...prev, newMethod]);
  };

  const handleDeletePaymentMethod = (id, type) => {
    Alert.alert(
      'Delete Payment Method',
      `Are you sure you want to delete this ${type}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods((prev) =>
              prev.filter((method) => method.id !== id)
            );
          },
        },
      ]
    );
  };

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

  const renderPaymentMethod = (method) => {
    const IconComponent = getIcon(method.icon);

    return (
      <View key={method.id} style={styles.paymentMethodCard}>
        <View style={styles.paymentMethodHeader}>
          <View style={styles.paymentMethodInfo}>
            <View
              style={[styles.iconContainer, { backgroundColor: method.color }]}>
              <IconComponent stroke="#FFFFFF" width={20} height={20} />
            </View>
            <View style={styles.methodDetails}>
              <Text style={styles.methodType}>{method.type}</Text>
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodNumber}>{method.details}</Text>
              {method.bankName && (
                <>
                  <Text style={styles.bankName}>{method.bankName}</Text>
                  <Text style={styles.branchName}>{method.branch}</Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit stroke="#8E8E93" width={18} height={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeletePaymentMethod(method.id, method.type)}>
              <Trash2 stroke="#FF6B6B" width={18} height={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <CreditCard stroke="#8E8E93" width={48} height={48} />
      </View>
      <Text style={styles.emptyTitle}>No Payment Methods</Text>
      <Text style={styles.emptySubtitle}>
        Add a payment method to start trading with other users
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('P2PNavigation', {
              screen: 'Profile',
            })
          }>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>P2P Payment Method(s)</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {paymentMethods.length > 0 ? (
          <View style={styles.paymentMethodsList}>
            {paymentMethods.map(renderPaymentMethod)}
          </View>
        ) : (
          renderEmptyState()
        )}
      </ScrollView>

      {/* Add New Payment Method Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('SelectPaymentMethod', {
              onPaymentMethodAdded: handleAddPaymentMethod,
            })
          }>
          <Plus stroke="#000000" width={20} height={20} />
          <Text style={styles.addButtonText}>Add a new payment method</Text>
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
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  paymentMethodsList: {
    paddingTop: 16,
  },
  paymentMethodCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  methodName: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  methodNumber: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  bankName: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 1,
  },
  branchName: {
    fontSize: 12,
    color: '#8E8E93',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    top: 250,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
  bottomContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 8,
  },
});

export default PaymentMethodsScreen;
