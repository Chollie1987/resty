import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from './App';

test('test input field for url', () => {
    render(<App />);

    const formInput = screen.getByTestId('formInput');

    fireEvent.change(formInput, {target: {value: 'http://google.com'}})
});