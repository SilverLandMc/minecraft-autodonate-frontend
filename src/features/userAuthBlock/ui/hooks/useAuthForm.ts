import { ChangeEvent, useState } from 'react';
import { fetchUserInfo, useUserStoreActions } from '@/entities/user';

export const useAuthForm = () => {
    const [userNickName, setUserNickName] = useState<string>('');
    const [errorText, setErrorText] = useState<string | null>(null);

    const { setUserInfo, eraseUserInfo } = useUserStoreActions();

    const confirmForm = async () => {
        if (!userNickName.trim()) {
            setErrorText('Никнейм не может быть пустым');
            return;
        }

        try {
            const userInfo = await fetchUserInfo(userNickName.trim());
            setErrorText(null);
            setUserInfo(userInfo);
        } catch {
            setErrorText('Пользователь не найден!');
        }
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => setUserNickName(event.target.value);

    const logout = () => {
        setUserNickName('');
        eraseUserInfo();
    };

    return { userNickName, errorText, confirmForm, handleInput, logout };
};
