'use client';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  ChevronDown,
  ArrowLeft,
  Shield,
  Clock,
  DollarSign,
} from 'lucide-react-native';

const P2PTradingScreen = ({ navigation }) => {
  // State for dropdowns
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const [selectedSort, setSelectedSort] = useState('Amount');
  const [activeOrderType, setActiveOrderType] = useState('Buy'); // New state for Buy/Sell toggle
  const [cryptoModalVisible, setCryptoModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Crypto currencies data with correct paths
  const cryptoCurrencies = [
    { code: 'USDT', name: 'Tether', logo: require('../../assets/usdt.png') },
    { code: 'BTC', name: 'Bitcoin', logo: require('../../assets/btc.png') },
    { code: 'ETH', name: 'Ethereum', logo: require('../../assets/eth.png') },
    { code: 'TRX', name: 'TRON', logo: require('../../assets/trx.png') },
  ];

  // Available currencies
  const currencies = [
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  ];

  // Sort options
  const sortOptions = [
    { label: 'Amount', value: 'amount' },
    { label: 'Highest Amount', value: 'highest' },
    { label: 'Lowest Amount', value: 'lowest' },
  ];

  // Sample traders data with multiple currencies - now includes both buy and sell orders
  const tradersData = [
    // USDT Buy Orders - GHS
    {
      id: '1',
      username: 'Admin | Solo Amps ',
      isVerified: true,
      completionRate: '99.90%',
      totalTrades: '2,543',
      price: '13.60',
      currency: 'GHS',
      cryptoType: 'USDT',
      limit: '1,000 - 30,000',
      available: '67,865.53',
      paymentMethods: ['MTN Mobile Money', 'Vodafone Cash'],
      timeEstimate: '≈ 15 mins',
      orderType: 'Buy',
    },
    {
      id: '2',
      username: 'Admin | Solo Amps',
      isVerified: true,
      completionRate: '96.70%',
      totalTrades: '1,280',
      price: '12.17',
      currency: 'GHS',
      cryptoType: 'USDT',
      limit: '200 - 224',
      available: '18.67',
      paymentMethods: ['MTN Mobile Money', 'Telecel Cash'],
      timeEstimate: '≈ 15 mins',
      orderType: 'Buy',
    },

    // USDT Sell Orders - GHS
    {
      id: '3',
      username: 'CryptoSeller Pro',
      isVerified: true,
      completionRate: '98.20%',
      totalTrades: '1,876',
      price: '13.80',
      currency: 'GHS',
      cryptoType: 'USDT',
      limit: '500 - 25,000',
      available: '45,230.12',
      paymentMethods: ['Bank Transfer', 'MTN Mobile Money'],
      timeEstimate: '≈ 10 mins',
      orderType: 'Sell',
    },
    {
      id: '4',
      username: 'FastTrade Ghana',
      isVerified: true,
      completionRate: '97.50%',
      totalTrades: '3,421',
      price: '13.75',
      currency: 'GHS',
      cryptoType: 'USDT',
      limit: '1,000 - 50,000',
      available: '89,456.78',
      paymentMethods: ['Vodafone Cash', 'AirtelTigo Money'],
      timeEstimate: '≈ 12 mins',
      orderType: 'Sell',
    },

    // USDT Buy Orders - USD
    {
      id: '5',
      username: 'Admin | Solo Amps',
      isVerified: true,
      completionRate: '98.50%',
      totalTrades: '3,421',
      price: '1.02',
      currency: 'USD',
      cryptoType: 'USDT',
      limit: '100 - 5,000',
      available: '25,000.00',
      paymentMethods: ['Bank Transfer', 'PayPal'],
      timeEstimate: '≈ 30 mins',
      orderType: 'Buy',
    },

    // USDT Sell Orders - USD
    {
      id: '6',
      username: 'USDTrader',
      isVerified: true,
      completionRate: '99.10%',
      totalTrades: '2,156',
      price: '1.01',
      currency: 'USD',
      cryptoType: 'USDT',
      limit: '200 - 10,000',
      available: '15,000.00',
      paymentMethods: ['Zelle', 'Bank Transfer'],
      timeEstimate: '≈ 25 mins',
      orderType: 'Sell',
    },

    // BTC Buy Orders - GHS
    {
      id: '7',
      username: 'Admin | Solo Amps',
      isVerified: true,
      completionRate: '98.50%',
      totalTrades: '987',
      price: '1,510,245.00',
      currency: 'GHS',
      cryptoType: 'BTC',
      limit: '5,000 - 50,000',
      available: '1.25',
      paymentMethods: ['Bank Transfer', 'MTN Mobile Money'],
      timeEstimate: '≈ 30 mins',
      orderType: 'Buy',
    },

    // BTC Sell Orders - GHS
    {
      id: '8',
      username: 'BitcoinGhana',
      isVerified: true,
      completionRate: '97.80%',
      totalTrades: '1,543',
      price: '1,520,000.00',
      currency: 'GHS',
      cryptoType: 'BTC',
      limit: '10,000 - 100,000',
      available: '0.85',
      paymentMethods: ['Bank Transfer', 'Vodafone Cash'],
      timeEstimate: '≈ 35 mins',
      orderType: 'Sell',
    },
  ];

  // Filter traders based on selected crypto, currency, and order type
  const filteredTraders = tradersData.filter(
    (trader) =>
      trader.cryptoType === selectedCrypto &&
      trader.currency === selectedCurrency &&
      trader.orderType === activeOrderType
  );

  // Sort traders based on selected sort option
  const sortedTraders = [...filteredTraders].sort((a, b) => {
    if (selectedSort === 'highest') {
      return Number.parseFloat(b.price) - Number.parseFloat(a.price);
    } else if (selectedSort === 'lowest') {
      return Number.parseFloat(a.price) - Number.parseFloat(b.price);
    }
    return 0; // Default order for "amount"
  });

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto.code);
    setCryptoModalVisible(false);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
    setCurrencyModalVisible(false);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort.label);
    setSortModalVisible(false);
  };

  const getCurrentCurrency = () => {
    return currencies.find((c) => c.code === selectedCurrency) || currencies[0];
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateContent}>
        <DollarSign size={64} color="#8e8e93" />
        <Text style={styles.emptyStateTitle}>
          No {selectedCrypto} {activeOrderType} Offers in {selectedCurrency}
        </Text>
        <Text style={styles.emptyStateDescription}>
          There are currently no {selectedCrypto}{' '}
          {activeOrderType.toLowerCase()} offers available in {selectedCurrency}
          . Try selecting a different currency or check back later.
        </Text>
      </View>
    </View>
  );

  const renderTraderItem = ({ item }) => (
    <View style={styles.traderCard}>
      {/* Trader Header */}
      <View style={styles.traderHeader}>
        <View style={styles.traderInfo}>
          <Text style={styles.username}>{item.username}</Text>
          {item.isVerified && (
            <Shield size={14} color="#F0B90B" style={styles.verifiedIcon} />
          )}
        </View>
        <View style={styles.traderStats}>
          <Text style={styles.completionRate}>{item.completionRate}</Text>
          <Text style={styles.totalTrades}>{item.totalTrades} orders</Text>
        </View>
      </View>

      {/* Price and Crypto Info */}
      <View style={styles.priceSection}>
        <View style={styles.priceInfo}>
          <Text style={styles.price}>
            {getCurrentCurrency().symbol} {item.price}
          </Text>
          <Text style={styles.priceLabel}>Price</Text>
        </View>
        <View style={styles.cryptoInfo}>
          <Image
            source={
              cryptoCurrencies.find((c) => c.code === item.cryptoType)?.logo
            }
            style={styles.cryptoIcon}
          />
          <Text style={styles.cryptoAmount}>
            {item.available} {item.cryptoType}
          </Text>
          <Text style={styles.availableLabel}>Available</Text>
        </View>
      </View>

      {/* Limit and Payment */}
      <View style={styles.detailsSection}>
        <View style={styles.limitInfo}>
          <Text style={styles.limitLabel}>Limit</Text>
          <Text style={styles.limitValue}>
            {getCurrentCurrency().symbol} {item.limit}
          </Text>
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentLabel}>Payment</Text>
          <Text style={styles.paymentMethods} numberOfLines={1}>
            {item.paymentMethods.join(', ')}
          </Text>
        </View>
      </View>

      {/* Time and Action Button */}
      <View style={styles.actionSection}>
        <View style={styles.timeInfo}>
          <Clock size={12} color="#8e8e93" />
          <Text style={styles.timeEstimate}>{item.timeEstimate}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.actionButton,
            activeOrderType === 'Buy' ? styles.buyButton : styles.sellButton,
          ]}
          onPress={() =>
            navigation.navigate('PlacingOrder', {
              // Main order parameters (same as trade screen)
              amount: '0', // Default amount, user will input
              currency: item.currency,
              cryptoCurrency: item.cryptoType,
              orderType: activeOrderType,
              title: `${activeOrderType} ${item.cryptoType}`,
              price: item.price,
              symbol: `${item.cryptoType}/${item.currency}`,

              // Additional P2P trader data
              traderData: {
                ...item,
                // Ensure all trader properties are included
                username: item.username,
                isVerified: item.isVerified,
                completionRate: item.completionRate,
                totalTrades: item.totalTrades,
                price: item.price,
                currency: item.currency,
                cryptoType: item.cryptoType,
                limit: item.limit,
                available: item.available,
                paymentMethods: item.paymentMethods,
                timeEstimate: item.timeEstimate,
                orderType: item.orderType,
                // Add missing properties for consistency
                feedbackRate: item.feedbackRate || '98.53%',
                avgReleaseTime: item.timeEstimate,
              },
            })
          }>
          <Text style={styles.actionButtonText}>
            {activeOrderType} {item.cryptoType}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCryptoModal = () => (
    <Modal
      visible={cryptoModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setCryptoModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Cryptocurrency</Text>
            <TouchableOpacity onPress={() => setCryptoModalVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={cryptoCurrencies}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedCrypto === item.code && styles.selectedModalItem,
                ]}
                onPress={() => handleCryptoSelect(item)}>
                <Image source={item.logo} style={styles.modalCryptoLogo} />
                <View style={styles.modalItemInfo}>
                  <Text style={styles.modalItemCode}>{item.code}</Text>
                  <Text style={styles.modalItemName}>{item.name}</Text>
                </View>
                {selectedCrypto === item.code && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.selectedIndicator}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.modalList}
          />
        </View>
      </View>
    </Modal>
  );

  const renderCurrencyModal = () => (
    <Modal
      visible={currencyModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setCurrencyModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            <TouchableOpacity onPress={() => setCurrencyModalVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={currencies}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedCurrency === item.code && styles.selectedModalItem,
                ]}
                onPress={() => handleCurrencySelect(item)}>
                <Text style={styles.currencyFlag}>{item.flag}</Text>
                <View style={styles.modalItemInfo}>
                  <Text style={styles.modalItemCode}>
                    {item.code} {item.symbol}
                  </Text>
                  <Text style={styles.modalItemName}>{item.name}</Text>
                </View>
                {selectedCurrency === item.code && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.selectedIndicator}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.modalList}
          />
        </View>
      </View>
    </Modal>
  );

  const renderSortModal = () => (
    <Modal
      visible={sortModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setSortModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort by Amount</Text>
            <TouchableOpacity onPress={() => setSortModalVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={sortOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedSort === item.label && styles.selectedModalItem,
                ]}
                onPress={() => handleSortSelect(item)}>
                <Text style={styles.sortOptionText}>{item.label}</Text>
                {selectedSort === item.label && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.selectedIndicator}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.modalList}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    { name: 'NavigationBar', params: { screen: 'Trade' } },
                  ],
                });
              }}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>P2P</Text>
          </View>
          <TouchableOpacity
            style={styles.currencySelector}
            onPress={() => setCurrencyModalVisible(true)}>
            <Text style={styles.currencyText}>{selectedCurrency}</Text>
            <ChevronDown size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Buy/Sell Toggle */}
        <View style={styles.buySellToggleContainer}>
          <TouchableOpacity
            style={[
              styles.buySellToggleButton,
              activeOrderType === 'Buy'
                ? styles.buySellToggleActive
                : styles.buySellToggleInactive,
            ]}
            onPress={() => setActiveOrderType('Buy')}>
            <Text
              style={[
                styles.buySellToggleText,
                activeOrderType === 'Buy' && styles.buySellToggleTextActive,
              ]}>
              Buy Crypto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buySellToggleButton,
              activeOrderType === 'Sell'
                ? styles.buySellToggleActive
                : styles.buySellToggleInactive,
            ]}
            onPress={() => setActiveOrderType('Sell')}>
            <Text
              style={[
                styles.buySellToggleText,
                activeOrderType === 'Sell' && styles.buySellToggleTextActive,
              ]}>
              Sell Crypto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {/* Crypto Filter */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setCryptoModalVisible(true)}>
            <View style={styles.filterContent}>
              <Image
                source={
                  cryptoCurrencies.find((c) => c.code === selectedCrypto)?.logo
                }
                style={styles.filterCryptoLogo}
              />
              <Text style={styles.filterText}>{selectedCrypto}</Text>
            </View>
            <ChevronDown size={16} color="#fff" />
          </TouchableOpacity>

          {/* Amount Sort Filter */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSortModalVisible(true)}>
            <Text style={styles.filterText}>{selectedSort}</Text>
            <ChevronDown size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Traders List */}
        <FlatList
          data={sortedTraders}
          renderItem={renderTraderItem}
          keyExtractor={(item) => item.id}
          style={styles.tradersList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            sortedTraders.length === 0 ? { flex: 1 } : { paddingBottom: 20 }
          }
          ListEmptyComponent={renderEmptyState}
        />

        {/* Modals */}
        {renderCryptoModal()}
        {renderCurrencyModal()}
        {renderSortModal()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  currencyText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
  // Buy/Sell Toggle Styles
  buySellToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2D35',
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buySellToggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  buySellToggleActive: {
    backgroundColor: '#fff',
  },
  buySellToggleInactive: {
    backgroundColor: 'transparent',
  },
  buySellToggleText: {
    color: '#8e8e93',
    fontSize: 16,
    fontWeight: '500',
  },
  buySellToggleTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D35',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 12,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  filterCryptoLogo: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  tradersList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  traderCard: {
    backgroundColor: '#1A1D21',
    borderRadius: 12,
    marginBottom: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2A2D35',
  },
  traderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  traderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  traderStats: {
    alignItems: 'flex-end',
  },
  completionRate: {
    color: '#16a34a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalTrades: {
    color: '#8e8e93',
    fontSize: 12,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceInfo: {
    flex: 1,
  },
  price: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceLabel: {
    color: '#8e8e93',
    fontSize: 12,
  },
  cryptoInfo: {
    alignItems: 'flex-end',
    flex: 1,
  },
  cryptoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 4,
  },
  cryptoAmount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  availableLabel: {
    color: '#8e8e93',
    fontSize: 12,
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
  },
  limitInfo: {
    flex: 1,
  },
  limitLabel: {
    color: '#8e8e93',
    fontSize: 12,
    marginBottom: 4,
  },
  limitValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  paymentInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  paymentLabel: {
    color: '#8e8e93',
    fontSize: 12,
    marginBottom: 4,
  },
  paymentMethods: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeEstimate: {
    color: '#8e8e93',
    fontSize: 12,
    marginLeft: 4,
  },
  // Updated Action Button Styles
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buyButton: {
    backgroundColor: '#00C087', // Green for buy
  },
  sellButton: {
    backgroundColor: '#FF6B6B', // Red for sell
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1A1D21',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalClose: {
    color: '#8e8e93',
    fontSize: 18,
  },
  modalList: {
    paddingBottom: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  selectedModalItem: {
    backgroundColor: 'rgba(240, 185, 11, 0.1)',
  },
  modalCryptoLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  currencyFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  modalItemInfo: {
    flex: 1,
  },
  modalItemCode: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalItemName: {
    color: '#8e8e93',
    fontSize: 14,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0B90B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortOptionText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  selectedIndicator: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottomL: 100,
  },
  emptyStateContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    color: '#8e8e93',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default P2PTradingScreen;
