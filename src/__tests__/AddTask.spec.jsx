import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { AddTask } from '../components/Tasks/AddTask/AddTask';
import { useSelectedProjectValue } from '../context';

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
        docId: 'rahul',
      },
    ],
  })),
}));

//mock firebase implementation
jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Dont know what im doing')),
      })),
    })),
  },
}));

//define a test suite on the component
describe('<Addtask/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the <AddTask /> component', () => {
    const { queryByTestId } = render(<AddTask />);

    expect(queryByTestId('add-task-comp')).toBeTruthy();
  });

  it('renders <AddTask/> with the quick add task modal ', () => {
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={false}
        showQuickAddTask={true}
        setShowQuickAddTask={jest.fn()}
      />
    );

    expect(
      queryByTestId('add-task').classList.contains('add-task__overlay')
    ).toBeTruthy();
  });

  it('renders <AddTask /> main with Project and Task date dropdown', () => {
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={false}
        setShowQuickAddTask={jest.fn()}
      />
    );
    fireEvent.click(queryByTestId('show-main-add-task'));

    expect(
      queryByTestId('add-task').classList.contains('add-task__main')
    ).toBeTruthy();

    expect(queryByTestId('add-task__project')).toBeTruthy();
    expect(queryByTestId('add-task__date')).toBeTruthy();
  });

  // it('renders the project list dropdown on click', () => {
  //   const { queryByTestId } = render(
  //     <AddTask
  //       showAddTaskMain={true}
  //       shouldShowMain={false}
  //       showQuickAddTask={false}
  //       setShowQuickAddTask={jest.fn()}
  //     />
  //   );

  //   fireEvent.click(queryByTestId('show-main-add-task'));
  //   fireEvent.click(queryByTestId('add-task__project'));
  //   // expect(
  //   //   queryByTestId('add-task').classList.contains('add-task__main')
  //   // ).toBeTruthy();
  // });

  // task date dropdown is left

  // it('renders the task date overlay ', () => {
  //   const { queryByTestId, debug } = render(
  //     <AddTask
  //       showAddTaskMain={true}
  //       shouldShowMain={false}
  //       showQuickAddTask={false}
  //       setShowQuickAddTask={jest.fn()}
  //     />
  //   );
  //   debug();
  //   fireEvent.click(queryByTestId('show-task-date-overlay'));
  //   expect(
  //     queryByTestId('add-task').classList.contains('add-task__main')
  //   ).toBeTruthy();
  // });

  it('closes the <AddTask/> main when cancel is clicked', () => {
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={false}
        setShowQuickAddTask={jest.fn()}
      />
    );

    fireEvent.click(queryByTestId('show-main-add-task'));
    expect(queryByTestId('add-task')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-main-cancel'));
    expect(queryByTestId('add-task')).toBeFalsy();
  });

  it('closes the quick <AddTask /> when cancel is clicked', () => {
    //mock setShowQuickAddTask function
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    //pass the setShowQuickAddTask mock function
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={false}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );

    expect(
      queryByTestId('add-task').classList.contains('add-task__overlay')
    ).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-quick-cancel'));
    //expect setShowQuickAddTask to be called
    expect(setShowQuickAddTask).toHaveBeenCalledTimes(1);

    //after clicking add-task-quick-cancel --- add-task should close
    //    expect(queryByTestId('add-task')).toBeFalsy();
  });

  it('renders <AddTask /> and adds task to INBOX', () => {
    //mock setShowQuickAddTask function
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
    }));
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );

    fireEvent.click(queryByTestId('show-main-add-task'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am a new INBOX Task ' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am a new INBOX Task '
    );

    fireEvent.click(queryByTestId('add-task-button'));
    expect(setShowQuickAddTask).toHaveBeenCalledTimes(1);

    //after clicking add-task-button --- add-task should close
    //    expect(queryByTestId('add-task')).toBeFalsy();
  });

  it('renders <AddTask /> and adds task to TODAY', () => {
    //mock setShowQuickAddTask function
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'TODAY',
    }));
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );

    fireEvent.click(queryByTestId('show-main-add-task'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am a new TODAY Task ' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am a new TODAY Task '
    );

    fireEvent.click(queryByTestId('add-task-button'));
    expect(setShowQuickAddTask).toHaveBeenCalledTimes(1);

    //after clicking add-task-button --- add-task should close
    //    expect(queryByTestId('add-task')).toBeFalsy();
  });

  it('renders <AddTask /> and adds task to NEXT_7_DAYS', () => {
    //mock setShowQuickAddTask function
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'NEXT_7_DAYS',
    }));
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );

    fireEvent.click(queryByTestId('show-main-add-task'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am a new NEXT_7_DAYS Task ' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am a new NEXT_7_DAYS Task '
    );

    fireEvent.click(queryByTestId('add-task-button'));
    expect(setShowQuickAddTask).toHaveBeenCalledTimes(1);

    //after clicking add-task-button --- add-task should close
    //    expect(queryByTestId('add-task')).toBeFalsy();
  });

  it('renders <AddTask /> main and adds task with project', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={false}
        setShowQuickAddTask={jest.fn()}
      />
    );

    fireEvent.click(queryByTestId('show-main-add-task'));
    expect(queryByTestId('add-task')).toBeTruthy();
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am a new Task ' },
    });
    expect(queryByTestId('add-task-content').value).toBe('I am a new Task ');

    expect(queryByTestId('add-task__project')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task__project'));
    expect(queryByTestId('add-task__project--container')).toBeTruthy();
    //api calls left where options.map have to write test cases for that

    fireEvent.click(queryByTestId('add-task-button'));
  });

  it('renders <AddTask/> with the quick add task background overlay ', () => {
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={false}
        showQuickAddTask={true}
        setShowQuickAddTask={jest.fn()}
      />
    );

    expect(
      queryByTestId('add-task-comp').classList.contains('task-overlay')
    ).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-comp'));
  });
});
