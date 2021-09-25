import testStore from '../../utils/testStore';

describe('Courses By Staff', () => {
  const expectedState = [
    {
      title: 'Example title'
    }
  ];
  const store = testStore();
  let newState = store.getState();
  it('Fetched All Courses By Staff', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_STAFFCOURSES_START' });
    newState = store.getState();
    expect(newState.staffCourseReducer.isLoading).toBe(true);
    expect(newState.staffCourseReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_STAFFCOURSES_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(newState.staffCourseReducer.coursesByStaffId.length).toBeGreaterThan(
      0
    );
    expect(newState.staffCourseReducer.isLoading).toBe(false);
    expect(newState.staffCourseReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({ type: 'FETCH_STAFFCOURSES_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.staffCourseReducer.isLoading).toBe(false);
    expect(newState.staffCourseReducer.error).toBe('whatever.');
  });
});
