"use client"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const MarketScreen = ({ navigation }) => {
  // Simplified crypto data with only the 4 currencies we worked with
  const cryptoData = [
    {
      id: "1",
      symbol: "BTC",
      name: "Bitcoin",
      pair: "BTC/USDT",
      price: "111,017.98",
      priceUsd: "$110,999.99",
      change: "+4.17%",
      changePositive: true,
      marketCap: "959.20M",
      logo: require("../../assets/btc.png"),
    },
    {
      id: "2",
      symbol: "ETH",
      name: "Ethereum",
      pair: "ETH/USDT",
      price: "2,654.7",
      priceUsd: "$2,654",
      change: "+4.50%",
      changePositive: true,
      marketCap: "1.12B",
      logo: require("../../assets/eth.png"),
    },
    {
      id: "3",
      symbol: "USDT",
      name: "Tether",
      pair: "USDT/USD",
      price: "1.0001",
      priceUsd: "$1.00",
      change: "+0.01%",
      changePositive: true,
      marketCap: "140.5B",
      logo: require("../../assets/usdt.png"),
    },
    {
      id: "4",
      symbol: "TRX",
      name: "TRON",
      pair: "TRX/USDT",
      price: "0.2847",
      priceUsd: "$0.2847",
      change: "+2.34%",
      changePositive: true,
      marketCap: "24.8B",
      logo: require("../../assets/trx.png"),
    },
  ]

  const handleCryptoPress = (crypto) => {
    // Navigate to trade screen with selected crypto
    navigation.navigate("CoinGraph", {
      cryptoData: {
        symbol: crypto.pair,
        price: crypto.price,
        change: crypto.change,
      },
    })
  }

  const renderCryptoItem = ({ item }) => (
    <TouchableOpacity style={styles.cryptoItem} onPress={() => handleCryptoPress(item)}>
      <View style={styles.cryptoInfo}>
        <Image source={item.logo} style={styles.cryptoLogo} />
        <View style={styles.cryptoDetails}>
          <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
          <Text style={styles.cryptoPair}>{item.pair}</Text>
          <Text style={styles.marketCap}>{item.marketCap}</Text>
        </View>
      </View>

      <View style={styles.priceInfo}>
        <Text style={styles.lastPriceLabel}>Last Price</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.priceUsd}>{item.priceUsd}</Text>
      </View>

      <View style={styles.changeInfo}>
        <Text style={styles.changeLabel}>24h chg%</Text>
        <View style={[styles.changeContainer, { backgroundColor: item.changePositive ? "#16a34a" : "#dc2626" }]}>
          <Text style={styles.changeText}>{item.change}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2126" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <View style={styles.nameColumn}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Ionicons name="chevron-down" size={16} color="#8e8e93" />
        </View>
        <View style={styles.priceColumn}>
          <Text style={styles.tableHeaderText}>Last Price</Text>
          <Ionicons name="chevron-down" size={16} color="#8e8e93" />
        </View>
        <View style={styles.changeColumn}>
          <Text style={styles.tableHeaderText}>24h chg%</Text>
          <Ionicons name="chevron-down" size={16} color="#8e8e93" />
        </View>
      </View>

      {/* Crypto List */}
      <FlatList
        data={cryptoData}
        renderItem={renderCryptoItem}
        keyExtractor={(item) => item.id}
        style={styles.cryptoList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 4,
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
    backgroundColor: "#1A1D21",
  },
  nameColumn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  priceColumn: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  changeColumn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tableHeaderText: {
    color: "#8e8e93",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  cryptoList: {
    flex: 1,
  },
  cryptoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  cryptoInfo: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  cryptoLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  cryptoDetails: {
    flex: 1,
  },
  cryptoSymbol: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  cryptoPair: {
    color: "#8e8e93",
    fontSize: 12,
    marginBottom: 2,
  },
  marketCap: {
    color: "#8e8e93",
    fontSize: 11,
  },
  priceInfo: {
    flex: 1.5,
    alignItems: "center",
  },
  lastPriceLabel: {
    color: "#8e8e93",
    fontSize: 10,
    marginBottom: 2,
  },
  price: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  priceUsd: {
    color: "#8e8e93",
    fontSize: 12,
  },
  changeInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  changeLabel: {
    color: "#8e8e93",
    fontSize: 10,
    marginBottom: 4,
  },
  changeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 60,
    alignItems: "center",
  },
  changeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default MarketScreen;