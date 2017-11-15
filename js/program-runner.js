window.CodeWriter = window.CodeWriter || {};
(function programRunner() {

    CodeWriter.programRunner = {
        runProgram: function (program) {
            var rounds = [
                {
                    input: 0,
                    desiredOutput: 1,
                    score: 0,
                },
                {
                    input: 1,
                    desiredOutput: 0,
                    score: 0,
                },
            ];
            for (round of rounds) {
                ;;;//console.group("Round");
                round.scope = {
                    input: round.input,
                    output: null,
                }
                    ;;;//console.log("input  : " + round.scope.input);
                ;;;//console.log("desired: " + round.desiredOutput);
                round.scope = this.runStatements(program, round.scope);

                ;;;//console.log("output : " + round.scope.output);

                if (round.scope.output == round.desiredOutput) {
                    ++round.score;
                } else if (round.scope.output === null) {
                    ;;;//console.log("Output contained 'null'");
                    console.groupEnd("Round");
                    return rounds;
                }
                ;;;//console.groupEnd("Round");
            }
            return rounds;
        },
        runStatements: function (statementsArray, scope) {
            for (statementObj of statementsArray) {
                //console.group("Statement");
                statementObj = statementObj.statement;
                scope = this.runStatement(statementObj, scope);
                //console.groupEnd("Statement");
            }
            return scope;
        },
        runStatement: function (statement, scope) {
            if (statement.hasOwnProperty("conditional")) {
                var rc = this.runCondition(statement.conditional, scope);
                if (!rc) { console.log("No Scope to pass.");;; debugger; }
                return rc;
            } else if (statement.hasOwnProperty("assignment")) {
                var ra = this.runAssign(statement.assignment, scope);
                if (!ra) { console.log("No Scope to pass.");;; debugger; }
                return ra;
            } else if (statement.hasOwnProperty("creation")) {
                var rc = this.runCreate(statement.creation, scope);
                if (!rc) { console.log("No Scope to pass.");;; debugger; }
                return rc;
            } else {
                console.log("Statement object does not direclty contain statement properties.");
                ;;; debugger;
            }
        },
        runCondition: function (conditional, s) {
            var rs;
            if (conditional.condition.operator == "equal") {
                if (s[conditional.condition.left] == s[conditional.condition.right]) {
                    rs = this.runStatements(conditional.code, s);
                    return rs;
                }
            } else if (conditional.condition.operator == "greater") {
                if (s[conditional.condition.left] > s[conditional.condition.right]) {
                    rs = this.runStatements(conditional.code, s);
                    return rs;
                }
            } else if (conditional.condition.operator == "less") {
                if (s[conditional.condition.left] < s[conditional.condition.right]) {
                    rs = this.runStatements(conditional.code, s);
                    return rs;
                }
            } else if (conditional.condition.operator == "notEqual") {
                if (s[conditional.condition.left] != s[conditional.condition.right]) {
                    rs = this.runStatements(conditional.code, s);
                    return rs;
                }
            } else {
                console.log("error");
                ;;; debugger;
                throw new Error("Bad operator.");
            }
            // condition was false;
            return s;
        },
        runAssign: function (assignment, s) {
            if (!assignment) {
                console.log("No assignment passed");
                ;;; debugger;
            }
            if (!s) {
                console.log("No scope passed");
                ;;; debugger;
            }
            s[assignment.variable] = assignment.value;
            return s;
        },
        runCreate: function (creation, s) {
            if (!creation) {
                console.log("No assignment passed");
                ;;; debugger;
            }
            if (!s) {
                console.log("No scope passed");
                ;;; debugger;
            }
            s[creation.variable] = creation.value;
            return s;
        },

    }
}());