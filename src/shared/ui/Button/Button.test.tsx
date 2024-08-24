import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
    test('Рендерится', () => {
        render(<Button>Какая-то кнопка</Button>);
        expect(screen.getByText('Какая-то кнопка')).toBeInTheDocument();
    });
});
