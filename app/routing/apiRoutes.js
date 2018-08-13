// Initializes survey data
var friends = require("../data/friends.js");

// Function which returns or adds friends
module.exports = function(app) {

  // GET REQUEST
  // Returns list of all possible friends
  app.get("/api/friends", function(request, response) {
    response.json(friends);
  });

  // POST REQUEST
  // Adds a new friend
  app.post("/api/friends", function(request, response) {
    friends.push(request.body);

    // Grabs array of user's scores
    var newFriend = request.body;
    var scoresArray = newFriend["scores[]"];

    // Initializes compatibility variables 
    var leastDifference = 100;
    var index = -1;

    for (var i = 0; i < friends.length - 1; i++) {
      // Resets total difference in score
      var totalDifference = 0;

      // Grabs array of existing users' scores
      var friend = friends[i];
      var friendScores = friend["scores[]"];

      // Compares score arrays and adds up the total difference in score
      for (var j = 0; j < 10; j++) {
        var difference = Math.abs(parseInt(friendScores[j]) - parseInt(scoresArray[j]));
        totalDifference += difference;
      }

      // If the total difference in score is less than the current least difference in score, update the least difference and most compatible friend
      if (totalDifference < leastDifference) {
        leastDifference = totalDifference;
        index = i;
      }
    }

    // Pass the most compatible friend back to survey.html to be displayed
    response.json(friends[index]);
  });

  // Clears all data
  app.post("/api/clear", function() {
    friends = [];
  });
};