import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ScrollView
} from 'react-native';
import { 
  Upload, 
  Smartphone, 
  ArrowLeft, 
} from 'lucide-react-native';

const DocumentVerificationScreen = ({ navigation }) => {
  // Add state to track which option is selected
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to handle continue button press
  const handleContinue = () => {
    if (selectedOption === 'upload') {
      navigation?.navigate('DocumentUpload');
    } else if (selectedOption === 'camera') {
      navigation?.navigate('CameraScreen');
    } else {
      // If no option is selected, show the first option's screen as default
      navigation?.navigate('UploadDocument');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1e25" />
      
      {/* Navigation Icons */}
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Yellow Line */}
      <View style={styles.yellowLine} />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Document Verification</Text>
        
        <Text style={styles.description}>
          Your ID document will be scanned for personal data extraction.
        </Text>
        
        {/* Upload Photos Button */}
        <TouchableOpacity 
          style={[
            styles.verificationOption,
            selectedOption === 'upload' && styles.selectedOption
          ]}
          onPress={() => handleOptionSelect('upload')}
        >
          <Upload size={24} color="white" />
          <Text style={styles.optionText}>Upload Photos</Text>
        </TouchableOpacity>
        
        {/* Take Pictures Button */}
        <TouchableOpacity 
          style={[
            styles.verificationOption,
            selectedOption === 'camera' && styles.selectedOption
          ]}
          onPress={() => handleOptionSelect('camera')}
        >
          <Smartphone size={24} color="white" />
          <Text style={styles.optionText}>Take Pictures</Text>
        </TouchableOpacity>
        
        {/* Guidelines */}
        <View style={styles.guidelinesContainer}>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>◆</Text>
            <Text style={styles.guidelineText}>
              Please use the original ID; copies or screenshots are not accepted.
            </Text>
          </View>
          
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>◆</Text>
            <Text style={styles.guidelineText}>
              Ensure all information is visible; damaged or expired IDs are not accepted.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <TouchableOpacity 
        style={[
          styles.continueButton,
          !selectedOption && styles.disabledButton
        ]} 
        onPress={handleContinue}
        disabled={!selectedOption}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  yellowLine: {
    height: 3,
    width: '50%',
    backgroundColor: '#ffd60a',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#9ca3af',
    marginBottom: 40,
  },
  verificationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272b33',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    paddingVertical: 25
  },
  selectedOption: {
    borderColor: '#ffd60a', // Orange/yellow border for selected option
    borderWidth: 2,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  guidelinesContainer: {
    backgroundColor: '#272b33',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  guidelineItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  guidelineBullet: {
    color: '#9ca3af',
    marginRight: 10,
  },
  guidelineText: {
    color: '#9ca3af',
    fontSize: 16,
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#ffd60a',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 20,
  },
  disabledButton: {
    backgroundColor: '#8c7d30', // Darker yellow for disabled state
  },
  continueText: {
    color: '#1a1e25',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DocumentVerificationScreen;