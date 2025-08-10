import { observer } from 'mobx-react-lite';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useUserInfo, useUserStoreActions } from '@/entities/user';
import classNames from '@/shared/lib/aliases/classNames';
import { BackgroundColor, Input, ModernButton, Optional, Section, Spacing } from '@/shared/ui';
import { fetchUserInfo } from '../../api/fetchUserInfo';
import styles from './UserAuthBlock.module.scss';

interface Props {
    standalone?: boolean;
    usedInCart?: boolean;
}

/**
 * Компонент "авторизации" пользователя по его нику на сервере.
 *
 * Предоставляет форму на одно поле и кнопку входа, если в `UserStore` нет информации о пользователе.
 * Если информация о пользователе есть, показывает имя пользователя и кнопку выхода.
 *
 * Вход не требует ничего, кроме имени пользователя, поскольку магазин приложения даёт только покупать товары
 * для определённого пользователя.
 *
 * @param {Props} props - объект аргументов компонента
 * @param {boolean} props.standalone - флаг применения компонента в отдельной карточке на главной странице
 * @param {boolean} props.usedInCart - флаг применения компонента в корзине
 */
export const UserAuthBlock: FunctionComponent<Props> = observer(
    ({ standalone: isStandalone, usedInCart: isUsedInCart }) => {
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
            } catch {
                setErrorText('Пользователь не найден!');
            }
        };

        const handleInput = (event: ChangeEvent<HTMLInputElement>) => setFormValue(event.target.value);

        const logout = () => {
            setFormValue('');
            eraseUserInfo();
        };

        const anonymousContent = (
            <div className={classNames(styles.wrapper, { [styles.usedInCart]: isUsedInCart })}>
                <Optional visible={!isUsedInCart}>
                    {errorText ? (
                        <span className={styles.redText}>{errorText}</span>
                    ) : (
                        <h3 className={styles.title}>Введите ваш никнейм</h3>
                    )}
                </Optional>

                <div className={styles.controls}>
                    <Input value={formValue} onChange={handleInput} placeholder="Например, Kuplinov" />

                    <ModernButton className={styles.loginButton} background={BackgroundColor.RED} onClick={confirmForm}>
                        Войти
                    </ModernButton>
                </div>

                <Optional visible={isUsedInCart && Boolean(errorText)}>
                    <span className={styles.redText}>{errorText}</span>
                </Optional>
            </div>
        );

        const authorizedContent = (
            <div className={classNames(styles.wrapper, { [styles.usedInCart]: isUsedInCart })}>
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
