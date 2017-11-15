self.CodeWriter = self.CodeWriter || {};
(function programGenerator () {

    var statements = ["conditional", "assignment", "creation"];
    var operators = ["equal", "greater", "less", "notEqual"];
    var _scope = {input: null, output: null};
    var _stringIterator = 0;

    CodeWriter.programGenerator = {
        clear: function(){
            _scope = { input: null, output: null };
            _stringIterator = 0;
        },
        getRandomStatements: function () {
            var statementCount = CodeWriter.utils.randomFromRange(1, 3);
            var pickedStatements = [];
            for (var i = 1; i <= statementCount; i++) {
                pickedStatements.push(this.getRandomStatement());
            }
            return pickedStatements;
        },

        getRandomStatement: function (s) {
            // returns an object of the form:
            // { 
            //     statement: {
            //         buildConditional: { // name/type of statement
            //             condition: "",  // properties of statement
            //             code: "",
            //         },
            //     },
            // };
            // TODO: does this need the top level "statement" property, or is it redundant?

            var pickedStatement = CodeWriter.utils.randomFromArray(statements);
            var statement = this.buildStatement(pickedStatement);
            return { statement };
        },

        buildProgram: function (statement) {
            return this.getRandomStatements();
        },

        buildStatement: function(statement){
            // TODO: Can't define a reference to these functions in the [statements] array and pass that around? because it messes up the `this` context. There should be a better way to do this. 
            if(statement == "conditional"){
                return this.buildConditional();
            } else if (statement == "assignment") {
                return this.buildAssignment();
            } else if (statement == "creation") {
                return this.buildCreation();
            }
        },
        buildConditional: function () {
            CodeWriter.syntaxerJs.programString += CodeWriter.syntaxerJs.getIndentation() + "if (";
            var condition = this.buildCondition();
            CodeWriter.syntaxerJs.incrementIndentation();
            var code = this.getRandomStatements();

            CodeWriter.syntaxerJs.decrementIndentation();

            ;;;//console.log(CodeWriter.syntaxerJs.getIndentation() + "}");
            CodeWriter.syntaxerJs.programString += CodeWriter.syntaxerJs.getIndentation() + "}\n";
            return {
                conditional: {
                    condition,
                    code,
                },
            };
        },
        buildCondition: function conditional () {
            var left = CodeWriter.utils.randomFromObject(_scope);
            var operator = CodeWriter.utils.randomFromArray(operators);
            var right = CodeWriter.utils.randomFromArray([
                CodeWriter.utils.randomFromObject(_scope),
                CodeWriter.utils.randomFromArray([true, false]),
            ])
                ;;;//console.log(CodeWriter.syntaxerJs.getIndentation() + "if (" + left + " " + operator + " " + right + ") {");
            CodeWriter.syntaxerJs.programString += left + " " + operator + " " + right + ") {\n";
            return { left, operator, right, };
        },
        buildAssignment: function assignment () {
            var variable = CodeWriter.utils.randomFromObject(_scope);
            var value = CodeWriter.utils.randomFromArray([
                true,
                false,
                CodeWriter.utils.randomFromObject(_scope),
            ]);

            ;;;//console.log(CodeWriter.syntaxerJs.getIndentation() + "var " + variable + " = " + value + ";");
            CodeWriter.syntaxerJs.programString += CodeWriter.syntaxerJs.getIndentation() + variable + " = " + value + ";\n";
            return {
                assignment: {
                    variable: variable,
                    value: value,
                },
            };
        },
        buildCreation: function creation () {
            var variable = this.getStringName();
            var value = CodeWriter.utils.randomFromArray([
                true,
                false,
                CodeWriter.utils.randomFromObject(_scope),
            ]);
            _scope[variable] = value;
            ;;;//console.log(CodeWriter.syntaxerJs.getIndentation() + "var " + variable + " = " + value + ";");
            CodeWriter.syntaxerJs.programString += CodeWriter.syntaxerJs.getIndentation() + "var " + variable + " = " + value + ";\n";
            return {
                creation: {
                    variable: variable,
                    value: value,
                },
            };
        },

        // brute-creates a string up to 2 dijits long (a to zz)
        getStringName: function () {
            var string = "";
            var alpha = "abcdefghijklmnopqrstuvwxyz";
            var divide = _stringIterator / alpha.length;
            var mod = _stringIterator % alpha.length;
            if (divide >= 1) {
                string = string + alpha[Math.floor(divide) - 1];
            }
            if (mod > 0) {
                string = string + alpha[Math.floor(mod)];
            } else if (mod == 0) {
                string = string + "a";
            }
            //console.log(2, string);
            _stringIterator++;
            return string;
        }
    };
}());