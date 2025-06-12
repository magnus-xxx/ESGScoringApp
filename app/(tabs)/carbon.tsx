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

// Mảng 10 màu cố định cho biểu đồ tròn
const PIE_CHART_COLORS = [
  '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#C9CBCF', '#E7E9ED', '#8D9B99', '#5C6D70'
];
// --- Hàm tiện ích ---
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

// --- Component Popup chi tiết giao dịch ---
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
                    <Text style={styles.modalPoints}>+2 ĐIỂM ESG</Text>
                    <Text style={styles.modalDescription}>Cảm ơn bạn đã lựa chọn giao dịch thân thiện với môi trường! Hành động nhỏ của bạn góp phần tạo nên thay đổi lớn.</Text>
                    
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>Mô Tả:</Text><Text style={styles.modalDetailValue}>{transaction.MerchantName}</Text></View>
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>Doanh Nghiệp:</Text><Text style={styles.modalDetailValue}>{transaction.MerchantName}</Text></View>
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>Số Tiền:</Text><Text style={styles.modalDetailValue}>{transaction.Amount.toFixed(2)} VND</Text></View>
                    <View style={styles.modalDetailRow}><Text style={styles.modalDetailLabel}>CO₂ Ước Tính:</Text><Text style={styles.modalDetailValue}>{transaction.CO2_Estimate.toFixed(2)} Kg</Text></View>
                    
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
    const [visibleTransactions, setVisibleTransactions] = useState(5);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        fetchDashboardData('user123').then(fetchedData => {
            setData(fetchedData);
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

    if (loading || !data) {
        return <SafeAreaView style={[styles.wrapper, styles.centered]}><ActivityIndicator size="large" color={PRIMARY_COLOR} /></SafeAreaView>;
    }
    if (!data.scores) {
        return <SafeAreaView style={[styles.wrapper, styles.centered]}><Text style={styles.errorText}>Không thể tải dữ liệu</Text></SafeAreaView>;
    }

    // --- Chuẩn bị dữ liệu cho các biểu đồ ---
    const pieChartData = (data.co2_by_category || [])
        .filter(item => item.percentage > 0)
        .map((item, index) => ({
            name: item.name,
            population: item.percentage,
            color: PIE_CHART_COLORS[index % PIE_CHART_COLORS.length], // Lấy màu cố định
            legendFontColor: DARK_TEXT,
            legendFontSize: 14,
        }));
    const barChartLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const barChartData = {
        labels: barChartLabels,
        datasets: [{ data: data.daily_co2_summary || [0,0,0,0,0,0,0] }],
    };

    // Bắt đầu từ đây
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
                        {pieChartData.length > 0 && (
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
                    {/* Thêm lại phần header cho chart card */}
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartTitle}>Carbon Footprint</Text>
                        <View style={styles.chartIcons}>
                            <TouchableOpacity><IconSymbol name="magnifyingglass" size={24} color={DARK_TEXT}/></TouchableOpacity>
                            <TouchableOpacity><IconSymbol name="calendar" size={24} color={DARK_TEXT}/></TouchableOpacity>
                        </View>
                    </View>
                    <BarChart
                        data={barChartData}
                        width={screenWidth - 80} // Điều chỉnh lại width cho phù hợp
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="kg"
                        chartConfig={chartConfig}
                        fromZero
                    />
                </View>

                <View style={styles.listContainer}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>April</Text>
                        <TouchableOpacity><IconSymbol name="calendar" size={24} color={PRIMARY_COLOR} /></TouchableOpacity>
                    </View>

                    {/* SỬA Ở ĐÂY: Khai báo biến ngay trước khi dùng */}
                    {(() => {
                        const expenseTransactions = data.transactions_detail.filter(tx => tx.Amount < 0);
                        return (
                            <>
                                {expenseTransactions.slice(0, visibleTransactions).map((tx: Transaction) => (
                                    <TouchableOpacity key={tx.TransactionID} style={styles.transactionRow} onPress={() => handleTransactionPress(tx)}>
                                        <View style={styles.transactionIcon}><IconSymbol name="leaf.fill" size={24} color={PRIMARY_COLOR} /></View>
                                        <View style={styles.transactionInfo}>
                                            <Text style={styles.txMerchant}>{tx.MerchantName}</Text>
                                            <Text style={styles.txDate}>{formatDate(tx.Timestamp)}</Text>
                                        </View>
                                        <View style={styles.transactionDetails}>
                                            <Text style={styles.txCo2}>{tx.CO2_Estimate.toFixed(2)}</Text>
                                            <Text style={styles.txAmount}>{tx.Amount.toFixed(2)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}

                                {visibleTransactions < expenseTransactions.length && (
                                    <TouchableOpacity style={styles.loadMoreButton} onPress={() => setVisibleTransactions(prev => prev + 5)}>
                                        <Text style={styles.loadMoreText}>Tải Thêm</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        );
                    })()}
                </View>
            </ScrollView>
            <TransactionDetailModal visible={modalVisible} onClose={() => setModalVisible(false)} transaction={selectedTransaction} />
        </SafeAreaView>
    );
    // Kết thúc ở đây
};

// Dán StyleSheet đã cung cấp lần trước vào đây
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
    legendContainer: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 15, gap: 20, },
    legendItem: { flexDirection: 'row', alignItems: 'center', },
    legendColor: { width: 10, height: 10, borderRadius: 5, marginRight: 8, },
    legendText: { color: DARK_TEXT, fontSize: 14, },
    chartCard: { backgroundColor: '#F0F5F2', borderRadius: 20, padding: 20, marginHorizontal: 20, marginVertical: 20, },
    chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    chartTitle: { color: '#0C0D0F', fontSize: 18, fontWeight: 'bold' },
    chartIcons: { flexDirection: 'row', gap: 10, },
    chartPlaceholder: { height: 150, justifyContent: 'center', alignItems: 'center' },
    listContainer: { paddingHorizontal: 20 },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, },
    listTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', },
    transactionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 15, borderRadius: 15, marginBottom: 10 },
    transactionIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(0, 208, 158, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    transactionInfo: { flex: 1, gap: 4 },
    txMerchant: { color: '#FFF', fontWeight: 'bold', fontSize: 16, },
    txDate: { color: '#A9A9A9', fontSize: 12 },
    transactionDetails: { alignItems: 'flex-end', gap: 4, },
    txCo2: { color: '#A9A9A9', fontSize: 14, },
    txAmount: { color: '#E76F51', fontWeight: 'bold', fontSize: 14, },
    loadMoreButton: { backgroundColor: '#00D09E', paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginVertical: 20, },
    loadMoreText: { color: '#0C0D0F', fontWeight: 'bold', fontSize: 16, },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
    modalContent: { backgroundColor: '#1E1E1E', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25 },
    modalTitle: { textAlign: 'center', color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
    modalPoints: { textAlign: 'center', color: '#00D09E', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    modalDescription: { color: '#A9A9A9', textAlign: 'center', marginBottom: 30, fontSize: 14, lineHeight: 20, },
    modalDetailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333' },
    modalDetailLabel: { color: '#A9A9A9', fontSize: 16 },
    modalDetailValue: { color: '#FFF', fontSize: 16, fontWeight: '500' },
    closeButton: { backgroundColor: '#00D09E', padding: 15, borderRadius: 25, marginTop: 30 },
    closeButtonText: { color: '#0C0D0F', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});

export default CarbonScreen;