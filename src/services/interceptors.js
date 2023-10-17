import httpCommon from "@/http-common";
import TokenService from "@/services/TokenService";
import { authStore } from "@/stores/Auth";

const setup = () => {
    for (const instance in httpCommon) {
        httpCommon[instance].interceptors.request.use(
            (config) => {
                config.headers["Content-Type"] = "application/json";

                if (config.url !== '/api/auth/login') {
                    const token = TokenService.getLocalAccessToken();

                    if (token) {
                        config.headers["Authorization"] = `Bearer ${token}`;
                    }
                }

                console.log(config)

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

                if (typeof originalConfig !== "undefined" && originalConfig.url !== "/api/auth/login" && error.response) {
                    if (error.response.status === 401 && !originalConfig._retry) {
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
