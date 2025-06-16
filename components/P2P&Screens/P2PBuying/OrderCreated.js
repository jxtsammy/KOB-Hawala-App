// OrderCreatedScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ArrowLeft,
  MessageCircle,
  ChevronDown,
  HelpCircle,
} from 'lucide-react-native';

const OrderCreatedScreen = ({ navigation, route }) => {
  const { orderData } = route.params;
  const timeLimit = '14:55';

  const handleViewPaymentDetails = () => {
    navigation.navigate('MakingPayment', { orderData });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Order Status */}
        <View style={styles.statusSection}>
          <Text style={styles.orderTitle}>Order Created</Text>
          <Text style={styles.timeLimit}>Pay within {timeLimit}</Text>
        </View>

        {/* Trader Info */}
        <View style={styles.traderSection}>
          <View style={styles.traderInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <Text style={styles.traderName}>{orderData.trader.username}</Text>
          </View>
        </View>

        {/* Order Status Indicators */}
        <View style={styles.statusIndicators}>
          <View style={styles.statusItem}>
            <View style={styles.statusIcon}>
              <Text style={styles.statusIconText}>🔒</Text>
            </View>
            <Text style={styles.statusText}>Escrowed Crypto</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusIcon}>
              <Text style={styles.statusIconText}>✓</Text>
            </View>
            <Text style={styles.statusText}>Completed 1%</Text>
            <ChevronDown stroke="#8E8E93" width={16} height={16} />
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderType}>Buy {orderData.trader.cryptoType}</Text>
            <ChevronDown stroke="#8E8E93" width={16} height={16} />
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fiat Amount</Text>
            <Text style={styles.detailValue}>GHS{orderData.fiatAmount}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>GHS{orderData.price}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Receive Quantity</Text>
            <Text style={styles.detailValue}>{orderData.cryptoAmount} {orderData.trader.cryptoType}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentHeader}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <View style={styles.paymentMethodContainer}>
              <View style={styles.paymentIndicator} />
              <Text style={styles.paymentMethod}>{orderData.paymentMethod}</Text>
            </View>
          </View>
        </View>

        {/* Advertiser's Terms */}
        <View style={styles.termsSection}>
          <View style={styles.termsHeader}>
            <Text style={styles.termsLabel}>Advertiser's Terms</Text>
            <ChevronDown stroke="#8E8E93" width={16} height={16} />
          </View>
        </View>
      </ScrollView>

      {/* Help Button */}
      <TouchableOpacity style={styles.helpButton}>
        <HelpCircle stroke="#FFFFFF" width={20} height={20} />
        <Text style={styles.helpText}>Help</Text>
      </TouchableOpacity>

      {/* View Payment Details Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.paymentDetailsButton} onPress={handleViewPaymentDetails}>
          <Text style={styles.paymentDetailsButtonText}>View Payment Details</Text>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statusSection: {
    paddingVertical: 20,
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  timeLimit: {
    fontSize: 14,
    color: '#8E8E93',
  },
  traderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  traderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2D35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  traderName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  statusIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2A2D35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statusIconText: {
    fontSize: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#8E8E93',
    marginRight: 4,
  },
  orderDetails: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C087',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  paymentSection: {
    paddingVertical: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginRight: 8,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  termsSection: {
    paddingVertical: 16,
  },
  termsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termsLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  helpButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D35',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  helpText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
  },
  paymentDetailsButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  paymentDetailsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default OrderCreatedScreen;