// ChatDetailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  Image,
  Modal,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  ArrowLeft,
  MoreHorizontal,
  Send,
  Smile,
  Paperclip,
  Plus,
  X,
  File,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const ChatDetailScreen = ({ route, navigation }) => {
  const { chat } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'system',
      text: 'Welcome to the new Chatroom. Tap to sync old messages to this chatroom, if any.',
      timestamp: '2023-05-17',
    },
    {
      id: '2',
      type: 'system',
      text: 'Order (xx4048) created. Please complete the payment and mark the order as paid in time, or the order will be cancelled.',
      timestamp: '2023-05-17',
    },
    {
      id: '3',
      type: 'system',
      text: 'Remember to copy and add reference message to payment remark, so the receiver can identify the payment.',
      timestamp: '2023-05-17',
    },
    {
      id: '4',
      type: 'action',
      text: 'View Payment Details',
      timestamp: '2023-05-17',
    },
    {
      id: '5',
      type: 'warning',
      text: '⚠️ No Agent or Merchant Payment ⚠️',
      timestamp: '2023-05-17',
    },
    {
      id: '6',
      type: 'warning',
      text: "⚠️ NO THIRD PARTY PAYMENT. THIRD PARTY ORDERS WON'T BE PROCESSED ⚠️",
      timestamp: '2023-05-17',
    },
    {
      id: '7',
      type: 'warning',
      text: "⚠️ If you pay with Third Party, money will be refunded to same account and you'll have the order cancelled. ⚠️",
      timestamp: '2023-05-17',
    },
    {
      id: '8',
      type: 'payment',
      text: '📱🟡MTN CASH OUT ONLY 🟡\nApprove Authorization from SUMMER LYNKS ENTERPRISE\n\n🔴🟡 VODAFONE CASH🔴\n\n🔹Dial *110#\n🔹Select 2 (Withdraw Cash)\n🔹Select 1 (From Agent)\n🔹Enter Till Number (317319)\n🔹Enter Amount\n🔹Acc Name: SUMMER VENTURES\n🔹Confirm PIN',
      timestamp: '2023-05-17',
    },
    {
      id: '9',
      type: 'received',
      text: 'Hello, how can I help you today?',
      timestamp: '2023-05-17T10:30:00Z',
    },
  ]);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showMediaPreview, setShowMediaPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const flatListRef = useRef(null);

  // Request permissions on component mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: cameraStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
          alert(
            'Sorry, we need camera and media library permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const renderMessage = ({ item }) => {
    const getMessageStyle = () => {
      switch (item.type) {
        case 'system':
          return styles.systemMessage;
        case 'action':
          return styles.actionMessage;
        case 'warning':
          return styles.warningMessage;
        case 'payment':
          return styles.paymentMessage;
        case 'sent':
          return styles.sentMessage;
        case 'received':
          return styles.receivedMessage;
        default:
          return styles.regularMessage;
      }
    };

    const getTextStyle = () => {
      switch (item.type) {
        case 'action':
          return styles.actionText;
        case 'warning':
          return styles.warningText;
        case 'sent':
          return styles.sentText;
        case 'received':
          return styles.receivedText;
        default:
          return styles.messageText;
      }
    };

    return (
      <View style={[styles.messageContainer, getMessageStyle()]}>
        {item.type === 'date' ? (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{item.text}</Text>
          </View>
        ) : (
          <>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.messageImage}
                resizeMode="cover"
              />
            )}
            {item.file && (
              <View style={styles.fileContainer}>
                <File stroke="#FFFFFF" width={24} height={24} />
                <Text style={styles.fileName} numberOfLines={1}>
                  {item.fileName}
                </Text>
              </View>
            )}
            {item.text && <Text style={getTextStyle()}>{item.text}</Text>}
            {(item.type === 'sent' || item.type === 'received') && (
              <Text
                style={[
                  styles.messageTime,
                  item.type === 'sent'
                    ? styles.sentMessageTime
                    : styles.receivedMessageTime,
                ]}>
                {new Date(item.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            )}
          </>
        )}
      </View>
    );
  };

  const sendTextMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        type: 'sent',
        text: message.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const sendMediaMessage = () => {
    if (selectedMedia) {
      const newMessage = {
        id: Date.now().toString(),
        type: 'sent',
        ...(selectedMedia.mediaType === 'image'
          ? { image: selectedMedia.uri }
          : { file: true, fileName: selectedMedia.name }),
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setSelectedMedia(null);
      setShowMediaPreview(false);
    }
  };

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      setIsLoading(false);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedMedia({
          uri: result.assets[0].uri,
          mediaType: 'image',
          name: result.assets[0].fileName || 'image.jpg',
        });
        setShowMediaPreview(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error picking image:', error);
      alert('Error picking image. Please try again.');
    }
  };

  const pickDocument = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      setIsLoading(false);

      if (result.type === 'success') {
        setSelectedMedia({
          uri: result.uri,
          mediaType: 'document',
          name: result.name,
          size: result.size,
        });
        setShowMediaPreview(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error picking document:', error);
      alert('Error picking document. Please try again.');
    }
  };

  const navigateToTraderProfile = () => {
    navigation.navigate('TraderProfile', { trader: {
      name: chat.name
    } });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatHeaderInfo}
          onPress={navigateToTraderProfile}>
          <Text style={styles.chatHeaderName}>{chat.name}</Text>
          <View style={styles.onlineStatus}>
            <View style={styles.onlineIndicatorSmall} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreHorizontal stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
      />

      {/* Replace the existing input container with this KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputButton} onPress={pickDocument}>
            <Plus stroke="#8E8E93" width={24} height={24} />
          </TouchableOpacity>
          <TextInput
            style={styles.messageInput}
            placeholder="Please enter content here..."
            placeholderTextColor="#8E8E93"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.inputButton} onPress={pickImage}>
            <Paperclip stroke="#8E8E93" width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendTextMessage}
            disabled={message.trim().length === 0}>
            <Send stroke="#000" width={20} height={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Media Preview Modal */}
      <Modal
        visible={showMediaPreview}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowMediaPreview(false);
          setSelectedMedia(null);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedMedia?.mediaType === 'image'
                  ? 'Send Image'
                  : 'Send File'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowMediaPreview(false);
                  setSelectedMedia(null);
                }}>
                <X stroke="#FFFFFF" width={24} height={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.previewContainer}>
              {selectedMedia?.mediaType === 'image' ? (
                <Image
                  source={{ uri: selectedMedia.uri }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.filePreview}>
                  <File stroke="#FFFFFF" width={48} height={48} />
                  <Text style={styles.filePreviewName} numberOfLines={2}>
                    {selectedMedia?.name}
                  </Text>
                  <Text style={styles.filePreviewSize}>
                    {selectedMedia?.size
                      ? `${(selectedMedia.size / 1024).toFixed(2)} KB`
                      : ''}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.previewActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowMediaPreview(false);
                  setSelectedMedia(null);
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendMediaButton}
                onPress={sendMediaMessage}>
                <Text style={styles.sendMediaButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F0B90B" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  chatHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineIndicatorSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C087',
    marginRight: 4,
  },
  onlineText: {
    fontSize: 12,
    color: '#00C087',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    maxWidth: '80%',
  },
  systemMessage: {
    backgroundColor: '#1A1A1A',
    alignSelf: 'center',
    maxWidth: '90%',
  },
  actionMessage: {
    backgroundColor: '#1A1A1A',
    alignSelf: 'center',
  },
  warningMessage: {
    backgroundColor: '#2A1A1A',
    alignSelf: 'center',
    maxWidth: '90%',
  },
  paymentMessage: {
    backgroundColor: '#1A1A1A',
    alignSelf: 'center',
    maxWidth: '90%',
  },
  sentMessage: {
    backgroundColor: '#F0B90B',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#2A2A2A',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  actionText: {
    color: '#F0B90B',
    fontSize: 14,
    fontWeight: '500',
  },
  warningText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '500',
  },
  sentText: {
    color: '#000000', // Changed to black for sent messages
    fontSize: 14,
    lineHeight: 20,
  },
  receivedText: {
    color: '#FFFFFF', // White for received messages
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  sentMessageTime: {
    color: 'rgba(0, 0, 0, 0.6)', // Darker for sent messages
  },
  receivedMessageTime: {
    color: 'rgba(255, 255, 255, 0.6)', // Lighter for received messages
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dateText: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '500',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileName: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    backgroundColor: '#111',
  },
  inputButton: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  previewContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  filePreview: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  filePreviewName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  filePreviewSize: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 8,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  sendMediaButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0B90B',
    marginLeft: 8,
    alignItems: 'center',
  },
  sendMediaButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatDetailScreen;
