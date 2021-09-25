import configureStore from "redux-mock-store";
import * as actions from "./buddyActions";
import { initialState } from "../reducers/BuddyReducer";

describe("redux", () => {
  const mockStore = configureStore([]);
  let store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  describe("user actions user action", () => {
    it("should dispatch the add user action", () => {
      const expectedActions = [
        {
          payload: {
            user: { first_name: "Jane", last_name: "Dough" }
          },
          type: "ADD_USER"
        }
      ];
      store.dispatch(
        actions.addUser({ user: { first_name: "Jane", last_name: "Dough" } })
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("should dispatch the add token action", () => {
      const expectedActions = [
        {
          payload: {
            token: "123"
          },
          type: "ADD_TOKEN"
        }
      ];
      store.dispatch(actions.addToken({ token: "123" }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("should dispatch the is loading action", () => {
      const expectedActions = [
        {
          payload: {
            isLoading: true
          },
          type: "IS_LOADING"
        }
      ];
      store.dispatch(actions.isLoadingPage({ isLoading: true }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("should dispatch the add interest action", () => {
      const expectedActions = [
        {
          payload: {
            user: { interests: "Art" }
          },
          type: "ADD_INTEREST"
        }
      ];
      store.dispatch(actions.addInterest({ user: { interests: "Art" } }));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("should dispatch the get interests action", () => {
      const expectedActions = [
        {
          payload: {
            user: { interests: "Art" }
          },
          type: "GET_INTERESTS"
        }
      ];
      store.dispatch(actions.getInterests({ user: { interests: "Art" } }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
