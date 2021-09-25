import testStore from '../../utils/testStore';

describe('Staff By ID Reducer', () => {
  const expectedState = {
    title: 'Example title'
  };
  const store = testStore();
  let newState = store.getState();
  it('FETCH STAFF BY ID', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_STAFFBYID_START' });
    newState = store.getState();
    expect(newState.staffByIdReducer.isLoading).toBe(true);
    expect(newState.staffByIdReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_STAFFBYID_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.staffByIdReducer.staffById).length
    ).toBeGreaterThan(0);
    expect(newState.staffByIdReducer.isLoading).toBe(false);
    expect(newState.staffByIdReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({ type: 'FETCH_STAFFBYID_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.staffByIdReducer.isLoading).toBe(false);
    expect(newState.staffByIdReducer.error).toBe('whatever.');
  });
  it('EDIT FETCH STAFF BY ID', () => {
    /// FETCH START
    store.dispatch({ type: 'EDIT_STAFFBYID_START' });
    newState = store.getState();
    expect(newState.staffByIdReducer.isEditing).toBe(true);
    expect(newState.staffByIdReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'EDIT_STAFFBYID_SUCCESS',
      payload: { name: 'Random Object' }
    });
    newState = store.getState();
    expect(
      Object.keys(newState.staffByIdReducer.staffById).length
    ).toBeGreaterThan(0);
    expect(newState.staffByIdReducer.isEditing).toBe(false);
    expect(newState.staffByIdReducer.isEdited).toBe(true);

    /// FETCH FAILED
    store.dispatch({ type: 'EDIT_STAFFBYID_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.staffByIdReducer.isLoading).toBe(false);
    expect(newState.staffByIdReducer.error).toBe('whatever.');
  });
});
