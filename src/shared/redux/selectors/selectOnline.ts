import { createSelector } from '@reduxjs/toolkit';
import selectMainPagePart from 'shared/redux/selectors/selectMainPagePart';
import { OnlineDto } from 'app/types/api/apiTypesHelper';

const selectOnline = createSelector(selectMainPagePart, (mainPagePartState): OnlineDto => {
    return { online: mainPagePartState.online, max: mainPagePartState.max };
});

export default selectOnline;
