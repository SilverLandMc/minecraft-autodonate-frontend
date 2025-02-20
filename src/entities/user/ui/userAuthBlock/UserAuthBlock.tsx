import { observer } from 'mobx-react-lite';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import Section from 'shared/ui/section/Section';
import { useUserInfo, useUserStoreActions } from '@/entities/user';
import { BackgroundColor, Input, ModernButton } from '@/shared/ui';
import Spacing from '@/shared/ui/spacing/Spacing';
import { fetchUserInfo } from '../../api/fetchUserInfo';
import styles from './UserAuthBlock.module.scss';

interface Props {
    title?: string;
    className?: string;
    standalone?: boolean;
}

export const UserAuthBlock: FunctionComponent<Props> = observer(
    ({ title = 'Введите ваш никнейм', className, standalone: isStandalone }) => {
        const [formValue, setFormValue] = useState<string>('');
        const [errorText, setErrorText] = useState<string | null>(null);

        const { setUserInfo, eraseUserInfo } = useUserStoreActions();
        const { userName } = useUserInfo();

        const confirmForm = async () => {
            if (!formValue.trim()) {
                setErrorText('Никнейм не может быть пустым');
                return;
            }

            try {
                const userInfo = await fetchUserInfo(formValue.trim());
                setErrorText(null);
                setUserInfo(userInfo);
            } catch (error) {
                setErrorText('Игрок не найден! Введите другой никнейм');
            }
        };

        const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
            setFormValue(event.target.value);
        };

        const logout = () => {
            setFormValue('');
            eraseUserInfo();
        };

        const anonymousContent = (
            <div className={styles.wrapper}>
                {errorText ? (
                    <span className={styles.redText}>{errorText}</span>
                ) : (
                    <h3 className={styles.title}>Введите ваш никнейм</h3>
                )}

                <div className={styles.controls}>
                    <Input value={formValue} onChange={handleInput} placeholder="Например, Kuplinov" />

                    <ModernButton className={styles.loginButton} background={BackgroundColor.RED} onClick={confirmForm}>
                        Войти
                    </ModernButton>
                </div>
            </div>
        );

        const authorizedContent = (
            <div className={styles.wrapper}>
                <h3 className={styles.title}>
                    Пользователь <b>{userName}</b>
                </h3>

                <div className={styles.logout} onClick={logout}>
                    Выйти
                </div>
            </div>
        );

        const content = userName ? authorizedContent : anonymousContent;

        if (isStandalone) {
            return (
                <Section className={styles.card}>
                    <Spacing size={24} />
                    {content}
                    <Spacing size={24} />
                </Section>
            );
        }

        return content;
    }
);
