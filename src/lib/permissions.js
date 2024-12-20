export class Permissions {
    static permissions = {
        'faculty': [
            'student:view',
            'groups:view-my',
            'reports:view',
            'reports:manage',
            'personalInfo:view',
            'password:update'
        ],
        'coordinator': [
            'dashboard:view',
            'groups:view-my',
            'groups:view-all',
            'reports:view',
            'reports:manage',
            'personalInfo:view',
            'password:update',
            'dashboard:view',
            'faculty:view',
            'faculty:update',
            'faculty:delete',
            'faculty:create',
            'faculty:search',
            'student:view',
            'student:update',
            'student:delete',
            'student:create',
            'student:search',
            'assign:view',
            'assign:manage',
            'department:view',
            'department:update',
        ],
        'hod': [
            'dashboard:view',
            'groups:view-my',
            'groups:view-all',
            'reports:view',
            'reports:manage',
            'personalInfo:view',
            'password:update',
            'dashboard:view',
            'faculty:view',
            'faculty:update',
            'faculty:delete',
            'faculty:create',
            'faculty:search',
            'student:view',
            'student:update',
            'student:delete',
            'student:create',
            'student:search',
            'assign:view',
            'assign:manage',
            'department:view',
            'department:update',
        ]
    }

    static hasPermission(role, permission) {
        return this.permissions[role].includes(permission);
    }
}