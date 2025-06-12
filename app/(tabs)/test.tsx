// app/(tabs)/test.tsx
import React, { useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// !! QUAN TRỌNG: Dán lại Invoke URL của bạn từ stage v2 vào đây
const API_URL = 'https://opsbwq42zc.execute-api.ap-southeast-1.amazonaws.com/v1/transactions'; 

const TestScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    console.log(`Đang gọi đến URL: ${API_URL}`);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ userId: 'user123' }),
      });

      const responseText = await response.text(); // Đọc response dưới dạng text trước
      console.log(`API response status: ${response.status}`);
      console.log(`API response text: ${responseText}`);

      if (!response.ok) {
        // Ném lỗi với nội dung text đã đọc được
        throw new Error(`API Lỗi ${response.status}: ${responseText}`);
      }

      const result = JSON.parse(responseText); // Parse text thành JSON
      setData(result);
    } catch (e: any) {
      console.error("Lỗi trong khối catch:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Màn hình kiểm tra API</Text>
        <Text style={styles.url}>Đang gọi đến: {API_URL}</Text>
        <Button title="Gọi API" onPress={handleFetch} />
        
        {loading && <ActivityIndicator style={styles.feedback} size="large" />}
        
        {error && (
            <View style={styles.resultContainerError}>
                <Text style={styles.resultTitle}>Đã có lỗi xảy ra:</Text>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )}

        {data && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Thành công! Kết quả trả về:</Text>
            <Text style={styles.resultJson}>{JSON.stringify(data, null, 2)}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  url: { fontSize: 12, color: '#666', marginBottom: 20, textAlign: 'center' },
  feedback: { marginTop: 20 },
  resultContainer: { marginTop: 20, padding: 10, backgroundColor: '#E0F8E0', borderColor: 'green', borderWidth: 1, borderRadius: 5, width: '100%' },
  resultContainerError: { marginTop: 20, padding: 10, backgroundColor: '#FEE', borderColor: 'red', borderWidth: 1, borderRadius: 5, width: '100%' },
  resultTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
  resultJson: { fontFamily: 'monospace', fontSize: 12, color: '#000' },
  errorText: { fontFamily: 'monospace', fontSize: 12, color: '#C00' }
});

export default TestScreen;