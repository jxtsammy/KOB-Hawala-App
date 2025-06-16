// TradeScreen.js
"use client"

import { useState } from "react"
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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

const TradeScreen = ({ route, navigation }) => {
  const { cryptoData } = route.params || { cryptoData: { symbol: "BNB/USDT", price: 640.13 } }
  const [activeTab, setActiveTab] = useState("Buy/Sell")
  const [buySellType, setBuySellType] = useState("Buy")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [buySellAmount, setBuySellAmount] = useState("0")

  // Selected crypto for Buy/Sell
  const [selectedCrypto, setSelectedCrypto] = useState("USDT")

  // Convert screen state
  const [fromCurrency, setFromCurrency] = useState("BTC")
  const [toCurrency, setToCurrency] = useState("ETH")
  const [convertSubTab, setConvertSubTab] = useState("Instant")

  // Modal state
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false)
  const [currencyModalType, setCurrencyModalType] = useState("from")
  const [searchQuery, setSearchQuery] = useState("")

  // Crypto currencies list
  const cryptoCurrencies = [
    { code: "USDT", name: "Tether", logo: require("../../assets/usdt.png") },
    { code: "BTC", name: "Bitcoin", logo: require("../../assets/btc.png") },
    { code: "ETH", name: "Ethereum", logo: require("../../assets/eth.png") },
    { code: "TRX", name: "TRON", logo: require("../../assets/trx.png") },
  ]

  // Fiat currencies for Buy/Sell
  const fiatCurrencies = [
    { code: "USD", name: "US Dollar", symbol: "$", flag: "https://flagcdn.com/w80/us.png" },
    { code: "EUR", name: "Euro", symbol: "€", flag: "https://flagcdn.com/w80/eu.png" },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "https://flagcdn.com/w80/gb.png" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "https://flagcdn.com/w80/jp.png" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "https://flagcdn.com/w80/au.png" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "https://flagcdn.com/w80/ca.png" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "https://flagcdn.com/w80/ch.png" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "https://flagcdn.com/w80/cn.png" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "https://flagcdn.com/w80/hk.png" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "https://flagcdn.com/w80/nz.png" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "https://flagcdn.com/w80/se.png" },
    { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "https://flagcdn.com/w80/kr.png" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "https://flagcdn.com/w80/sg.png" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "https://flagcdn.com/w80/no.png" },
    { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "https://flagcdn.com/w80/mx.png" },
    { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "https://flagcdn.com/w80/in.png" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "https://flagcdn.com/w80/br.png" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "https://flagcdn.com/w80/ru.png" },
    { code: "ZAR", name: "South African Rand", symbol: "R", flag: "https://flagcdn.com/w80/za.png" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "https://flagcdn.com/w80/tr.png" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "https://flagcdn.com/w80/ng.png" },
    { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "https://flagcdn.com/w80/gh.png" },
  ]

  const handleTabPress = (tab) => {
    if (tab === "P2P") {
      navigation.navigate("P2PNavigation")
    } else {
      setActiveTab(tab)
    }
  }

  const handleAmountChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, "")
    const parts = cleanedText.split(".")
    if (parts.length > 2) {
      return
    }
    setBuySellAmount(cleanedText === "" ? "0" : cleanedText)
  }

  const handleSwapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const openCurrencyModal = (type) => {
    setCurrencyModalType(type)
    setCurrencyModalVisible(true)
    setSearchQuery("")
  }

  const closeCurrencyModal = () => {
    setCurrencyModalVisible(false)
  }

  const selectCurrency = (currency) => {
    if (currencyModalType === "from") {
      setFromCurrency(currency.code)
    } else if (currencyModalType === "to") {
      setToCurrency(currency.code)
    } else if (currencyModalType === "fiat") {
      setSelectedCurrency(currency.code)
    } else if (currencyModalType === "crypto") {
      setSelectedCrypto(currency.code)
    }
    closeCurrencyModal()
  }

  const getFilteredCurrencies = () => {
    const currenciesToFilter = currencyModalType === "fiat" ? fiatCurrencies : cryptoCurrencies
    if (!searchQuery) return currenciesToFilter
    return currenciesToFilter.filter(
      (currency) =>
        currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const getSelectedCurrencySymbol = () => {
    const currency = fiatCurrencies.find((c) => c.code === selectedCurrency)
    return currency ? currency.symbol : "$"
  }

  const getCryptoLogo = (code) => {
    const crypto = cryptoCurrencies.find((c) => c.code === code)
    return crypto ? crypto.logo : null
  }

  // Modified Buy/Sell button press handler
  const handleBuySellPress = () => {
    // Validate amount
    if (!buySellAmount || Number.parseFloat(buySellAmount) === 0) {
      alert("Please enter an amount")
      return
    }

    // Prepare navigation parameters
    const orderParams = {
      amount: buySellAmount,
      currency: selectedCurrency,
      cryptoCurrency: selectedCrypto,
      orderType: buySellType, // "Buy" or "Sell"
      title: `${buySellType} ${selectedCrypto}`,
      price: cryptoData.price || 640.13,
      symbol: cryptoData.symbol || `${selectedCrypto}/${selectedCurrency}`,
    }

    // Navigate to PlacingOrder screen with parameters
    navigation.navigate("PlacingOrder", orderParams)
  }

  // Render the Buy/Sell tab content
  const renderBuySellTab = () => (
    <KeyboardAvoidingView
      style={styles.buySellTabContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Buy/Sell Toggle */}
        <View style={styles.buySellToggleContainer}>
          <TouchableOpacity
            style={[
              styles.buySellToggleButton,
              buySellType === "Buy" ? styles.buySellToggleActive : styles.buySellToggleInactive,
            ]}
            onPress={() => setBuySellType("Buy")}
          >
            <Text style={[styles.buySellToggleText, buySellType === "Buy" && styles.buySellToggleTextActive]}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buySellToggleButton,
              buySellType === "Sell" ? styles.buySellToggleActive : styles.buySellToggleInactive,
            ]}
            onPress={() => setBuySellType("Sell")}
          >
            <Text style={[styles.buySellToggleText, buySellType === "Sell" && styles.buySellToggleTextActive]}>
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
          <TouchableOpacity style={styles.currencySelector} onPress={() => openCurrencyModal("fiat")}>
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
          <TouchableOpacity style={styles.currencySelectionButton} onPress={() => openCurrencyModal("crypto")}>
            <View style={styles.currencyIconContainer}>
              <Image source={getCryptoLogo(selectedCrypto)} style={styles.cryptoLogo} />
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
          style={[styles.actionButton, buySellType === "Buy" ? styles.buyButton : styles.sellButton]}
          onPress={handleBuySellPress}
        >
          <Text style={styles.actionButtonText}>
            {buySellType} {selectedCrypto}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )

  // Render the Convert tab content
  const renderConvertTab = () => (
    <KeyboardAvoidingView
      style={styles.convertTabContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Promotion Banner */}
        <View style={styles.promotionBanner}>
          <Ionicons name="gift" size={20} color="#F0B90B" />
          <Text style={styles.promotionText}>Trade Convert Recurring to win a share of 11,000 USDC</Text>
        </View>

        {/* Sub Tabs */}
        <View style={styles.subTabsContainer}>
          <TouchableOpacity
            style={[styles.subTab, convertSubTab === "Instant" && styles.activeSubTab]}
            onPress={() => setConvertSubTab("Instant")}
          >
            <Text style={[styles.subTabText, convertSubTab === "Instant" && styles.activeSubTabText]}>Instant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.subTab, convertSubTab === "Recurring" && styles.activeSubTab]}
            onPress={() => setConvertSubTab("Recurring")}
          >
            <Text style={[styles.subTabText, convertSubTab === "Recurring" && styles.activeSubTabText]}>Recurring</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.subTab, convertSubTab === "Limit" && styles.activeSubTab]}
            onPress={() => setConvertSubTab("Limit")}
          >
            <Text style={[styles.subTabText, convertSubTab === "Limit" && styles.activeSubTabText]}>Limit</Text>
          </TouchableOpacity>
        </View>

        {/* Conversion Rate */}
        <View style={styles.conversionRateContainer}>
          <TouchableOpacity style={styles.conversionRateButton}>
            <Text style={styles.conversionRateText}>
              1 {fromCurrency} = {fromCurrency === "BTC" ? "13.5" : "253.835"} {toCurrency}
            </Text>
            <Text style={styles.conversionChangeText}>+2.25%</Text>
            <Ionicons name="chevron-down" size={20} color="#8e8e93" />
          </TouchableOpacity>
        </View>

        {/* From Currency */}
        <View style={styles.currencyContainer}>
          <Text style={styles.currencyLabel}>From</Text>
          <View style={styles.currencySelectionContainer}>
            <TouchableOpacity style={styles.currencySelection} onPress={() => openCurrencyModal("from")}>
              <Image source={getCryptoLogo(fromCurrency)} style={styles.currencyLogo} />
              <Text style={styles.currencyCode}>{fromCurrency}</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.amountContainer}>
              <TextInput
                style={styles.convertAmountInput}
                placeholder="0.0046 - 3500"
                placeholderTextColor="#8e8e93"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>

        {/* Swap Button */}
        <View style={styles.swapButtonContainer}>
          <TouchableOpacity style={styles.swapButton} onPress={handleSwapCurrencies}>
            <Ionicons name="swap-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* To Currency */}
        <View style={styles.currencyContainer}>
          <Text style={styles.currencyLabel}>To</Text>
          <View style={styles.currencySelectionContainer}>
            <TouchableOpacity style={styles.currencySelection} onPress={() => openCurrencyModal("to")}>
              <Image source={getCryptoLogo(toCurrency)} style={styles.currencyLogo} />
              <Text style={styles.currencyCode}>{toCurrency}</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.amountContainer}>
              <TextInput
                style={styles.convertAmountInput}
                placeholder="1.2 - 890000"
                placeholderTextColor="#8e8e93"
                keyboardType="decimal-pad"
                editable={false}
              />
            </View>
          </View>
        </View>

        {/* Convert Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Convert</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )

  // Currency Selection Modal
  const renderCurrencyModal = () => {
    const isFiatModal = currencyModalType === "fiat"
    const isCryptoModal = currencyModalType === "crypto"
    let modalTitle = "Select Currency"

    if (currencyModalType === "from") {
      modalTitle = "From"
    } else if (currencyModalType === "to") {
      modalTitle = "To"
    } else if (currencyModalType === "fiat") {
      modalTitle = "Currency"
    } else if (currencyModalType === "crypto") {
      modalTitle = "Cryptocurrency"
    }

    const filteredCurrencies = getFilteredCurrencies()

    return (
      <Modal
        visible={currencyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCurrencyModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={closeCurrencyModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#8e8e93" style={styles.searchIcon} />
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
                <TouchableOpacity style={styles.currencyItem} onPress={() => selectCurrency(item)}>
                  {isFiatModal ? (
                    <Image source={{ uri: item.flag }} style={styles.currencyItemFlag} />
                  ) : (
                    <Image source={item.logo} style={styles.currencyItemLogo} />
                  )}
                  <View style={styles.currencyItemInfo}>
                    <View style={styles.currencyItemHeader}>
                      <Text style={styles.currencyItemCode}>{item.code}</Text>
                    </View>
                    <Text style={styles.currencyItemName}>{item.name}</Text>
                  </View>
                  {isFiatModal && <Text style={styles.currencySymbol}>{item.symbol}</Text>}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2126" />

      {/* Header Tabs */}
      <View style={styles.headerTabs}>
        <TouchableOpacity
          style={[styles.headerTab, activeTab === "Convert" && styles.activeHeaderTab]}
          onPress={() => handleTabPress("Convert")}
        >
          <Text style={[styles.headerTabText, activeTab === "Convert" && styles.activeHeaderTabText]}>Convert</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.headerTab, activeTab === "Buy/Sell" && styles.activeHeaderTab]}
          onPress={() => handleTabPress("Buy/Sell")}
        >
          <Text style={[styles.headerTabText, activeTab === "Buy/Sell" && styles.activeHeaderTabText]}>Buy/Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerTab} onPress={() => handleTabPress("P2P")}>
          <Text style={styles.headerTabText}>P2P</Text>
        </TouchableOpacity>
      </View>

      {/* Pair Info */}
      <View style={styles.pairInfo}>
        <View style={styles.pairContainer}>
          <Text style={styles.pairText}>{cryptoData.symbol}</Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </View>

        <View style={styles.changeContainer}>
          <Text style={styles.changeText}>{cryptoData.change}</Text>
        </View>
      </View>

      {/* Tab Content */}
      {activeTab === "Buy/Sell" && renderBuySellTab()}
      {activeTab === "Convert" && renderConvertTab()}

      {/* Currency Selection Modal */}
      {renderCurrencyModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  headerTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  headerTab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeHeaderTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#F0B90B",
  },
  headerTabText: {
    color: "#8e8e93",
    fontSize: 16,
  },
  activeHeaderTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pairInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  pairContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pairText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  changeContainer: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 10,
  },
  changeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Buy/Sell Tab Styles
  buySellTabContainer: {
    flex: 1,
    padding: 16,
  },
  buySellToggleContainer: {
    flexDirection: "row",
    backgroundColor: "#2A2D35",
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  buySellToggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  buySellToggleActive: {
    backgroundColor: "#fff",
  },
  buySellToggleInactive: {
    backgroundColor: "transparent",
  },
  buySellToggleText: {
    color: "#8e8e93",
    fontSize: 16,
  },
  buySellToggleTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  amountInput: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 10,
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  currencySelectorText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  usdtContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  usdtText: {
    color: "#8e8e93",
    fontSize: 16,
    marginLeft: 10,
  },
  currencySelectionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    padding: 16,
  },
  currencyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  currencyName: {
    color: "#8e8e93",
    fontSize: 14,
  },
  actionButton: {
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  buyButton: {
    backgroundColor: "#00C087",
  },
  sellButton: {
    backgroundColor: "#FF6B6B",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Convert Tab Styles
  convertTabContainer: {
    flex: 1,
    padding: 16,
  },
  promotionBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(240, 185, 11, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  promotionText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
  },
  subTabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  subTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
  },
  activeSubTab: {
    backgroundColor: "#2A2D35",
  },
  subTabText: {
    color: "#8e8e93",
    fontSize: 14,
  },
  activeSubTabText: {
    color: "#fff",
  },
  conversionRateContainer: {
    marginBottom: 16,
  },
  conversionRateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  conversionRateText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  conversionChangeText: {
    color: "#28a745",
    fontSize: 14,
    marginRight: 10,
  },
  currencyContainer: {
    marginBottom: 10,
  },
  currencyLabel: {
    color: "#8e8e93",
    fontSize: 16,
    marginBottom: 8,
  },
  currencySelectionContainer: {
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    padding: 16,
  },
  currencySelection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  currencyLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  currencyCode: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  amountContainer: {
    width: "100%",
  },
  convertAmountInput: {
    color: "#fff",
    fontSize: 16,
    textAlign: "right",
  },
  swapButtonContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2A2D35",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#1E2126",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height * 0.7,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 10,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  currencyItemLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  currencyItemFlag: {
    width: 32,
    height: 24,
    marginRight: 12,
    borderRadius: 4,
  },
  currencyItemInfo: {
    flex: 1,
  },
  currencyItemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyItemCode: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  currencyItemName: {
    color: "#8e8e93",
    fontSize: 14,
  },
  currencySymbol: {
    color: "#8e8e93",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default TradeScreen