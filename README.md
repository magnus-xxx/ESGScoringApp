**Ứng dụng Chấm điểm ESG và Theo dõi Dấu chân Carbon**

Đây là một ứng dụng di động được xây dựng bằng React Native (Expo) nhằm giúp người dùng theo dõi và cải thiện tác động đến môi trường, xã hội và quản trị (ESG). Ứng dụng phân tích các giao dịch chi tiêu để tính toán dấu chân carbon, chấm điểm ESG, và đề xuất các dự án xanh để bù đắp carbon.

**Tính năng nổi bật**
- Dashboard Tổng quan: Hiển thị tổng quan điểm ESG, tổng lượng CO₂ phát thải và tổng chi tiêu.
- Phân tích Dấu chân Carbon: Biểu đồ chi tiết về lượng CO₂ phát thải theo danh mục và theo ngày.
- Danh sách Giao dịch: Liệt kê chi tiết các giao dịch và điểm ESG tương ứng cho mỗi giao dịch.
- Bù đắp Carbon: Giới thiệu các dự án xanh và tính toán lượng CO₂ cần bù đắp.
- Backend Serverless: Hệ thống backend mạnh mẽ, linh hoạt sử dụng AWS Lambda, DynamoDB và API Gateway.
  
**Hình ảnh Ứng dụng**
![Screenshot_20250614_193307_Expo Go](https://github.com/user-attachments/assets/68c0ada5-edd2-4c7a-8bcd-4a4ff701136f)
![Screenshot_20250614_193325_Expo Go](https://github.com/user-attachments/assets/a2d246a2-1229-4740-a993-610f23642bcd)
![Screenshot_20250614_193332_Expo Go](https://github.com/user-attachments/assets/1b5e7cf8-fb06-4869-ba11-ea89a65281ee)


**Công nghệ sử dụng**
- Frontend:
  + React Native (với Expo)
  + TypeScript
  + Expo Router (để điều hướng)
  + react-native-chart-kit (để vẽ biểu đồ)
- Backend:
  + AWS Lambda (Python 3.9+)
  + Amazon DynamoDB
  + Amazon API Gateway
    
**Yêu cầu Môi trường**
Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:
- Node.js (phiên bản 18+)
- Expo CLI: npm install -g expo-cli
- Python (phiên bản 3.9+)
- Tài khoản AWS
- AWS CLI đã được cấu hình với quyền truy cập vào Lambda, DynamoDB, API Gateway.
