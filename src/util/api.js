import request from "umi-request";

export default {

    // ===========================================系统管理=====================================

    // =============================== 部门管理 ===========================================
    // 获取部门信息
    getOrganizationsParentId(params) {
        return request.get('/api/admin/organizations');
    },
    // 修改部门信息
    patchAmendOrganizations(id, params) {
        return request.patch(`/api/admin/organizations/${id}`, { data: params });
    },
    // 删除部门
    deleteOrganizations(id) {
        return request.delete(`/api/admin/organizations/${id}`);
    },
    // 部门添加
    addOrganization(params) {
        return request.post('/api/admin/organization', { data: params });
    },

    // ============================== 职务管理 =================================
    // 职务查询
    getSysPositions() {
        return request.get('/api/admin/sys-positions');
    },
    // 职务新增
    postAddSysPositions(params) {
        return request.post('/api/admin/sys-position', { data: params });
    },
    // 职务修改
    patchAmendSysPosition(id, params) {
        return request.patch(`/api/admin/sys-positions/${id}`, { data: params });
    },
    // 职务删除
    deleteSysPositions(id, params) {
        return request.delete(`/api/admin/sys-positions/${id}`, { data: params });
    },

    // =================================== 岗位管理 =============================
    // 岗位查询
    getJobs(page, size) {
        return request.get(`/api/admin/sys-jobs?page=${page}&size=${size}`);
    },
    // 岗位新增
    postJob(params) {
        return request.post('/api/admin/sys-jobs', { data: params });
    },
    // 岗位修改
    patchJob(id, params) {
        return request.patch(`/api/admin/sys-jobs/${id}`, { data: params });
    },
    // 岗位删除
    deleteJob(id) {
        return request.delete(`/api/admin/sys-jobs/${id}`);
    },

    // ===================================用户管理===============================
    // 用户查询
    getUserBasics() {
        return request.get('/api/admin/sys-user-basics');
    },
    // 添加用户
    postUserBasic(params) {
        return request.post('/api/admin/sys-user-basic', { data: params });
    },
    // 删除用户
    delUserBasics(id, params) {
        return request.delete(`/api/admin/sys-user-basics/${id}`, { data: params });
    },
    // 修改用户
    patchUserBasics(id, params) {
        return request.patch(`/api/admin/sys-user-basics/${id}`, { data: params });
    },
    // 根据部门ID查询用户http://172.16.5.158:7601/api/admin/sys-user-basics/Org/403
    getUserBasicsOrg(id) {
        return request.get(`/api/admin/sys-user-basics/Org/${id}`);
    },

    // =========================================== 菜单权限 ============================================
    // 角色管理
    // 角色 菜单查询
    getRolesmenus() {
        return request.get('/api/admin/sys-rolesmenus');
    },
    // 角色 菜单新增
    postRolesmenus(params) {
        return request.post('/api/admin/sys-rolesmenus', { data: params });
    },
    // 角色 菜单删除
    deleteRolesmenus(id, params) {
        return request.delete(`/api/admin/sys-rolesmenus/${id}`, { data: params });
    },
    // 角色 菜单修改
    pathRolesmenus(id, params) {
        return request.patch(`/api/admin/sys-rolesmenus/${id}`, { data: params });
    },
    // 点击角色 查看用户
    getRolesUser(id) {
        return request.get(`/admin/roles/user/${id}`);
    },

    // 菜单管理
    // 菜单查询
    getMenus(page, size) {
        return request.get(`/api/admin/sys-menus?page=${page}&size=${size}`);
    },
    // 菜单新增
    postMenus(params) {
        return request.post('/api/admin/sys-menu', { data: params });
    },
    // 菜单修改
    patchMenus(id, params) {
        return request.patch(`/api/admin/sys-menus/${id}`, { data: params });
    },
    // 菜单删除
    deleteMenus(id) {
        return request.delete(`/api/admin/sys-menus/${id}`)
    },

    // ====================角色管理==================
    // 用户
    // 查询角色
    getRoles() {
        return request.get('/admin/roles');
    },
    // 新增角色
    postRoles(params) {
        return request.post('/admin/roles', { data: params });
    },
    // 删除角色
    deleteRoles(id, params) {
        return request.delete(`/admin/roles/${id}`, { data: params });
    },
    // 修改角色
    putRoles(id, params) {
        return request.put(`/admin/roles/${id}`, { data: params });
    },
    // 给角色新增用户
    putRoleUser(id, params) {
        return request.put(`/admin/users/${id}/users`, { data: params });
    },

    // 菜单
    // 点击查询角色菜单权限
    getSysRolemenuRoleId(id) {
        return request.get(`/api/admin/sys-rolemenu/roleId/${id}`);
    },
    // 保存角色的菜单权限
    putUserMenu(id, params) {
        return request.put(`/api/admin/users/${id}/menu`, { data: params })
    },

    // 权限
    // 点击角色查看角色的权限
    getRolesPower(id) {
        return request.get(`/admin/roles/${id}`);
    },
    // 给角色添加或删除权限
    putRolesPemissions(id, params) {
        return request.put(`/admin/roles/${id}/permissions`, { data: params });
    },

    // 权限管理
    // 权限查询
    getPermissions() {
        return request.get('/admin/permissions');
    },

}