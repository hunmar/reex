import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import initialState from "../../store/initialState";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import App from ".";

describe("Revolut exchange", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(initialState);

    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("renders without crashing", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
