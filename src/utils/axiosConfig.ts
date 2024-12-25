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
        const token = localStorage.getItem('token');
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
axiosInstance.interceptors.response.use(
    (response) => {
        // Xử lý dữ liệu từ response
        return response.data;
    },
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
