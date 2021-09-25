import testStore from '../../utils/testStore';

describe('STUDENT COURSE REDUCER', () => {
  const store = testStore();
  let newState = store.getState();
  const expectedState = {
    title: 'Example title'
  };

  it('FETCH_STUDENTCOURSES', () => {
    /// FETCH START
    store.dispatch({
      type: 'FETCH_STUDENTCOURSES_START'
    });
    newState = store.getState();
    expect(newState.studentCourseReducer.isLoading).toBe(true);
    expect(newState.studentCourseReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_STUDENTCOURSES_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.studentCourseReducer.courseByStudentId).length
    ).toBeGreaterThan(0);
    expect(newState.studentCourseReducer.isLoading).toBe(false);
    expect(newState.studentCourseReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({
      type: 'FETCH_STUDENTCOURSES_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentCourseReducer.isLoading).toBe(false);
    expect(newState.studentCourseReducer.error).toBe('whatever.');
  });
});
 