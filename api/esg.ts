// api/esg.ts

// !! QUAN TRỌNG: Thay thế URL này bằng API Gateway Invoke URL của bạn
const API_GATEWAY_URL = 'https://0ewe52o0te.execute-api.us-east-1.amazonaws.com/v1'; 

// Định nghĩa kiểu dữ liệu cho response từ API
// Điều này giúp TypeScript hiểu được cấu trúc dữ liệu và báo lỗi nếu chúng ta dùng sai
export interface TransactionData {
  esgScore: number;
  carbonFootprint: number;
  expenses: number;
}

// Hàm fetch dữ liệu từ API Gateway
export const fetchDashboardData = async (userId: string): Promise<TransactionData | null> => {
  try {
    const response = await fetch(API_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('API response not OK:', response.status, errorText);
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data: TransactionData = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu dashboard:', error);
    // Trả về null khi có lỗi để component có thể xử lý
    return null;
  }
};