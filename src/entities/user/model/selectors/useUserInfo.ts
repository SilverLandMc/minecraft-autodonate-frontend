import { useUserStore } from '../store/useUserStore';

export const useUserInfo = () => {
    const { userName, userUniqueProducts } = useUserStore();

    return { userName, userUniqueProducts };
};
