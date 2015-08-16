// reducers allow you to 'slice' off a part of the single state object which
// lets you think about the domain in a smaller picture. You could use one
// reducer in a small app like this but in large apps this reducer could be
// several hundred lines. See the meteor-flux-leaderboard redux branch for an
// example of this.

let { incrementScore, selectPlayer, playersChanged } = Actions;


// we'll use a reactive dict as the root state object
// so that our views can auto-render on change
var reactiveState = new ReactiveDict('redux-state');


appReducer = function appReducer(state, action) {
  state = state || reactiveState;
  // see action_creators.jsx for action payloads

  switch (action.type) {
    case 'SELECT_PLAYER':
      state.set('selectedPlayerId', action.playerId);
      state.set('selectedPlayerName', action.playerName);
      return state;
    case 'INCREMENT_SCORE':
      return state;
    default:
      return state;
  }
}
