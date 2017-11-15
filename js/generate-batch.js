self.CodeWriter = self.CodeWriter || {};

importScripts("utils.js", "syntaxer-js.js", "program-generator.js", "program-runner.js", "program-scorer.js");

(function generateBatch () {

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
    },

    runBatch: function(batchSize){

        var programsWritten;
        for(programsWritten = 0; programsWritten <= batchSize; programsWritten++) {

            this.programIteration();

            // Log checkpoints
            if ((programsWritten % 1000) == 0) {
                postMessage("Checkpoint " + programsWritten);
            }

            if (programScore >= 2) { // Program was successful
                successfulPrograms.push({
                    program: CodeWriter.syntaxerJs.programString,
                    results: programScore,
                });
                postMessage("----- Program " + programsWritten + " -------------------------------------");
                postMessage(CodeWriter.syntaxerJs.programString);
                postMessage("--------------------------------------------------------");
                this.programIteration();
            }

            // cleanup
            CodeWriter.programGenerator.clear();
            CodeWriter.syntaxerJs.clear();
        }

        // Finished generating programs.
        postMessage("Completed: " + programsWritten);
        postMessage(successfulPrograms);
        postMessage((100 * (successfulPrograms.length / batchSize)).toFixed(2) + "% of generated programs were successful.");
        ;;;//debugger;
    },
};

CodeWriter.generateBatch.runBatch(10007);;

}());