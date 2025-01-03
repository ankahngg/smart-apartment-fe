import axios from 'axios';

// Tạo instance của axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // URL gốc
    // timeout: 5000, // Thời gian chờ (5 giây)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để xử lý request
axiosInstance.interceptors.request.use(
    (config) => {
        // Nếu có token, thêm vào header Authorization
        const token = localStorage.getItem('accessToken');
        if (token && !config.url?.includes('/auth')) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor để xử lý response
let isAlertShown = false; // Biến cờ để kiểm soát việc hiển thị alert

axiosInstance.interceptors.response.use(
    (response) => {
        // Reset cờ khi nhận được phản hồi thành công
        isAlertShown = false;
        return response.data;
    },
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if (!isAlertShown) {
                isAlertShown = true; // Đặt cờ để không hiển thị alert lần nữa
                alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            }
        } else {
            console.error('API Error:', error.response || error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
