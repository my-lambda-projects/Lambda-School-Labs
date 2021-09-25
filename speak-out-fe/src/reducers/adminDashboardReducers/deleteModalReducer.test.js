import testStore from '../../utils/testStore';
describe('Delete Modal', () => {
  const store = testStore();
  let newState = store.getState();
  it('Toggle Delete Modal', () => {
    store.dispatch({ type: 'TOGGLE_DELETE_MODAL', payload: true });
    newState = store.getState();
    expect(newState.deleteModalReducer.isVisible).toBe(true);
  });
  it('Toggle Delete Modal Off', () => {
    store.dispatch({ type: 'TOGGLE_DELETE_MODAL', payload: false });
    newState = store.getState();
    expect(newState.deleteModalReducer.isVisible).toBe(false);
  });
});
 