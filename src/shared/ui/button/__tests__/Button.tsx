import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
    it('Рендерится', () => {
        render(<Button>Какая-то кнопка</Button>);
        expect(screen.getByText('Какая-то кнопка')).toBeInTheDocument();
    });
});
