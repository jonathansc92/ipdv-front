import httpCommon from "@/http-common";

let url = '/api/users';

class UserService {
    async get() {
        return await httpCommon.http.get(url);
    }
    async create(data) {
        return await httpCommon.http.post(url, data);
    }
    async update(id, data) {
        return await httpCommon.http.put(`${url}/${id}`, data);
    }
    async delete(id) {
        return await httpCommon.http.delete(`${url}/${id}`);
    }
}
export default new UserService();
