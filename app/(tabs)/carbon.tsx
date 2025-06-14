import { fetchDashboardData, type DashboardData, type Transaction } from '@/api/esg';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;
const PRIMARY_COLOR = '#00D09E';
const WHITE_BACKGROUND = '#FFFFFF';
const DARK_TEXT = '#0C0D0F';

const PIE_CHART_COLORS = [
    '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#C9CBCF', '#E7E9ED', '#8D9B99', '#5C6D70'
];

const formatDate = (isoString: string) => {
    if (!isoString) return '';
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

interface TransactionDetailModalProps {
  visible: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionDetailModal = ({ visible, onClose, transaction }: TransactionDetailModalProps) => {
    if (!transaction) return null;
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <IconSymbol name="leaf.fill" size={40} color={PRIMARY_COLOR} style={{alignSelf: 'center'}} />
                    <Text style={styles.modalTitle}>Chi Tiết Giao Dịch Xanh</Text>
                    <Text style={styles.modalPoints}>+{transaction.E_Score_Per_Transaction || 0} ĐIỂM ESG</Text>
                    <Text style={styles.modalDescription}>Cảm ơn bạn đã lựa chọn giao dịch thân thiện với môi trường!</Text>
                    
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>Doanh Nghiệp:</Text><Text style={styles.modalDetailValue} numberOfLines={1}>{transaction.MerchantName}</Text></View>
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>Danh mục:</Text><Text style={styles.modalDetailValue}>{transaction.Category}</Text></View>
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>Số Tiền:</Text><Text style={styles.modalDetailValue}>{Math.abs(transaction.Amount).toLocaleString()} VND</Text></View>
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>CO₂ Ước Tính:</Text><Text style={styles.modalDetailValue}>{transaction.CO2_Estimate.toFixed(2)} Kg</Text></View>
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>Thời gian:</Text><Text style={styles.modalDetailValue}>{formatDate(transaction.Timestamp)}</Text></View>
                    
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}><Text style={styles.closeButtonText}>Đóng</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const CarbonScreen = () => {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        fetchDashboardData('user0054e0').then(fetchedData => {
            setData(fetchedData);
            setLoading(false);
        }).catch(error => {
            console.error("Failed to fetch dashboard data:", error);
            setLoading(false);
        });
    }, []);

    const handleTransactionPress = (tx: Transaction) => {
        setSelectedTransaction(tx);
        setModalVisible(true);
    };

    const chartConfig = {
        backgroundGradientFrom: "#F0F5F2",
        backgroundGradientTo: "#F0F5F2",
        color: (opacity = 1) => `rgba(0, 208, 158, ${opacity})`,
        barPercentage: 0.5,
        decimalPlaces: 0,
    };

    if (loading) {
        return <SafeAreaView style={[styles.wrapper, styles.centered]}><ActivityIndicator size="large" color={PRIMARY_COLOR} /></SafeAreaView>;
    }
    
    if (!data || !data.scores) {
        return <SafeAreaView style={[styles.wrapper, styles.centered]}><Text style={styles.errorText}>Không thể tải dữ liệu cho người dùng.</Text></SafeAreaView>;
    }

    // --- Chuẩn bị dữ liệu cho các biểu đồ ---
    const pieChartData = (data.co2_by_category || [])
        .filter(item => item.percentage > 0)
        .map((item, index) => ({
            name: item.name,
            population: item.percentage,
            color: PIE_CHART_COLORS[index % PIE_CHART_COLORS.length], 
            legendFontColor: DARK_TEXT,
            legendFontSize: 14,
        }));

    // SỬA LỖI Ở ĐÂY: Sử dụng `data.bar_chart_data` thay vì `data.daily_co2_summary`
    const barChartData = {
        labels: data.bar_chart_data.labels,
        datasets: [{ data: data.bar_chart_data.data }],
    };

    const expenseTransactions = data.transactions_detail;

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={() => router.back()}><IconSymbol name="chevron.left" size={28} color={DARK_TEXT} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Carbon Footprint</Text>
                <TouchableOpacity><IconSymbol name="bell.fill" size={24} color={DARK_TEXT} /></TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Tổng CO2 Tháng Này</Text>
                    <View style={styles.summaryRow}>
                        <View>
                            <Text style={styles.co2Value}>{data.scores.TotalCO2.toFixed(1)} Kg</Text>
                            <Text style={styles.co2Change}>So Với Tháng Trước -5%</Text>
                        </View>
                        {pieChartData.length > 0 ? (
                            <PieChart
                                data={pieChartData}
                                width={screenWidth / 2.5}
                                height={100}
                                chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                hasLegend={false}
                                absolute
                            />
                        ) : (
                           <View style={styles.chartPlaceholder}><Text style={styles.legendText}>Không có dữ liệu</Text></View>
                        )}
                    </View>
                    <View style={styles.legendContainer}>
                        {pieChartData.map((item, index) => (
                            <View key={index} style={styles.legendItem}>
                                <View style={[styles.legendColor, {backgroundColor: item.color}]} />
                                <Text style={styles.legendText}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartTitle}>Dấu chân Carbon 7 ngày gần nhất</Text>
                    </View>
                    {barChartData.datasets[0].data.length > 0 ? (
                         <BarChart
                            data={barChartData}
                            width={screenWidth - 60}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="kg"
                            chartConfig={chartConfig}
                            fromZero
                            style={{paddingRight: 0}}
                        />
                    ) : (
                         <View style={styles.chartPlaceholder}><Text style={styles.legendText}>Không có dữ liệu giao dịch</Text></View>
                    )}
                </View>

                <View style={styles.listContainer}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>Tất Cả Giao Dịch</Text>
                    </View>
                    
                    {expenseTransactions.map((tx: Transaction) => (
                        <TouchableOpacity key={tx.TransactionID} style={styles.transactionRow} onPress={() => handleTransactionPress(tx)}>
                            <View style={styles.transactionIcon}><IconSymbol name="leaf.fill" size={24} color={PRIMARY_COLOR} /></View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.txMerchant}>{tx.MerchantName}</Text>
                                <Text style={styles.txDate}>{formatDate(tx.Timestamp)}</Text>
                            </View>
                            <View style={styles.transactionDetails}>
                                <Text style={styles.txCo2}>{tx.CO2_Estimate.toFixed(2)} kg</Text>
                                <Text style={styles.txESG}>+{Math.abs(tx.E_Score_Per_Transaction).toLocaleString()} ESG</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            
            <TransactionDetailModal visible={modalVisible} onClose={() => setModalVisible(false)} transaction={selectedTransaction} />
        </SafeAreaView>
    );
};

// StyleSheet không đổi
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: WHITE_BACKGROUND },
    centered: { justifyContent: 'center', alignItems: 'center' },
    errorText: { color: DARK_TEXT, fontSize: 18 },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: DARK_TEXT },
    summaryCard: { backgroundColor: '#F0F5F2', marginHorizontal: 20, borderRadius: 20, padding: 20, },
    summaryTitle: { color: '#666', fontSize: 16 },
    summaryRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10, },
    co2Value: { color: DARK_TEXT, fontSize: 32, fontWeight: 'bold' },
    co2Change: { color: 'red', fontSize: 14 },
    legendContainer: { flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: 15, gap: 15, },
    legendItem: { flexDirection: 'row', alignItems: 'center', },
    legendColor: { width: 10, height: 10, borderRadius: 5, marginRight: 8, },
    legendText: { color: DARK_TEXT, fontSize: 14, },
    chartCard: { backgroundColor: '#F0F5F2', borderRadius: 20, padding: 10, paddingVertical: 20, marginHorizontal: 20, marginVertical: 20, alignItems: 'center' },
    chartHeader: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10 },
    chartTitle: { color: DARK_TEXT, fontSize: 18, fontWeight: 'bold' },
    chartPlaceholder: { height: 150, justifyContent: 'center', alignItems: 'center' },
    listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, },
    listTitle: { color: DARK_TEXT, fontSize: 20, fontWeight: 'bold', },
    transactionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7F7', padding: 15, borderRadius: 15, marginBottom: 10 },
    transactionIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(0, 208, 158, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    transactionInfo: { flex: 1, gap: 4 },
    txMerchant: { color: DARK_TEXT, fontWeight: 'bold', fontSize: 16, },
    txDate: { color: '#A9A9A9', fontSize: 12 },
    transactionDetails: { alignItems: 'flex-end', gap: 4, },
    txCo2: { color: '#666', fontSize: 14, },
    txAmount: { color: '#E76F51', fontWeight: 'bold', fontSize: 14, },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
    modalContent: { backgroundColor: WHITE_BACKGROUND, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25 },
    modalTitle: { textAlign: 'center', color: DARK_TEXT, fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
    modalPoints: { textAlign: 'center', color: PRIMARY_COLOR, fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    modalDescription: { color: '#666', textAlign: 'center', marginBottom: 30, fontSize: 14, lineHeight: 20, },
    modalDetailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    modalDetailLabel: { color: '#666', fontSize: 16 },
    modalDetailValue: { color: DARK_TEXT, fontSize: 16, fontWeight: '500', flex: 1, textAlign: 'right' },
    closeButton: { backgroundColor: PRIMARY_COLOR, padding: 15, borderRadius: 25, marginTop: 30 },
    closeButtonText: { color: WHITE_BACKGROUND, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
    txESG: { 
        color: PRIMARY_COLOR, // <-- Đổi thành màu xanh lá cây
        fontWeight: 'bold', 
        fontSize: 14, 
    },
});

export default CarbonScreen;