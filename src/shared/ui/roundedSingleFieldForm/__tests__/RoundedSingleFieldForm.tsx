import { render, screen } from '@testing-library/react';
import noop from '../../../lib/noop/noop';
import RoundedSingleFieldForm from '../RoundedSingleFieldForm';

describe('RoundedSingleFieldForm', () => {
    test('Рендерится', () => {
        render(<RoundedSingleFieldForm onChange={noop} />);
        expect(screen.getByTestId('rounded-single-field-form')).toBeInTheDocument();
    });

    test('Когда вызывается без передачи текста для кнопки, кнопка имеет текст по умолчанию = "Продолжить"', () => {
        render(<RoundedSingleFieldForm onChange={noop} />);
        expect(screen.getByTestId('rounded-single-form-button')).toHaveTextContent('Продолжить');
    });

    test('Когда вызывается с текстом для кнопки, кнопка имеет установленный текст', () => {
        render(<RoundedSingleFieldForm buttonText="test text" onChange={noop} />);
        expect(screen.getByTestId('rounded-single-form-button')).toHaveTextContent('test text');
    });
});
