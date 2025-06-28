// OrderHistory.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { ArrowLeft, AlertCircle, Filter, Copy, X, CheckCircle } from 'lucide-react-native';

const OrderHistory = () => {
  const [activeMainTab, setActiveMainTab] = useState('Ongoing');
  const [activeSubTab, setActiveSubTab] = useState('All');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState('newest');

  // Mock data for transactions
  const transactions = [
    {
      id: '227571306790873415628',
      type: 'Buy',
      crypto: 'USDT',
      amount: 'GH₵80.00',
      price: 'GH₵13.55',
      quantity: '5.9 USDT',
      status: 'Canceled',
      trader: 'Blue',
      date: '05-17',
      time: '18:53:45',
      timestamp: new Date('2023-05-17T18:53:45'),
      hasUnreadMessages: true,
    },
    {
      id: '227571171298384158722',
      type: 'Buy',
      crypto: 'ETH',
      amount: 'GH₵80.00',
      price: 'GH₵34,213.49',
      quantity: '0.00233825 ETH',
      status: 'Canceled',
      trader: 'Admin | Solo Amps',
      date: '05-17',
      time: '17:59:54',
      timestamp: new Date('2023-05-17T17:59:54'),
      hasUnreadMessages: true,
    },
    {
      id: '227571132772088340488',
      type: 'Buy',
      crypto: 'USDT',
      amount: 'GH₵1,347.00',
      price: 'GH₵13.47',
      quantity: '100.05 USDT',
      status: 'Canceled',
      trader: 'Admin | Solo Ampsgle',
      date: '05-17',
      time: '17:44:36',
      timestamp: new Date('2023-05-17T17:44:36'),
      hasUnreadMessages: true,
    },
    {
      id: '227571132772088340489',
      type: 'Buy',
      crypto: 'BNB',
      amount: 'GH₵500.00',
      price: 'GH₵250.00',
      quantity: '2.0 BNB',
      status: 'Completed',
      trader: 'Admon | Solo Amps',
      date: '05-17',
      time: '16:30:22',
      timestamp: new Date('2023-05-17T16:30:22'),
      hasUnreadMessages: false,
    },
    {
      id: '227571132772088340490',
      type: 'Buy',
      crypto: 'ETH',
      amount: 'GH₵1,200.00',
      price: 'GH₵35,000.00',
      quantity: '0.034 ETH',
      status: 'Ongoing',
      trader: 'Admon | Solo Amps',
      date: '05-18',
      time: '09:15:30',
      timestamp: new Date('2023-05-18T09:15:30'),
      hasUnreadMessages: false,
    },
  ];

  // Filter and sort transactions based on active tabs and sort option
  const filteredTransactions = transactions
    .filter(transaction => {
      if (activeMainTab === 'Ongoing') {
        return transaction.status === 'Ongoing';
      } else if (activeMainTab === 'Fulfilled') {
        if (activeSubTab === 'All') {
          return transaction.status === 'Completed' || transaction.status === 'Canceled';
        } else if (activeSubTab === 'Completed') {
          return transaction.status === 'Completed';
        } else if (activeSubTab === 'Canceled') {
          return transaction.status === 'Canceled';
        }
      }
      return false;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return b.timestamp - a.timestamp;
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'date':
          return a.date.localeCompare(b.date) || b.timestamp - a.timestamp;
        case 'time':
          return a.time.localeCompare(b.time);
        default:
          return 0;
      }
    });

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={[styles.transactionType, { color: item.type === 'Buy' ? '#00C087' : '#FF6B6B' }]}>
          {item.type} {item.crypto}
        </Text>
        <Text style={[
          styles.statusText, 
          { 
            color: item.status === 'Completed' ? '#00C087' : 
                   item.status === 'Canceled' ? '#FF6B6B' : 
                   item.status === 'Ongoing' ? '#FFB800' : '#8E8E93'
          }
        ]}>
          {item.status}
        </Text>
      </View>
      
      <View style={styles.transactionDetails}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>{item.amount}</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>{item.price}</Text>
        </View>
      </View>
      
      <View style={styles.transactionDetails}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Quantity</Text>
          <Text style={styles.detailValue}>{item.quantity}</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>Order</Text>
          <View style={styles.orderIdContainer}>
            <Text style={[styles.detailValue, styles.orderId]} numberOfLines={1}>
              {item.id}
            </Text>
            <Copy stroke="#8E8E93" width={14} height={14} style={styles.copyIcon} />
          </View>
        </View>
      </View>
      
      <View style={styles.traderRow}>
        <View style={styles.traderContainer}>
          <Text style={styles.traderName}>{item.trader}</Text>
          {item.hasUnreadMessages && (
            <View style={styles.messageIndicator}>
              <Text style={styles.messageCount}>2</Text>
            </View>
          )}
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      {activeMainTab === 'Ongoing' ? (
        <>
          <AlertCircle stroke="#8E8E93" width={48} height={48} />
          <Text style={styles.emptyStateText}>No ongoing transactions</Text>
          <Text style={styles.emptyStateSubText}>Your active trades will appear here</Text>
        </>
      ) : activeSubTab === 'Completed' ? (
        <>
          <CheckCircle stroke="#8E8E93" width={48} height={48} />
          <Text style={styles.emptyStateText}>No completed transactions</Text>
          <Text style={styles.emptyStateSubText}>Your successful trades will appear here</Text>
        </>
      ) : activeSubTab === 'Canceled' ? (
        <>
          <X stroke="#8E8E93" width={48} height={48} />
          <Text style={styles.emptyStateText}>No canceled transactions</Text>
          <Text style={styles.emptyStateSubText}>Your canceled trades will appear here</Text>
        </>
      ) : (
        <>
          <AlertCircle stroke="#8E8E93" width={48} height={48} />
          <Text style={styles.emptyStateText}>No fulfilled transactions</Text>
          <Text style={styles.emptyStateSubText}>Your completed trades will appear here</Text>
        </>
      )}
    </View>
  );

  const renderFilterOption = (option, label) => (
    <TouchableOpacity
      style={styles.filterOption}
      onPress={() => {
        setSortOption(option);
        setFilterModalVisible(false);
      }}
    >
      <Text style={styles.filterOptionText}>{label}</Text>
      {sortOption === option && <CheckCircle stroke="#00C087" width={20} height={20} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      {/* Main Tabs */}
      <View style={styles.mainTabsContainer}>
        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 'Ongoing' && styles.activeMainTab]}
          onPress={() => {
            setActiveMainTab('Ongoing');
          }}
        >
          <Text
            style={[
              styles.mainTabText,
              activeMainTab === 'Ongoing' && styles.activeMainTabText,
            ]}
          >
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 'Fulfilled' && styles.activeMainTab]}
          onPress={() => {
            setActiveMainTab('Fulfilled');
            setActiveSubTab('All');
          }}
        >
          <Text
            style={[
              styles.mainTabText,
              activeMainTab === 'Fulfilled' && styles.activeMainTabText,
            ]}
          >
            Fulfilled
          </Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Filter stroke="#FFFFFF" width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sub Tabs - Only show for Fulfilled tab */}
      {activeMainTab === 'Fulfilled' && (
        <View style={styles.subTabsContainer}>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'All' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('All')}
          >
            <Text
              style={[
                styles.subTabText,
                activeSubTab === 'All' && styles.activeSubTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'Completed' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('Completed')}
          >
            <Text
              style={[
                styles.subTabText,
                activeSubTab === 'Completed' && styles.activeSubTabText,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.subTab, activeSubTab === 'Canceled' && styles.activeSubTab]}
            onPress={() => setActiveSubTab('Canceled')}
          >
            <Text
              style={[
                styles.subTabText,
                activeSubTab === 'Canceled' && styles.activeSubTabText,
              ]}
            >
              Canceled
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Transaction List */}
      {filteredTransactions.length > 0 ? (
        <FlatList
          data={filteredTransactions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sort by</Text>
                <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                  <X stroke="#FFFFFF" width={24} height={24} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                {renderFilterOption('newest', 'Newest first')}
                {renderFilterOption('oldest', 'Oldest first')}
                {renderFilterOption('date', 'Date')}
                {renderFilterOption('time', 'Time')}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
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
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mainTabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  mainTab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeMainTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  mainTabText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  activeMainTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  filterButton: {
    padding: 4,
  },
  subTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  subTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  activeSubTab: {
    backgroundColor: '#333',
  },
  subTabText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  activeSubTabText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  transactionItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderId: {
    flex: 1,
    marginRight: 4,
  },
  copyIcon: {
    marginLeft: 4,
  },
  traderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  traderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  traderName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  messageIndicator: {
    backgroundColor: '#FF3B30',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubText: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalBody: {
    marginTop: 8,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default OrderHistory;