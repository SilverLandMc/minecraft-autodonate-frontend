import { useUserStore } from 'entities/user/model/store/useUserStore';

export const useUserStoreActions = () => {
    const { setUserInfo, eraseUserInfo } = useUserStore();

    return { setUserInfo, eraseUserInfo };
};
