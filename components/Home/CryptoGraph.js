import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const CryptoDetailScreen = ({ route, navigation }) => {
  const { cryptoData } = route.params;
  const [activeTimeframe, setActiveTimeframe] = useState('15m');
  const [activeIndicator, setActiveIndicator] = useState('MA');

  // Chart data
  const chartData = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        data: [640.85, 641.2, 640.5, 639.8, 640.3, 640.13],
        color: (opacity = 1) => `rgba(240, 185, 11, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const handleBuyPress = () => {
    navigation.navigate('NavigationBar', {
      screen: 'Trade',
      params: {
        cryptoData,
        initialTab: 'Buy',
      },
    });
  };

  const handleSellPress = () => {
    navigation.navigate('NavigationBar', {
      screen: 'Trade',
      params: {
        cryptoData,
        initialTab: 'Sell',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2126" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Price Info */}
      <View style={styles.priceContainer}>
        <View style={styles.mainPrice}>
          <Text style={styles.priceText}>{cryptoData.price}</Text>
          <Text style={styles.changeText}>{cryptoData.change}</Text>
        </View>
        <Text style={styles.usdPrice}>{cryptoData.priceFormatted}</Text>

        <View style={styles.layerInfo}>
          <Text style={styles.layerText}>Layer 1 / Layer 2</Text>
          <Text style={styles.volText}>Vol</Text>
        </View>
      </View>

      {/* Chart Controls */}
      <View style={styles.chartControls}>
        <View style={styles.timeframeContainer}>
          <Text style={styles.controlLabel}>Time</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['15m', '1h', '4h', '1d', 'More'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  activeTimeframe === time && styles.activeTimeButton,
                ]}
                onPress={() => setActiveTimeframe(time)}>
                <Text
                  style={[
                    styles.timeText,
                    activeTimeframe === time && styles.activeTimeText,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.depthButton}>
          <Text style={styles.depthText}>Depth</Text>
        </TouchableOpacity>
      </View>

      {/* Chart Area */}
      <View style={styles.chartArea}>
        <View style={styles.indicatorInfo}>
          <Text style={styles.indicatorText}>MA(7): 641.30</Text>
          <Text style={styles.indicatorText}>MA(25): 640.79</Text>
          <Text style={styles.indicatorText}>MA(99): 643.12</Text>
        </View>

        {/* Chart */}
        <LineChart
          data={chartData}
          width={width - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#1E2126',
            backgroundGradientFrom: '#1E2126',
            backgroundGradientTo: '#1E2126',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
            },
          }}
          bezier
          style={styles.chart}
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          horizontalLabelRotation={0}
        />

        <View style={styles.volumeInfo}>
          <Text style={styles.volumeText}>Vol: 223.882</Text>
          <Text style={styles.maText}>MA(5): 752.415</Text>
          <Text style={styles.maText}>MA(10): 1,202.316</Text>
        </View>
      </View>

      {/* Indicator Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.indicatorTabs}>
        {['MA', 'EMA', 'BOLL', 'SAR', 'AVL', 'VOL', 'MACD', 'RSI', 'KDJ'].map(
          (indicator) => (
            <TouchableOpacity
              key={indicator}
              style={[
                styles.indicatorTab,
                activeIndicator === indicator && styles.activeIndicatorTab,
              ]}
              onPress={() => setActiveIndicator(indicator)}>
              <Text
                style={[
                  styles.indicatorTabText,
                  activeIndicator === indicator &&
                    styles.activeIndicatorTabText,
                ]}>
                {indicator}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Time Range */}
      <View style={styles.timeRangeContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { label: 'Today', value: '-1.03%' },
            { label: '7 Days', value: '-3.93%' },
            { label: '30 Days', value: '9.84%' },
            { label: '90 Days', value: '-3.33%' },
            { label: '180 Days', value: '3.42%' },
            { label: '1 Year', value: '12.46%' },
          ].map((range) => (
            <View key={range.label} style={styles.timeRange}>
              <Text style={styles.timeRangeLabel}>{range.label}</Text>
              <Text
                style={[
                  styles.timeRangeValue,
                  { color: range.value.includes('-') ? '#dc3545' : '#28a745' },
                ]}>
                {range.value}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Buy/Sell Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sellButton} onPress={handleSellPress}>
          <Text style={styles.sellText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2126',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  priceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  mainPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: '#00C087',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 10,
  },
  changeText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: 'bold',
  },
  usdPrice: {
    color: '#8e8e93',
    fontSize: 16,
    marginTop: 5,
  },
  layerInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  layerText: {
    color: '#F0B90B',
    fontSize: 14,
    marginRight: 10,
  },
  volText: {
    color: '#8e8e93',
    fontSize: 14,
  },
  chartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  timeframeContainer: {
    flex: 1,
  },
  controlLabel: {
    color: '#8e8e93',
    fontSize: 14,
    marginBottom: 5,
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  activeTimeButton: {
    backgroundColor: '#2A2D35',
    borderRadius: 4,
  },
  timeText: {
    color: '#8e8e93',
    fontSize: 14,
  },
  activeTimeText: {
    color: '#fff',
  },
  depthButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  depthText: {
    color: '#8e8e93',
    fontSize: 14,
  },
  chartArea: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  indicatorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  indicatorText: {
    color: '#8e8e93',
    fontSize: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  volumeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  volumeText: {
    color: '#8e8e93',
    fontSize: 12,
  },
  maText: {
    color: '#8e8e93',
    fontSize: 12,
  },
  indicatorTabs: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  indicatorTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  activeIndicatorTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F0B90B',
  },
  indicatorTabText: {
    color: '#8e8e93',
    fontSize: 14,
  },
  activeIndicatorTabText: {
    color: '#fff',
  },
  timeRangeContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  timeRange: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  timeRangeLabel: {
    color: '#8e8e93',
    fontSize: 14,
    marginBottom: 5,
  },
  timeRangeValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
  },
  buyButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#28a745',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  buyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sellButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#dc3545',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CryptoDetailScreen;
