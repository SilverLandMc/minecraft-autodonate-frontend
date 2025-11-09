import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { TimeFormatString } from '@/shared/enums/timeFormatString';

export const convertTimestampToInputString = (unixTime?: number) => {
    if (!unixTime) {
        return '';
    }

    return format(toZonedTime(unixTime, 'Asia/Yekaterinburg'), TimeFormatString.INPUT_ELEMENT);
};
