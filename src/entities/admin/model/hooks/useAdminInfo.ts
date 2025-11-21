import { useEffect } from 'react';
import { adminStore } from '@/entities/admin';
import { createLogger } from '@/shared/lib/logger';
import { fetchAdminInfo } from '../../api/fetchAdminInfo';

const logger = createLogger('useAdminInfo');

export const useAdminInfo = () => {
    const { isUserRequestFinished, setUserRequestFinished, setAdmin } = adminStore;

    useEffect(() => {
        const checkAdmin = async () => {
            if (isUserRequestFinished) {
                return;
            }

            try {
                const { role, fullName, tgName } = await fetchAdminInfo();

                // todo Исправить после переезда авторизации на log / pass
                if (role === 'ADMIN') {
                    setAdmin();
                }

                logger.info(`Авторизован как ${fullName} (${tgName}) с ролью ${role}`);
            } catch (error) {
                logger.error('An error during an attempt to authorize admin');
            } finally {
                setUserRequestFinished();
            }
        };

        checkAdmin();
    }, [isUserRequestFinished, setUserRequestFinished, setAdmin]);
};
