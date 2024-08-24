import { render, screen } from '@testing-library/react';
import RoundedSingleFieldForm from './RoundedSingleFieldForm';
import noop from '../../lib/noop/noop';

describe('RoundedSingleFieldForm', () => {
    test('Рендерится', () => {
        render(<RoundedSingleFieldForm onChange={noop} />);
        expect(screen.getByTestId('rounded-single-field-form')).toBeInTheDocument();
    });

    test('При передаче пропса redButton добавляет кнопке класс redButton', () => {
        render(<RoundedSingleFieldForm redButton onChange={noop} />);
        expect(screen.getByTestId('rounded-single-form-button')).toHaveClass('redButton');
    });

    test('Когда вызывается без передачи текста для кнопки, кнопка имеет текст по умолчанию = "Продолжить"', () => {
        render(<RoundedSingleFieldForm onChange={noop} />);
        expect(screen.getByTestId('rounded-single-form-button')).toHaveTextContent('Продолжить');
    });

    test('Когда вызывается с текстом для кнопки, кнопка имеет установленный текст', () => {
        render(<RoundedSingleFieldForm buttonText={'test text'} onChange={noop} />);
        expect(screen.getByTestId('rounded-single-form-button')).toHaveTextContent('test text');
    });
});
