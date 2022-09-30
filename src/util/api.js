import request from "umi-request";

export default {

    // ===========================================系统管理=====================================

    // 系统管理--角色权限管理
    // 角色权限管理--获取权限列表 ---------------- 用户管理
    getPermissions(params) {
        return request.get('/uaa/admin/permissions', params);
    },
    // 角色权限管理--获取角色列表
    getRoles(params) {
        return request.get('/uaa/admin/roles', params);
    },
    // 角色权限管理--修改权限
    putPermissions(value, params) {
        return request.put(`/uaa/admin/roles/${value}/permissions`, { data: params })
    },

    // 系统管理--用户管理
    // 用户管理--获取角色和权限
    getAfterLogin(params) {
        return request.get('/uaa/admin/roles/after/login', params);
    },
    // 用户管理--获取左侧列表
    getDeptTree(params) {
        return request.get(`/uaa/admin/dept-tree/${params}`);
    },
    // 用户管理--下拉获取部门人员
    getUserTree(params) {
        return request.get(`/uaa/admin/user-tree/${params}`);
    },
    // 用户管理--点击获取人员信息
    getUsersMessage(params) {
        return request.get(`/uaa/admin/users/${params}`);
    },
    // 用户管理--提交人员表单
    putUsersById(params) {
        return request.put('/uaa/admin/users/by-id', { data: params });
    },
    // 用户管理--修改用户密码
    putResetPasswordInit(id, params) {
        return request.put(`/uaa/admin/account/reset-password/init/${id}`, { params: params });
    },
    // 用户管理-- 点击保存
    putUsersRoles(userName, params) {
        return request.put(`/uaa/admin/users/${userName}/roles`, { data: params });
    },
    // 用户管理--开关点击修改
    putUsersEnabled(params) {
        return request.put(`/uaa/admin/users/${params}/enabled`);
    },

    // ======================================任务管理=====================================
    // 任务管理 任务列表
    getTasks(params) {
        return request.get('/statistics/api/tasks', params);
    },

    // =====================================运行监控======================================
    // 运行监控--uaa
    getUaaHealth(params) {
        return request.get('/uaa/management/health', params);
    },
    // 运行监控--statistics
    getStatistics(params) {
        return request.get('/statistics/api/management/health', params);
    },
    // 运行监控--huayu/spider
    getHuayuSpider(params) {
        return request.get('/huayu-spider/api/management/health', params)
    },
    //运行监控--oa-bridge
    getOaBridge(params) {
        return request.get('/oa-bridge/api/management/health', params)
    },

    // ===========================================文件上传====================================
    // 文件上传--下载模板
    download(params) {
        return request.get('/statistics/api/static/高院改判发回案件上传文件模板.xls', params);
    },

    // ==========================================对象管理======================================
    // 获取法院部门人员列表
    targetsLogin(params) {
        return request.get('/statistics/api/targets/by-login', params)
    },
    // 修改对象信息
    amendTarget(id, params) {
        return request.put(`/statistics/api/target/${id}`, { data: params })
    },
    // 新增用户信息
    addTarget(params) {
        return request.post('/statistics/api/target', { data: params })
    },

    // ==============================================反查页=====================================
    // 反查页--获取列表信息
    postInverseQuery(params) {
        return request.post('/statistics/api/page/inverse-query', { data: params });
    },
    // 反查页--反查title
    getAtom(params) {
        return request.get(`/statistics/api/atom/${params}`);
    }
}