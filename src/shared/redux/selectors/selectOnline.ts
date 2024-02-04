import { createSelector } from 'reselect';
import selectMainPagePart from 'shared/redux/selectors/selectMainPagePart';
import { MainPagePartState } from 'pages/MainPage/slices/mainPageSlice';

const selectOnline = createSelector(selectMainPagePart, (mainPagePartState: MainPagePartState) => {
    return { online: mainPagePartState.online, max: mainPagePartState.max, isLoaded: mainPagePartState.isLoaded };
});

export default selectOnline;
