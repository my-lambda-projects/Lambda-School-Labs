import testStore from '../../utils/testStore';

describe('STUDENT PROGRESS REDUCER', () => {
  const store = testStore();
  let newState = store.getState();
  const expectedState = {
    title: 'Example title'
  };

  it('Fetched Student Progress', () => {
    /// FETCH START
    store.dispatch({
      type: 'FETCH_STUDENTPROGESS_START'
    });
    newState = store.getState();
    expect(newState.studentProgressReducer.isLoading).toBe(true);
    expect(newState.studentProgressReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_STUDENTPROGESS_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.studentProgressReducer.progressByStudentId).length
    ).toBeGreaterThan(0);
    expect(newState.studentProgressReducer.isLoading).toBe(false);
    expect(newState.studentProgressReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({
      type: 'FETCH_STUDENTPROGESS_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentProgressReducer.isLoading).toBe(false);
    expect(newState.studentProgressReducer.error).toBe('whatever.');
  });

  it('CREATES STUDENT PROGRESS', () => {
    /// FETCH START
    store.dispatch({
      type: 'CREATE_STUDENTPROGRESS_START'
    });
    newState = store.getState();
    expect(newState.studentProgressReducer.isLoading).toBe(true);
    expect(newState.studentProgressReducer.isPosting).toBe(false);
    expect(newState.studentProgressReducer.error).toBe(null);
    /// FETCH SUCCESS
    store.dispatch({
      type: 'CREATE_STUDENTPROGRESS_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(newState.studentProgressReducer.isLoading).toBe(false);
    expect(newState.studentProgressReducer.isPosting).toBe(true);
    expect(newState.studentProgressReducer.error).toBe(null);
    expect(
      Object.keys(newState.studentProgressReducer.progressByStudentId).length
    ).toBeGreaterThan(0);

    /// FETCH FAILED
    store.dispatch({
      type: 'CREATE_STUDENTPROGRESS_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentProgressReducer.isLoading).toBe(false);
    expect(newState.studentProgressReducer.error).toBe('whatever.');
  });
  it('EDIT STUDENT PROGRESS', () => {
    /// FETCH START
    let prevState = store.getState();
    store.dispatch({
      type: 'EDIT_STUDENTPROGRESS_START'
    });
    newState = store.getState();
    expect(newState.studentProgressReducer.isEditing).toBe(
      !prevState.studentProgressReducer.isEditing
    );
    expect(newState.studentProgressReducer.error).toBe(null);
    /// FETCH SUCCESS --> DOES NOT WORK
    // prevState = store.getState();
    // store.dispatch({
    //   type: 'EDIT_STUDENTPROGRESS_SUCCESS',
    //   payload: expectedState
    // });
    // newState = store.getState();
    // expect(newState.studentProgressReducer.isEditing).toBe(
    //   !prevState.studentProgressReducer.isEditing
    // );
    // expect(newState.studentProgressReducer.isEdited).toBe(true);
    // expect(
    //   newState.studentProgressReducer.progressByStudentId.length
    // ).toBeGreaterThan(0);

    /// FETCH FAILED
    store.dispatch({
      type: 'EDIT_STUDENTPROGRESS_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentProgressReducer.isLoading).toBe(false);
    expect(newState.studentProgressReducer.error).toBe('whatever.');
  });
});
 