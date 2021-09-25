import testStore from '../../utils/testStore';

describe('Student Table Reducer', () => {
  const store = testStore();
  let newState = store.getState();

  it('Fetched Student', () => {
    const expectedState = [
      {
        title: 'Example title'
      }
    ];
    /// FETCH START
    store.dispatch({ type: 'FETCH_STUDENTS_START', payload: expectedState });
    newState = store.getState();
    expect(newState.studentTableReducer.listIsLoading).toBe(true);
    expect(newState.studentTableReducer.listError).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: expectedState });
    newState = store.getState();
    expect(newState.studentTableReducer.studentList.length).toBeGreaterThan(0);
    expect(newState.studentTableReducer.listIsLoading).toBe(false);
    expect(newState.studentTableReducer.listError).toBe(null);

    /// FETCH FAILED
    store.dispatch({ type: 'FETCH_STUDENTS_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.studentTableReducer.listIsLoading).toBe(false);
    expect(newState.studentTableReducer.listError).toBe('whatever.');
  });

  it('Filter Student', () => {
    /// SET_FILTER_STUDENT
    store.dispatch({ type: 'SET_FILTER_STUDENT', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.studentTableReducer.searchTerm).toBe('whatever.');
  });

  it('CREATES STUDENT', () => {
    const expectedState = {
      title: 'Example title'
    };
    /// FETCH START
    store.dispatch({
      type: 'CREATE_NEW_STUDENT_START',
      payload: expectedState
    });
    newState = store.getState();
    expect(newState.studentTableReducer.createNewStudentIsLoading).toBe(true);
    /// FETCH SUCCESS
    store.dispatch({
      type: 'CREATE_NEW_STUDENT_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(newState.studentTableReducer.studentList.length).toBeGreaterThan(0);
    expect(newState.studentTableReducer.createNewStudentIsLoading).toBe(false);
    expect(newState.studentTableReducer.createNewStudentSuccessMessage).toBe(
      'Student has been successfuly added'
    );
    expect(newState.studentTableReducer.studentList.length).toBeGreaterThan(0);

    /// FETCH FAILED
    store.dispatch({
      type: 'CREATE_NEW_STUDENT_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentTableReducer.createNewStudentError).toBe(
      'Something went wrong'
    );
  });
  it('RESET FORMS', () => {
    /// FETCH START
    store.dispatch({
      type: 'RESET_FORM'
    });
    newState = store.getState();
    expect(Object.keys(newState.studentTableReducer.studentById).length).toBe(
      0
    );
  });
});
