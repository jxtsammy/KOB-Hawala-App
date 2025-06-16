"use client"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const NotificationScreen = ({ navigation }) => {
  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "price_alert",
      title: "Price Alert",
      message: "BTC has increased by 5% in the last hour",
      timestamp: "10 min ago",
      read: false,
      icon: require("../../assets/btc.png"),
    },
    {
      id: "2",
      type: "system",
      title: "System Update",
      message: "App updated to version 2.4.0 with new features",
      timestamp: "2 hours ago",
      read: false,
      icon: null,
    },
    {
      id: "3",
      type: "trade",
      title: "Trade Completed",
      message: "Your limit order for ETH/USDT has been filled",
      timestamp: "5 hours ago",
      read: true,
      icon: require("../../assets/eth.png"),
    },
    {
      id: "4",
      type: "price_alert",
      title: "Price Alert",
      message: "TRX has dropped by 3% in the last 24 hours",
      timestamp: "Yesterday",
      read: true,
      icon: require("../../assets/trx.png"),
    },
    {
      id: "5",
      type: "security",
      title: "Security Alert",
      message: "New login detected from United States",
      timestamp: "Yesterday",
      read: true,
      icon: null,
    },
    {
      id: "6",
      type: "promotion",
      title: "Limited Offer",
      message: "0% trading fees for the next 24 hours",
      timestamp: "2 days ago",
      read: true,
      icon: null,
    },
    {
      id: "7",
      type: "deposit",
      title: "Deposit Confirmed",
      message: "Your USDT deposit has been confirmed",
      timestamp: "3 days ago",
      read: true,
      icon: require("../../assets/usdt.png"),
    },
    {
      id: "8",
      type: "system",
      title: "Maintenance Notice",
      message: "Scheduled maintenance on June 15, 2023",
      timestamp: "5 days ago",
      read: true,
      icon: null,
    },
  ])

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Get icon for notification type
  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case "price_alert":
        return "trending-up"
      case "system":
        return "settings"
      case "trade":
        return "swap-horizontal"
      case "security":
        return "shield-checkmark"
      case "promotion":
        return "gift"
      case "deposit":
        return "arrow-down"
      default:
        return "notifications"
    }
  }

  // Get color for notification type
  const getNotificationTypeColor = (type) => {
    switch (type) {
      case "price_alert":
        return "#F0B90B"
      case "system":
        return "#8e8e93"
      case "trade":
        return "#16a34a"
      case "security":
        return "#dc2626"
      case "promotion":
        return "#9333ea"
      case "deposit":
        return "#2563eb"
      default:
        return "#8e8e93"
    }
  }

  // Render a notification item
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.notificationRead : styles.notificationUnread]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <View style={[styles.notificationIconContainer, { backgroundColor: getNotificationTypeColor(item.type) }]}>
          {item.icon ? (
            <Image source={item.icon} style={styles.cryptoIcon} />
          ) : (
            <Ionicons name={getNotificationTypeIcon(item.type)} size={20} color="#fff" />
          )}
        </View>

        <View style={styles.notificationTextContainer}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNotification(item.id)}>
        <Ionicons name="trash-outline" size={18} color="#8e8e93" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2126" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllReadButton} onPress={markAllAsRead}>
            <Text style={styles.markAllReadText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          style={styles.notificationList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color="#8e8e93" />
          <Text style={styles.emptyText}>No notifications</Text>
          <Text style={styles.emptySubtext}>You're all caught up!</Text>
        </View>
      )}
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
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  markAllReadButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#2A2D35",
  },
  markAllReadText: {
    color: "#F0B90B",
    fontSize: 12,
    fontWeight: "500",
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  notificationUnread: {
    backgroundColor: "rgba(240, 185, 11, 0.05)",
  },
  notificationRead: {
    backgroundColor: "transparent",
  },
  notificationContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cryptoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationTimestamp: {
    color: "#8e8e93",
    fontSize: 12,
  },
  notificationMessage: {
    color: "#d1d5db",
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  emptySubtext: {
    color: "#8e8e93",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
})

export default NotificationScreen