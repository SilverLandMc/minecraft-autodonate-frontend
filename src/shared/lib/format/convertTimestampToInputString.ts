import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import TimeFormatString from 'shared/const/enum/timeFormatString';

const convertTimestampToInputString = (unixTime?: number) => {
    if (!unixTime) {
        return '';
    }

    return format(toZonedTime(unixTime, 'Asia/Yekaterinburg'), TimeFormatString.INPUT_ELEMENT);
};

export default convertTimestampToInputString;
