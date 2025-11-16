import { useAction, useAtom } from '@reatom/npm-react';
import { useEffect } from 'react';
import { adminStore } from '@/entities/admin';
import { createLogger } from '@/shared/lib/logger';
import { fetchAdminInfo } from '../../api/fetchAdminInfo';

const logger = createLogger('useAdminInfo');

export const useAdminInfo = () => {
    const [isUserRequestFinished] = useAtom(adminStore.isUserRequestFinished);
    const handleSetAdmin = useAction(adminStore.setAdmin);
    const handleSetUserRequestFinished = useAction(adminStore.setUserRequestFinished);

    useEffect(() => {
        const checkAdmin = async () => {
            if (isUserRequestFinished) {
                return;
            }

            try {
                const { role, fullName, tgName } = await fetchAdminInfo();

                // todo Исправить после переезда авторизации на log / pass
                if (role === 'ADMIN') {
                    handleSetAdmin();
                }

                logger.info(`Авторизован как ${fullName} (${tgName}) с ролью ${role}`);
            } catch (error) {
                logger.error('An error during an attempt to authorize admin');
            } finally {
                handleSetUserRequestFinished();
            }
        };

        checkAdmin();
    }, [isUserRequestFinished, handleSetAdmin, handleSetUserRequestFinished]);
};
