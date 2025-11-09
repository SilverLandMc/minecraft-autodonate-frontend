import { request } from '@/shared/lib/request/request';

export const fetchAdminInfo = async () => {
    // todo Исправить после переезда авторизации на log / pass
    const { role, tgName, fullName } = await request<any>({
        url: '/admin/user/me'
    });

    return { role, tgName, fullName };
};
