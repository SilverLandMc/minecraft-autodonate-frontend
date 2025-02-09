import { useUserInfo } from 'entities/user';
import { useUserStoreActions } from 'entities/user/model/selectors/useUserStoreActions';
import { observer } from 'mobx-react-lite';
import fetchUserInfo from 'pages/mainPage/utils/fetchUserInfo';
import { FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import noop from 'shared/lib/noop/noop';
import FailSafeImage from 'shared/ui/failSafeImage/FailSafeImage';
import RoundedSingleFieldForm from 'shared/ui/roundedSingleFieldForm/RoundedSingleFieldForm';
import Spacing from 'shared/ui/spacing/Spacing';
import defaultIcon from './images/defaultIcon.png';
import styles from './PlayerInfoBlock.module.scss';

interface Props {
    title?: string;
    className?: string;
    subheaderClassName?: string;
}

const PlayerInfoBlock: FunctionComponent<Props> = observer(
    ({ title = 'Введите ваш ник:', className, subheaderClassName }) => {
        const [formValue, setFormValue] = useState<string>('');
        const [errorText, setErrorText] = useState<string | null>(null);

        const { setUserInfo, eraseUserInfo } = useUserStoreActions();
        const { userName } = useUserInfo();

        const confirmForm = async () => {
            if (!formValue.trim()) {
                setErrorText('Ник не может быть пустым!');
                return;
            }

            try {
                const userInfo = await fetchUserInfo(formValue.trim());
                setErrorText(null);
                setUserInfo(userInfo);
            } catch (error) {
                setErrorText('Игрок не найден! Введите другой ник:');
            }
        };

        const eraseForm = () => {
            setFormValue('');
            eraseUserInfo();
        };

        if (userName) {
            return (
                <div>
                    <div className={styles.subheaderWrapper}>
                        <span className={subheaderClassName}>Ваш ник:</span>

                        <FailSafeImage
                            src={`https://mc-heads.net/avatar/${userName}`}
                            fallbackSrc={defaultIcon}
                            className={styles.playerIcon}
                        />
                    </div>

                    <Spacing size={8} />

                    <RoundedSingleFieldForm
                        value={userName}
                        onChange={noop}
                        onButtonClick={eraseForm}
                        className={styles.nicknameForm}
                        buttonText="Выйти"
                        redButton
                        readonly
                    />
                </div>
            );
        }

        return (
            <div className={className}>
                {errorText ? (
                    <span className={classNames(subheaderClassName, styles.error)}>{errorText}</span>
                ) : (
                    <span className={subheaderClassName}>{title}</span>
                )}

                <Spacing size={8} />

                <RoundedSingleFieldForm
                    value={formValue}
                    onChange={setFormValue}
                    onButtonClick={confirmForm}
                    className={styles.nicknameForm}
                    placeholderText="Например, BrainRTP"
                    buttonText="Войти"
                />
            </div>
        );
    }
);

export default PlayerInfoBlock;
