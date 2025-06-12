import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

// Dữ liệu giả lập cho giao diện
const userData = {
  esgScore: 70,
  carbonFootprint: 7783,
  totalExpenses: -1187.40,
  recentTransactions: [
    { type: 'Salary', date: '18:27 - April 30', category: 'Monthly', amount: 4000.00 },
    { type: 'Groceries', date: '17:00 - April 24', category: 'Pantry', amount: -100.00 },
    { type: 'Rent', date: '8:30 - April 15', category: 'Rent', amount: -674.40 },
  ],
};

const DashboardScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Hi, Welcome Back</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Good Morning</ThemedText>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <IconSymbol name="archivebox.fill" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconSymbol name="bell.fill" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Thống kê chính */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ThemedText style={styles.statValue}>{userData.carbonFootprint} Kg</ThemedText>
            <ThemedText style={styles.statLabel}>Lượng CO₂ Hiện Tại</ThemedText>
          </View>
          <View style={styles.statBox}>
            <ThemedText style={styles.statValue}>${userData.totalExpenses.toFixed(2)}</ThemedText>
            <ThemedText style={styles.statLabel}>Tổng Chi Tiêu</ThemedText>
          </View>
        </View>

        {/* Các nút hành động */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionButtonText}>Bù Đắp</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonOutline]}
            onPress={() => router.push({ pathname: '/(tabs)/carbon' })}// SỬA Ở ĐÂY
          >
            <ThemedText style={styles.actionButtonOutlineText}>Carbon Footprint</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Thẻ điểm ESG */}
        <TouchableOpacity style={styles.esgCard} onPress={() => router.push({ pathname: '/(tabs)/rewards' })}>
          <View style={styles.esgScoreContainer}>
            <ThemedText style={styles.esgScore}>{userData.esgScore}</ThemedText>
            <ThemedText style={styles.esgScoreLabel}>/100</ThemedText>
            <ThemedText style={styles.esgLabel}>Điểm Sống Xanh</ThemedText>
          </View>
          <View style={styles.esgDetailContainer}>
            <ThemedText style={styles.esgDetailText}>E 20</ThemedText>
            <ThemedText style={styles.esgDetailText}>S 30</ThemedText>
            <ThemedText style={styles.esgDetailText}>G 20</ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#FFF" />
        </TouchableOpacity>
        
        {/* Giao dịch gần đây */}
        <View style={styles.transactionsContainer}>
            {userData.recentTransactions.map((tx, index) => (
                <View key={index} style={styles.transactionRow}>
                    <View style={styles.transactionIcon}>
                        <IconSymbol name={tx.type === 'Salary' ? 'banknote.fill' : 'creditcard.fill'} size={20} color="#000"/>
                    </View>
                    <View style={styles.transactionInfo}>
                        <ThemedText style={styles.transactionType}>{tx.type}</ThemedText>
                        <ThemedText style={styles.transactionDate}>{tx.date}</ThemedText>
                    </View>
                    <ThemedText style={tx.amount > 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
                        {tx.amount > 0 ? `\$${tx.amount.toFixed(2)}` : `-\$${Math.abs(tx.amount).toFixed(2)}`}
                    </ThemedText>
                </View>
            ))}
        </View>

        {/* Phần thông báo */}
        <View style={styles.notificationsContainer}>
            <TouchableOpacity style={styles.notificationRow}>
                <ThemedText style={styles.notificationText}>CO₂ và Cách Ước Tính</ThemedText>
                <IconSymbol name="chevron.right" size={18} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationRow}>
                <ThemedText style={styles.notificationText}>Bù Đắp CO₂</ThemedText>
                <IconSymbol name="chevron.right" size={18} color="#FFF" />
            </TouchableOpacity>
             <TouchableOpacity style={styles.notificationRow}>
                <ThemedText style={styles.notificationText}>Điểm Sống Xanh</ThemedText>
                <IconSymbol name="chevron.right" size={18} color="#FFF" />
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ... Các styles giữ nguyên như cũ
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#151718',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    headerIcons: {
        position: 'absolute',
        right: 0,
        top: 25,
        flexDirection: 'row',
        gap: 16,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '600',
    },
    statLabel: {
        color: '#A9A9A9',
        fontSize: 14,
        marginTop: 4,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#10A66F',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    actionButtonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    actionButtonOutlineText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    esgCard: {
        backgroundColor: '#2A9D8F',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    esgScoreContainer: {
        alignItems: 'center',
    },
    esgScore: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    esgScoreLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        position: 'absolute',
        top: 18,
        right: -25,
    },
    esgLabel: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    esgDetailContainer: {
        // marginLeft: 20,
    },
    esgDetailText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    transactionsContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 16,
        marginBottom: 20
    },
    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    transactionInfo: {
        flex: 1,
    },
    transactionType: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    transactionDate: {
        color: '#A9A9A9',
        fontSize: 12
    },
    transactionAmountPositive: {
        color: '#2A9D8F',
        fontWeight: 'bold',
        fontSize: 16
    },
    transactionAmountNegative: {
        color: '#E76F51',
        fontWeight: 'bold',
        fontSize: 16
    },
    notificationsContainer: {
        // styles for notification section
    },
    notificationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333'
    },
    notificationText: {
        color: '#FFF',
        fontSize: 16
    }
});

export default DashboardScreen;