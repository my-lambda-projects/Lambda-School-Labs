import testStore from '../../utils/testStore';

describe('Staff Table Reducer', () => {
  const expectedState = [
    {
      title: 'Example title'
    }
  ];
  const store = testStore();
  let newState = store.getState();
  it('Fetched Staff', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_STAFF_START', payload: expectedState });
    newState = store.getState();
    expect(newState.staffTableReducer.isLoading).toBe(true);
    expect(newState.staffTableReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({ type: 'FETCH_STAFF_SUCCESS', payload: expectedState });
    newState = store.getState();
    expect(newState.staffTableReducer.staffList.length).toBeGreaterThan(0);
    expect(newState.staffTableReducer.isLoading).toBe(false);
    expect(newState.staffTableReducer.error).toBe(null);

    /// NEXT AVAILABLE ID
    store.dispatch({ type: 'FETCH_NEXTAVAILABLEID', payload: 4 });
    newState = store.getState();
    expect(newState.staffTableReducer.availableID).toBe(4); 
    expect(newState.staffTableReducer.isLoading).toBe(false);
    expect(newState.staffTableReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({ type: 'FETCH_STAFF_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.staffTableReducer.isLoading).toBe(false);
    expect(newState.staffTableReducer.error).toBe('whatever.');
  });
  it('Filters Staff', () => {
    store.dispatch({ type: 'SET_FILTER_STAFF', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.staffTableReducer.searchTerm).toBe('whatever.');
  });
  it('Adds Staff', () => {
    store.dispatch({ type: 'ADD_STAFF_START' });
    newState = store.getState();
    expect(newState.staffTableReducer.isLoading).toBe(true);
    expect(newState.staffTableReducer.isPosting).toBe(false);
    expect(newState.staffTableReducer.error).toBe(null);

    store.dispatch({ type: 'ADD_STAFF_SUCCESS', payload: expectedState });
    newState = store.getState();
    expect(newState.staffTableReducer.isLoading).toBe(false);
    expect(newState.staffTableReducer.error).toBe(null);
    expect(newState.staffTableReducer.isPosting).toBe(false);
    expect(newState.staffTableReducer.isPosted).toBe(true);
    expect(newState.staffTableReducer.staffList.length).toBeGreaterThan(0);

    store.dispatch({ type: 'ADD_STAFF_FAILURE', payload: 'Whatever.' });
    newState = store.getState();
    expect(newState.staffTableReducer.isLoading).toBe(false);
    expect(newState.staffTableReducer.error).toBe('Whatever.');
  });
}); 
