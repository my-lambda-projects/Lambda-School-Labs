import testStore from '../../utils/testStore';

describe('Course Reducer', () => {
  const expectedState = {
    title: 'Example title'
  };
  const store = testStore();
  let newState = store.getState();
  it('FETCH COURSES', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_COURSES_START' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isLoading).toBe(true);
    expect(newState.coursesTableReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_COURSES_SUCCESS',
      payload: [expectedState]
    });
    newState = store.getState();
    expect(newState.coursesTableReducer.courseList.length).toBeGreaterThan(0);
    expect(newState.coursesTableReducer.isLoading).toBe(false);
    expect(newState.coursesTableReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({ type: 'FETCH_COURSES_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isLoading).toBe(false);
    expect(newState.coursesTableReducer.error).toBe('whatever.');
  });
  it('FETCH COURSE BY ID', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_COURSEBYID_START' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isLoading).toBe(true);
    expect(newState.coursesTableReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_COURSEBYID_SUCCESS',
      payload: { name: 'Random Object' }
    });
    newState = store.getState();
    expect(
      Object.keys(newState.coursesTableReducer.courseById).length
    ).toBeGreaterThan(0);
    expect(newState.coursesTableReducer.isLoading).toBe(false);
    expect(newState.coursesTableReducer.error).toBe(null);
    // expect(newState.coursesTableReducer.isEditing).toBe(false);
    // expect(newState.coursesTableReducer.isEdited).toBe(true);

    /// FETCH FAILED
    store.dispatch({ type: 'FETCH_COURSEBYID_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isLoading).toBe(false);
    expect(newState.coursesTableReducer.error).toBe('whatever.');
  });
  it('ADD COURSE', () => {
    /// FETCH START
    store.dispatch({ type: 'ADD_COURSE_START' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isLoading).toBe(true);
    expect(newState.coursesTableReducer.isPosting).toBe(true);
    expect(newState.coursesTableReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'ADD_COURSE_SUCCESS',
      payload: { name: 'Random Object' }
    });
    newState = store.getState();
    expect(newState.coursesTableReducer.courseList.length).toBeGreaterThan(0);
    expect(newState.coursesTableReducer.isLoading).toBe(false);
    expect(newState.coursesTableReducer.error).toBe(null);
    expect(newState.coursesTableReducer.isPosting).toBe(false);
    // expect(newState.coursesTableReducer.isEditing).toBe(false);
    // expect(newState.coursesTableReducer.isEdited).toBe(true);

    /// FETCH FAILED
    store.dispatch({ type: 'ADD_COURSE_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isLoading).toBe(false);
    expect(newState.coursesTableReducer.error).toBe('whatever.');
  });
  it('EDIT COURSE BY ID', () => {
    /// FETCH START
    store.dispatch({ type: 'EDIT_COURSEBYID_START' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isEditing).toBe(true);
    expect(newState.coursesTableReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'EDIT_COURSEBYID_CANCELLED'
    });
    newState = store.getState();
    expect(newState.coursesTableReducer.isEditing).toBe(false);
    expect(newState.coursesTableReducer.isEdited).toBe(false);
    // expect(newState.coursesTableReducer.isEditing).toBe(false);
    // expect(newState.coursesTableReducer.isEdited).toBe(true);

    store.dispatch({
      type: 'EDIT_COURSEBYID_SUCCESS',
      payload: { random: 'OBJECT' }
    });
    newState = store.getState();
    expect(newState.coursesTableReducer.isEditing).toBe(false);
    expect(newState.coursesTableReducer.isEdited).toBe(true);
    expect(
      Object.keys(newState.coursesTableReducer.courseById).length
    ).toBeGreaterThan(0);

    /// FETCH FAILED
    store.dispatch({ type: 'EDIT_COURSEBYID_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.coursesTableReducer.isLoading).toBe(false);
    expect(newState.coursesTableReducer.error).toBe('whatever.');
    expect(newState.coursesTableReducer.isEditing).toBe(false);
    expect(newState.coursesTableReducer.isEdited).toBe(false);
  });
  it('SET FITLER FOR COURSES', () => {
    store.dispatch({ type: 'SET_FILTER_COURSES', payload: 'Whatever.' });
    newState = store.getState();
    expect(newState.coursesTableReducer.searchTerm).toBe('Whatever.');
  });
});
