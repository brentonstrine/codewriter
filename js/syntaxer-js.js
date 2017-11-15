self.CodeWriter = self.CodeWriter || {};
(function syntaxerJs (){

var _programString = "";
var indentation = 0;

CodeWriter.syntaxerJs = {
    getIndentation: function(){
        var spaces = "";
        for (i = 0; i < indentation; i++) {
            spaces += "    ";
        }
        return spaces;
    },
    incrementIndentation: function(){
        indentation++;
    },
    decrementIndentation: function () {
        indentation--;
    },
    clearIndentation: function(){
        programString = "";
        indentation = 0;
    },
    programString: "",
    clear: function(){
        this.programString = "";
    },
};

}());


// var CodeWriter = (function(cw) {
//     cw.syntaxerJs = {};
//     return cw;

// }(CodeWriter||{}))