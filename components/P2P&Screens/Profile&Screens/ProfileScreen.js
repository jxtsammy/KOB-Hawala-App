import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { ArrowLeft, Share, Check, ChevronRight, CreditCard, Wallet, Edit3 } from "lucide-react-native"

const P2PProfileScreen = ({ navigation }) => {
  const userProfile = {
    username: "P2P-c397fdhp",
    isVerified: true,
    verifications: {
      email: true,
      sms: true,
      kyc: true,
    },
    stats: {
      trades30d: 0,
      completionRate: "0.00%",
      avgReleaseTime: "0.00 Minute(s)",
      avgPayTime: "0.00 Minute(s)",
    },
  }

  const menuItems = [
    {
      id: "payment",
      title: "Payment Method",
      subtitle: "Manage your payment options",
      icon: CreditCard,
      onPress: () => navigation.navigate("P2PPaymentMethods"),
    },
    {
      id: "deposit",
      title: "Deposit",
      subtitle: "Add funds to your account",
      icon: Wallet,
      onPress: () => navigation.navigate("SelectCoin"),
    },
  ]

  const renderVerificationBadge = (type, isVerified) => {
    if (!isVerified) return null

    return (
      <View style={styles.verificationBadge}>
        <Check stroke="#00C087" width={12} height={12} />
        <Text style={styles.verificationText}>{type}</Text>
      </View>
    )
  }

  const renderMenuItem = (item) => {
    const IconComponent = item.icon

    return (
      <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress} activeOpacity={0.7}>
        <View style={styles.menuItemIconContainer}>
          <IconComponent stroke="#F0B90B" width={24} height={24} />
        </View>

        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
        </View>

        <View style={styles.menuItemRight}>
          {item.count !== undefined && (
            <View style={styles.countBadge}>
              <Text style={styles.menuItemCount}>{item.count}</Text>
            </View>
          )}
          <ChevronRight stroke="#8E8E93" width={20} height={20} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile {crypto.symbol}</Text>
        </View>

        <TouchableOpacity>
          <Share stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>P</Text>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{userProfile.username}</Text>
              {userProfile.isVerified && (
                <TouchableOpacity style={styles.editButton}>
                  <Edit3 stroke="#F0B90B" width={18} height={18} />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.verifiedLabel}>Verified user</Text>

            <View style={styles.verificationsContainer}>
              {renderVerificationBadge("Email", userProfile.verifications.email)}
              {renderVerificationBadge("SMS", userProfile.verifications.sms)}
              {renderVerificationBadge("KYC", userProfile.verifications.kyc)}
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.trades30d}</Text>
              <Text style={styles.statLabel}>30d Trades</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.completionRate}</Text>
              <Text style={styles.statLabel}>30d Completion Rate</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.avgReleaseTime}</Text>
              <Text style={styles.statLabel}>Avg. Release Time</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userProfile.stats.avgPayTime}</Text>
              <Text style={styles.statLabel}>Avg. Pay Time</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>{menuItems.map(renderMenuItem)}</View>
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2A2D35",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8,
    flex: 1,
  },
  editButton: {
    padding: 4,
  },
  verifiedLabel: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
  },
  verificationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  verificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 4,
  },
  verificationText: {
    fontSize: 12,
    color: "#00C087",
    marginLeft: 4,
  },
  statsSection: {
    backgroundColor: "#1A1A1A",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 18,
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2A2D35",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  countBadge: {
    backgroundColor: "#F0B90B",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
    minWidth: 24,
    alignItems: "center",
  },
  menuItemCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
})

export default P2PProfileScreen;