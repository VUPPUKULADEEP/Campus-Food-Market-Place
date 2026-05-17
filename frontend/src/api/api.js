import axios from 'axios'

const api = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if(token) {
        config.headers.Authorization = 
            `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status == 401){
            try{
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`, {
                    refresh_token : refreshToken
                });

                const newAccessToken = response.data.access_token;
                console.log('new token set', newAccessToken);
                localStorage.setItem('access_token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            }
            catch(err){
                localStorage.clear()
                window.location.href('/signin');
            }
        }
        return Promise.reject(error);
    }
);

export default api