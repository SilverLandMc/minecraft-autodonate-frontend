import { FunctionComponent, useState } from 'react';
import Spacing from 'shared/ui/spacing/Spacing';
import RoundedSingleFieldForm from 'shared/ui/RoundedSingleFieldForm/RoundedSingleFieldForm';
import useAppDispatch from 'shared/hooks/redux/useAppDispatch';
import selectPlayerName from 'shared/redux/selectors/selectPlayerName';
import { useSelector } from 'react-redux';
import fetchUserInfo from 'pages/MainPage/utils/fetchUserInfo';
import noop from 'shared/lib/noop/noop';
import { erasePlayerInfo } from 'pages/MainPage/slices/mainPageSlice';
import classNames from 'shared/lib/aliases/classNames';
import defaultIcon from './images/defaultIcon.png';
import styles from './PlayerInfoBlock.module.scss';
import FailSafeImage from 'shared/ui/FailSafeImage/FailSafeImage';

interface Props {
    subheaderClassName?: string;
}

const PlayerInfoBlock: FunctionComponent<Props> = ({ subheaderClassName }) => {
    const [formValue, setFormValue] = useState<string>('');
    const [hasError, setHasError] = useState(false);

    const dispatch = useAppDispatch();
    const playerName = useSelector(selectPlayerName);

    const confirmForm = async () => {
        try {
            await dispatch(fetchUserInfo(formValue));
            setHasError(false);
        } catch (error) {
            setHasError(true);
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
        <div>
            {hasError ? (
                <span className={classNames(subheaderClassName, styles.error)}>
                    Игрок не найден! Введите другой ник:
                </span>
            ) : (
                <span className={subheaderClassName}>Введите ваш ник:</span>
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
