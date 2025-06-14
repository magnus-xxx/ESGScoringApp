<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hướng dẫn Cài đặt & Sử dụng - Ứng dụng ESG</title>
    <style>
        /* --- General Styles --- */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            background-color: #f8f9fa;
            color: #343a40;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* --- Typography --- */
        h1, h2, h3 {
            color: #0C0D0F;
            font-weight: bold;
        }

        h1 {
            font-size: 32px;
            margin-bottom: 25px;
            text-align: center;
            color: #00D09E;
        }

        h2 {
            font-size: 24px;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 8px;
        }

        h3 {
            font-size: 20px;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            color: #666;
            margin-bottom: 10px;
        }

        a {
            color: #36A2EB;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* --- Components --- */
        .list-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
        }

        .list-item svg {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            margin-right: 12px;
            margin-top: 3px;
            color: #00D09E;
        }
        
        pre {
            background-color: #2d2d2d;
            color: #e0e0e0;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 14px;
        }

        code {
            font-family: 'Courier New', Courier, monospace;
        }
        
        .inline-code {
            background-color: #e0e0e0;
            color: #0C0D0F;
            padding: 3px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hướng dẫn Cài đặt & Sử dụng</h1>
        
        <h2>Giới thiệu</h2>
        <p>
            Đây là một ứng dụng di động được xây dựng bằng React Native (Expo) nhằm giúp người dùng theo dõi và cải thiện tác động đến môi trường, xã hội và quản trị (ESG). Ứng dụng phân tích các giao dịch chi tiêu để tính toán dấu chân carbon, chấm điểm ESG, và đề xuất các dự án xanh để bù đắp carbon.
        </p>

        <h2>Tính năng nổi bật</h2>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Dashboard Tổng quan điểm ESG, CO₂, và chi tiêu.</p>
        </div>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Phân tích Dấu chân Carbon theo danh mục và ngày.</p>
        </div>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Liệt kê chi tiết các giao dịch và điểm ESG tương ứng.</p>
        </div>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Giới thiệu dự án xanh để bù đắp Carbon.</p>
        </div>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Backend Serverless sử dụng AWS Lambda và DynamoDB.</p>
        </div>

        <h2>Công nghệ sử dụng</h2>
        <h3>Frontend</h3>
        <p>React Native, Expo, TypeScript, Expo Router, react-native-chart-kit.</p>
        <h3>Backend</h3>
        <p>AWS Lambda (Python), Amazon DynamoDB, Amazon API Gateway.</p>

        <h2>Yêu cầu môi trường</h2>
        <div class="list-item">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Node.js (phiên bản 18+)</p>
        </div>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Expo CLI</p>
        </div>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Python (phiên bản 3.9+)</p>
        </div>
        <div class="list-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <p>Tài khoản AWS và AWS CLI đã cấu hình.</p>
        </div>

        <h2>Cài đặt và Khởi chạy</h2>

        <h3>1. Cài đặt Backend (AWS)</h3>
        <p>
            a. <b>Tạo Bảng DynamoDB</b>: Bạn cần tạo 2 bảng là <code class="inline-code">Transactions_Table</code> (Primary Key: `TransactionID`) và <code class="inline-code">ESG_Scores_Table</code> (Primary Key: `UserID`).
        </p>
        <p>
            b. <b>Tạo Hàm Lambda</b>: Tạo một hàm Lambda với runtime Python 3.9, cấp quyền truy cập vào DynamoDB, sau đó dán code Python đã hoàn thiện vào và Deploy.
        </p>
        <p>
            c. <b>Tạo API Gateway</b>: Thêm một trigger "API Gateway" (HTTP API, Security: Open) cho hàm Lambda và sao chép lại URL của API endpoint.
        </p>
        
        <h3>2. Cài đặt Frontend (Expo App)</h3>
        <p>a. Tải mã nguồn từ GitHub:</p>
        <pre><code>git clone &lt;URL-GITHUB-CỦA-BẠN&gt;
cd &lt;TÊN-THƯ-MỤC-DỰ-ÁN&gt;</code></pre>
        
        <p>b. Cài đặt các gói phụ thuộc:</p>
        <pre><code>npm install</code></pre>
        
        <p>c. Cấu hình API Endpoint:</p>
        <p>Mở file <code class="inline-code">api/esg.ts</code> và thay thế URL trong biến <code class="inline-code">API_GATEWAY_URL</code> bằng URL bạn đã sao chép từ API Gateway.</p>
        
        <p>d. Chạy ứng dụng:</p>
        <pre><code>npx expo start</code></pre>
        <p>Dùng ứng dụng Expo Go trên điện thoại để quét mã QR.</p>
    </div>
</body>
</html>
