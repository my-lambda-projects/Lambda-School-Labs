import testStore from '../../utils/testStore';

describe('STUDENT COURSE REDUCER', () => {
  const store = testStore();
  let newState = store.getState();
  const expectedState = {
    title: 'Example title'
  };

  it('FETCH_STUDENTBYID', () => {
    /// FETCH START
    store.dispatch({
      type: 'FETCH_STUDENTBYID_START'
    });
    newState = store.getState();
    expect(newState.studentByIdReducer.isLoading).toBe(true);
    expect(newState.studentByIdReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_STUDENTBYID_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.studentByIdReducer.studentById).length
    ).toBeGreaterThan(0);
    expect(newState.studentByIdReducer.isLoading).toBe(false);
    expect(newState.studentByIdReducer.fetching).toBe(true);

    /// FETCH FAILED
    store.dispatch({
      type: 'FETCH_STUDENTBYID_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentByIdReducer.isLoading).toBe(false);
    expect(newState.studentByIdReducer.error).toBe('whatever.');
  });

  it('EDIT_STUDENTBYID', () => {
    /// FETCH START
    store.dispatch({
      type: 'EDIT_STUDENTBYID_START'
    });
    newState = store.getState();
    expect(newState.studentByIdReducer.isEditing).toBe(true);
    expect(newState.studentByIdReducer.error).toBe(null);

    // CANCELLED
    store.dispatch({
      type: 'EDIT_STUDENTBYID_CANCELLED'
    });
    newState = store.getState();
    expect(newState.studentByIdReducer.isEditing).toBe(false);
    expect(newState.studentByIdReducer.isEdited).toBe(false);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'EDIT_STUDENTBYID_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.studentByIdReducer.studentById).length
    ).toBeGreaterThan(0);
    expect(newState.studentByIdReducer.isEditing).toBe(false);
    expect(newState.studentByIdReducer.isEdited).toBe(true);
    expect(newState.studentByIdReducer.fetching).toBe(true);

    /// FETCH FAILED
    store.dispatch({
      type: 'EDIT_STUDENTBYID_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentByIdReducer.isLoading).toBe(false);
    expect(newState.studentByIdReducer.isEditing).toBe(true);
    expect(newState.studentByIdReducer.isEdited).toBe(false);
    expect(newState.studentByIdReducer.error).toBe('whatever.');
  });

  it('DELETE_STUDENTBYID', () => {
    /// FETCH START
    store.dispatch({
      type: 'DELETE_STUDENTBYID_START'
    });
    newState = store.getState();
    expect(newState.studentByIdReducer.isLoading).toBe(true);
    expect(newState.studentByIdReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'DELETE_STUDENTBYID_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.studentByIdReducer.studentById).length
    ).toBeGreaterThan(0);
    expect(newState.studentByIdReducer.isLoading).toBe(false);

    /// FETCH FAILED
    store.dispatch({
      type: 'DELETE_STUDENTBYID_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.studentByIdReducer.isLoading).toBe(false);
    expect(newState.studentByIdReducer.error).toBe('whatever.');
  });
});
 