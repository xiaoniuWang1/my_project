import request from "umi-request";

export default {

    // ===========================================系统管理=====================================

    // =============================== 部门管理 ===========================================
    // 获取部门信息
    getOrganizationsParentId(params) {
        return request.get('/api/admin/organizations');
    },

    // 修改部门信息 /organizations/418
    patchAmendOrganizations(id, params) {
        return request.patch(`/api/admin/organizations/${id}`, { data: params })
    },

    // 删除部门
    deleteOrganizations(id) {
        return request.delete(`/api/admin/organizations/${id}`);
    },

    // 部门添加
    addOrganization(params) {
        return request.post('/api/admin/organization', { data: params })
    },

    // ============================== 职务管理 =================================
    // 职务查询 http://172.16.5.158:7601/api/admin/sys-positions
    getSysPositions() {
        return request.get('/api/admin/sys-positions');
    },

    // 职务新增 http://172.16.5.158:7601/api/admin/sys-position
    postAddSysPositions(params) {
        return request.post('/api/admin/sys-position', { data: params });
    },

    // 职务修改 http://172.16.5.158:7601/api/admin/sys-positions/2
    patchAmendSysPosition(id, params) {
        return request.patch(`/api/admin/sys-positions/${id}`, { data: params })
    },

    // 职务删除 http://172.16.5.158:7601/api/admin/sys-positions/2
    deleteSysPositions(id, params) {
        return request.delete(`/api/admin/sys-positions/${id}`, { data: params })
    },

}