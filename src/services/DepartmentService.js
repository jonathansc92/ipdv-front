import httpCommon from "@/http-common";

let url = '/api/departments';

class DepartmentService {
    async get() {
        return await httpCommon.http.get(`${url}`);
    }
    // async logout() {
    //     return await httpCommon.http.post(`${url}/logout`);
    // }
}
export default new DepartmentService()
