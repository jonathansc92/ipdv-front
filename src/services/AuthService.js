import httpCommon from "@/http-common";

let url = '/api/auth';

class AuthService {
    async login(data) {
        return await httpCommon.http.post(`${url}/login`, data);
    }
}
export default new AuthService()
