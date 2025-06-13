import { fetchDashboardData, type DashboardData } from '@/api/esg'; // Import logic API
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

// --- Các hằng số màu sắc ---
const PRIMARY_COLOR = '#00D09E';
const DARK_TEXT = '#0C0D0F';
const WHITE_TEXT = '#FFFFFF';
const CARD_BACKGROUND = '#F7F7F7';
const WHITE_BACKGROUND = '#FFFFFF';

// --- Dữ liệu giả lập cho các deal (sau này có thể lấy từ API riêng) ---
const hotDeals = [
    { id: '1', title: 'Đóng góp 1 Cây Xanh Cho Dự Án Rừng', points: 20, image: require('@/assets/images/deal-tree.png') },
    { id: '2', title: 'Voucher 20% tại The Coffee House', points: 50, image: require('@/assets/images/deal-coffee.png') },
    { id: '3', title: 'Giảm 50k cho đơn hàng xanh tại Annam Gourmet', points: 100, image: require('@/assets/images/deal-annam.png') },
    { id: '4', title: 'Tích lũy dặm bay Xanh cùng Vietnam Airlines', points: 150, image: require('@/assets/images/deal-plane.png') },
];

// --- Component chính ---
const RewardsScreen = () => {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const fetchedData = await fetchDashboardData('user123');
            setData(fetchedData);
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) {
        return <SafeAreaView style={[styles.wrapper, styles.centered]}><ActivityIndicator size="large" color={PRIMARY_COLOR} /></SafeAreaView>;
    }

    if (!data || !data.scores) {
        return (
             <SafeAreaView style={[styles.wrapper, styles.centered]}>
                <ThemedText style={styles.errorText}>Không thể tải dữ liệu.</ThemedText>
            </SafeAreaView>
        );
    }

    const { scores } = data;

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={() => router.back()}>
                    <IconSymbol name="chevron.left" size={28} color={DARK_TEXT} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Rewards</ThemedText>
                <TouchableOpacity>
                    <IconSymbol name="bell.fill" size={24} color={DARK_TEXT} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* === KHỐI 1: TỔNG HỢP ĐIỂM (LẤY TỪ API) === */}
                <View style={styles.scoreSection}>
                    <View style={styles.totalPointsCard}>
                        <View style={styles.totalPointsCircle}>
                            <ThemedText style={styles.totalPointsText}>{scores.ES_Score}</ThemedText>
                        </View>
                        <ThemedText style={styles.totalPointsLabel}>Điểm Sống Xanh</ThemedText>
                    </View>
                    <View style={styles.detailPointsCard}>
                        <ThemedText style={styles.detailPointsText}>E {scores.E_Score}</ThemedText>
                        <ThemedText style={styles.detailPointsText}>S {scores.S_Score}</ThemedText>
                        <ThemedText style={styles.detailPointsText}>G {scores.G_Score}</ThemedText>
                    </View>
                </View>

                {/* === KHỐI 2: BANNER ƯU ĐÃI TECHCOMBANK === */}
                <TouchableOpacity style={styles.bannerCard}>
                    <Image source={require('@/assets/images/banner-food.png')} style={styles.bannerImage} />
                    <View style={styles.bannerOverlay} />
                    <View style={styles.bannerContent}>
                        <ThemedText style={styles.bannerTitle}>Giảm VND 100,000</ThemedText>
                        <ThemedText style={styles.bannerSubtitle}>cho đơn hàng từ VND 500,000</ThemedText>
                        <ThemedText style={styles.bannerAction}>Thu thập ngay {'>>'}</ThemedText>
                    </View>
                </TouchableOpacity>

                {/* === KHỐI 3: SẢN PHẨM ĐẦU TƯ XANH === */}
                <View style={styles.investmentSection}>
                    <ThemedText style={styles.sectionTitle}>Sản phẩm đầu tư Xanh</ThemedText>
                    <View style={styles.investmentGrid}>
                        <TouchableOpacity style={styles.investmentItem}><IconSymbol name="banknote.fill" size={28} color={PRIMARY_COLOR}/><ThemedText style={styles.investmentText}>Tín dụng Xanh</ThemedText></TouchableOpacity>
                        <TouchableOpacity style={styles.investmentItem}><IconSymbol name="leaf.fill" size={28} color={PRIMARY_COLOR}/><ThemedText style={styles.investmentText}>Tiền gửi Xanh</ThemedText></TouchableOpacity>
                        <TouchableOpacity style={styles.investmentItem}><IconSymbol name="chart.bar.fill" size={28} color={PRIMARY_COLOR}/><ThemedText style={styles.investmentText}>Cổ phiếu Xanh</ThemedText></TouchableOpacity>
                        <TouchableOpacity style={styles.investmentItem}><IconSymbol name="gift.fill" size={28} color={PRIMARY_COLOR}/><ThemedText style={styles.investmentText}>Trái phiếu Xanh</ThemedText></TouchableOpacity>
                    </View>
                </View>

                {/* === KHỐI 4: ĐỔI ĐIỂM NHẬN ƯU ĐÃI === */}
                <View style={styles.dealsSection}>
                    <ThemedText style={styles.sectionTitle}>Đổi điểm nhận ưu đãi</ThemedText>
                    <View style={styles.dealsGrid}>
                        {hotDeals.map((deal) => (
                            <TouchableOpacity key={deal.id} style={styles.dealItem}>
                                <Image source={deal.image} style={styles.dealImage} />
                                <ThemedText style={styles.dealTitle} numberOfLines={2}>{deal.title}</ThemedText>
                                <ThemedText style={styles.dealPoints}>{deal.points} Điểm</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- StyleSheet cho màn hình Rewards ---
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: WHITE_BACKGROUND },
    centered: { justifyContent: 'center', alignItems: 'center' },
    errorText: { color: DARK_TEXT, fontSize: 18 },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: DARK_TEXT },
    
    scoreSection: { flexDirection: 'row', backgroundColor: PRIMARY_COLOR, borderRadius: 20, margin: 20, padding: 20, alignItems: 'center', justifyContent: 'space-around', elevation: 5 },
    totalPointsCard: { alignItems: 'center', gap: 8 },
    totalPointsCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center', backgroundColor: WHITE_BACKGROUND },
    totalPointsText: { color: PRIMARY_COLOR, fontSize: 32, fontWeight: 'bold' },
    totalPointsLabel: { color: WHITE_TEXT, fontSize: 14, fontWeight: '500' },
    detailPointsCard: { borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.5)', paddingLeft: 30, gap: 8 },
    detailPointsText: { color: WHITE_TEXT, fontSize: 18, fontWeight: 'bold' },
    
    bannerCard: { marginHorizontal: 20, borderRadius: 16, overflow: 'hidden', marginBottom: 30 },
    bannerImage: { width: '100%', height: 120 },
    bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
    bannerContent: { position: 'absolute', bottom: 15, left: 15 },
    bannerTitle: { color: WHITE_TEXT, fontSize: 20, fontWeight: 'bold' },
    bannerSubtitle: { color: WHITE_TEXT, fontSize: 14 },
    bannerAction: { color: PRIMARY_COLOR, fontSize: 14, fontWeight: 'bold', marginTop: 5 },

    investmentSection: { paddingHorizontal: 20, marginBottom: 30 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: DARK_TEXT, marginBottom: 15 },
    investmentGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    investmentItem: { width: '48%', backgroundColor: CARD_BACKGROUND, padding: 20, borderRadius: 16, alignItems: 'center', gap: 10, marginBottom: 12 },
    investmentText: { color: DARK_TEXT, fontWeight: '600', fontSize: 14, textAlign: 'center' },
    
    dealsSection: { paddingHorizontal: 20, paddingBottom: 40 },
    dealsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    dealItem: { width: '48%', backgroundColor: CARD_BACKGROUND, borderRadius: 10, marginBottom: 15, overflow: 'hidden', elevation: 2 },
    dealImage: { width: '100%', height: 100 },
    dealTitle: { color: DARK_TEXT, fontWeight: '600', paddingHorizontal: 10, paddingTop: 8, paddingBottom: 4, minHeight: 50 },
    dealPoints: { color: PRIMARY_COLOR, fontWeight: 'bold', paddingHorizontal: 10, paddingBottom: 10 },
});

export default RewardsScreen;