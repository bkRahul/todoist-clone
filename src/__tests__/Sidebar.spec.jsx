import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { useSelectedProjectValue } from '../context';
import { Sidebar } from '../components/layout/Sidebar/Sidebar';

beforeEach(cleanup); //clean the DOM

//mock context implementation
jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: 'Office',
        projectId: '1',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),
}));

//define a test suite on the component
describe('<Sidebar />', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the <Sidebar /> component', () => {
    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('sidebar')).toBeTruthy();
  });

  it('renders the project section with active Project as Inbox on Click', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
      setSelectedProject: jest.fn(() => 'INBOX'),
    }));

    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('inbox')).toBeTruthy();

    fireEvent.click(queryByTestId('inbox'));
    expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
  });

  it('renders the project section with active Project as Inbox on keyDown', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
      setSelectedProject: jest.fn(() => 'INBOX'),
    }));

    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('inbox')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('inbox'));
    expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
  });

  it('renders the project section with active Project as Today on Click', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'TODAY',
      setSelectedProject: jest.fn(() => 'TODAY'),
    }));

    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('today')).toBeTruthy();

    fireEvent.click(queryByTestId('today'));
    expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
  });

  it('renders the project section with active Project as Today on keyDown', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'TODAY',
      setSelectedProject: jest.fn(() => 'TODAY'),
    }));

    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('today')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('today'));
    expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
  });

  it('renders the project section with active Project as Next Week on Click', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'NEXT_7_DAYS',
      setSelectedProject: jest.fn(() => 'NEXT_7_DAYS'),
    }));

    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('next_7')).toBeTruthy();

    fireEvent.click(queryByTestId('next_7'));
    expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
  });

  it('renders the project section with active Project as Next Week on keyDown', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'NEXT_7_DAYS',
      setSelectedProject: jest.fn(() => 'NEXT_7_DAYS'),
    }));

    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('next_7')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('next_7'));
    expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
  });

  it('toggles the Project section on click', () => {
    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('toggle-projects')).toBeTruthy();

    fireEvent.click(queryByTestId('toggle-projects'));
    expect(queryByTestId('sidebar-projects')).toBeFalsy();

    fireEvent.click(queryByTestId('toggle-projects'));
    expect(queryByTestId('sidebar-projects')).toBeTruthy();
  });

  it('toggles the Project section on keyDown', () => {
    const { queryByTestId } = render(<Sidebar />);

    expect(queryByTestId('toggle-projects')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('toggle-projects'));
    expect(queryByTestId('sidebar-projects')).toBeFalsy();

    fireEvent.keyDown(queryByTestId('toggle-projects'));
    expect(queryByTestId('sidebar-projects')).toBeTruthy();
  });
});
