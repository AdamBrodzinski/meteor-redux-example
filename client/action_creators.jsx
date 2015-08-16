// action creators are functions that take a param, build up an 'action'
// and return it to the consumer (reducer). This may seem like
// unneeded boilerplate  but it's **really** nice to have a file
// with *all* possible ways to mutate the state of the app.

Actions = {};

// doesn't return payload because the reactive store state will re-render views
Actions.incrementScore = function incrementScore(playerId) {
  Players.update({_id: playerId}, {$inc: {score: 5}});
  // TODO call FAILED action on error
  return { type: 'INCREMENT_SCORE' };
};


Actions.selectPlayer = function selectPlayer(playerId) {
  let player = Players.findOne(playerId);
  let playerName = player.name || "N/A";

  return {
    type: 'SELECT_PLAYER',
    playerId: playerId,
    playerName: playerName
  };
};
