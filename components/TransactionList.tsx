// components/TransactionList.tsx

import { type Transaction } from '@/api/esg'; // Import lại kiểu dữ liệu Transaction
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// --- Các hằng số màu sắc cho component này ---
const PRIMARY_COLOR = '#00D09E';
const DARK_TEXT = '#0C0D0F';

// --- Định nghĩa kiểu cho Props ---
interface TransactionListProps {
  transactions: Transaction[];
}

// --- Hàm tiện ích ---
const formatDate = (isoString: string) => {
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${time} - ${day} ${month}`;
    } catch (e) {
        return 'Invalid Date';
    }
};

// --- Component TransactionList ---
const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <View style={styles.transactionsContainer}>
      {transactions.length > 0 ? (
        transactions.map((tx) => (
          <View key={tx.TransactionID} style={styles.transactionRow}>
            <View style={styles.transactionIconContainer}>
              <IconSymbol name={tx.Amount > 0 ? 'banknote.fill' : 'creditcard.fill'} size={20} color="#000" />
            </View>
            <View style={styles.transactionInfo}>
              <ThemedText style={styles.transactionType}>{tx.MerchantName}</ThemedText>
              <ThemedText style={styles.transactionDate}>{formatDate(tx.Timestamp)}</ThemedText>
            </View>
            <View style={styles.transactionAmountContainer}>
              <ThemedText style={styles.transactionCategory}>{tx.Category}</ThemedText>
              <ThemedText style={tx.Amount > 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
                {tx.Amount > 0 ? `\$${tx.Amount.toFixed(2)}` : `-\$${Math.abs(tx.Amount).toFixed(2)}`}
              </ThemedText>
            </View>
          </View>
        ))
      ) : (
        <ThemedText style={styles.noTransactionText}>Không có giao dịch nào.</ThemedText>
      )}
    </View>
  );
};

// --- StyleSheet chỉ dành riêng cho Component này ---
const styles = StyleSheet.create({
    transactionsContainer: { 
        gap: 10, 
        paddingBottom: 20 
    },
    transactionRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#F7F7F7', 
        padding: 12, 
        borderRadius: 10 
    },
    transactionIconContainer: { 
        width: 40, 
        height: 40, 
        borderRadius: 10, 
        backgroundColor: 'rgba(0, 208, 158, 0.1)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 12 
    },
    transactionInfo: { 
        flex: 1, 
        gap: 4 
    },
    transactionType: { 
        color: DARK_TEXT, 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    transactionDate: { 
        color: '#666', 
        fontSize: 12 
    },
    transactionAmountContainer: { 
        alignItems: 'flex-end' 
    },
    transactionCategory: { 
        color: '#666', 
        fontSize: 12 
    },
    transactionAmountPositive: { 
        color: PRIMARY_COLOR, 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    transactionAmountNegative: { 
        color: '#E76F51', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    noTransactionText: { 
        textAlign: 'center', 
        color: '#666', 
        marginVertical: 20, 
        fontSize: 16 
    },
});

export default TransactionList;