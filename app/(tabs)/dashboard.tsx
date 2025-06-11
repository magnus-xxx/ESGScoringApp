import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// Import các hàm và kiểu dữ liệu chúng ta sẽ tạo ở bước sau
import { fetchDashboardData, type TransactionData } from '@/api/esg';

const DashboardScreen = () => {
    // Khai báo state với kiểu dữ liệu rõ ràng
    const [data, setData] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        // Giả sử userId là 'user123', bạn sẽ thay thế bằng logic lấy userId thực tế
        const fetchedData = await fetchDashboardData('user123');
        setData(fetchedData);
        setLoading(false);
    };

    useEffect(() => {
        // Gọi hàm loadData khi component được render lần đầu
        loadData();
    }, []);

    // Hiển thị màn hình loading trong khi chờ dữ liệu từ API
    if (loading) {
        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2A9D8F" />
                    <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
                </View>
            </SafeAreaView>
        );
    }
    
    // Xử lý trường hợp không lấy được dữ liệu
    if (!data) {
        return (
             <SafeAreaView style={styles.wrapper}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.errorText}>Không thể tải dữ liệu. Vui lòng thử lại.</Text>
                    <Button title="Thử lại" onPress={loadData} color="#10A66F" />
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Hi, Welcome Back</Text>
                    <Text style={styles.headerSubtitle}>Good Morning</Text>
                </View>

                <View style={styles.esgCard}>
                    <Text style={styles.esgScore}>{data.esgScore}</Text>
                    <Text style={styles.esgLabel}>Điểm Sống Xanh</Text>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoValue}>{data.carbonFootprint} Kg</Text>
                        <Text style={styles.infoLabel}>Lượng CO₂ Hiện Tại</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoValue}>${data.expenses.toFixed(2)}</Text>
                        <Text style={styles.infoLabel}>Tổng Chi Tiêu</Text>
                    </View>
                </View>

                <Button
                    title="Làm mới dữ liệu"
                    onPress={loadData}
                    color="#10A66F"
                />
            </View>
        </SafeAreaView>
    );
};

// Cập nhật và thêm một vài style mới
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40, // Tăng padding top
        justifyContent: 'flex-start',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#A9A9A9',
        fontSize: 16,
    },
    errorText: {
        marginBottom: 20,
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center'
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
        backgroundColor: '#2A9D8F',
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