let { createStore, combineReducers, applyMiddleware } = Redux;

// Redux has a single store. to reduce complexity it allows you to combine
// several 'reducer' functions that share this single state object.
// They are combined into one root reducer which is passed to the store
//
// the shape of root reducer will then look like:
//    {
//      userInterface: {
//        selectedId: 'ds34sjsa34',
//        selectedPlayerName: 'Bob Smith'
//      },
//      players: [
//        { mongo doc },
//        { mongo doc },
//        { mongo doc }
//      ]
//    }
//
// For Blaze and Meteor we *could* just read and write data into Minimongo directly
// but then we wouldn't have a snapshot of the entire app state. The disadvantage is
// that we now have two copies of the collection in memory.

let rootReducer = combineReducers({
  userInterface: Reducers.userInterface,
  players: Reducers.players,
});


// applyMiddleware takes createStore() and returns a new wrapped createStore
// note, this is an optional step to use middleware (we're auto console.log dispatches)
let createStoreWithMiddleware = applyMiddleware(logger)(createStore);


store = createStoreWithMiddleware(rootReducer);
