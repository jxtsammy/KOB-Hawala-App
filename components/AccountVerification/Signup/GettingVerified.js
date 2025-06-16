import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Modal,
  FlatList,
  TextInput,
  ScrollView
} from 'react-native';
import { 
  Globe, 
  CreditCard, 
  Car, 
  X, 
  ChevronDown, 
  Search,
  IdCard 
} from 'lucide-react-native';


// Expanded countries data
const countries = [
  { id: '1', name: 'Afghanistan', localName: 'افغانستان', flag: '🇦🇫' },
  { id: '2', name: 'Albania', localName: 'Shqipëria', flag: '🇦🇱' },
  { id: '3', name: 'Algeria', localName: 'الجزائر', flag: '🇩🇿' },
  { id: '4', name: 'Andorra', localName: 'Andorra', flag: '🇦🇩' },
  { id: '5', name: 'Angola', localName: 'Angola', flag: '🇦🇴' },
  { id: '6', name: 'Argentina', localName: 'Argentina', flag: '🇦🇷' },
  { id: '7', name: 'Armenia', localName: 'Հայաստան', flag: '🇦🇲' },
  { id: '8', name: 'Australia', localName: 'Australia', flag: '🇦🇺' },
  { id: '9', name: 'Austria', localName: 'Österreich', flag: '🇦🇹' },
  { id: '10', name: 'Azerbaijan', localName: 'Azərbaycan', flag: '🇦🇿' },
  { id: '11', name: 'Bahamas', localName: 'Bahamas', flag: '🇧🇸' },
  { id: '12', name: 'Bahrain', localName: 'البحرين', flag: '🇧🇭' },
  { id: '13', name: 'Bangladesh', localName: 'বাংলাদেশ', flag: '🇧🇩' },
  { id: '14', name: 'Barbados', localName: 'Barbados', flag: '🇧🇧' },
  { id: '15', name: 'Belarus', localName: 'Беларусь', flag: '🇧🇾' },
  { id: '16', name: 'Belgium', localName: 'België', flag: '🇧🇪' },
  { id: '17', name: 'Belize', localName: 'Belize', flag: '🇧🇿' },
  { id: '18', name: 'Benin', localName: 'Bénin', flag: '🇧🇯' },
  { id: '19', name: 'Bhutan', localName: 'འབྲུག་ཡུལ', flag: '🇧🇹' },
  { id: '20', name: 'Bolivia', localName: 'Bolivia', flag: '🇧🇴' },
  { id: '21', name: 'Brazil', localName: 'Brasil', flag: '🇧🇷' },
  { id: '22', name: 'Brunei', localName: 'Brunei', flag: '🇧🇳' },
  { id: '23', name: 'Bulgaria', localName: 'България', flag: '🇧🇬' },
  { id: '24', name: 'Burkina Faso', localName: 'Burkina Faso', flag: '🇧🇫' },
  { id: '25', name: 'Burundi', localName: 'Burundi', flag: '🇧🇮' },
  { id: '26', name: 'Cambodia', localName: 'កម្ពុជា', flag: '🇰🇭' },
  { id: '27', name: 'Cameroon', localName: 'Cameroun', flag: '🇨🇲' },
  { id: '28', name: 'Canada', localName: 'Canada', flag: '🇨🇦' },
  { id: '29', name: 'Chad', localName: 'Tchad', flag: '🇹🇩' },
  { id: '30', name: 'Chile', localName: 'Chile', flag: '🇨🇱' },
  { id: '31', name: 'China', localName: '中国', flag: '🇨🇳' },
  { id: '32', name: 'Colombia', localName: 'Colombia', flag: '🇨🇴' },
  { id: '33', name: 'Costa Rica', localName: 'Costa Rica', flag: '🇨🇷' },
  { id: '34', name: 'Croatia', localName: 'Hrvatska', flag: '🇭🇷' },
  { id: '35', name: 'Cuba', localName: 'Cuba', flag: '🇨🇺' },
  { id: '36', name: 'Cyprus', localName: 'Κύπρος', flag: '🇨🇾' },
  { id: '37', name: 'Czech Republic', localName: 'Česká republika', flag: '🇨🇿' },
  { id: '38', name: 'Denmark', localName: 'Danmark', flag: '🇩🇰' },
  { id: '39', name: 'Egypt', localName: 'مصر', flag: '🇪🇬' },
  { id: '40', name: 'Estonia', localName: 'Eesti', flag: '🇪🇪' },
  { id: '41', name: 'Ethiopia', localName: 'ኢትዮጵያ', flag: '🇪🇹' },
  { id: '42', name: 'Fiji', localName: 'Fiji', flag: '🇫🇯' },
  { id: '43', name: 'Finland', localName: 'Suomi', flag: '🇫🇮' },
  { id: '44', name: 'France', localName: 'France', flag: '🇫🇷' },
  { id: '45', name: 'Gabon', localName: 'Gabon', flag: '🇬🇦' },
  { id: '46', name: 'Gambia', localName: 'Gambia', flag: '🇬🇲' },
  { id: '47', name: 'Georgia', localName: 'საქართველო', flag: '🇬🇪' },
  { id: '48', name: 'Germany', localName: 'Deutschland', flag: '🇩🇪' },
  { id: '49', name: 'Ghana', localName: 'Gaana', flag: '🇬🇭' },
  { id: '50', name: 'Greece', localName: 'Ελλάδα', flag: '🇬🇷' },
  { id: '51', name: 'Grenada', localName: 'Grenada', flag: '🇬🇩' },
  { id: '52', name: 'Guatemala', localName: 'Guatemala', flag: '🇬🇹' },
  { id: '53', name: 'Guinea', localName: 'Guinée', flag: '🇬🇳' },
  { id: '54', name: 'Guyana', localName: 'Guyana', flag: '🇬🇾' },
  { id: '55', name: 'Haiti', localName: 'Haïti', flag: '🇭🇹' },
  { id: '56', name: 'Honduras', localName: 'Honduras', flag: '🇭🇳' },
  { id: '57', name: 'Hungary', localName: 'Magyarország', flag: '🇭🇺' },
  { id: '58', name: 'Iceland', localName: 'Ísland', flag: '🇮🇸' },
  { id: '59', name: 'India', localName: 'भारत', flag: '🇮🇳' },
  { id: '60', name: 'Indonesia', localName: 'Indonesia', flag: '🇮🇩' },
  { id: '61', name: 'Iran', localName: 'ایران', flag: '🇮🇷' },
  { id: '62', name: 'Iraq', localName: 'العراق', flag: '🇮🇶' },
  { id: '63', name: 'Ireland', localName: 'Éire', flag: '🇮🇪' },
  { id: '64', name: 'Israel', localName: 'ישראל', flag: '🇮🇱' },
  { id: '65', name: 'Italy', localName: 'Italia', flag: '🇮🇹' },
  { id: '66', name: 'Jamaica', localName: 'Jamaica', flag: '🇯🇲' },
  { id: '67', name: 'Japan', localName: '日本', flag: '🇯🇵' },
  { id: '68', name: 'Jordan', localName: 'الأردن', flag: '🇯🇴' },
  { id: '69', name: 'Kazakhstan', localName: 'Қазақстан', flag: '🇰🇿' },
  { id: '70', name: 'Kenya', localName: 'Kenya', flag: '🇰🇪' },
  { id: '71', name: 'Kiribati', localName: 'Kiribati', flag: '🇰🇮' },
  { id: '72', name: 'Kuwait', localName: 'الكويت', flag: '🇰🇼' },
  { id: '73', name: 'Kyrgyzstan', localName: 'Кыргызстан', flag: '🇰🇬' },
  { id: '74', name: 'Laos', localName: 'ລາວ', flag: '🇱🇦' },
  { id: '75', name: 'Latvia', localName: 'Latvija', flag: '🇱🇻' },
  { id: '76', name: 'Lebanon', localName: 'لبنان', flag: '🇱🇧' },
  { id: '77', name: 'Lesotho', localName: 'Lesotho', flag: '🇱🇸' },
  { id: '78', name: 'Liberia', localName: 'Liberia', flag: '🇱🇷' },
  { id: '79', name: 'Libya', localName: 'ليبيا', flag: '🇱🇾' },
  { id: '80', name: 'Liechtenstein', localName: 'Liechtenstein', flag: '🇱🇮' },
  { id: '81', name: 'Lithuania', localName: 'Lietuva', flag: '🇱🇹' },
  { id: '82', name: 'Luxembourg', localName: 'Luxembourg', flag: '🇱🇺' },
  { id: '83', name: 'Madagascar', localName: 'Madagasikara', flag: '🇲🇬' },
  { id: '84', name: 'Malawi', localName: 'Malawi', flag: '🇲🇼' },
  { id: '85', name: 'Malaysia', localName: 'Malaysia', flag: '🇲🇾' },
  { id: '86', name: 'Maldives', localName: 'ދިވެހިރާއްޖެ', flag: '🇲🇻' },
  { id: '87', name: 'Mali', localName: 'Mali', flag: '🇲🇱' },
  { id: '88', name: 'Malta', localName: 'Malta', flag: '🇲🇹' },
  { id: '89', name: 'Mexico', localName: 'México', flag: '🇲🇽' },
  { id: '90', name: 'Monaco', localName: 'Monaco', flag: '🇲🇨' },
  { id: '91', name: 'Mongolia', localName: 'Монгол улс', flag: '🇲🇳' },
  { id: '92', name: 'Morocco', localName: 'المغرب', flag: '🇲🇦' },
  { id: '93', name: 'Mozambique', localName: 'Moçambique', flag: '🇲🇿' },
  { id: '94', name: 'Myanmar', localName: 'မြန်မာ', flag: '🇲🇲' },
  { id: '95', name: 'Namibia', localName: 'Namibia', flag: '🇳🇦' },
  { id: '96', name: 'Nauru', localName: 'Nauru', flag: '🇳🇷' },
  { id: '97', name: 'Nepal', localName: 'नेपाल', flag: '🇳🇵' },
  { id: '98', name: 'Netherlands', localName: 'Nederland', flag: '🇳🇱' },
  { id: '99', name: 'New Zealand', localName: 'New Zealand', flag: '🇳🇿' },
  { id: '100', name: 'Nicaragua', localName: 'Nicaragua', flag: '🇳🇮' },
  { id: '101', name: 'Niger', localName: 'Niger', flag: '🇳🇪' },
  { id: '102', name: 'Nigeria', localName: 'Nigeria', flag: '🇳🇬' },
  { id: '103', name: 'North Korea', localName: '조선', flag: '🇰🇵' },
  { id: '104', name: 'Norway', localName: 'Norge', flag: '🇳🇴' },
  { id: '105', name: 'Oman', localName: 'عمان', flag: '🇴🇲' },
  { id: '106', name: 'Pakistan', localName: 'پاکستان', flag: '🇵🇰' },
  { id: '107', name: 'Palau', localName: 'Palau', flag: '🇵🇼' },
  { id: '108', name: 'Panama', localName: 'Panamá', flag: '🇵🇦' },
  { id: '109', name: 'Papua New Guinea', localName: 'Papua New Guinea', flag: '🇵🇬' },
  { id: '110', name: 'Paraguay', localName: 'Paraguay', flag: '🇵🇾' },
  { id: '111', name: 'Peru', localName: 'Perú', flag: '🇵🇪' },
  { id: '112', name: 'Philippines', localName: 'Pilipinas', flag: '🇵🇭' },
  { id: '113', name: 'Poland', localName: 'Polska', flag: '🇵🇱' },
  { id: '114', name: 'Portugal', localName: 'Portugal', flag: '🇵🇹' },
  { id: '115', name: 'Qatar', localName: 'قطر', flag: '🇶🇦' },
  { id: '116', name: 'Romania', localName: 'România', flag: '🇷🇴' },
  { id: '117', name: 'Russia', localName: 'Россия', flag: '🇷🇺' },
  { id: '118', name: 'Rwanda', localName: 'Rwanda', flag: '🇷🇼' },
  { id: '119', name: 'Saint Lucia', localName: 'Saint Lucia', flag: '🇱🇨' },
  { id: '120', name: 'Samoa', localName: 'Samoa', flag: '🇼🇸' },
  { id: '121', name: 'Saudi Arabia', localName: 'المملكة العربية السعودية', flag: '🇸🇦' },
  { id: '122', name: 'Senegal', localName: 'Sénégal', flag: '🇸🇳' },
  { id: '123', name: 'Serbia', localName: 'Србија', flag: '🇷🇸' },
  { id: '124', name: 'Seychelles', localName: 'Seychelles', flag: '🇸🇨' },
  { id: '125', name: 'Sierra Leone', localName: 'Sierra Leone', flag: '🇸🇱' },
  { id: '126', name: 'Singapore', localName: 'Singapore', flag: '🇸🇬' },
  { id: '127', name: 'Slovakia', localName: 'Slovensko', flag: '🇸🇰' },
  { id: '128', name: 'Slovenia', localName: 'Slovenija', flag: '🇸🇮' },
  { id: '129', name: 'Solomon Islands', localName: 'Solomon Islands', flag: '🇸🇧' },
  { id: '130', name: 'Somalia', localName: 'Soomaaliya', flag: '🇸🇴' },
  { id: '131', name: 'South Africa', localName: 'South Africa', flag: '🇿🇦' },
  { id: '132', name: 'South Korea', localName: '대한민국', flag: '🇰🇷' },
  { id: '133', name: 'South Sudan', localName: 'South Sudan', flag: '🇸🇸' },
  { id: '134', name: 'Spain', localName: 'España', flag: '🇪🇸' },
  { id: '135', name: 'Sri Lanka', localName: 'ශ්‍රී ලංකාව', flag: '🇱🇰' },
  { id: '136', name: 'Sudan', localName: 'السودان', flag: '🇸🇩' },
  { id: '137', name: 'Sweden', localName: 'Sverige', flag: '🇸🇪' },
  { id: '138', name: 'Switzerland', localName: 'Schweiz', flag: '🇨🇭' },
  { id: '139', name: 'Syria', localName: 'سوريا', flag: '🇸🇾' },
  { id: '140', name: 'Taiwan', localName: '台灣', flag: '🇹🇼' },
  { id: '141', name: 'Tajikistan', localName: 'Тоҷикистон', flag: '🇹🇯' },
  { id: '142', name: 'Tanzania', localName: 'Tanzania', flag: '🇹🇿' },
  { id: '143', name: 'Thailand', localName: 'ประเทศไทย', flag: '🇹🇭' },
  { id: '144', name: 'Togo', localName: 'Togo', flag: '🇹🇬' },
  { id: '145', name: 'Tonga', localName: 'Tonga', flag: '🇹🇴' },
  { id: '146', name: 'Tunisia', localName: 'تونس', flag: '🇹🇳' },
  { id: '147', name: 'Turkey', localName: 'Türkiye', flag: '🇹🇷' },
  { id: '148', name: 'Turkmenistan', localName: 'Türkmenistan', flag: '🇹🇲' },
  { id: '149', name: 'Tuvalu', localName: 'Tuvalu', flag: '🇹🇻' },
  { id: '150', name: 'Uganda', localName: 'Uganda', flag: '🇺🇬' },
  { id: '151', name: 'Ukraine', localName: 'Україна', flag: '🇺🇦' },
  { id: '152', name: 'United Arab Emirates', localName: 'الإمارات العربية المتحدة', flag: '🇦🇪' },
  { id: '153', name: 'United Kingdom', localName: 'United Kingdom', flag: '🇬🇧' },
  { id: '154', name: 'United States', localName: 'United States', flag: '🇺🇸' },
  { id: '155', name: 'Uruguay', localName: 'Uruguay', flag: '🇺🇾' },
  { id: '156', name: 'Uzbekistan', localName: 'O\'zbekiston', flag: '🇺🇿' },
  { id: '157', name: 'Vanuatu', localName: 'Vanuatu', flag: '🇻🇺' },
  { id: '158', name: 'Vatican City', localName: 'Città del Vaticano', flag: '🇻🇦' },
  { id: '159', name: 'Venezuela', localName: 'Venezuela', flag: '🇻🇪' },
  { id: '160', name: 'Vietnam', localName: 'Việt Nam', flag: '🇻🇳' },
  { id: '161', name: 'Yemen', localName: 'اليمن', flag: '🇾🇪' },
  { id: '162', name: 'Zambia', localName: 'Zambia', flag: '🇿🇲' },
  { id: '163', name: 'Zimbabwe', localName: 'Zimbabwe', flag: '🇿🇼' },
];

// Document types
const documentTypes = [
  { id: '1', name: 'ID Card', icon: 'credit-card', recommended: true },
  { id: '2', name: 'Passport', icon: 'globe', recommended: false },
  { id: '3', name: 'Driver\'s License', icon: 'car', recommended: false },
];

export default function App({navigation}) {
  const [residence, setResidence] = useState(countries.find(c => c.name === 'Ghana') || countries[0]);
  const [issuingCountry, setIssuingCountry] = useState(countries.find(c => c.name === 'Ghana') || countries[0]);
  const [selectedDocType, setSelectedDocType] = useState(documentTypes[0].id);
  const [residenceModalVisible, setResidenceModalVisible] = useState(false);
  const [issuingCountryModalVisible, setIssuingCountryModalVisible] = useState(false);

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName, size = 24, color = 'white') => {
    switch (iconName) {
      case 'credit-card':
        return <CreditCard size={size} color={color} />;
      case 'globe':
        return <Globe size={size} color={color} />;
      case 'car':
        return <IdCard size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1e25" />
      
      
      {/* Close and Support Icons */}
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.yellowLine} />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Let's Get You Verified</Text>
        
        {/* Residence Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Residence</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setResidenceModalVisible(true)}
          >
            <View style={styles.selectedCountry}>
              <Text style={styles.countryFlag}>{residence.flag}</Text>
              <Text style={styles.selectedCountryText}>{residence.name} ({residence.localName})</Text>
            </View>
            <ChevronDown size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Document Issuing Country Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Issuing Country/Region</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setIssuingCountryModalVisible(true)}
          >
            <View style={styles.selectedCountry}>
              <Text style={styles.countryFlag}>{issuingCountry.flag}</Text>
              <Text style={styles.selectedCountryText}>{issuingCountry.name} ({issuingCountry.localName})</Text>
            </View>
            <ChevronDown size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Document Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Type</Text>
          {documentTypes.map((doc) => (
            <TouchableOpacity 
              key={doc.id}
              style={[
                styles.docTypeItem,
                selectedDocType === doc.id && styles.selectedDocType
              ]}
              onPress={() => setSelectedDocType(doc.id)}
            >
              <View style={styles.docTypeLeft}>
                {renderIcon(doc.icon)}
                <Text style={styles.docTypeName}>{doc.name}</Text>
              </View>
              {doc.recommended && (
                <Text style={styles.recommendedText}>Recommended</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('DocumentVerification')}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      
      {/* Residence Country Modal */}
      <CountrySelectionModal
        visible={residenceModalVisible}
        onClose={() => setResidenceModalVisible(false)}
        onSelect={setResidence}
        title="Select Residence Country"
        countries={countries}
      />
      
      {/* Issuing Country Modal */}
      <CountrySelectionModal
        visible={issuingCountryModalVisible}
        onClose={() => setIssuingCountryModalVisible(false)}
        onSelect={setIssuingCountry}
        title="Select Document Issuing Country"
        countries={countries}
      />
    </SafeAreaView>
  );
}

// Country Selection Modal Component with Search
function CountrySelectionModal({ visible, onClose, onSelect, title, countries }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.localName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Search input */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search countries..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={18} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
          
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.countryItem} 
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text style={styles.countryName}>{item.name} ({item.localName})</Text>
              </TouchableOpacity>
            )}
            style={styles.countryList}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
          />
        </View>
      </View>
    </Modal>
  );
}

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
    width: 30,
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
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#9ca3af',
    marginBottom: 15,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#272b33',
    borderRadius: 10,
    padding: 15,
  },
  selectedCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 10,
  },
  selectedCountryText: {
    color: 'white',
    fontSize: 16,
  },
  docTypeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#272b33',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    paddingVertical: 25
  },
  selectedDocType: {
    borderColor: '#ffd60a',
    borderWidth: 1,
  },
  docTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docTypeName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  recommendedText: {
    color: '#10b981',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#ffd60a',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 20,
  },
  continueText: {
    color: '#1a1e25',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1e25',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#272b33',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272b33',
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 0,
  },
  countryList: {
    padding: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#272b33',
  },
  countryName: {
    color: 'white',
    fontSize: 16,
  },
});