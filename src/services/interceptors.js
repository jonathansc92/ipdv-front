import httpCommon from "@/http-common";
import TokenService from "@/services/TokenService";
import { authStore } from "@/stores/Auth";

const setup = () => {
    for (const instance in httpCommon) {
        httpCommon[instance].interceptors.request.use(
            (config) => {
                config.headers["Content-Type"] = "application/json";

                if (config.url !== '/api/login') {
                    const token = TokenService.getLocalAccessToken();

                    if (token) {
                        config.headers["Authorization"] = `Bearer ${token}`;
                    }
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        httpCommon[instance].interceptors.response.use(
            (res) => {
                return res;
            },
            async (error) => {
                const originalConfig = error.config;
                
                if (typeof originalConfig !== "undefined" && originalConfig.url !== "/api/login") {
                    console.log(error)
                    if (!error.response.status && !originalConfig._retry) {
                        console.log('oi')
                        await authStore().logout();

                        return httpCommon[instance](originalConfig);
                    }
                }

                return Promise.reject(error);
            }
        );
    }
};

export default setup;
