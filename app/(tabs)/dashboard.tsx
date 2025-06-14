import { fetchDashboardData, type DashboardData } from '@/api/esg';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground, // THÊM IMPORT BỊ THIẾU  
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

// --- Các hằng số màu sắc ---
const PRIMARY_COLOR = '#00D09E';
const SECONDARY_BUTTON_COLOR = '#DFF7E2';
const DARK_BACKGROUND = '#0C0D0F';
const WHITE_BACKGROUND = '#FFFFFF';
const LIGHT_TEXT = '#A9A9A9';
const DARK_TEXT = '#0C0D0F';

/// --- Hàm tiện ích ---
const formatNumberWithCommas = (value: number | null | undefined) => {
  // Nếu giá trị không phải là số, trả về '0'
  if (typeof value !== 'number') {
    return '0';
  }
  // 1. Làm tròn số về số nguyên gần nhất
  const roundedValue = Math.round(value);

  // 2. Định dạng số đã làm tròn mà không có phần thập phân
  return new Intl.NumberFormat('vi-VN').format(roundedValue);
};

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

// MỚI: Định nghĩa kiểu dữ liệu cho danh sách đã được nhóm lại
interface CategorySummary {
  categoryName: string;
  totalAmount: number;
  totalEScore: number;
  transactionCount: number;
}

// --- Component chính ---
const DashboardScreen = () => {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const fetchedData = await fetchDashboardData('user0054e0');
        setData(fetchedData);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

   //------------------------------------------------ 
    // TỐI ƯU: Sử dụng useMemo để nhóm và tính toán dữ liệu giao dịch
    // Logic này chỉ chạy lại khi `data.transactions_detail` thay đổi, không chạy mỗi khi re-render
    const categorySummary: CategorySummary[] = useMemo(() => {
        if (!data?.transactions_detail) {
            return [];
        }

        // Dùng reduce để nhóm các giao dịch theo Category
        const groupedData = data.transactions_detail.reduce((acc, tx) => {
            const category = tx.Category || 'Khác';
            
            if (!acc[category]) {
                acc[category] = { totalAmount: 0, totalEScore: 0, transactionCount: 0 };
            }
            
            // Chỉ tính tổng cho các khoản chi tiêu (số âm)
            acc[category].totalAmount += tx.Amount;
            

            acc[category].totalEScore += tx.E_Score_Per_Transaction || 0;
            acc[category].transactionCount += 1;
            
            return acc;
        }, {} as Record<string, Omit<CategorySummary, 'categoryName'>>);

        // Chuyển object đã nhóm thành một mảng để dễ dàng render
        return Object.entries(groupedData).map(([categoryName, details]) => ({
            categoryName,
            ...details
        }));

    }, [data?.transactions_detail]);
//------------------------------------------------

    if (loading) {
        return <SafeAreaView style={[styles.wrapper, styles.centered]}><ActivityIndicator size="large" color={PRIMARY_COLOR} /></SafeAreaView>;
    }

    if (!data || !data.scores) {
        return (
             <SafeAreaView style={[styles.wrapper, styles.centered]}>
                <ThemedText style={styles.errorText}>Không thể tải dữ liệu.</ThemedText>
                <TouchableOpacity onPress={loadData} style={styles.actionButton}><ThemedText style={styles.actionButtonText}>Thử lại</ThemedText></TouchableOpacity>
            </SafeAreaView>
        );
    }
    
    const { scores } = data;

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <ImageBackground
                    source={require('@/assets/images/header-background.png')}
                    style={styles.headerContainer}
                    imageStyle={styles.headerImageStyle}
                    blurRadius={5}
                >
                    <View style={styles.header}>
                        <View>
                            <ThemedText style={styles.headerTitle}>Hi, {scores.UserID || 'Welcome Back'}</ThemedText>
                            <ThemedText style={styles.headerSubtitle}>Good Morning</ThemedText>
                        </View>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity><IconSymbol name="archivebox.fill" size={24} color="#FFF" /></TouchableOpacity>
                            <TouchableOpacity><IconSymbol name="bell.fill" size={24} color="#FFF" /></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <ThemedText style={styles.statLabel}>Lượng CO₂ Hiện Tại</ThemedText>
                            <ThemedText style={styles.statValue}>{(scores.TotalCO2 || 0).toFixed(2)} Kg</ThemedText>
</View>
                        <View style={styles.statBox}>
                            <ThemedText style={styles.statLabel}>Tổng Chi Tiêu</ThemedText>
                            <ThemedText style={styles.statValue}>
    {formatNumberWithCommas(scores.TotalExpenses)}
</ThemedText>
</View>
                    </View>
                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/compensation')}>
                            <ThemedText style={styles.actionButtonText}>Bù Đắp</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]} onPress={() => router.push('/carbon')}>
                            <ThemedText style={styles.actionButtonOutlineText}>Carbon Footprint</ThemedText>
                        </TouchableOpacity>
                    </View>
                    <ThemedText style={styles.bottomText}>✓ 30% Of Your Expenses, Looks Good.</ThemedText>
                </ImageBackground>
                
                <View style={styles.bottomSheet}>
                    <TouchableOpacity style={styles.esgCard} onPress={() => router.push('/rewards')}>
                        <View style={styles.esgScoreContainer}>
                            <View style={styles.esgCircle}><ThemedText style={styles.esgScore}>{scores.ES_Score}</ThemedText></View>
                            <ThemedText style={styles.esgLabel}>Điểm Sống Xanh</ThemedText>
                        </View>
                        <View style={styles.esgDetailContainer}>
                            <ThemedText style={styles.esgDetailText}>E {scores.E_Score}</ThemedText>
                            <ThemedText style={styles.esgDetailText}>S {scores.S_Score}</ThemedText>
                            <ThemedText style={styles.esgDetailText}>G {scores.G_Score}</ThemedText>
                        </View>
                        <IconSymbol name="chevron.right" size={24} color="#FFF" />
                    </TouchableOpacity>
                    
                    <View style={styles.transactionsContainer}>
                        <ThemedText style={styles.sectionTitle}>Chi tiêu theo hạng mục</ThemedText>
                        {categorySummary.length > 0 ? (
                            categorySummary.map((summary) => (
                                <View key={summary.categoryName} style={styles.categoryRow}>
                                    <View style={styles.categoryIconContainer}>
                                        <IconSymbol name="creditcard.fill" size={20} color={PRIMARY_COLOR} />
                                    </View>
                                    <View style={styles.categoryInfo}>
                                        <ThemedText style={styles.categoryName}>{summary.categoryName}</ThemedText>
                                        <ThemedText style={styles.transactionCount}>{summary.transactionCount} giao dịch</ThemedText>
                                    </View>
                                    <View style={styles.categoryTotals}>
                                        <ThemedText style={styles.categoryAmount}>
                                            {formatNumberWithCommas(summary.totalAmount)}
                                        </ThemedText>
                                        <ThemedText style={styles.categoryEScore}>
                                            +{summary.totalEScore} ESG
                                        </ThemedText>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <ThemedText style={styles.noTransactionText}>Không có dữ liệu chi tiêu.</ThemedText>
                        )}
                    </View>
                      
                        <View style={styles.faqContainer}>
                        <TouchableOpacity style={styles.faqRow}>
                            <IconSymbol name="bell.fill" size={24} color={PRIMARY_COLOR}/>
                            <ThemedText style={styles.faqText}>CO₂ và Cách Ước Tính</ThemedText>
                            <IconSymbol name="chevron.right" size={18} color="#666" />
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.faqRow}>
                            <IconSymbol name="bell.fill" size={24} color={PRIMARY_COLOR}/>
                            <ThemedText style={styles.faqText}>Bù Đắp CO₂</ThemedText>
                            <IconSymbol name="chevron.right" size={18} color="#666" />
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.faqRow}>
                            <IconSymbol name="bell.fill" size={24} color={PRIMARY_COLOR}/>
                            <ThemedText style={styles.faqText}>Điểm Sống Xanh</ThemedText>
                            <IconSymbol name="chevron.right" size={18} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View> {/* <--- Thẻ đóng của bottomSheet */}
            </ScrollView>
        </SafeAreaView>
    );
};

// Toàn bộ style được viết lại cho ổn định
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: DARK_BACKGROUND },
    centered: { justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1 },
    errorText: { color: '#000', fontSize: 18, marginBottom: 20, textAlign: 'center' },
    
    headerContainer: {
        backgroundColor: DARK_BACKGROUND,
        paddingBottom: 60,
    },
    headerImageStyle: { resizeMode: 'cover' },
    header: { paddingTop: 50, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { color: WHITE_BACKGROUND, fontSize: 24, fontWeight: 'bold' },
    headerSubtitle: { color: LIGHT_TEXT, fontSize: 16 },
    headerIcons: { flexDirection: 'row', gap: 16 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, paddingHorizontal: 20, },
    statBox: { alignItems: 'center', gap: 4 },
    statLabel: { color: LIGHT_TEXT, fontSize: 14 },
    statValue: { color: WHITE_BACKGROUND, fontSize: 20, fontWeight: '600' },
    actionsRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, paddingHorizontal: 20, marginTop: 20 },
    actionButton: { backgroundColor: PRIMARY_COLOR, paddingVertical: 14, flex: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
    actionButtonText: { color: DARK_BACKGROUND, fontWeight: 'bold', fontSize: 16 },
    actionButtonOutline: { backgroundColor: SECONDARY_BUTTON_COLOR, borderRadius: 25 },
    actionButtonOutlineText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
    bottomText: { color: LIGHT_TEXT, textAlign: 'center', paddingVertical: 15 },
    
    bottomSheet: {
        backgroundColor: WHITE_BACKGROUND,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        paddingBottom: 40, // Đảm bảo có không gian ở dưới cùng
    },
    esgCard: { 
        backgroundColor: PRIMARY_COLOR, 
        borderRadius: 20, 
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginHorizontal: 20,
        marginTop: -35, // Kéo thẻ lên để chồng lên header
        marginBottom: 20,
        elevation: 10,
    },
    esgScoreContainer: { alignItems: 'center' },
    esgCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)' },
    esgScore: { color: WHITE_BACKGROUND, fontSize: 24, fontWeight: 'bold' },
    esgLabel: { color: WHITE_BACKGROUND, fontSize: 12, marginTop: 4, fontWeight: '500' },
    esgDetailContainer: { gap: 2 },
    esgDetailText: { color: WHITE_BACKGROUND, fontSize: 16, fontWeight: 'bold' },
    
    tabSelector: { flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 25, padding: 5, alignSelf: 'center', marginBottom: 20 },
    tabItem: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
    tabItemActive: { backgroundColor: PRIMARY_COLOR },
    tabText: { color: '#666', fontWeight: 'bold' },
    tabTextActive: { color: WHITE_BACKGROUND },

    listContainer: { paddingHorizontal: 20 },
    transactionsContainer: { gap: 10, paddingBottom: 20 },
    transactionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7F7', padding: 12, borderRadius: 10 },
    transactionIconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(0, 208, 158, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    transactionInfo: { flex: 1, gap: 4 },
    transactionType: { color: DARK_TEXT, fontWeight: 'bold', fontSize: 16 },
    transactionDate: { color: '#666', fontSize: 12 },
    transactionAmountContainer: { alignItems: 'flex-end' },
    transactionCategory: { color: '#666', fontSize: 12 },
    transactionAmountPositive: { color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 16 },
    transactionAmountNegative: { color: '#E76F51', fontWeight: 'bold', fontSize: 16 },
    noTransactionText: { textAlign: 'center', color: '#666', marginVertical: 20, fontSize: 16 },
    chartCard: { backgroundColor: '#F7F7F7', borderRadius: 20, padding: 20, marginTop: 10 },
    chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    chartTitle: { color: DARK_TEXT, fontSize: 18, fontWeight: 'bold' },
    chartPlaceholder: { height: 150, justifyContent: 'center', alignItems: 'center' },
    faqContainer: { marginTop: 20, gap: 10 },
    faqRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7F7', padding: 15, borderRadius: 10 },
    faqText: { flex: 1, color: DARK_TEXT, fontSize: 16, marginLeft: 10 },
    // DÁN TOÀN BỘ KHỐI NÀY VÀO STYLESHEET CỦA BẠN
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: DARK_TEXT,
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    categoryIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 208, 158, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    categoryInfo: {
        flex: 1,
        gap: 4,
    },
    categoryName: {
        color: DARK_TEXT,
        fontWeight: 'bold',
        fontSize: 16,
    },
    transactionCount: { // Style cho "x giao dịch"
        color: '#666',
        fontSize: 12,
    },
    categoryTotals: {
        alignItems: 'flex-end',
        gap: 4,
    },
    categoryAmount: {
        color: '#E76F51',
        fontWeight: 'bold',
        fontSize: 16,
    },
    categoryEScore: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default DashboardScreen;