// TraderProfileScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  ArrowLeft,
  CheckCircle,
} from 'lucide-react-native';

const TraderProfileScreen = ({ route, navigation }) => {
  const { trader } = route.params;
  
  // Mock data for the trader profile
  const traderData = {
    username: 'Admin | Solo Amps',
    avatar: 'A',
    isOnline: true,
    isVerified: true,
    completionRate: '97.80%',
    merchantLevel: 'Bronze Merchant',
    depositAmount: '1000 USDT',
    hasEmail: true,
    hasSMS: true,
    hasKYC: true,
    hasAddress: true,
    stats: {
      trades30d: '2854',
      completionRate30d: '97.80%',
      avgReleaseTime: '5.32 Minute(s)',
      avgPayTime: '8.76 Minute(s)',
      positiveFeedbackRate: '97%',
      positiveCount: '2221',
      negativeCount: '58',
      tradeType: 'Multi-Product Trader',
      registeredDays: '1351',
      firstTradeDays: '1328',
      counterparties: '10246',
      allTrades: '26988',
      buyTrades: '21198',
      sellTrades: '13790',
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#000000" width={24} height={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{traderData.avatar}</Text>
          </View>
          
          <View style={styles.profileInfo}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{traderData.username}</Text>
              {traderData.isVerified && (
                <CheckCircle stroke="#111" fill="#F0B90B" width={16} height={16} style={styles.verifiedIcon} />
              )}
            </View>
            
            <View style={styles.statusContainer}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.onlineText}>Online</Text>
              <Text style={styles.completionText}>Completed 24</Text>
            </View>
          </View>
        </View>

        {/* Merchant Info */}
        <View style={styles.merchantInfoContainer}>
          <View style={styles.merchantBadge}>
            <Text style={styles.merchantText}>{traderData.merchantLevel}</Text>
          </View>
          
          <View style={styles.depositBadge}>
            <Text style={styles.depositText}>Deposit {traderData.depositAmount}</Text>
          </View>
        </View>

        {/* Verification Methods */}
        <View style={styles.verificationContainer}>
          <View style={styles.verificationMethod}>
            <CheckCircle stroke="#111" fill="#00C087" width={16} height={16} />
            <Text style={styles.verificationText}>Email</Text>
          </View>
          
          <View style={styles.verificationMethod}>
            <CheckCircle stroke="#111" fill="#00C087" width={16} height={16} />
            <Text style={styles.verificationText}>SMS</Text>
          </View>
          
          <View style={styles.verificationMethod}>
            <CheckCircle stroke="#111" fill="#00C087" width={16} height={16} />
            <Text style={styles.verificationText}>KYC</Text>
          </View>
          
          <View style={styles.verificationMethod}>
            <CheckCircle stroke="#111" fill="#00C087" width={16} height={16} />
            <Text style={styles.verificationText}>Address</Text>
          </View>
        </View>

        {/* Info Tab */}
        <View style={styles.tabContainer}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Info</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>30d Trades</Text>
            <Text style={styles.statValue}>{traderData.stats.trades30d}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>30d Completion Rate</Text>
            <Text style={styles.statValue}>{traderData.stats.completionRate30d}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Avg. Release Time</Text>
            <Text style={styles.statValue}>{traderData.stats.avgReleaseTime}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Avg. Pay Time</Text>
            <Text style={styles.statValue}>{traderData.stats.avgPayTime}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Positive Feedback</Text>
            <Text style={styles.statValue}>{traderData.stats.positiveFeedbackRate}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Positive</Text>
            <Text style={styles.statValue}>{traderData.stats.positiveCount}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Negative</Text>
            <Text style={styles.statValue}>{traderData.stats.negativeCount}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Trade Type</Text>
            <Text style={styles.statValue}>{traderData.stats.tradeType}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Registered</Text>
            <Text style={styles.statValue}>{traderData.stats.registeredDays} Day(s) ago</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>First Trade</Text>
            <Text style={styles.statValue}>{traderData.stats.firstTradeDays} Day(s) ago</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Trading Counterparties</Text>
            <Text style={styles.statValue}>{traderData.stats.counterparties}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>All Trades</Text>
            <Text style={styles.statValue}>{traderData.stats.allTrades} Time(s)</Text>
          </View>
          
          <View style={styles.tradeCountRow}>
            <Text style={styles.tradeCountText}>BUY {traderData.stats.buyTrades} | SELL {traderData.stats.sellTrades}</Text>
          </View>
        </View>

        {/* Risk Management Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeTitle}>KOB Hawala Risk Management</Text>
          <Text style={styles.noticeText}>
            To reduce your trading risk, the verified advertiser has already paid a deposit as collateral.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F0B90B',
    paddingTop: 60
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  profileInfo: {
    flex: 1,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 4,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C087',
    marginRight: 4,
  },
  onlineText: {
    fontSize: 12,
    color: '#00C087',
    marginRight: 8,
  },
  completionText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  merchantInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
  },
  merchantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  merchantText: {
    color: '#F0B90B',
    fontSize: 14,
  },
  depositBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  depositText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  verificationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  verificationMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  verificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F0B90B',
    paddingVertical: 12,
  },
  activeTabText: {
    color: '#F0B90B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statLabel: {
    color: '#8E8E93',
    fontSize: 14,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 8,
  },
  tradeCountRow: {
    alignItems: 'flex-end',
    paddingVertical: 8,
  },
  tradeCountText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  noticeContainer: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  noticeTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  noticeText: {
    color: '#8E8E93',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default TraderProfileScreen;