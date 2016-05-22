const { createStore, combineReducers, applyMiddleware } = Redux;
const { devTools, persistState } = ReduxDevTools;

// Redux has a single store. to reduce complexity it allows you to combine
// several 'reducer' functions that share this single state object.
// They are combined into one root reducer which is passed to the store,
// however for this app we only have one reducer.


// applyMiddleware takes createStore() and returns a new wrapped createStore
// note, this is an optional step to use middleware (we're auto console.log dispatches)
// let createStoreWithMiddleware = applyMiddleware(logger)(createStore);

const createStoreWithMiddleware =
  applyMiddleware(logger)(
    devTools()(
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))(
        createStore
      )
    )
  );

store = createStoreWithMiddleware(appReducer);



// add our own helper for reactive-dicts, you could
// also just call getState
store.getReactiveState = function(key) {
  return store.getState().get(key);
};

// add a global helper for Blaze
UI.registerHelper('store', function(key) {
  return store.getState().get(key);
});
