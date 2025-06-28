'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Trash2,
  ChevronRight,
  X,
  Info,
} from 'lucide-react-native';

const SelectCoinScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [history, setHistory] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);

  const cryptoData = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: require('../../../../assets/btc.png'),
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: require('../../../../assets/eth.png'),
    },
    {
      symbol: 'TRX',
      name: 'TRON',
      icon: require('../../../../assets/trx.png'),
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      icon: require('../../../../assets/usdt.png'),
    },
  ];

  const getNetworksForCrypto = (symbol) => {
    const networks = {
      BTC: [
        {
          id: 'btc-segwit',
          name: 'BTC(SegWit)',
          confirmations: '1',
          minDeposit: '0.000006',
          estimatedTime: '1 mins',
        },
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          confirmations: '1',
          minDeposit: '0.00001',
          estimatedTime: '1 mins',
        },
        {
          id: 'lightning',
          name: 'Lightning Network',
          confirmations: '1',
          minDeposit: '0.00001999',
          estimatedTime: '1 mins',
        },
      ],
      ETH: [
        {
          id: 'ethereum',
          name: 'Ethereum (ERC20)',
          confirmations: '6',
          minDeposit: '0.00000002',
          estimatedTime: '2 mins',
        },
        {
          id: 'bsc',
          name: 'BNB Smart Chain (BEP20)',
          confirmations: '15',
          minDeposit: '0.00000002',
          estimatedTime: '1 mins',
        },
      ],
      TRX: [
        {
          id: 'tron',
          name: 'TRON (TRC20)',
          confirmations: '1',
          minDeposit: '0.1',
          estimatedTime: '1 mins',
        },
      ],
      USDT: [
        {
          id: 'ethereum-usdt',
          name: 'Ethereum (ERC20)',
          confirmations: '6',
          minDeposit: '0.00000002',
          estimatedTime: '2 mins',
        },
        {
          id: 'tron-usdt',
          name: 'TRON (TRC20)',
          confirmations: '1',
          minDeposit: '0.1',
          estimatedTime: '1 mins',
        },
        {
          id: 'bsc-usdt',
          name: 'BNB Smart Chain (BEP20)',
          confirmations: '15',
          minDeposit: '0.00000002',
          estimatedTime: '1 mins',
        },
      ],
    };
    return networks[symbol] || [];
  };

  useEffect(() => {
    if (searchText) {
      const filtered = cryptoData.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchText.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCryptos(filtered);
    } else {
      setFilteredCryptos(cryptoData);
    }
  }, [searchText]);

  const handleCryptoSelect = (crypto) => {
    if (!crypto) {
      console.error('Missing crypto data');
      return;
    }
    setSelectedCrypto(crypto);
    setShowNetworkModal(true);
  };

  const handleNetworkSelect = (network) => {
    if (!network || !selectedCrypto) {
      console.error('Missing network or crypto data');
      return;
    }

    setSelectedNetwork(network);
    setShowNetworkModal(false);

    // Add to history
    if (!history.find((item) => item.symbol === selectedCrypto.symbol)) {
      setHistory((prev) => [...prev, selectedCrypto]);
    }

    // Navigate to deposit screen with the selected network (not selectedNetwork state)
    try {
      navigation.navigate('DepositCoin', {
        crypto: selectedCrypto,
        network: network, // Use the network parameter directly
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const renderCryptoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cryptoItem}
      onPress={() => handleCryptoSelect(item)}>
      <View style={styles.cryptoInfo}>
        <View style={styles.cryptoIcon}>
          <Image source={item.icon} style={styles.cryptoIconImage} />
        </View>
        <View>
          <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
          <Text style={styles.cryptoName}>{item.name}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );

  const renderHistoryItem = (crypto) => (
    <TouchableOpacity
      key={crypto.symbol}
      style={styles.historyItem}
      onPress={() => handleCryptoSelect(crypto)}>
      <Text style={styles.historyText}>{crypto.symbol}</Text>
    </TouchableOpacity>
  );

  const NetworkModal = ({ visible, crypto, onClose, onNetworkSelect }) => {
    if (!crypto) return null;

    const networks = getNetworksForCrypto(crypto.symbol);

    const renderNetworkItem = ({ item }) => (
      <TouchableOpacity
        style={styles.networkItem}
        onPress={() => onNetworkSelect(item)}>
        <View>
          <Text style={styles.networkName}>{item.name}</Text>
          <Text style={styles.networkInfo}>
            {item.confirmations} block confirmations
          </Text>
          <Text style={styles.networkInfo}>
            Min. deposit ≈{item.minDeposit} {crypto.symbol}
          </Text>
          <Text style={styles.networkInfo}>
            Est. arrival ≈ {item.estimatedTime}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SafeAreaView>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={onClose}>
                  <X size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Choose Network</Text>
                <View style={{ width: 24 }} />
              </View>
              <FlatList
                data={networks}
                renderItem={renderNetworkItem}
                keyExtractor={(item) => item.id}
                style={styles.networksList}
              />
              <View style={styles.footerNote}>
                <Info size={16} color="#666" />
                <Text style={styles.footerText}>
                  Please note that only supported networks on KOB Hawala
                  platform
                </Text>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Coin</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Coins"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* History Section */}
      {history.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>History</Text>
            <Trash2 size={20} color="#666" />
          </View>
          <View style={styles.historyContainer}>
            {history.map(renderHistoryItem)}
          </View>
        </View>
      )}

      {/* Trending Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending</Text>
        <FlatList
          data={filteredCryptos}
          renderItem={renderCryptoItem}
          keyExtractor={(item) => item.symbol}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Network Selection Modal */}
      <NetworkModal
        visible={showNetworkModal}
        crypto={selectedCrypto}
        onClose={() => setShowNetworkModal(false)}
        onNetworkSelect={handleNetworkSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: 20
  },
  historyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  historyItem: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  historyText: {
    color: '#fff',
    fontSize: 14,
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  cryptoIconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  cryptoSymbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cryptoName: {
    color: '#666',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  networksList: {
    paddingHorizontal: 16,
  },
  networkItem: {
    paddingVertical: 16,
  },
  networkName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  networkInfo: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    flex: 1,
  },
});

export default SelectCoinScreen;
