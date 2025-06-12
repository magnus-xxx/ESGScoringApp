// api/esg.ts

const API_GATEWAY_URL = 'https://opsbwq42zc.execute-api.ap-southeast-1.amazonaws.com/v1/transactions'; // Nhớ thay thế bằng URL của bạn

// Kiểu dữ liệu cho một giao dịch chi tiết
export interface Transaction {
  TransactionID: string;
  UserID: string;
  Amount: number;
  Category: string;
  CO2_Estimate: number;
  MerchantName: string;
  Timestamp: string;
}

// Kiểu dữ liệu cho một danh mục đã tổng hợp
export interface CategorySummary {
  category: string;
  totalAmount: number;
}

// Kiểu dữ liệu cho các loại điểm số và chỉ số tổng
export interface Scores {
  UserID: string;
  ES_Score: number;
  E_Score: number;
  S_Score: number;
  G_Score: number;
  TotalCO2: number;
  TotalExpenses: number;
}

// Kiểu dữ liệu cho toàn bộ data trả về từ API
export interface DashboardData {
  scores: Scores;
  transactions_summary: CategorySummary[];
  transactions_detail: Transaction[];
}

export interface CO2Category {
  name: string;
  percentage: number;
}

export interface DashboardData {
  scores: Scores;
  transactions_detail: Transaction[];
  co2_by_category: CO2Category[]; // <-- Thêm trường mới
  daily_co2_summary: number[]; // <-- Thêm trường mới
}

// Đổi tên hàm lại thành tên chung
export const fetchDashboardData = async (userId: string): Promise<DashboardData | null> => {
  try {
    const response = await fetch(API_GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response not OK:', response.status, errorText);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }
    
    // SỬA LỖI Ở ĐÂY
    const data = await response.json();
    return data as DashboardData; // Ép kiểu dữ liệu trả về thành DashboardData

  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu dashboard:', error);
    return null;
  }
};