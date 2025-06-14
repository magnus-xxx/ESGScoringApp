Ứng dụng Chấm điểm ESG và Theo dõi Dấu chân Carbon
Đây là một ứng dụng di động được xây dựng bằng React Native (Expo) nhằm giúp người dùng theo dõi và cải thiện tác động đến môi trường, xã hội và quản trị (ESG). Ứng dụng phân tích các giao dịch chi tiêu để tính toán dấu chân carbon, chấm điểm ESG, và đề xuất các dự án xanh để bù đắp carbon.

Tính năng nổi bật
Dashboard Tổng quan: Hiển thị tổng quan điểm ESG, tổng lượng CO₂ phát thải và tổng chi tiêu.
Phân tích Dấu chân Carbon: Biểu đồ chi tiết về lượng CO₂ phát thải theo danh mục và theo ngày.
Danh sách Giao dịch: Liệt kê chi tiết các giao dịch và điểm ESG tương ứng cho mỗi giao dịch.
Bù đắp Carbon: Giới thiệu các dự án xanh và tính toán lượng CO₂ cần bù đắp.
Giao diện Hiện đại: Thiết kế sạch sẽ, tập trung vào trải nghiệm người dùng.
Backend Serverless: Hệ thống backend mạnh mẽ, linh hoạt sử dụng AWS Lambda và DynamoDB.
Hình ảnh Ứng dụng
(Bạn hãy chụp ảnh màn hình các trang trong ứng dụng của mình và thay thế các đường dẫn ảnh dưới đây)



Xuất sang Trang tính
Công nghệ sử dụng
Frontend:
React Native (với Expo)
TypeScript
Expo Router (để điều hướng)
react-native-chart-kit (để vẽ biểu đồ)
Backend:
AWS Lambda (Python 3.9+)
Amazon DynamoDB
Amazon API Gateway
Yêu cầu Môi trường
Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:

Node.js (phiên bản 18+)
Expo CLI: npm install -g expo-cli
Python (phiên bản 3.9+)
Tài khoản AWS
AWS CLI đã được cấu hình với quyền truy cập vào Lambda, DynamoDB, API Gateway.
Cài đặt và Khởi chạy
Dự án này bao gồm 2 phần: Backend (AWS) và Frontend (Expo App). Bạn cần cài đặt cả hai.

### 1. Cài đặt Backend (AWS)
a. Tạo Bảng DynamoDB:

Bạn cần tạo 2 bảng trên DynamoDB:

Transactions_Table:
Primary Key: TransactionID (Kiểu String)
Bảng này sẽ chứa toàn bộ giao dịch của người dùng.
ESG_Scores_Table:
Primary Key: UserID (Kiểu String)
Bảng này chứa điểm ESG tổng hợp của người dùng.
Mẹo: Bạn có thể vào DynamoDB và thêm một vài dữ liệu mẫu cho user0054e0 để kiểm tra.

b. Tạo Hàm AWS Lambda:

Truy cập dịch vụ AWS Lambda.
Nhấn Create function.
Chọn "Author from scratch".
Function name: Đặt tên cho hàm, ví dụ getDashboardData.
Runtime: Chọn Python 3.9 (hoặc phiên bản mới hơn).
Trong phần Permissions, chọn "Create a new role with basic Lambda permissions" hoặc chọn một role đã có. Quan trọng: Role này cần có quyền đọc/ghi trên 2 bảng DynamoDB bạn vừa tạo (DynamoDBFullAccess hoặc một policy tùy chỉnh chặt chẽ hơn).
Sau khi tạo hàm, vào tab Code, xóa code mẫu và dán toàn bộ nội dung file Python chúng ta đã hoàn thiện vào.
Nhấn Deploy.
c. Tạo API Gateway:

Trong trang cấu hình của hàm Lambda, vào tab Function overview, nhấn Add trigger.
Chọn API Gateway.
Chọn "Create a new API".
API type: Chọn HTTP API.
Security: Chọn Open.
Nhấn Add.
Sau khi tạo xong, bạn sẽ thấy một API endpoint URL. Hãy sao chép URL này, chúng ta sẽ cần nó cho frontend.
### 2. Cài đặt Frontend (Expo App)
a. Tải mã nguồn:

Bash

git clone <URL-GITHUB-CỦA-BẠN>
cd <TÊN-THƯ-MỤC-DỰ-ÁN>
b. Cài đặt các gói phụ thuộc:

Bash

npm install
# hoặc
yarn install
c. Cấu hình API Endpoint:

Mở file api/esg.ts.
Tìm đến dòng: const API_GATEWAY_URL = '...';
Thay thế URL placeholder bằng API endpoint URL bạn đã sao chép ở bước cài đặt backend.
d. Chạy ứng dụng:

Bash

npx expo start
Sau đó, dùng ứng dụng Expo Go trên điện thoại của bạn để quét mã QR và chạy ứng dụng.

Cấu trúc Thư mục
/
├── api/
│   └── esg.ts          # Chứa hàm gọi API và định nghĩa kiểu dữ liệu
├── app/
│   └── (tabs)/         # Chứa các màn hình chính của ứng dụng
│       ├── _layout.tsx
│       ├── dashboard.tsx
│       ├── carbon.tsx
│       └── compensation.tsx
├── assets/             # Chứa hình ảnh và fonts
├── components/         # Chứa các component tái sử dụng
└── ...
Đóng góp
Nếu bạn muốn đóng góp cho dự án, vui lòng tạo một Pull Request. Mọi sự đóng góp đều được chào đón!

Bản quyền
