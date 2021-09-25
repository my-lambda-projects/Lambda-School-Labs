import testStore from '../../utils/testStore';

describe('Parent', () => {
  const expectedState = {
    title: 'Example title'
  };
  const store = testStore();
  let newState = store.getState();
  it('FETCH PARENT', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_PARENTS_START' });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(true);
    expect(newState.parentReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_PARENTS_SUCCESS',
      payload: [expectedState]
    });
    newState = store.getState();
    expect(newState.parentReducer.parentList.length).toBeGreaterThan(0);
    expect(newState.parentReducer.isLoading).toBe(false);
    expect(newState.parentReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({
      type: 'FETCH_PARENTS_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(false);
    expect(newState.parentReducer.error).toBe('whatever.');
  });
  it('FETCH PARENT BY ID', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_PARENTBYID_START' });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(true);
    expect(newState.parentReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_PARENTBYID_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.parentReducer.parentById).length
    ).toBeGreaterThan(0);
    expect(newState.parentReducer.isLoading).toBe(false);

    /// FETCH FAILED
    store.dispatch({
      type: 'FETCH_PARENTBYID_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(false);
    expect(newState.parentReducer.error).toBe('whatever.');
  });
  it('EDIT PARENT BY ID', () => {
    /// FETCH START
    store.dispatch({ type: 'EDIT_PARENTBYID_START' });
    newState = store.getState();
    expect(newState.parentReducer.isEditing).toBe(true);
    expect(newState.parentReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'EDIT_PARENTBYID_SUCCESS',
      payload: { name: 'Random Object' }
    });
    newState = store.getState();
    expect(
      Object.keys(newState.parentReducer.parentById).length
    ).toBeGreaterThan(0);
    expect(newState.parentReducer.isEditing).toBe(false);
    expect(newState.parentReducer.isEdited).toBe(true);

    /// FETCH FAILED
    store.dispatch({ type: 'EDIT_PARENTBYID_FAILURE', payload: 'whatever.' });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(false);
    expect(newState.parentReducer.error).toBe('whatever.');
  });
  it('FETCH STUDENT BY PARENT BY ID', () => {
    /// FETCH START
    store.dispatch({ type: 'FETCH_STUDENTBYFAMILYID_START' });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(true);
    expect(newState.parentReducer.error).toBe(null);

    /// FETCH SUCCESS
    store.dispatch({
      type: 'FETCH_STUDENTBYFAMILYID_SUCCESS',
      payload: expectedState
    });
    newState = store.getState();
    expect(
      Object.keys(newState.parentReducer.studentByFamilyId).length
    ).toBeGreaterThan(0);
    expect(newState.parentReducer.isLoading).toBe(false);
    expect(newState.parentReducer.error).toBe(null);

    /// FETCH FAILED
    store.dispatch({
      type: 'FETCH_STUDENTBYFAMILYID_FAILURE',
      payload: 'whatever.'
    });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(false);
    expect(newState.parentReducer.error).toBe('whatever.');
  });
  it('Adds Parent', () => {
    store.dispatch({ type: 'ADD_PARENT_START' });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(true);
    expect(newState.parentReducer.isPosting).toBe(false);
    expect(newState.parentReducer.error).toBe(null);

    store.dispatch({ type: 'ADD_PARENT_SUCCESS', payload: expectedState });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(false);
    expect(newState.parentReducer.error).toBe(null);
    expect(newState.parentReducer.isPosting).toBe(false);
    expect(newState.parentReducer.isPosted).toBe(true);
    expect(newState.parentReducer.parentList.length).toBeGreaterThan(0);

    store.dispatch({ type: 'ADD_PARENT_FAILURE', payload: 'Whatever.' });
    newState = store.getState();
    expect(newState.parentReducer.isLoading).toBe(false);
  });
  it('Set filter parent', () => {
    store.dispatch({ type: 'SET_FILTER_PARENT', payload: 'Whatever.' });
    newState = store.getState();
    expect(newState.parentReducer.searchTerm).toBe('Whatever.');
  });
});
 