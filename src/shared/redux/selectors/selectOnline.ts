import { MainPagePartState } from 'pages/MainPage/slices/mainPageSlice';
import { createSelector } from 'reselect';
import selectMainPagePart from 'shared/redux/selectors/selectMainPagePart';

const selectOnline = createSelector(selectMainPagePart, (mainPagePartState: MainPagePartState) => ({
    online: mainPagePartState.online,
    max: mainPagePartState.max,
    isLoaded: mainPagePartState.isLoaded
}));

export default selectOnline;
