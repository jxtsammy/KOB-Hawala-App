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
  Image,
  TextInput,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Discover")
  const [searchQuery, setSearchQuery] = useState("")

  // Updated crypto data with only BTC, TRX, USDT, and ETH
  const cryptoData = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 103034.0,
      priceFormatted: "$103,034",
      change: -0.75,
      logo: require("../../assets/btc.png"),
    },
    {
      symbol: "TRX",
      name: "TRON",
      price: 0.2845,
      priceFormatted: "$0.2845",
      change: 2.34,
      logo: require("../../assets/trx.png"),
    },
    {
      symbol: "USDT",
      name: "Tether",
      price: 1.0,
      priceFormatted: "$1.00",
      change: 0.01,
      logo: require("../../assets/usdt.png"),
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2468.48,
      priceFormatted: "$2,468.48",
      change: -4.59,
      logo: require("../../assets/eth.png"),
    },
  ]

  // Filter crypto data based on search query
  const filteredCryptoData = cryptoData.filter(
    (crypto) =>
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const newsData = {
    Discover: [
      {
        title: "Bitcoin Mining Difficulty Increases by 2.13% at Block Height 897,120",
        time: "4h",
      },
      {
        author: "Richard Teng",
        time: "7h",
        avatar: "https://i.pravatar.cc/100?img=3",
        content:
          "In just 6 months since launch, #Binance Alpha has grown exponentially.\nIt offers users:\n◆ Access to exclusive rewards\n◆ Pre-listing trading opportunities ...",
        likes: 185,
        comments: 29,
        shares: 24,
      },
      {
        title: "Ethereum Layer 2 Solutions See Record Growth in Q2 2025",
        time: "9h",
      },
      {
        author: "Crypto Analyst",
        time: "12h",
        avatar: "https://i.pravatar.cc/100?img=5",
        content:
          "Market analysis shows bullish patterns forming across major altcoins. Here's what to watch for in the coming weeks...",
        likes: 142,
        comments: 37,
        shares: 18,
      },
    ],
    Following: [
      {
        author: "Vitalik Buterin",
        time: "2h",
        avatar: "https://i.pravatar.cc/100?img=8",
        content:
          "Excited to announce our latest progress on Ethereum scaling solutions. The future of decentralized applications is getting brighter!",
        likes: 3240,
        comments: 412,
        shares: 587,
      },
      {
        author: "CZ Binance",
        time: "5h",
        avatar: "https://i.pravatar.cc/100?img=12",
        content:
          "Binance is committed to compliance and security. Our latest audit results show our dedication to protecting user funds.",
        likes: 2105,
        comments: 231,
        shares: 189,
      },
      {
        author: "Michael Saylor",
        time: "8h",
        avatar: "https://i.pravatar.cc/100?img=15",
        content: "Bitcoin is digital energy. The most efficient way to channel monetary energy through time and space.",
        likes: 4521,
        comments: 328,
        shares: 1205,
      },
    ],
    News: [
      {
        title: "SEC Approves New Spot Ethereum ETFs, Market Reacts Positively",
        time: "1h",
      },
      {
        title: "Major Bank Announces Integration with USDC for Cross-Border Payments",
        time: "3h",
      },
      {
        title: "Solana Ecosystem Reaches New Milestone with 1 Million Daily Active Users",
        time: "6h",
      },
      {
        title: "Regulatory Framework for Cryptocurrencies Proposed in European Union",
        time: "10h",
      },
    ],
    Announcement: [
      {
        title: "Binance Introduces New Trading Pairs: PEPE/USDT and TRUMP/USDT",
        time: "2h",
      },
      {
        title: "Platform Maintenance Scheduled for June 2, 2025 - 2:00 UTC",
        time: "5h",
      },
      {
        title: "New Staking Options Available for BNB Holders with up to 12% APY",
        time: "8h",
      },
    ],
    Hot: [
      {
        author: "Crypto Influencer",
        time: "1h",
        avatar: "https://i.pravatar.cc/100?img=20",
        content: "This new memecoin is up 500% in the last 24 hours! The community is growing rapidly!",
        likes: 1823,
        comments: 421,
        shares: 312,
      },
      {
        title: "Major Hack: $150 Million Stolen from DeFi Protocol",
        time: "4h",
      },
      {
        author: "Whale Alert",
        time: "6h",
        avatar: "https://i.pravatar.cc/100?img=25",
        content: "🚨 10,000 #BTC transferred from unknown wallet to #Binance. Market impact expected.",
        likes: 2541,
        comments: 632,
        shares: 421,
      },
    ],
  }

  const handleCryptoPress = (cryptoData) => {
    navigation.navigate("CoinGraph", { cryptoData })
  }

  const handleSearchChange = (text) => {
    setSearchQuery(text)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderNewsItem = (item, index) => (
    <View key={index} style={styles.newsItem}>
      {item.author ? (
        // Social post
        <View style={styles.socialPost}>
          <View style={styles.postHeader}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.postHeaderText}>
              <Text style={styles.authorName}>{item.author}</Text>
              <Text style={styles.postTime}>{item.time}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#8e8e93" />
            </TouchableOpacity>
          </View>
          <Text style={styles.postContent}>{item.content}</Text>
          <View style={styles.postActions}>
            <View style={styles.postAction}>
              <Ionicons name="chatbubble-outline" size={20} color="#8e8e93" />
              <Text style={styles.actionCount}>{item.comments}</Text>
            </View>
            <View style={styles.postAction}>
              <Ionicons name="heart-outline" size={20} color="#8e8e93" />
              <Text style={styles.actionCount}>{item.likes}</Text>
            </View>
            <View style={styles.postAction}>
              <Ionicons name="arrow-redo-outline" size={20} color="#8e8e93" />
              <Text style={styles.actionCount}>{item.shares}</Text>
            </View>
          </View>
        </View>
      ) : (
        // News article
        <View style={styles.newsArticle}>
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsTime}>{item.time}</Text>
          </View>
        </View>
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2126" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/WhatsApp_Image_2025-05-17_at_18.17.36_6d6f6315-removebg-preview.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8e8e93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cryptocurrencies..."
            placeholderTextColor="#8e8e93"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#8e8e93" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Crypto List */}
        {filteredCryptoData.length > 0 ? (
          filteredCryptoData.map((crypto, index) => (
            <TouchableOpacity key={index} style={styles.cryptoItem} onPress={() => handleCryptoPress(crypto)}>
              <View style={styles.cryptoLeft}>
                <Image source={crypto.logo} style={styles.cryptoLogo} />
                <View style={styles.cryptoInfo}>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                </View>
              </View>

              <View style={styles.cryptoRight}>
                <View style={styles.priceContainer}>
                  <Text style={styles.cryptoPrice}>{crypto.priceFormatted}</Text>
                  <Text style={styles.cryptoPriceUsd}>${crypto.price.toLocaleString()}</Text>
                </View>

                <View
                  style={[
                    styles.changeContainer,
                    { backgroundColor: crypto.change === 0 ? "#6c757d" : crypto.change > 0 ? "#28a745" : "#dc3545" },
                  ]}
                >
                  <Text style={styles.changeText}>
                    {crypto.change >= 0 ? "+" : ""}
                    {crypto.change}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No cryptocurrencies found</Text>
            <Text style={styles.noResultsSubtext}>Try searching for BTC, ETH, USDT, or TRX</Text>
          </View>
        )}

        {/* News Section */}
        <View style={styles.newsSectionContainer}>
          {/* Horizontal Scrollable Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScrollView}>
            {Object.keys(newsData).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.newsSection}>
            <View style={styles.newsSectionHeader}>
              <Text style={styles.newsSectionTitle}>Catch The Latest</Text>
              <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
            </View>

            {newsData[activeTab].map((item, index) => renderNewsItem(item, index))}
          </View>
        </View>
      </ScrollView>
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
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logo: {
    width: 45,
    height: 45,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: "row",
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
  },
  cryptoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  cryptoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoSymbol: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cryptoName: {
    color: "#8e8e93",
    fontSize: 14,
    marginTop: 2,
  },
  cryptoRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  cryptoPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cryptoPriceUsd: {
    color: "#8e8e93",
    fontSize: 14,
  },
  changeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    minWidth: 70,
    alignItems: "center",
  },
  changeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noResultsContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: "#8e8e93",
    fontSize: 14,
    textAlign: "center",
  },
  newsSectionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#2A2D35",
  },
  tabsScrollView: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tab: {
    marginRight: 20,
    paddingVertical: 5,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#F0B90B",
  },
  tabText: {
    color: "#8e8e93",
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  newsSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  newsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  newsSectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  newsItem: {
    marginBottom: 15,
  },
  newsArticle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 10,
    padding: 15,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  newsTime: {
    color: "#8e8e93",
    fontSize: 14,
  },
  socialPost: {
    backgroundColor: "#2A2D35",
    borderRadius: 10,
    padding: 15,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postHeaderText: {
    flex: 1,
  },
  authorName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postTime: {
    color: "#8e8e93",
    fontSize: 14,
  },
  closeButton: {
    padding: 5,
  },
  postContent: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#3A3D45",
    paddingTop: 10,
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionCount: {
    color: "#8e8e93",
    fontSize: 14,
    marginLeft: 5,
  },
})

export default HomeScreen