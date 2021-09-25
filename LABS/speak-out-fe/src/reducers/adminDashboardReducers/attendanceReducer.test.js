import testStore from '../../utils/testStore';

describe('Attendance Reducer', () => {
  const expectedState = {
    title: 'Example title'
  };
  const store = testStore();
  let newState = store.getState();
  it('CREATES ATTENDANCE', () => {
    /// FETCH START
    store.dispatch({ type: 'CREATE_ATTENDANCE_START' });
    newState = store.getState();
    expect(newState.attendanceReducer.isLoading).toBe(true);
    expect(newState.attendanceReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'CREATE_ATTENDANCE_SUCCESS',
      payload: [expectedState]
    });
    newState = store.getState();
    expect(newState.attendanceReducer.studentByCourseId.length).toBeGreaterThan(
      0
    );
    expect(newState.attendanceReducer.isLoading).toBe(false);
    /// FETCH FAILED
    store.dispatch({ type: 'CREATE_ATTENDANCE_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.attendanceReducer.isLoading).toBe(false);
    expect(newState.attendanceReducer.error).toBe('whatever.');
  });
  it('FETCH ATTENDANCE', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_STUDENTATTENDANCE_START' });
    newState = store.getState();
    expect(newState.attendanceReducer.isLoading).toBe(true);
    expect(newState.attendanceReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_STUDENTATTENDANCE_SUCCESS',
      payload: [expectedState]
    });
    newState = store.getState();
    expect(newState.attendanceReducer.attendanceList.length).toBeGreaterThan(0);
    expect(newState.attendanceReducer.isLoading).toBe(false);

    /// FETCH FAILED
    store.dispatch({
      type: 'FETCH_STUDENTATTENDANCE_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.attendanceReducer.isLoading).toBe(false);
    expect(newState.attendanceReducer.error).toBe('whatever.');
  });
});
  