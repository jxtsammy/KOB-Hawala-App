// OrderDetailsScreen.js
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
  ChevronRight,
} from 'lucide-react-native';

const OrderCancelledDetailsScreen = ({ navigation, route }) => {
  const { orderData } = route.params;

  const handleFindBetterOffers = () => {
    navigation.navigate('P2PNavigation');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Order Amount and Status */}
        <View style={styles.orderSummary}>
          <Text style={styles.orderAmount}>
            {orderData.cryptoAmount} {orderData.trader.cryptoType}
          </Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>Cancelled</Text>
          </View>
          <Text style={styles.statusSubtext}>You have cancelled the order</Text>
        </View>

        {/* Order Details Card */}
        <View style={styles.orderDetailsCard}>
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
            <Text style={styles.detailValue}>
              {orderData.cryptoAmount} {orderData.trader.cryptoType}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Find Better Offers Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.findOffersButton} onPress={handleFindBetterOffers}>
          <Text style={styles.findOffersButtonText}>Find Better Offers</Text>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  orderSummary: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  orderAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8E8E93',
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  statusSubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
  orderDetailsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
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
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
  },
  findOffersButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  findOffersButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default OrderCancelledDetailsScreen;