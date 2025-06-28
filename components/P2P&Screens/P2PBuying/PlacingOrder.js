"use client"

// PlacingOrderScreen.js
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native"
import { ArrowLeft, ChevronDown } from "lucide-react-native"

const PlacingOrderScreen = ({ navigation, route }) => {
  // Extract ALL parameters from navigation (from both trade screen and P2P screen)
  const { amount, currency, cryptoCurrency, orderType, title, price, symbol, traderData } = route.params

  const [orderAmount, setOrderAmount] = useState(amount || "0")
  const [activeTab, setActiveTab] = useState(currency || "USD")

  // Create comprehensive trader data using both direct params and traderData
  const finalTraderData = traderData
    ? {
        // Use traderData if available (from P2P)
        username: traderData.username,
        price: traderData.price || price,
        limit: traderData.limit || "100 - 50,000",
        paymentMethods: traderData.paymentMethods || ["Bank Transfer"],
        cryptoType: traderData.cryptoType || cryptoCurrency,
        currency: traderData.currency || currency,
        completionRate: traderData.completionRate || "99.50%",
        feedbackRate: traderData.feedbackRate || "98.53%",
        avgReleaseTime: traderData.avgReleaseTime || traderData.timeEstimate || "2.16 minutes",
        totalTrades: traderData.totalTrades || "1,000",
        available: traderData.available || "10,000",
        timeEstimate: traderData.timeEstimate || "≈ 15 mins",
        isVerified: traderData.isVerified !== undefined ? traderData.isVerified : true,
        orderType: traderData.orderType || orderType,
      }
    : {
        // Fallback data for regular trading (not P2P)
        username: "CryptoTrader123",
        price: price || "15.50",
        limit: "100 - 50,000",
        paymentMethods: ["Bank Transfer", "Mobile Money"],
        cryptoType: cryptoCurrency || "USDT",
        currency: currency || "USD",
        completionRate: "99.50%",
        feedbackRate: "98.53%",
        avgReleaseTime: "2.16 minutes",
        totalTrades: "1,000",
        available: "10,000",
        timeEstimate: "≈ 15 mins",
        isVerified: true,
        orderType: orderType || "Buy",
      }

  // Rest of the component logic remains the same...
  const limitRange = finalTraderData.limit.split(" - ")
  const minLimit = Number.parseFloat(limitRange[0].replace(/,/g, ""))
  const maxLimit = Number.parseFloat(limitRange[1].replace(/,/g, ""))
  const tradePrice = Number.parseFloat(finalTraderData.price)

  const handleMaxPress = () => {
    setOrderAmount(maxLimit.toString())
  }

  const calculateReceiveAmount = () => {
    const amountValue = Number.parseFloat(orderAmount) || 0
    if (activeTab === currency) {
      return (amountValue / tradePrice).toFixed(2)
    } else {
      return (amountValue * tradePrice).toFixed(2)
    }
  }

  const handlePlaceOrder = () => {
    if (!orderAmount || Number.parseFloat(orderAmount) === 0) {
      Alert.alert("Error", "Please enter an amount")
      return
    }

    const amountValue = Number.parseFloat(orderAmount)
    if (amountValue < minLimit || amountValue > maxLimit) {
      Alert.alert("Error", `Amount must be between ${minLimit} - ${maxLimit} ${currency}`)
      return
    }

    const orderData = {
      trader: finalTraderData,
      fiatAmount: activeTab === currency ? orderAmount : calculateReceiveAmount(),
      cryptoAmount: activeTab === currency ? calculateReceiveAmount() : orderAmount,
      price: finalTraderData.price,
      paymentMethod: finalTraderData.paymentMethods[0],
      orderType: orderType || finalTraderData.orderType || "Buy",
      currency: currency || finalTraderData.currency,
      cryptoCurrency: cryptoCurrency || finalTraderData.cryptoType,
      symbol: symbol || `${finalTraderData.cryptoType}/${finalTraderData.currency}`,
      title: title || `${orderType || "Buy"} ${finalTraderData.cryptoType}`,
      orderId: `ORD${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "pending",
      // Include all original parameters for reference
      originalParams: {
        amount,
        currency,
        cryptoCurrency,
        orderType,
        title,
        price,
        symbol,
        isP2P: !!traderData,
      },
      // Add comprehensive trader info
      completionRate: finalTraderData.completionRate,
      totalTrades: finalTraderData.totalTrades,
      timeEstimate: finalTraderData.timeEstimate,
      available: finalTraderData.available,
      isVerified: finalTraderData.isVerified,
    }

    // Navigate to OrderDetails screen with all order data
    navigation.navigate("MakingPayment", { orderData })
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Price Section */}
        <View style={styles.priceSection}>
          <View style={styles.priceSectionHeader}>
            <Text style={styles.priceSectionTitle}>Price</Text>
            <TouchableOpacity style={styles.refreshButton}>
              <Text style={styles.refreshIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>
              {currency}
              {finalTraderData.price}
            </Text>
            <Text style={styles.priceSubtext}>
              ≈ ${(Number.parseFloat(finalTraderData.price) * 0.074).toFixed(2)} USD
            </Text>
          </View>
          <Text style={styles.symbolText}>{symbol}</Text>
        </View>

        {/* Amount Input Section */}
        <View style={styles.amountSection}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === currency && styles.activeTab,
                activeTab === currency && (orderType === "Buy" ? styles.activeBuyTab : styles.activeSellTab),
              ]}
              onPress={() => setActiveTab(currency)}
            >
              <Text style={[styles.tabText, activeTab === currency && styles.activeTabText]}>By Currency</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === cryptoCurrency && styles.activeTab,
                activeTab === cryptoCurrency && (orderType === "Buy" ? styles.activeBuyTab : styles.activeSellTab),
              ]}
              onPress={() => setActiveTab(cryptoCurrency)}
            >
              <Text style={[styles.tabText, activeTab === cryptoCurrency && styles.activeTabText]}>By Crypto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.amountInput}
              value={orderAmount}
              onChangeText={setOrderAmount}
              placeholder="0"
              placeholderTextColor="#8E8E93"
              keyboardType="decimal-pad"
            />
            <View style={styles.inputRight}>
              <Text style={styles.currencyLabel}>{activeTab}</Text>
              <TouchableOpacity style={styles.maxButton} onPress={handleMaxPress}>
                <Text style={styles.maxButtonText}>Max</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.limitContainer}>
            <Text style={styles.limitText}>
              Limit {finalTraderData.limit} {currency}
            </Text>
          </View>

          <View style={styles.receiveContainer}>
            <Text style={styles.receiveLabel}>You {orderType === "Buy" ? "Receive" : "Pay"}</Text>
            <Text style={styles.receiveAmount}>
              {calculateReceiveAmount()} {activeTab === currency ? cryptoCurrency : currency}
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={[styles.paymentIndicator, { backgroundColor: orderType === "Buy" ? "#00C087" : "#FF6B6B" }]} />
            <Text style={styles.paymentMethodText}>{finalTraderData.paymentMethods[0]}</Text>
            <ChevronDown stroke="#8E8E93" width={16} height={16} />
          </TouchableOpacity>
        </View>

        {/* Payment Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Time Limit</Text>
            <Text style={styles.infoValue}>15 min</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Type</Text>
            <Text style={[styles.infoValue, { color: orderType === "Buy" ? "#00C087" : "#FF6B6B" }]}>{orderType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Advertiser's Status</Text>
            <View style={styles.statusContainer}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>

        {/* Trading Requirements */}
        <View style={styles.requirementsSection}>
          <Text style={styles.sectionTitle}>Trading Requirements</Text>
          <Text style={styles.requirementText}>
            {orderType === "Buy" ? "Verified account required" : "KYC verification needed"}
          </Text>
        </View>

        {/* Advertiser Info */}
        <View style={styles.advertiserSection}>
          <View style={styles.advertiserHeader}>
            <Text style={styles.sectionTitle}>Advertiser's Info</Text>
            <ChevronDown stroke="#8E8E93" width={16} height={16} />
          </View>

          <View style={styles.advertiserInfo}>
            <View style={styles.advertiserProfile}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{finalTraderData.username.charAt(0)}</Text>
              </View>
              <View style={styles.advertiserDetails}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>{finalTraderData.username}</Text>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedIcon}>🔒</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Feedback Rate</Text>
                <Text style={styles.positiveRate}>{finalTraderData.feedbackRate}</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Completion Rate</Text>
                <Text style={styles.completionRate}>{finalTraderData.completionRate}</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Avg. Release Time</Text>
                <Text style={styles.releaseTime}>{finalTraderData.avgReleaseTime || finalTraderData.timeEstimate}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.placeOrderButton, orderType === "Buy" ? styles.buyOrderButton : styles.sellOrderButton]}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderButtonText}>
            {orderType} {cryptoCurrency}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  priceSection: {
    paddingVertical: 16,
  },
  priceSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  priceSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  priceSubtext: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  symbolText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  refreshButton: {
    padding: 4,
  },
  refreshIcon: {
    fontSize: 16,
  },
  amountSection: {
    paddingVertical: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#F0B90B",
  },
  tabText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "left",
  },
  inputRight: {
    alignItems: "flex-end",
  },
  currencyLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  maxButton: {
    backgroundColor: "#2A2D35",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  maxButtonText: {
    fontSize: 14,
    color: "#F0B90B",
    fontWeight: "bold",
  },
  limitContainer: {
    marginBottom: 16,
  },
  limitText: {
    fontSize: 12,
    color: "#8E8E93",
  },
  receiveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  receiveLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  receiveAmount: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  paymentSection: {
    paddingVertical: 16,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 8,
  },
  paymentIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  infoSection: {
    paddingVertical: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  infoValue: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00C087",
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#8E8E93",
  },
  requirementsSection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  advertiserSection: {
    paddingVertical: 16,
  },
  advertiserHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  advertiserInfo: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 16,
  },
  advertiserProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2A2D35",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  advertiserDetails: {
    flex: 1,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  verifiedIcon: {
    fontSize: 14,
  },
  statsContainer: {
    gap: 12,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#8E8E93",
    flex: 1,
  },
  positiveRate: {
    fontSize: 14,
    color: "#00C087",
    fontWeight: "bold",
  },
  completionRate: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  releaseTime: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2D35",
  },
  placeOrderButton: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  activeBuyTab: {
    backgroundColor: "#00C087",
  },
  activeSellTab: {
    backgroundColor: "#FF6B6B",
  },
  buyOrderButton: {
    backgroundColor: "#00C087",
  },
  sellOrderButton: {
    backgroundColor: "#FF6B6B",
  },
})

export default PlacingOrderScreen;