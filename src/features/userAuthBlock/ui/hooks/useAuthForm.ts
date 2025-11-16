import { useAction } from '@reatom/npm-react';
import { ChangeEvent, useState } from 'react';
import { fetchUserInfo, userStoreAtom } from '@/entities/user';

export const useAuthForm = () => {
    const [userNickName, setUserNickName] = useState<string>('');
    const [errorText, setErrorText] = useState<string | null>(null);

    const handleSetUserInfo = useAction(userStoreAtom.setUserInfo);
    const handleEraseUserInfo = useAction(userStoreAtom.eraseUserInfo);

    const confirmForm = async () => {
        if (!userNickName.trim()) {
            setErrorText('Никнейм не может быть пустым');
            return;
        }

        try {
            const userInfo = await fetchUserInfo(userNickName.trim());
            setErrorText(null);
            handleSetUserInfo(userInfo);
        } catch {
            setErrorText('Пользователь не найден!');
        }
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => setUserNickName(event.target.value);

    const logout = () => {
        setUserNickName('');
        handleEraseUserInfo();
    };

    return { userNickName, errorText, confirmForm, handleInput, logout };
};
