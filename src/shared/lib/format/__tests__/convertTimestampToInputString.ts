import convertTimestampToInputString from 'shared/lib/format/convertTimestampToInputString';

describe('convertTimestampToInputString', () => {
    test('Форматирует таймштамп в корректную строку, поддерживаемую элементом input', () => {
        expect(convertTimestampToInputString(1711947420000)).toBe('2024-04-01T09:57');
        expect(convertTimestampToInputString(1712033760000)).toBe('2024-04-02T09:56');
    });

    test('Если таймштамп не предоставлен, вернёт пустую строку', () => {
        expect(convertTimestampToInputString()).toBe('');
    });
});
