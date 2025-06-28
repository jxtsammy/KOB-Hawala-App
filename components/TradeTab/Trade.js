'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const TradeScreen = ({ route, navigation }) => {
  const { cryptoData } = route.params || {
    cryptoData: { symbol: 'BNB/USDT', price: 640.13 },
  };
  const [activeTab, setActiveTab] = useState('Buy/Sell');
  const [buySellType, setBuySellType] = useState('Buy');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [buySellAmount, setBuySellAmount] = useState('0');

  // Selected crypto for Buy/Sell
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');

  // Convert screen state
  const [fromCurrency, setFromCurrency] = useState('USDT');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [depositModalVisible, setDepositModalVisible] = useState(false);

  // Modal state
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [currencyModalType, setCurrencyModalType] = useState('from');
  const [searchQuery, setSearchQuery] = useState('');

  // Wallet balances (mock data - in real app, fetch from API)
  const walletBalances = {
    USDT: 1000,
    BTC: 0.5,
    ETH: 2.5,
    TRX: 10000,
  };

  // Mock exchange rates
  const exchangeRates = {
    'USDT-BTC': 0.000091,
    'BTC-USDT': 109733.26,
    'USDT-ETH': 0.000377,
    'ETH-USDT': 2650,
    'BTC-ETH': 16.4,
    'ETH-BTC': 0.061,
    'USDT-TRX': 10.5,
    'TRX-USDT': 0.095,
    'BTC-TRX': 456000,
    'TRX-BTC': 0.0000022,
    'ETH-TRX': 27825,
    'TRX-ETH': 0.000036,
  };

  // Crypto currencies list
  const cryptoCurrencies = [
    { code: 'USDT', name: 'Tether', logo: require('../../assets/usdt.png') },
    { code: 'BTC', name: 'Bitcoin', logo: require('../../assets/btc.png') },
    { code: 'ETH', name: 'Ethereum', logo: require('../../assets/eth.png') },
    { code: 'TRX', name: 'TRON', logo: require('../../assets/trx.png') },
  ];

  // Fiat currencies for Buy/Sell
  const fiatCurrencies = [
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      flag: 'https://flagcdn.com/w80/us.png',
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      flag: 'https://flagcdn.com/w80/eu.png',
    },
    {
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      flag: 'https://flagcdn.com/w80/gb.png',
    },
    {
      code: 'JPY',
      name: 'Japanese Yen',
      symbol: '¥',
      flag: 'https://flagcdn.com/w80/jp.png',
    },
    {
      code: 'AUD',
      name: 'Australian Dollar',
      symbol: 'A$',
      flag: 'https://flagcdn.com/w80/au.png',
    },
    {
      code: 'CAD',
      name: 'Canadian Dollar',
      symbol: 'C$',
      flag: 'https://flagcdn.com/w80/ca.png',
    },
    {
      code: 'CHF',
      name: 'Swiss Franc',
      symbol: 'Fr',
      flag: 'https://flagcdn.com/w80/ch.png',
    },
    {
      code: 'CNY',
      name: 'Chinese Yuan',
      symbol: '¥',
      flag: 'https://flagcdn.com/w80/cn.png',
    },
    {
      code: 'HKD',
      name: 'Hong Kong Dollar',
      symbol: 'HK$',
      flag: 'https://flagcdn.com/w80/hk.png',
    },
    {
      code: 'NZD',
      name: 'New Zealand Dollar',
      symbol: 'NZ$',
      flag: 'https://flagcdn.com/w80/nz.png',
    },
    {
      code: 'SEK',
      name: 'Swedish Krona',
      symbol: 'kr',
      flag: 'https://flagcdn.com/w80/se.png',
    },
    {
      code: 'KRW',
      name: 'South Korean Won',
      symbol: '₩',
      flag: 'https://flagcdn.com/w80/kr.png',
    },
    {
      code: 'SGD',
      name: 'Singapore Dollar',
      symbol: 'S$',
      flag: 'https://flagcdn.com/w80/sg.png',
    },
    {
      code: 'NOK',
      name: 'Norwegian Krone',
      symbol: 'kr',
      flag: 'https://flagcdn.com/w80/no.png',
    },
    {
      code: 'MXN',
      name: 'Mexican Peso',
      symbol: '$',
      flag: 'https://flagcdn.com/w80/mx.png',
    },
    {
      code: 'INR',
      name: 'Indian Rupee',
      symbol: '₹',
      flag: 'https://flagcdn.com/w80/in.png',
    },
    {
      code: 'BRL',
      name: 'Brazilian Real',
      symbol: 'R$',
      flag: 'https://flagcdn.com/w80/br.png',
    },
    {
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
      flag: 'https://flagcdn.com/w80/ru.png',
    },
    {
      code: 'ZAR',
      name: 'South African Rand',
      symbol: 'R',
      flag: 'https://flagcdn.com/w80/za.png',
    },
    {
      code: 'TRY',
      name: 'Turkish Lira',
      symbol: '₺',
      flag: 'https://flagcdn.com/w80/tr.png',
    },
    {
      code: 'NGN',
      name: 'Nigerian Naira',
      symbol: '₦',
      flag: 'https://flagcdn.com/w80/ng.png',
    },
    {
      code: 'GHS',
      name: 'Ghanaian Cedi',
      symbol: '₵',
      flag: 'https://flagcdn.com/w80/gh.png',
    },
  ];

  // Get current exchange rate
  const getCurrentRate = () => {
    const rateKey = `${fromCurrency}-${toCurrency}`;
    return exchangeRates[rateKey] || 1;
  };

  // Check if user has sufficient balance
  const hasSufficientBalance = () => {
    const balance = walletBalances[fromCurrency] || 0;
    const amount = Number.parseFloat(fromAmount) || 0;
    return balance >= amount;
  };

  // Get required amount for insufficient balance
  const getRequiredAmount = () => {
    const balance = walletBalances[fromCurrency] || 0;
    const amount = Number.parseFloat(fromAmount) || 0;
    return amount - balance;
  };

  // Calculate conversion automatically
  useEffect(() => {
    if (fromAmount && !isNaN(Number.parseFloat(fromAmount))) {
      const rate = getCurrentRate();
      const converted = (Number.parseFloat(fromAmount) * rate).toFixed(8);
      setToAmount(converted);
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleTabPress = (tab) => {
    if (tab === 'P2P') {
      navigation.navigate('P2PNavigation');
    } else {
      setActiveTab(tab);
    }
  };

  const handleAmountChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, '');
    const parts = cleanedText.split('.');
    if (parts.length > 2) {
      return;
    }
    setBuySellAmount(cleanedText === '' ? '0' : cleanedText);
  };

  const handleFromAmountChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, '');
    const parts = cleanedText.split('.');
    if (parts.length > 2) {
      return;
    }
    setFromAmount(cleanedText);
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    // Clear amounts when swapping
    setFromAmount('');
    setToAmount('');
  };

  const openCurrencyModal = (type) => {
    setCurrencyModalType(type);
    setCurrencyModalVisible(true);
    setSearchQuery('');
  };

  const closeCurrencyModal = () => {
    setCurrencyModalVisible(false);
  };

  const selectCurrency = (currency) => {
    if (currencyModalType === 'from') {
      setFromCurrency(currency.code);
    } else if (currencyModalType === 'to') {
      setToCurrency(currency.code);
    } else if (currencyModalType === 'fiat') {
      setSelectedCurrency(currency.code);
    } else if (currencyModalType === 'crypto') {
      setSelectedCrypto(currency.code);
    }
    closeCurrencyModal();
  };

  const getFilteredCurrencies = () => {
    const currenciesToFilter =
      currencyModalType === 'fiat' ? fiatCurrencies : cryptoCurrencies;
    if (!searchQuery) return currenciesToFilter;
    return currenciesToFilter.filter(
      (currency) =>
        currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getSelectedCurrencySymbol = () => {
    const currency = fiatCurrencies.find((c) => c.code === selectedCurrency);
    return currency ? currency.symbol : '$';
  };

  const getCryptoLogo = (code) => {
    const crypto = cryptoCurrencies.find((c) => c.code === code);
    return crypto ? crypto.logo : null;
  };

  const handlePreviewPress = () => {
    if (!fromAmount || Number.parseFloat(fromAmount) === 0) {
      Alert.alert('Error', 'Please enter an amount to convert');
      return;
    }
    setPreviewModalVisible(true);
  };

  const handleIncreaseBalance = () => {
    setPreviewModalVisible(false);
    setDepositModalVisible(true);
  };

  const handleConversion = () => {
    if (hasSufficientBalance()) {
      setPreviewModalVisible(false);
      Alert.alert('Success', 'Conversion completed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset the form
            setFromAmount('');
            setToAmount('');
          },
        },
      ]);
    } else {
      handleIncreaseBalance();
    }
  };

  const handleDeposit = () => {
    setDepositModalVisible(false);
    navigation.navigate('SelectCoin');
  };

  // Modified Buy/Sell button press handler
  const handleBuySellPress = () => {
    if (!buySellAmount || Number.parseFloat(buySellAmount) === 0) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    const orderParams = {
      amount: buySellAmount,
      currency: selectedCurrency,
      cryptoCurrency: selectedCrypto,
      orderType: buySellType,
      title: `${buySellType} ${selectedCrypto}`,
      price: cryptoData.price || 640.13,
      symbol: cryptoData.symbol || `${selectedCrypto}/${selectedCurrency}`,
    };

    navigation.navigate('PlacingOrder', orderParams);
  };

  // ORIGINAL Buy/Sell tab content (unchanged)
  const renderBuySellTab = () => (
    <KeyboardAvoidingView
      style={styles.buySellTabContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Buy/Sell Toggle */}
        <View style={styles.buySellToggleContainer}>
          <TouchableOpacity
            style={[
              styles.buySellToggleButton,
              buySellType === 'Buy'
                ? styles.buySellToggleActive
                : styles.buySellToggleInactive,
            ]}
            onPress={() => setBuySellType('Buy')}>
            <Text
              style={[
                styles.buySellToggleText,
                buySellType === 'Buy' && styles.buySellToggleTextActive,
              ]}>
              Buy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buySellToggleButton,
              buySellType === 'Sell'
                ? styles.buySellToggleActive
                : styles.buySellToggleInactive,
            ]}
            onPress={() => setBuySellType('Sell')}>
            <Text
              style={[
                styles.buySellToggleText,
                buySellType === 'Sell' && styles.buySellToggleTextActive,
              ]}>
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Display */}
        <View style={styles.amountInputContainer}>
          <TextInput
            style={styles.amountInput}
            value={buySellAmount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            selectTextOnFocus={true}
          />
          <TouchableOpacity
            style={styles.currencySelector}
            onPress={() => openCurrencyModal('fiat')}>
            <Text style={styles.currencySelectorText}>{selectedCurrency}</Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.usdtContainer}>
          <Ionicons name="swap-vertical" size={24} color="#8e8e93" />
          <Image
            source={getCryptoLogo(selectedCrypto)}
            style={{ width: 16, height: 16, marginRight: 4, marginLeft: 4 }}
          />
          <Text style={styles.usdtText}>0 {selectedCrypto}</Text>
        </View>

        {/* Currency Selection */}
        <View style={styles.currencySelectionContainer}>
          <TouchableOpacity
            style={styles.currencySelectionButton}
            onPress={() => openCurrencyModal('crypto')}>
            <View style={styles.currencyIconContainer}>
              <Image
                source={getCryptoLogo(selectedCrypto)}
                style={styles.cryptoLogo}
              />
            </View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencySelectionText}>{buySellType}</Text>
              <Text style={styles.currencyName}>{selectedCrypto}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
          </TouchableOpacity>
        </View>

        {/* Dynamic Buy/Sell Button */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            buySellType === 'Buy' ? styles.buyButton : styles.sellButton,
          ]}
          onPress={handleBuySellPress}>
          <Text style={styles.actionButtonText}>
            {buySellType} {selectedCrypto}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  // NEW Clean, minimal Convert tab design
  const renderConvertTab = () => (
    <View style={styles.convertTabContainer}>
      <ScrollView
        contentContainerStyle={styles.convertScrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Rate Display */}
        <View style={styles.rateDisplay}>
          <Text style={styles.rateText}>
            1 BTC = {getCurrentRate().toLocaleString()} USDT
          </Text>
          <Text style={styles.rateChange}>+0.26%</Text>
        </View>

        {/* Conversion Area */}
        <View style={styles.conversionArea}>
          {/* From Section */}
          <View style={styles.convertSection}>
            <View style={styles.sectionTop}>
              <Text style={styles.sectionLabel}>From</Text>
              <Text style={styles.availableText}>
                Available: {walletBalances[fromCurrency]} {fromCurrency}
                {walletBalances[fromCurrency] === 0 && (
                  <Ionicons
                    name="warning"
                    size={12}
                    color="#F0B90B"
                    style={styles.warningIcon}
                  />
                )}
              </Text>
            </View>

            <View style={styles.inputRow}>
              <TouchableOpacity
                style={styles.currencyButton}
                onPress={() => openCurrencyModal('from')}>
                <Image
                  source={getCryptoLogo(fromCurrency)}
                  style={styles.currencyLogo}
                />
                <Text style={styles.currencyCode}>{fromCurrency}</Text>
                <Ionicons name="chevron-down" size={14} color="#8e8e93" />
              </TouchableOpacity>

              <TextInput
                style={styles.cleanAmountInput}
                placeholder="10000"
                placeholderTextColor="#4a4d5a"
                keyboardType="decimal-pad"
                value={fromAmount}
                onChangeText={handleFromAmountChange}
              />
            </View>
          </View>

          {/* Swap Button */}
          <View style={styles.swapContainer}>
            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwapCurrencies}>
              <Ionicons name="swap-vertical" size={18} color="#8e8e93" />
            </TouchableOpacity>
          </View>

          {/* To Section */}
          <View style={styles.convertSection}>
            <Text style={styles.sectionLabel}>To</Text>

            <View style={styles.inputRow}>
              <TouchableOpacity
                style={styles.currencyButton}
                onPress={() => openCurrencyModal('to')}>
                <Image
                  source={getCryptoLogo(toCurrency)}
                  style={styles.currencyLogo}
                />
                <Text style={styles.currencyCode}>{toCurrency}</Text>
                <Ionicons name="chevron-down" size={14} color="#8e8e93" />
              </TouchableOpacity>

              <TextInput
                style={[styles.cleanAmountInput, styles.readOnlyAmount]}
                placeholder="0.0905234"
                placeholderTextColor="#4a4d5a"
                value={toAmount}
                editable={false}
              />
            </View>
          </View>
        </View>

        {/* Bottom Rate */}
        <View style={styles.bottomRate}>
          <Text style={styles.bottomRateText}>1 BTC = 11001.8 USDT</Text>
          <TouchableOpacity>
            <Ionicons name="refresh" size={14} color="#8e8e93" />
          </TouchableOpacity>
        </View>

        {/* Preview Button */}
        <TouchableOpacity
          style={[
            styles.previewButton,
            (!fromAmount || Number.parseFloat(fromAmount) === 0) &&
              styles.previewButtonDisabled,
          ]}
          onPress={handlePreviewPress}
          disabled={!fromAmount || Number.parseFloat(fromAmount) === 0}>
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Enhanced Preview Modal
  const renderPreviewModal = () => (
    <Modal
      visible={previewModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setPreviewModalVisible(false)}>
      <View style={styles.previewModalOverlay}>
        <View style={styles.previewModalContainer}>
          <View style={styles.previewModalHeader}>
            <Text style={styles.previewModalTitle}>Confirm Order</Text>
            <TouchableOpacity
              onPress={() => setPreviewModalVisible(false)}
              style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.previewContent}>
            {/* From Section */}
            <View style={styles.previewSection}>
              <Text style={styles.previewSectionLabel}>From</Text>
              <View style={styles.previewCurrencyRow}>
                <View style={styles.previewCurrencyInfo}>
                  <Image
                    source={getCryptoLogo(fromCurrency)}
                    style={styles.previewCurrencyLogo}
                  />
                  <Text style={styles.previewCurrencyCode}>{fromCurrency}</Text>
                </View>
                <Text
                  style={[
                    styles.previewAmount,
                    !hasSufficientBalance() && styles.previewAmountError,
                  ]}>
                  {fromAmount}
                </Text>
              </View>
              {!hasSufficientBalance() && (
                <View style={styles.previewInsufficientContainer}>
                  <Ionicons name="warning" size={16} color="#dc3545" />
                  <Text style={styles.previewInsufficientText}>
                    You account has insufficient balance. Please fund your
                    account.
                  </Text>
                </View>
              )}
            </View>

            {/* To Section */}
            <View style={styles.previewSection}>
              <Text style={styles.previewSectionLabel}>To</Text>
              <View style={styles.previewCurrencyRow}>
                <View style={styles.previewCurrencyInfo}>
                  <Image
                    source={getCryptoLogo(toCurrency)}
                    style={styles.previewCurrencyLogo}
                  />
                  <Text style={styles.previewCurrencyCode}>{toCurrency}</Text>
                </View>
                <View style={styles.previewToAmountContainer}>
                  <Text style={styles.previewAmount}>{toAmount}</Text>
                  <Text style={styles.previewUsdValue}>≈ $ 9,986.97</Text>
                </View>
              </View>
            </View>

            {/* Details */}
            <View style={styles.previewDetailsContainer}>
              <View style={styles.previewDetailRow}>
                <Text style={styles.previewDetailLabel}>Type</Text>
                <Text style={styles.previewDetailValue}>Instant</Text>
              </View>
              <View style={styles.previewDetailRow}>
                <Text style={styles.previewDetailLabel}>Transaction Fees</Text>
                <Text style={styles.previewDetailValue}>0 {toCurrency}</Text>
              </View>
              <View style={styles.previewDetailRow}>
                <Text style={styles.previewDetailLabel}>Rate</Text>
                <Text style={styles.previewDetailValue}>
                  1 {fromCurrency} = {getCurrentRate().toFixed(8)} {toCurrency}
                </Text>
              </View>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConversion}>
              <Text style={styles.confirmButtonText}>
                {hasSufficientBalance()
                  ? 'Convert Now'
                  : `Increase ${fromCurrency}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Deposit Modal
  const renderDepositModal = () => (
    <Modal
      visible={depositModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setDepositModalVisible(false)}>
      <View style={styles.depositModalOverlay}>
        <View style={styles.depositModalContainer}>
          <View style={styles.depositModalHeader}>
            <Text style={styles.depositModalTitle}>Add Funds</Text>
            <TouchableOpacity
              onPress={() => setDepositModalVisible(false)}
              style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.depositContent}>
            <Text style={styles.depositNeedText}>You Need</Text>
            <Text style={styles.depositAmountText}>
              {getRequiredAmount().toFixed(2)} {fromCurrency}
            </Text>

            <TouchableOpacity
              style={styles.depositOption}
              onPress={handleDeposit}>
              <View style={styles.depositOptionIcon}>
                <Ionicons name="download" size={24} color="#F0B90B" />
              </View>
              <View style={styles.depositOptionInfo}>
                <Text style={styles.depositOptionTitle}>Deposit Crypto</Text>
                <Text style={styles.depositOptionSubtitle}>
                  Send to Binance Account
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Currency Selection Modal
  const renderCurrencyModal = () => {
    const isFiatModal = currencyModalType === 'fiat';
    let modalTitle = 'Select Currency';

    if (currencyModalType === 'from') {
      modalTitle = 'From';
    } else if (currencyModalType === 'to') {
      modalTitle = 'To';
    } else if (currencyModalType === 'fiat') {
      modalTitle = 'Currency';
    } else if (currencyModalType === 'crypto') {
      modalTitle = 'Cryptocurrency';
    }

    const filteredCurrencies = getFilteredCurrencies();

    return (
      <Modal
        visible={currencyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCurrencyModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity
                onPress={closeCurrencyModal}
                style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#8e8e93"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#8e8e93"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <FlatList
              data={filteredCurrencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.currencyItem}
                  onPress={() => selectCurrency(item)}>
                  {isFiatModal ? (
                    <Image
                      source={{ uri: item.flag }}
                      style={styles.currencyItemFlag}
                    />
                  ) : (
                    <Image source={item.logo} style={styles.currencyItemLogo} />
                  )}
                  <View style={styles.currencyItemInfo}>
                    <View style={styles.currencyItemHeader}>
                      <Text style={styles.currencyItemCode}>{item.code}</Text>
                    </View>
                    <Text style={styles.currencyItemName}>{item.name}</Text>
                  </View>
                  {isFiatModal && (
                    <Text style={styles.currencySymbol}>{item.symbol}</Text>
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1419" />

      {/* Header Tabs */}
      <View style={styles.headerTabs}>
        <TouchableOpacity
          style={[
            styles.headerTab,
            activeTab === 'Convert' && styles.activeHeaderTab,
          ]}
          onPress={() => handleTabPress('Convert')}>
          <Text
            style={[
              styles.headerTabText,
              activeTab === 'Convert' && styles.activeHeaderTabText,
            ]}>
            Convert
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.headerTab,
            activeTab === 'Buy/Sell' && styles.activeHeaderTab,
          ]}
          onPress={() => handleTabPress('Buy/Sell')}>
          <Text
            style={[
              styles.headerTabText,
              activeTab === 'Buy/Sell' && styles.activeHeaderTabText,
            ]}>
            Buy/Sell
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerTab}
          onPress={() => handleTabPress('P2P')}>
          <Text style={styles.headerTabText}>P2P</Text>
        </TouchableOpacity>
      </View>

      {/* Pair Info - Only show when not on Convert tab */}
      {activeTab !== 'Convert' && (
        <View style={styles.pairInfo}>
          <View style={styles.pairContainer}>
            <Text style={styles.pairText}>{cryptoData.symbol}</Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </View>

          <View style={styles.changeContainer}>
            <Text style={styles.changeText}>
              {cryptoData.change || '-2.45%'}
            </Text>
          </View>
        </View>
      )}

      {/* Tab Content */}
      {activeTab === 'Buy/Sell' && renderBuySellTab()}
      {activeTab === 'Convert' && renderConvertTab()}

      {/* Modals */}
      {renderCurrencyModal()}
      {renderPreviewModal()}
      {renderDepositModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  headerTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1e2329',
    backgroundColor: '#0f1419',
  },
  headerTab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeHeaderTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#F0B90B',
  },
  headerTabText: {
    color: '#8e8e93',
    fontSize: 16,
    fontWeight: '500',
  },
  activeHeaderTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  pairInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2329',
    backgroundColor: '#0f1419',
  },
  pairContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pairText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  changeContainer: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 10,
  },
  changeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // ORIGINAL Buy/Sell Tab Styles (unchanged)
  buySellTabContainer: {
    flex: 1,
    padding: 16,
  },
  buySellToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e2329',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  buySellToggleButton: {
    flex: 1,
    paddingVertical: 8,
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
  },
  buySellToggleTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  amountInput: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 10,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  currencySelectorText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  usdtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  usdtText: {
    color: '#8e8e93',
    fontSize: 16,
    marginLeft: 10,
  },
  currencySelectionContainer: {
    marginTop: 20,
  },
  currencySelectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e2329',
    borderRadius: 8,
    padding: 16,
  },
  currencyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  cryptoLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  currencyInfo: {
    flex: 1,
  },
  currencySelectionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyName: {
    color: '#8e8e93',
    fontSize: 14,
  },
  actionButton: {
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#00D4AA',
  },
  sellButton: {
    backgroundColor: '#FF6B6B',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // NEW Clean Convert Tab Styles
  convertTabContainer: {
    flex: 1,
    backgroundColor: '#111',
  },
  convertScrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  rateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  rateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  rateChange: {
    color: '#28a745',
    fontSize: 14,
    fontWeight: '600',
  },
  conversionArea: {
    marginBottom: 20,
  },
  convertSection: {
    backgroundColor: '#2A2D35',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    color: '#8e8e93',
    fontSize: 14,
    fontWeight: '500',
  },
  availableText: {
    color: '#8e8e93',
    fontSize: 12,
  },
  warningIcon: {
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  currencyCode: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
  cleanAmountInput: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  readOnlyAmount: {
    color: '#8e8e93',
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A1D21',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  bottomRateText: {
    color: '#8e8e93',
    fontSize: 14,
  },
  previewButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  previewButtonDisabled: {
    backgroundColor: '#3A3D45',
  },
  previewButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Enhanced Preview Modal Styles
  previewModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  previewModalContainer: {
    backgroundColor: '#1a1d29',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.8,
    borderTopWidth: 1,
    borderTopColor: '#252836',
  },
  previewModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#252836',
  },
  previewModalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContent: {
    padding: 24,
  },
  previewSection: {
    marginBottom: 24,
  },
  previewSectionLabel: {
    color: '#8e8e93',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previewCurrencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewCurrencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewCurrencyLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
  },
  previewCurrencyCode: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  previewAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  previewAmountError: {
    color: '#FF6B6B',
  },
  previewToAmountContainer: {
    alignItems: 'flex-end',
  },
  previewUsdValue: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  previewInsufficientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  previewInsufficientText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  previewDetailsContainer: {
    backgroundColor: '#252836',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2d3a',
  },
  previewDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewDetailLabel: {
    color: '#8e8e93',
    fontSize: 14,
    fontWeight: '500',
  },
  previewDetailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#F0B90B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },

  // Deposit Modal Styles
  depositModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  depositModalContainer: {
    backgroundColor: '#1a1d29',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.5,
    borderTopWidth: 1,
    borderTopColor: '#252836',
  },
  depositModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#252836',
  },
  depositModalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  depositContent: {
    padding: 24,
    alignItems: 'center',
  },
  depositNeedText: {
    color: '#8e8e93',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  depositAmountText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 32,
  },
  depositOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252836',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2a2d3a',
  },
  depositOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(240, 185, 11, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  depositOptionInfo: {
    flex: 1,
  },
  depositOptionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  depositOptionSubtitle: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 2,
    fontWeight: '500',
  },

  // Modal Styles (enhanced)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1a1d29',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: height * 0.7,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#252836',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#252836',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252836',
    borderRadius: 12,
    margin: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2a2d3a',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    fontWeight: '500',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  currencyItemLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  currencyItemFlag: {
    width: 36,
    height: 27,
    marginRight: 16,
    borderRadius: 4,
  },
  currencyItemInfo: {
    flex: 1,
  },
  currencyItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyItemCode: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  currencyItemName: {
    color: '#8e8e93',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  currencySymbol: {
    color: '#8e8e93',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TradeScreen;
