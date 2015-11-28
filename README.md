# Meteor Redux

Please read the fantastic Redux guide before/after diving into this. At first it may seem very complex
but it turns out to be very simple once you understand the reducer flow.

**[Redux Guide](http://rackt.github.io/redux/index.html)**

Basic gist (from Redux guide):

Meteor apps need to store local app state in an organized way. Using Session works but can lead to
maintainance problems down the road. Redux helps keep things organized and de-coupled.

```javascript 
  // global reactive store is setup on app startup
  store = createStoreWithMiddleware(appReducer);

  // store has initial empty values:
  // {
  //   selectedPlayerId: '',
  //   selectedPlayerName: '',
  //   foo: 1,
  //   bar: 2,
  // }


  // view calls action and returns into store dispatcher
  //
  Template.player.events({
    'click': function () {
      store.dispatch( Actions.selectPlayer(this._id) );
    }
  });     
  
  
  // action 'creator' is a normal function that 
  // just creates an action object and returns it
  //
  Actions.selectPlayer = function selectPlayer(playerId) {
  let player = Players.findOne(playerId);
  let playerName = player.name || "N/A";

  return {
    type: 'SELECT_PLAYER',
    playerId: playerId,
    playerName: playerName
  };
};   


// app reducer catches action in switch statement and can mutate the
// data based on action payload metadata. reactState is a reactive-dict
// so we just set the final value and return the dict when done.
//
// if the app was large we could have several reducers that combine the
// state into the final root object. Redux can only have 1 store
//
appReducer = function appReducer(state, action) {
  state = state || reacState;
  // see action_creators.jsx for action payloads

  switch (action.type) {
    case 'SELECT_PLAYER':
      // we're setting the reactive dict here
      state.set('selectedPlayerId', action.playerId);
      state.set('selectedPlayerName', action.playerName);
      // then returning the entire dict when done
      return state;
    case 'INCREMENT_SCORE':
      // collections are in Minimongo but you could also keep
      // them here if its easier to have all data in one place
      // see React repo for example of that
      return state;
    default:
      return state;
  }
}


// templates can consume this global state with the `store` helper
// but can only mutate it by calling an action
//
<template name="leaderboard">
  {{#if store 'selectedPlayerName'}}
    <div class="details">
      <div class="name">{{store 'selectedPlayerName'}}</div>
    </div>
  {{else}}
</template>

```



### Useage

- `meteor`
- Open your browser to localhost:3000
- Checkout action/store logs in console after clicking about
