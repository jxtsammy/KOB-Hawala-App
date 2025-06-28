"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const AssetsScreen = () => {
  const [activeSection, setActiveSection] = useState("Crypto")
  const [hideBalance, setHideBalance] = useState(false)

  // Sample data for cryptocurrencies
  const cryptoAssets = [
    {
      id: "bonk",
      name: "Bonk",
      symbol: "BONK",
      amount: "294.57",
      value: "0.005782",
      pnl: "+0.00",
      pnlPercentage: "-4.94",
      logo: "https://cryptologos.cc/logos/bonk-bonk-logo.png",
    },
    {
      id: "hmstr",
      name: "Hamster Kombat",
      symbol: "HMSTR",
      amount: "0.44",
      value: "0.001013",
      pnl: "+0.00",
      pnlPercentage: "-1.92",
      averageCost: "0.00",
      logo: "https://cryptologos.cc/logos/hamster-kombat-hmstr-logo.png",
    },
    {
      id: "bnb",
      name: "BNB",
      symbol: "BNB",
      amount: "0.00000001",
      value: "0.000006",
      pnl: "+0.00",
      pnlPercentage: "-0.53",
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    },
  ]

  const renderBalanceSection = () => (
    <View style={styles.balanceSection}>
      <View style={styles.balanceHeader}>
        <View style={styles.balanceTitleContainer}>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <TouchableOpacity onPress={() => setHideBalance(!hideBalance)}>
            <Ionicons name={hideBalance ? "eye-off" : "eye"} size={20} color="#8e8e93" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.balanceAmount}>{hideBalance ? "********" : "$0.00682089"}</Text>
      <TouchableOpacity style={styles.currencySelector}>
        <Text style={styles.currencyText}>USD</Text>
        <Ionicons name="chevron-down" size={16} color="#8e8e93" />
      </TouchableOpacity>

      <View style={styles.pnlContainer}>
        <Text style={styles.pnlLabel}>Today's PNL</Text>
        <Text style={styles.pnlNegative}>-$0.000314(-4.42%)</Text>
        <Ionicons name="chevron-forward" size={16} color="#8e8e93" />
      </View>
    </View>
  )

  const renderSectionTabs = () => (
    <View style={styles.sectionTabsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectionTabsScroll}>
        <TouchableOpacity
          style={[styles.sectionTab, activeSection === "Crypto" && styles.activeSectionTab]}
          onPress={() => setActiveSection("Crypto")}
        >
          <Text style={[styles.sectionTabText, activeSection === "Crypto" && styles.activeSectionTabText]}>Crypto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionTab, activeSection === "Account" && styles.activeSectionTab]}
          onPress={() => setActiveSection("Account")}
        >
          <Text style={[styles.sectionTabText, activeSection === "Account" && styles.activeSectionTabText]}>
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionTab, activeSection === "Deposit" && styles.activeSectionTab]}
          onPress={() => setActiveSection("Deposit")}
        >
          <Text style={[styles.sectionTabText, activeSection === "Deposit" && styles.activeSectionTabText]}>
            Deposit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )

  const renderCryptoList = () => (
    <ScrollView style={styles.cryptoList}>
      {cryptoAssets.map((crypto) => (
        <View key={crypto.id} style={styles.cryptoItem}>
          <View style={styles.cryptoItemLeft}>
            <Image source={{ uri: crypto.logo }} style={styles.cryptoLogo} />
            <View style={styles.cryptoInfo}>
              <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
              <Text style={styles.cryptoName}>{crypto.name}</Text>

              <View style={styles.cryptoPnlContainer}>
                <Text style={styles.cryptoPnlLabel}>Today's PNL</Text>
                <Text style={styles.cryptoPnlPositive}>
                  {crypto.pnl}({crypto.pnlPercentage}%)
                </Text>
              </View>

              {crypto.averageCost && (
                <View style={styles.cryptoPnlContainer}>
                  <Text style={styles.cryptoPnlLabel}>Average cost</Text>
                  <Text style={styles.cryptoAverageCost}>${crypto.averageCost}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.cryptoItemRight}>
            <Text style={styles.cryptoAmount}>{crypto.amount}</Text>
            <Text style={styles.cryptoValue}>${crypto.value}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )

  const renderEmptyState = (type) => {
    let icon, title, description

    if (type === "Deposit") {
      icon = "wallet"
      title = "No Deposit History"
      description = "You haven't made any deposits yet. Add funds to start trading."
    }

    return (
      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateIconContainer}>
          <Ionicons name={icon} size={50} color="#8e8e93" />
        </View>
        <Text style={styles.emptyStateTitle}>{title}</Text>
        <Text style={styles.emptyStateDescription}>{description}</Text>
        <TouchableOpacity style={styles.emptyStateButton}>
          <Text style={styles.emptyStateButtonText}>Make a Deposit</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "Crypto":
        return renderCryptoList()
      case "Deposit":
        return renderEmptyState("Deposit")
      case "Account":
        return (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>Account Information</Text>
            <Text style={styles.emptyStateDescription}>Your account details will appear here.</Text>
          </View>
        )
      default:
        return renderCryptoList()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />

      {renderBalanceSection()}
      {renderSectionTabs()}
      {renderContent()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  balanceSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceTitle: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 10,
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  currencyText: {
    color: "#8e8e93",
    fontSize: 16,
    marginRight: 5,
  },
  pnlContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 15,
  },
  pnlLabel: {
    color: "#8e8e93",
    fontSize: 14,
    marginRight: 10,
  },
  pnlNegative: {
    color: "#dc3545",
    fontSize: 14,
    flex: 1,
  },
  sectionTabsContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
    justifyContent: "flex-start",
  },
  sectionTabsScroll: {
    paddingHorizontal: 20,
  },
  sectionTab: {
    marginRight: 20,
    paddingBottom: 5,
  },
  activeSectionTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#F0B90B",
  },
  sectionTabText: {
    color: "#8e8e93",
    fontSize: 16,
  },
  activeSectionTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cryptoList: {
    flex: 1,
  },
  cryptoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  cryptoItemLeft: {
    flexDirection: "row",
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cryptoInfo: {
    justifyContent: "center",
  },
  cryptoSymbol: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cryptoName: {
    color: "#8e8e93",
    fontSize: 14,
  },
  cryptoPnlContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cryptoPnlLabel: {
    color: "#8e8e93",
    fontSize: 12,
    marginRight: 5,
  },
  cryptoPnlPositive: {
    color: "#dc3545", // Using red for negative PNL as shown in the image
    fontSize: 12,
  },
  cryptoAverageCost: {
    color: "#fff",
    fontSize: 12,
  },
  cryptoItemRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cryptoAmount: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cryptoValue: {
    color: "#8e8e93",
    fontSize: 14,
    marginTop: 5,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2A2D35",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyStateTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyStateDescription: {
    color: "#8e8e93",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  emptyStateButton: {
    backgroundColor: "#F0B90B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default AssetsScreen