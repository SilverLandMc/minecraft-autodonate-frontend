import { erasePlayerInfo } from 'pages/MainPage/slices/mainPageSlice';
import fetchUserInfo from 'pages/MainPage/utils/fetchUserInfo';
import { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import classNames from 'shared/lib/aliases/classNames';
import noop from 'shared/lib/noop/noop';
import selectPlayerName from 'shared/redux/selectors/selectPlayerName';
import FailSafeImage from 'shared/ui/FailSafeImage/FailSafeImage';
import RoundedSingleFieldForm from 'shared/ui/RoundedSingleFieldForm/RoundedSingleFieldForm';
import Spacing from 'shared/ui/spacing/Spacing';
import defaultIcon from './images/defaultIcon.png';
import styles from './PlayerInfoBlock.module.scss';

interface Props {
    title?: string;
    className?: string;
    subheaderClassName?: string;
}

const PlayerInfoBlock: FunctionComponent<Props> = ({ title = 'Введите ваш ник:', className, subheaderClassName }) => {
    const [formValue, setFormValue] = useState<string>('');
    const [errorText, setErrorText] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const playerName = useSelector(selectPlayerName);

    const confirmForm = async () => {
        if (!formValue.trim()) {
            setErrorText('Ник не может быть пустым!');
            return;
        }

        try {
            await dispatch(fetchUserInfo(formValue.trim()));
            setErrorText(null);
        } catch (error) {
            setErrorText('Игрок не найден! Введите другой ник:');
        }
    };

    const eraseForm = () => {
        setFormValue('');
        dispatch(erasePlayerInfo());
    };

    if (playerName) {
        return (
            <div>
                <div className={styles.subheaderWrapper}>
                    <span className={subheaderClassName}>Ваш ник:</span>

                    <FailSafeImage
                        src={`https://mc-heads.net/avatar/${playerName}`}
                        fallbackSrc={defaultIcon}
                        className={styles.playerIcon}
                    />
                </div>

                <Spacing size={8} />

                <RoundedSingleFieldForm
                    value={playerName}
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
};

export default PlayerInfoBlock;
