import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Button } from 'react-native';

// Đây là component màn hình Dashboard của chúng ta
const DashboardScreen = () => {
    // Dữ liệu giả lập ban đầu
    const esgScore = 70;
    const carbonFootprint = 7783;
    const expenses = 1187.40;

    // Hàm này sẽ được chúng ta lập trình ở bước sau để gọi API
    const handleFetchData = () => {
        console.log('Nút đã được nhấn! Sẽ gọi API ở đây...');
        // TODO: Gọi API Gateway và cập nhật state
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                {/* Phần Header chào mừng */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Hi, Welcome Back</Text>
                    <Text style={styles.headerSubtitle}>Good Morning</Text>
                </View>

                {/* Phần hiển thị điểm ESG chính */}
                <View style={styles.esgCard}>
                    <Text style={styles.esgScore}>{esgScore}</Text>
                    <Text style={styles.esgLabel}>Điểm Sống Xanh</Text>
                </View>

                {/* Phần hiển thị các thông tin phụ */}
                <View style={styles.infoRow}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoValue}>{carbonFootprint} Kg</Text>
                        <Text style={styles.infoLabel}>Lượng CO₂ Hiện Tại</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoValue}>${expenses.toFixed(2)}</Text>
                        <Text style={styles.infoLabel}>Tổng Chi Tiêu</Text>
                    </View>
                </View>

                {/* Nút để gọi API (cho bước tiếp theo) */}
                <Button
                    title="Làm mới dữ liệu"
                    onPress={handleFetchData}
                    color="#10A66F" // Một màu xanh lá cây
                />
            </View>
        </SafeAreaView>
    );
};

// Đây là nơi chúng ta định nghĩa style cho các component ở trên
// Rất giống với CSS trong lập trình web
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1E1E1E', // Màu nền tối
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        marginBottom: 30,
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
    esgCard: {
        backgroundColor: '#2A9D8F', // Màu xanh mòng két
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    esgScore: {
        color: '#FFFFFF',
        fontSize: 80,
        fontWeight: 'bold',
    },
    esgLabel: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    infoBox: {
        alignItems: 'center',
        flex: 1,
    },
    infoValue: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '600',
    },
    infoLabel: {
        color: '#A9A9A9',
        fontSize: 14,
        marginTop: 8,
    },
});

export default DashboardScreen;