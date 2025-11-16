import { useEffect } from 'react';
import { adminStore } from '@/entities/admin';
import { createLogger } from '@/shared/lib/logger';
import { fetchAdminInfo } from '../../api/fetchAdminInfo';

const logger = createLogger('useAdminInfo');

export const useAdminInfo = () => {
    useEffect(() => {
        const checkAdmin = async () => {
            if (adminStore.isUserRequestFinished()) {
                return;
            }

            try {
                const { role, fullName, tgName } = await fetchAdminInfo();

                // todo Исправить после переезда авторизации на log / pass
                if (role === 'ADMIN') {
                    adminStore.setAdmin();
                }

                logger.info(`Авторизован как ${fullName} (${tgName}) с ролью ${role}`);
            } catch (error) {
                logger.error('An error during an attempt to authorize admin');
            } finally {
                adminStore.setUserRequestFinished();
            }
        };

        checkAdmin();
    }, []);
};
