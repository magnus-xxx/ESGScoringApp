import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

// --- Các hằng số màu sắc ---
const PRIMARY_COLOR = '#00D09E';
const DARK_TEXT = '#0C0D0F';
const LIGHT_TEXT = '#666';
const WHITE_TEXT = '#FFFFFF';
const CARD_BACKGROUND = '#F7F7F7';
const WHITE_BACKGROUND = '#FFFFFF';
const TAG_INVEST_BG = 'rgba(54, 162, 235, 0.1)';
const TAG_INVEST_TEXT = '#36A2EB';
const TAG_COMMUNITY_BG = 'rgba(255, 159, 64, 0.1)';
const TAG_COMMUNITY_TEXT = '#FF9F40';


// --- Dữ liệu giả lập cho các dự án ---
const compensationData = {
    totalCo2Offset: 15.7, // kg
    projects: [
        { 
            id: '1',
            type: 'Cộng đồng', 
            title: 'Trồng cây tại Rừng Nam Cát Tiên', 
            description: 'Mỗi đóng góp của bạn giúp phủ xanh các vùng đất trống, cải thiện hệ sinh thái và bảo vệ đa dạng sinh học.',
            actionText: 'Quyên góp',
            image: require('@/assets/images/project-tree.png') 
        },
        { 
            id: '2', 
            type: 'Đầu tư xanh',
            title: 'Đầu tư vào Trang trại Điện gió', 
            description: 'Hỗ trợ phát triển các dự án năng lượng sạch, được chứng nhận và giảm phụ thuộc vào nhiên liệu hóa thạch.',
            actionText: 'Tìm hiểu',
            image: require('@/assets/images/project-solar.png') 
        },
    ]
};


// --- Component chính ---
const CompensationScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={() => router.back()}>
                    <IconSymbol name="chevron.left" size={28} color={DARK_TEXT} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Hành động vì Tương lai</ThemedText>
                <View style={{width: 28}} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {/* === KHỐI TÓM TẮT THÀNH TỰU === */}
                <View style={styles.summaryCard}>
                    <IconSymbol name="leaf.fill" size={40} color={PRIMARY_COLOR} />
                    <ThemedText style={styles.summaryTitle}>Tổng tác động của bạn</ThemedText>
                    <ThemedText style={styles.summaryValue}>{compensationData.totalCo2Offset} Kg CO₂</ThemedText>
                    <ThemedText style={styles.summaryLabel}>đã được bù đắp</ThemedText>
                </View>
                
                {/* === KHỐI DANH SÁCH DỰ ÁN === */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Các dự án bạn có thể tham gia</ThemedText>
                    {compensationData.projects.map(project => (
                        <View key={project.id} style={styles.projectCard}>
                            <Image source={project.image} style={styles.projectImage} />
                            <View style={styles.projectInfo}>
                                <View style={[
                                    styles.tag,
                                    { backgroundColor: project.type === 'Đầu tư xanh' ? TAG_INVEST_BG : TAG_COMMUNITY_BG }
                                ]}>
                                    <ThemedText style={[
                                        styles.tagText,
                                        { color: project.type === 'Đầu tư xanh' ? TAG_INVEST_TEXT : TAG_COMMUNITY_TEXT }
                                    ]}>{project.type}</ThemedText>
                                </View>
                                <ThemedText style={styles.projectTitle}>{project.title}</ThemedText>
                                <ThemedText style={styles.projectDescription}>{project.description}</ThemedText>
                                <TouchableOpacity style={styles.projectButton}>
                                    <ThemedText style={styles.projectButtonText}>{project.actionText}</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

// --- StyleSheet cho màn hình Compensation ---
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: WHITE_BACKGROUND },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: DARK_TEXT },
    scrollContainer: { paddingBottom: 40 },
    
    summaryCard: { 
        backgroundColor: '#F0F5F2', 
        borderRadius: 20, 
        margin: 20, 
        padding: 25, 
        alignItems: 'center',
        gap: 8
    },
    summaryTitle: {
        fontSize: 16,
        color: LIGHT_TEXT,
        fontWeight: '600',
    },
    summaryValue: { 
        color: DARK_TEXT, 
        fontSize: 32, 
        fontWeight: 'bold' 
    },
    summaryLabel: { 
        color: LIGHT_TEXT, 
        fontSize: 14 
    },
    
    section: { 
        paddingHorizontal: 20, 
        marginBottom: 20 
    },
    sectionTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: DARK_TEXT, 
        marginBottom: 15 
    },
    
    projectCard: { 
        backgroundColor: CARD_BACKGROUND, 
        borderRadius: 16, 
        marginBottom: 20, 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.05, 
        shadowRadius: 10 
    },
    projectImage: { 
        width: '100%', 
        height: 140, 
        borderTopLeftRadius: 16, 
        borderTopRightRadius: 16 
    },
    projectInfo: { 
        padding: 15 
    },
    projectTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: DARK_TEXT, 
        marginBottom: 8 
    },
    projectDescription: { 
        fontSize: 14, 
        color: LIGHT_TEXT, 
        marginBottom: 15, 
        lineHeight: 20 
    },
    projectButton: { 
        backgroundColor: PRIMARY_COLOR, 
        paddingVertical: 12, 
        borderRadius: 25, 
        alignItems: 'center' 
    },
    projectButtonText: { 
        color: DARK_TEXT, 
        fontWeight: 'bold'
    },
    tag: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginBottom: 10,
    },
    tagText: {
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default CompensationScreen;