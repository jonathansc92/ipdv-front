import httpCommon from "@/http-common";

let url = '/api/auth';

class AuthService {
    async login(data) {
        return await httpCommon.http.post(`${url}/login`, data);
    }
    async logout() {
        return await httpCommon.http.post(`${url}/logout`);
    }
}
export default new AuthService()
