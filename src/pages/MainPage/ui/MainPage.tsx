import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Section from 'shared/ui/Section/Section';
import styles from './MainPage.module.scss';
import Spacing from 'shared/ui/spacing/Spacing';

interface MainPageProps {
    className?: string;
}

const MainPage: FunctionComponent<MainPageProps> = ({ className }: MainPageProps) => {
    return (
        <div className={classNames(styles.mainPage, {}, [className])}>
            <Section className={styles.section}>
                <div className={styles.innerWrapper}>
                    <p className={styles.textBlock}>
                        Привет всем поклонникам Minecraft! Приглашаем вас на&nbsp;удивительный и&nbsp;уникальный сервер
                        Minecraft, созданный самим знаменитым ютуб-летсплеером SilverHand! Это не&nbsp;просто сервер,
                        это целый мир приключений, где каждый найдет занятие по&nbsp;душе. От&nbsp;огромных городов
                        до&nbsp;таинственных подземелий, каждый уголок нашего сервера наполнен сюрпризами
                        и&nbsp;захватывающими заданиями, созданными лично SilverHand. Почувствуйте себя настоящими
                        героями в&nbsp;мире, где ваша смекалка и&nbsp;креативность&nbsp;&mdash; ключ к&nbsp;успеху!
                    </p>

                    <Spacing size={15} />

                    <p className={styles.textBlock}>
                        Не&nbsp;пропустите шанс стать частью легендарного сообщества. Помимо классического выживания
                        и&nbsp;строительства, на&nbsp;сервере вас ждут уникальные мини-игры и&nbsp;события,
                        разработанные SilverHand и&nbsp;его командой. Присоединяйтесь к&nbsp;захватывающим
                        PvP-сражениям, участвуйте в&nbsp;масштабных строительных проектах или&nbsp;же создайте свой
                        собственный шедевр, который увидит весь сервер. Ваше творчество и&nbsp;умения могут принести вам
                        славу и&nbsp;признание среди других игроков!
                    </p>

                    <Spacing size={15} />

                    <p className={styles.textBlock}>
                        И&nbsp;самое главное&nbsp;&mdash; на&nbsp;сервере SilverHand вы&nbsp;не&nbsp;просто играете,
                        вы&nbsp;становитесь частью дружного сообщества. Общайтесь, дружите и&nbsp;сотрудничайте
                        с&nbsp;другими игроками, обменивайтесь идеями и&nbsp;стратегиями. SilverHand часто
                        присоединяется к&nbsp;игре, делится советами и&nbsp;даже устраивает эксклюзивные мероприятия для
                        участников сервера. Не&nbsp;упустите свой шанс играть вместе с&nbsp;легендой и&nbsp;стать частью
                        захватывающего мира Minecraft на&nbsp;сервере SilverHand!
                    </p>
                </div>
            </Section>
        </div>
    );
};

export default MainPage;
