import { createSelector } from 'reselect';
import selectMainPagePart from 'shared/redux/selectors/selectMainPagePart';
import { MainPagePartState } from 'pages/MainPage/slices/mainPageSlice';

const selectPlayerName = createSelector(selectMainPagePart, (mainPagePartState: MainPagePartState) => {
    return mainPagePartState.playerName;
});

export default selectPlayerName;
