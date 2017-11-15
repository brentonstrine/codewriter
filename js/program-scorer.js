window.CodeWriter = window.CodeWriter || {};
(function programScorer () {
    CodeWriter.programScorer = {
        scoreProgram: function (results) {
            var totalScore = 0;
            var i = 0;
            for (round of results) {
                totalScore += round.score;
                ;;;//console.log("Round " + ++i + ": " + round.score);
            }
            ;;;//console.log("Total  : " + totalScore);
            return totalScore;
        },
    }
}());