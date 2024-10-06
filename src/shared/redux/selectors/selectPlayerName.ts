import { MainPagePartState } from 'pages/MainPage/slices/mainPageSlice';
import { createSelector } from 'reselect';
import selectMainPagePart from 'shared/redux/selectors/selectMainPagePart';

const selectPlayerName = createSelector(
    selectMainPagePart,
    (mainPagePartState: MainPagePartState) => mainPagePartState.playerName
);

export default selectPlayerName;
