import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox/Checkbox';

beforeEach(cleanup); //clean the DOM

//mock firebase implementation
jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

//group tests
describe('<Checkbox />', () => {
  it('renders the task checkbox', () => {
    const { queryByTestId } = render(
      <Checkbox id="1" task="Finish testing by Today" />
    );
    expect(queryByTestId('checkbox-action')).toBeTruthy();
  });

  it('renders the task checkbox and accepts a click', () => {
    const { queryByTestId } = render(
      <Checkbox id="1" task="Finish testing by Today" />
    );
    expect(queryByTestId('checkbox-action')).toBeTruthy();
    fireEvent.click(queryByTestId('checkbox-action'));
    //    expect(queryByTestId('checkbox-action').innerHTML).toEqual('1');
  });
});
