'use client';

import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Clipboard,
  Modal,
  Image,
} from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';
import { ArrowLeft, Share, Copy, ChevronDown } from 'lucide-react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

const DepositScreen = ({ navigation, route }) => {
  // Add debugging to see what params are received
  console.log('DepositScreen params:', route?.params);

  // Extract params with better error handling
  const crypto = route?.params?.crypto;
  const network = route?.params?.network;

  const [depositAddress, setDepositAddress] = useState('');
  const [qrCodeText, setQrCodeText] = useState('');
  const [showImportantModal, setShowImportantModal] = useState(true);
  const [missingParams, setMissingParams] = useState(null);
  const [isSharing, setIsSharing] = useState(false);

  // Ref for capturing the share content
  const shareViewRef = useRef(null);
  // Refs for QR codes to get base64 data
  const qrRef = useRef(null);
  const shareQrRef = useRef(null);

  // Add debugging logs
  console.log('Crypto:', crypto);
  console.log('Network:', network);

  useEffect(() => {
    if (!crypto) {
      setMissingParams('crypto');
      return;
    }

    if (!network) {
      setMissingParams('network');
      return;
    }
    // Generate a mock deposit address
    generateDepositAddress();
  }, [crypto, network]);

  useEffect(() => {
    // Create QR code text when deposit address is available
    if (depositAddress && crypto && network) {
      const qrText = createQRCodeText();
      setQrCodeText(qrText);
      console.log('QR Code Text:', qrText);
    }
  }, [depositAddress, crypto, network]);

  if (missingParams === 'crypto') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error: Missing cryptocurrency information
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (missingParams === 'network') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error: Missing network information
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const generateDepositAddress = () => {
    // Mock address generation based on crypto type
    const addresses = {
      BTC: '1GSKVtZ9vaMiE4moRMHfth27QD7WKinGi',
      ETH: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      TRX: 'TLa2f6VPqDgRE7zZYLNnFan7H2dVDHAFSh',
      USDT: '1GSKVtZ9vaMiE4moRMHfth27QD7WKinGi',
    };
    const address = addresses[crypto.symbol] || addresses.BTC;
    setDepositAddress(address);
  };

  const createQRCodeText = () => {
    // Create comprehensive QR code text with crypto name, network, and address
    const qrData = {
      crypto: crypto.symbol || crypto.name || 'Unknown',
      network: network.name || 'Unknown Network',
      address: depositAddress,
      platform: 'KOB Hawala'
    };
    
    // For cryptocurrency addresses, we can use different formats
    // Simple format: just the address (most common for crypto)
    // return depositAddress;
    
    // Or comprehensive format with all info
    return JSON.stringify(qrData);
    
    // Or URI format (common for Bitcoin)
    // return `${crypto.symbol.toLowerCase()}:${depositAddress}?label=KOB%20Hawala&message=Deposit%20to%20${network.name}`;
  };

  const copyToClipboard = () => {
    Clipboard.setString(depositAddress);
    Alert.alert('Copied!', 'Deposit address copied to clipboard');
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          'Sharing not available',
          'Sharing is not available on this device'
        );
        return;
      }

      // Capture the share content as image
      const uri = await shareViewRef.current.capture({
        format: 'png',
        quality: 1.0,
        result: 'tmpfile',
      });

      // Share the image using Expo Sharing
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: `${crypto.symbol} Deposit Information - KOB Hawala`,
      });
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Share Error', 'Failed to share deposit information');
    } finally {
      setIsSharing(false);
    }
  };

  const handleDeposit = () => {
    // Activate deposit functionality
    console.log('Activating deposit functionality...');
    
    // Create deposit record/transaction
    const depositData = {
      crypto: crypto.symbol,
      network: network.name,
      address: depositAddress,
      timestamp: new Date().toISOString(),
      status: 'pending',
      platform: 'KOB Hawala'
    };
    
    console.log('Deposit Data:', depositData);
    
    // Show success message
    Alert.alert(
      'Deposit Activated',
      `Your ${crypto.symbol} deposit has been activated. You can now send funds to the provided address.`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to ProfileScreen tab in P2PNavigation
            console.log('Navigating to ProfileScreen in P2PNavigation...');
            
            // Navigate to the P2PNavigation and specifically to the ProfileScreen tab
            navigation.navigate('P2PNavigation', {
              screen: 'P2P',
              params: {
                depositActivated: true,
                depositData: depositData
              }
            });
          }
        }
      ]
    );
  };

  const handleContinue = () => {
    setShowImportantModal(false);
  };

  const getCryptoIcon = (symbol) => {
    const icons = {
      BTC: require('../../../../assets/btc.png'),
      ETH: require('../../../../assets/eth.png'),
      TRX: require('../../../../assets/trx.png'),
      USDT: require('../../../../assets/usdt.png'),
    };
    return icons[symbol] || icons.BTC;
  };

  const ImportantModal = ({
    visible,
    crypto,
    network,
    onClose,
    onContinue,
  }) => {
    if (!crypto || !network) return null;

    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.importantModalOverlay}>
          <View style={styles.importantModalContent}>
            <Text style={styles.importantModalTitle}>Important</Text>
            <Text style={styles.importantModalText}>
              KOB Hawala supports deposits from all {crypto.symbol} addresses
              (starting with "1", "3", "bc1p" and "bc1q")
            </Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Don't render QR codes until we have the text ready
  if (!qrCodeText) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading deposit information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Deposit {crypto.symbol}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={handleShare}
            disabled={isSharing}>
            <Share size={24} color={isSharing ? '#666' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={copyToClipboard}>
            <Copy size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Regular App Display */}
        {/* QR Code */}
        <View style={styles.qrContainer}>
          <QRCodeSVG
            value={qrCodeText}
            size={200}
            backgroundColor="#000000"
            color="#FFFFFF"
            ref={qrRef}
          />
          {/* Add crypto icon overlay */}
          <View style={styles.qrIconOverlay}>
            <Image
              source={getCryptoIcon(crypto.symbol)}
              style={styles.qrCryptoIcon}
            />
          </View>
        </View>

        {/* Network Info */}
        <View style={styles.networkSection}>
          <Text style={styles.networkLabel}>Network</Text>
          <View style={styles.networkInfo}>
            <Text style={styles.networkName}>{network.name}</Text>
          </View>
        </View>

        {/* Deposit Address */}
        <View style={styles.addressSection}>
          <Text style={styles.addressLabel}>Deposit Address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{depositAddress}</Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={styles.copyButton}>
              <Copy size={20} color="#F0B90B" />
            </TouchableOpacity>
          </View>
          <Text style={styles.addressInfo}>
            KOB Hawala supports deposits from all {crypto.symbol} addresses
            (starting with "1", "3", "bc1p" and "bc1q")
          </Text>
        </View>

        {/* Deposit Button */}
        <TouchableOpacity style={styles.depositButton} onPress={handleDeposit}>
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>
      </View>

      {/* Hidden Shareable Content - Only for capturing */}
      <View style={styles.hiddenShareContent}>
        <ViewShot ref={shareViewRef} style={styles.shareableContent}>
          {/* Header */}
          <Text style={styles.shareTitle}>
            Deposit {crypto.symbol} to KOB Hawala
          </Text>

          {/* QR Code */}
          <View style={styles.shareQrContainer}>
            <QRCodeSVG
              value={qrCodeText}
              size={200}
              backgroundColor="#FFFFFF"
              color="#000000"
              ref={shareQrRef}
            />
            {/* Add crypto icon overlay */}
            <View style={styles.shareQrIconOverlay}>
              <Image
                source={getCryptoIcon(crypto.symbol)}
                style={styles.shareQrCryptoIcon}
              />
            </View>
          </View>

          {/* Network Row */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Network</Text>
            <Text style={styles.infoValue}>{network.name}</Text>
          </View>

          {/* Address Row */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{depositAddress}</Text>
          </View>

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            Don't send NFTs to this address.{'\n'}
            Smart contract deposits are not supported with the exception of ETH
            via ERC20, BSC via BEP20, Arbitrum and Optimism networks.
          </Text>

          {/* KOB Hawala Logo/Brand */}
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>KOB HAWALA</Text>
          </View>
        </ViewShot>
      </View>

      {/* Important Modal */}
      <ImportantModal
        visible={showImportantModal}
        crypto={crypto}
        network={network}
        onClose={() => setShowImportantModal(false)}
        onContinue={handleContinue}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  networkSection: {
    marginBottom: 24,
  },
  networkLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  networkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
  },
  networkName: {
    color: '#fff',
    fontSize: 16,
  },
  addressSection: {
    marginBottom: 24,
  },
  addressLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  addressText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 4,
    marginLeft: 8,
  },
  addressInfo: {
    color: '#F0B90B',
    fontSize: 12,
    lineHeight: 16,
  },
  depositButton: {
    backgroundColor: '#F0B90B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 120,
    bottom: 0
  },
  depositButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  qrIconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCryptoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  // Hidden share content styles
  hiddenShareContent: {
    position: 'absolute',
    top: -10000, // Move far off screen
    left: -10000,
    opacity: 0,
  },
  shareableContent: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: 350,
  },
  shareTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 40,
  },
  shareQrContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  shareQrIconOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareQrCryptoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '400',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
    fontFamily: 'monospace',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    letterSpacing: 2,
  },
  importantModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  importantModalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  importantModalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  importantModalText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#F0B90B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#ffd700',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DepositScreen;