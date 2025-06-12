// app/(tabs)/rewards.tsx
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const hotDeals = [
    { title: 'Đóng Góp 1 Cây Xanh Cho Dự Án Rừng', points: 20, image: require('@/assets/images/tree_deal.png')},
    { title: 'Đóng Góp 1 Cây Xanh Cho Dự Án Rừng', points: 20, image: require('@/assets/images/tree_deal.png')},
    { title: 'Đóng Góp 1 Cây Xanh Cho Dự Án Rừng', points: 20, image: require('@/assets/images/tree_deal.png')},
    // Add more deals
];

const RewardsScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.headerNav}>
                 <TouchableOpacity onPress={() => router.back()}>
                    <IconSymbol name="chevron.left" size={28} color="#FFF" />
                 </TouchableOpacity>
                 <ThemedText style={styles.headerTitle}>Rewards</ThemedText>
                 <TouchableOpacity>
                    <IconSymbol name="bell.fill" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.esgCard}>
                    <View style={styles.esgScoreContainer}>
                        <View style={styles.esgCircle}>
                            <ThemedText style={styles.esgScore}>70</ThemedText>
                            <ThemedText style={styles.esgScoreLabel}>/100</ThemedText>
                        </View>
                        <ThemedText style={styles.esgLabel}>Điểm Sống Xanh</ThemedText>
                    </View>
                    <View style={styles.esgDetailContainer}>
                        <ThemedText style={styles.esgDetailText}>E 20</ThemedText>
                        <ThemedText style={styles.esgDetailText}>S 30</ThemedText>
                        <ThemedText style={styles.esgDetailText}>G 20</ThemedText>
                    </View>
                </View>

                {/* Main deal card */}
                <TouchableOpacity style={styles.mainDealCard}>
                    <Image source={require('@/assets/images/food_deal.png')} style={styles.mainDealImage} />
                    <View style={styles.mainDealInfo}>
                        <ThemedText style={styles.mainDealTitle}>Giảm VND 100,000 cho đơn từ VND 500,000</ThemedText>
                        <ThemedText style={styles.mainDealSubtitle}>Thu thập ngay</ThemedText>
                    </View>
                </TouchableOpacity>

                {/* Category Icons */}
                <View style={styles.categoryRow}>
                    {/* Placeholder for icons */}
                </View>

                {/* Hot Deals */}
                <View style={styles.dealsContainer}>
                    <ThemedText style={styles.dealsTitle}>HOT Deals</ThemedText>
                    <View style={styles.dealsGrid}>
                        {hotDeals.map((deal, index) => (
                            <TouchableOpacity key={index} style={styles.dealItem}>
                                <Image source={deal.image} style={styles.dealImage} />
                                <ThemedText style={styles.dealTitle}>{deal.title}</ThemedText>
                                <ThemedText style={styles.dealPoints}>{deal.points} Điểm</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Thêm các style cho màn hình Rewards
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#151718' },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
    esgCard: { backgroundColor: '#10A66F', borderRadius: 20, padding: 20, margin: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    esgScoreContainer: { alignItems: 'center' },
    esgCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center'},
    esgScore: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
    esgScoreLabel: { color: '#FFF', fontSize: 12, position: 'absolute', bottom: 20, right: 10 },
    esgLabel: { color: '#FFF', marginTop: 5 },
    esgDetailContainer: {},
    esgDetailText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    mainDealCard: { marginHorizontal: 20, borderRadius: 20, overflow: 'hidden', marginBottom: 20 },
    mainDealImage: { width: '100%', height: 150 },
    mainDealInfo: { position: 'absolute', bottom: 10, left: 10 },
    mainDealTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    mainDealSubtitle: { color: '#FFF', fontSize: 14 },
    categoryRow: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginBottom: 20 },
    dealsContainer: { paddingHorizontal: 20 },
    dealsTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    dealsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    dealItem: { backgroundColor: '#1E1E1E', borderRadius: 10, width: '48%', marginBottom: 15, padding: 10 },
    dealImage: { width: '100%', height: 100, borderRadius: 5 },
    dealTitle: { color: '#FFF', marginTop: 5 },
    dealPoints: { color: '#10A66F', fontWeight: 'bold' },
});


export default RewardsScreen;