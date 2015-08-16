// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Mongo.Collection("players");

if (Meteor.isClient) {
  // events

  Template.leaderboard.events({
    'click .inc': function () {
      var playerId = store.getReactiveState('selectedPlayerId');
      store.dispatch( Actions.incrementScore(playerId) );
    }
  });

  Template.player.events({
    'click': function () {
      store.dispatch( Actions.selectPlayer(this._id) );
    }
  });

  // helpers

  Template.leaderboard.helpers({
    players: function () {
      return Players.find({}, { sort: { score: -1, name: 1 } });
    }
  });

  Template.player.helpers({
    selected: function () {
      var playerId = store.getReactiveState('selectedPlayerId');
      return (playerId === this._id) ? 'selected' : '';
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
                   "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
      _.each(names, function (name) {
        Players.insert({
          name: name,
          score: Math.floor(Random.fraction() * 10) * 5
        });
      });
    }
  });
}
