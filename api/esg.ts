// api/esg.ts

// URL của API Gateway, bạn có thể thay đổi nếu cần
const API_GATEWAY_URL = 'https://opsbwq42zc.execute-api.ap-southeast-1.amazonaws.com/v1/transactions';

// --- CÁC KIỂU DỮ LIỆU CƠ BẢN ---

/**
 * Kiểu dữ liệu cho một giao dịch chi tiết từ DynamoDB.
 */
export interface Transaction {
  TransactionID: string;
  UserID: string;
  Amount: number;
  Category: string;
  E_Score: number;
  CO2_Estimate: number;
  MerchantName: string;
  Timestamp: string; // Backend đã chuyển thành định dạng ISO 8601
  E_Score_Per_Transaction: number;
}

/**
 * Kiểu dữ liệu cho các loại điểm số và chỉ số tổng.
 * Giữ nguyên để tương thích với các phần khác của ứng dụng.
 */
export interface Scores {
  UserID: string;
  ES_Score: number;
  E_Score: number;
  S_Score: number;
  G_Score: number;
  TotalCO2: number;
  TotalExpenses: number;
}

/**
 * Kiểu dữ liệu cho một danh mục đã tổng hợp theo số tiền.
 * Giữ nguyên để tương thích với các phần khác của ứng dụng.
 */
export interface CategorySummary {
  category: string;
  totalAmount: number;
}


// --- CÁC KIỂU DỮ LIỆU CHO BIỂU ĐỒ (CARBON VIEW) ---

/**
 * Dữ liệu cho một lát cắt của biểu đồ tròn (Pie Chart).
 */
export interface PieChartCategory {
  name: string;
  percentage: number;
}

/**
 * Dữ liệu cho biểu đồ cột (Bar Chart).
 */
export interface BarChartData {
  labels: string[];
  data: number[];
}


// --- KIỂU DỮ LIỆU TỔNG HỢP TRẢ VỀ TỪ API ---

/**
 * Cấu trúc dữ liệu đầy đủ cho Dashboard, đã được hợp nhất.
 * Bao gồm cả dữ liệu cũ và dữ liệu mới cho màn hình Carbon.
 */
export interface DashboardData {
  /** Điểm số và các chỉ số tổng hợp */
  scores: Scores;
  
  /** Danh sách đầy đủ các giao dịch chi tiết */
  transactions_detail: Transaction[];
  
  /** Dữ liệu cho Pie Chart (CO2 theo danh mục) */
  co2_by_category: PieChartCategory[];
  
  /** Dữ liệu cho Bar Chart (CO2 theo 7 ngày giao dịch gần nhất) */
  bar_chart_data: BarChartData;
  
  /** Dữ liệu summary cũ, giữ lại dưới dạng optional để không ảnh hưởng đến các phần khác */
  transactions_summary?: CategorySummary[];
}


// --- HÀM GỌI API ---

/**
 * Lấy dữ liệu dashboard từ backend.
 * @param userId ID của người dùng cần lấy dữ liệu.
 * @returns Dữ liệu dashboard hoặc null nếu có lỗi.
 */
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
    
    const data = await response.json();
    return data as DashboardData; // Ép kiểu dữ liệu trả về

  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu dashboard:', error);
    return null;
  }
};