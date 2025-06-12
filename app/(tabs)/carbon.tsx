import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'; // THÊM IMPORT NÀY
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// ĐỊNH NGHĨA KIỂU DỮ LIỆU CHO MỘT GIAO DỊCH
interface Transaction {
  type: string;
  date: string;
  co2: number;
  amount: number;
}

// ĐỊNH NGHĨA KIỂU DỮ LIỆU CHO MODAL PROPS
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  transaction: {
    description: string;
    company: string;
    amount: number;
    co2: number;
  } | null;
}

// Dữ liệu giả lập
const carbonData = {
  totalCO2: 103.9,
  change: -5,
  expenses: 1962.93,
  transactions: [
    { type: 'Food', date: '18:27 - April 30', co2: 0.83, amount: -89.000 },
    { type: 'Groceries', date: '17:00 - April 24', co2: 0.1, amount: -10.000 },
    { type: 'Rent', date: '8:30 - April 15', co2: 5.9, amount: -100.000 },
  ]
};

// SỬA COMPONENT MODAL ĐỂ NHẬN PROPS ĐÚNG KIỂU
const TransactionDetailModal = ({ visible, onClose, transaction }: ModalProps) => {
  if (!transaction) return null; // Không render gì nếu không có transaction

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Chi Tiết Giao Dịch Xanh</ThemedText>
          <ThemedText style={styles.modalPoints}>+2 ĐIỂM ESG</ThemedText>
          <ThemedText style={styles.modalDescription}>Cảm ơn bạn đã lựa chọn giao dịch thân thiện với môi trường! Hành động nhỏ của bạn góp phần tạo nên thay đổi lớn.</ThemedText>
          
          <View style={styles.modalDetailRow}>
              <ThemedText style={styles.modalDetailLabel}>Mô Tả:</ThemedText>
              <ThemedText style={styles.modalDetailValue}>{transaction.description}</ThemedText>
          </View>
          <View style={styles.modalDetailRow}>
              <ThemedText style={styles.modalDetailLabel}>Doanh Nghiệp:</ThemedText>
              <ThemedText style={styles.modalDetailValue}>{transaction.company}</ThemedText>
          </View>
          <View style={styles.modalDetailRow}>
              <ThemedText style={styles.modalDetailLabel}>Số Tiền:</ThemedText>
              <ThemedText style={styles.modalDetailValue}>{transaction.amount} VND</ThemedText>
          </View>
          <View style={styles.modalDetailRow}>
              <ThemedText style={styles.modalDetailLabel}>CO₂ Ước Tính:</ThemedText>
              <ThemedText style={styles.modalDetailValue}>{transaction.co2} Kg</ThemedText>
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ThemedText style={styles.closeButtonText}>Đóng</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const CarbonScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  // SỬA STATE ĐỂ NHẬN KIỂU DỮ LIỆU MỚI
  const [selectedTransaction, setSelectedTransaction] = useState<ModalProps['transaction']>(null);

  // SỬA HÀM ĐỂ NHẬN THAM SỐ ĐÚNG KIỂU
  const handleTransactionPress = (tx: Transaction) => {
    setSelectedTransaction({
      description: 'Di Chuyển Bằng Xe Bus',
      company: 'Saigon Bus',
      amount: tx.amount,
      co2: tx.co2,
    });
    setModalVisible(true);
  };
  
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={28} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Carbon Footprint</ThemedText>
        <TouchableOpacity>
            <IconSymbol name="bell.fill" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Tổng CO2 Tháng Này</ThemedText>
          <ThemedText style={styles.co2Value}>{carbonData.totalCO2} Kg</ThemedText>
          <ThemedText style={styles.co2Change}>So với tháng trước {carbonData.change}%</ThemedText>
          
          <View style={styles.pieChartPlaceholder}>
            <ThemedText style={{color: '#fff'}}>Biểu đồ tròn</ThemedText>
          </View>

          <View style={{width: '100%', height: 20, backgroundColor: '#555', borderRadius: 10, marginBottom: 10}} />
        </ThemedView>
        
        <ThemedView style={styles.card}>
             <ThemedText style={styles.cardTitle}>Carbon Footprint</ThemedText>
             <View style={styles.barChartPlaceholder}>
                <ThemedText style={{color: '#fff'}}>Biểu đồ cột</ThemedText>
             </View>
        </ThemedView>

        <View style={styles.transactionList}>
            <ThemedText style={styles.listTitle}>April</ThemedText>
            {carbonData.transactions.map((tx: Transaction, index) => ( // THÊM KIỂU DỮ LIỆU CHO `tx`
                <TouchableOpacity key={index} style={styles.transactionRow} onPress={() => handleTransactionPress(tx)}>
                    <View style={styles.transactionIcon}>
                       <IconSymbol name="bus.fill" size={20} color="#000" />
                    </View>
                    <View style={{flex: 1}}>
                        <ThemedText style={styles.transactionType}>{tx.type}</ThemedText>
                        <ThemedText style={styles.transactionDate}>{tx.date}</ThemedText>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <ThemedText style={styles.transactionAmount}>{tx.amount.toFixed(3)}</ThemedText>
                        <ThemedText style={styles.transactionCo2}>{tx.co2} CO2</ThemedText>
                    </View>
                </TouchableOpacity>
            ))}
        </View>

        <TransactionDetailModal 
            visible={modalVisible} 
            onClose={() => setModalVisible(false)} 
            transaction={selectedTransaction}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

// ... Các styles giữ nguyên như cũ
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#151718' },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
    card: { backgroundColor: '#1E1E1E', borderRadius: 20, padding: 20, marginHorizontal: 20, marginTop: 20 },
    cardTitle: { color: '#A9A9A9', fontSize: 16 },
    co2Value: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
    co2Change: { color: 'red', fontSize: 14, marginBottom: 20 },
    pieChartPlaceholder: { height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    barChartPlaceholder: { height: 150, justifyContent: 'center', alignItems: 'center' },
    transactionList: { paddingHorizontal: 20, marginTop: 20 },
    listTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    transactionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 10 },
    transactionIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', marginRight: 15, justifyContent: 'center', alignItems: 'center' },
    transactionType: { color: '#FFF', fontWeight: 'bold' },
    transactionDate: { color: '#A9A9A9', fontSize: 12 },
    transactionAmount: { color: '#E76F51', fontWeight: 'bold' },
    transactionCo2: { color: '#A9A9A9', fontSize: 12 },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#2c2c2e', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25 },
    modalTitle: { textAlign: 'center', color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalPoints: { textAlign: 'center', color: '#2A9D8F', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    modalDescription: { color: '#A9A9A9', textAlign: 'center', marginBottom: 30, fontSize: 14 },
    modalDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#444' },
    modalDetailLabel: { color: '#A9A9A9', fontSize: 16 },
    modalDetailValue: { color: '#FFF', fontSize: 16, fontWeight: '500' },
    closeButton: { backgroundColor: '#2A9D8F', padding: 15, borderRadius: 25, marginTop: 20 },
    closeButtonText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});

export default CarbonScreen;