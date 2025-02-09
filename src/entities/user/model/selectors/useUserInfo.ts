import { useUserStore } from 'entities/user/model/store/useUserStore';

export const useUserInfo = () => {
    const { userName, userUniqueProducts } = useUserStore();

    return { userName, userUniqueProducts };
};
