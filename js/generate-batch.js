window.CodeWriter = window.CodeWriter || {};
(function generateBatch () {

var programsWritten = 0;
var successfulPrograms = [];
var program;
var programResult;
var programScore;

CodeWriter.generateBatch = {

    programIteration: function() {

        //console.groupCollapsed("New Program");

        ;;;//console.groupCollapsed("Program " + programsWritten);
        program = CodeWriter.programGenerator.buildProgram();
        ;;;//console.groupEnd("Program " + programsWritten);

        // ;;;//console.groupCollapsed("RunProgram");
        programResult = CodeWriter.programRunner.runProgram(program);
        // ;;;//console.groupEnd("RunProgram");

        // ;;;//console.group("ScoreProgram");
        programScore = CodeWriter.programScorer.scoreProgram(programResult);
        // ;;;//console.groupEnd("ScoreProgram");

        //console.groupEnd("New Program");

        this.manageLooping();

    },
    manageLooping: function(){
8;
        programsWritten++;

        // Program was not successful
        if (programScore < 2) {
            var factor = 100; // smaller numbers mean more throttling
            var max = 10000;  // batch size. large batch sizes are prone to cause browser meltdown.

            // Finished generating programs.
            if (programsWritten >= max) {
                console.log("Checkpoint " + programsWritten);
                console.log(successfulPrograms);
                console.log((100 * (successfulPrograms.length / max)).toFixed(2) + "% of generated programs were successful.");
                ;;;//debugger;
                return;
            }

            // Pause execution every once in a while to throttle JS which helps browsers not to freeze
            if ((programsWritten % (factor * 10)) == 0) {
                console.log("Checkpoint " + programsWritten);
                CodeWriter.programGenerator.clear();
                CodeWriter.syntaxerJs.clear();
                setTimeout(this.programIteration.bind(this), 500);
            } else if ((programsWritten % factor) == 0) {
                CodeWriter.programGenerator.clear();
                CodeWriter.syntaxerJs.clear();
                setTimeout(this.programIteration.bind(this), 10);
            }

            // Reset and start new program.
            else {
                CodeWriter.programGenerator.clear();
                CodeWriter.syntaxerJs.clear();
                this.programIteration();
            }
        }

        // Program was successful
        else {
            successfulPrograms.push({
                program: CodeWriter.syntaxerJs.programString,
                results: programScore,
            });
            console.group("Program " + programsWritten);
            console.log(CodeWriter.syntaxerJs.programString);
            console.groupEnd("Program " + programsWritten);
            this.programIteration();
        }
    },
};

}());