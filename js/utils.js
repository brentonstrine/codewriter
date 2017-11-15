window.CodeWriter = window.CodeWriter || {};
(function utils () {

CodeWriter.utils = {
    randomFromArray: function (a) {
        return a[Math.floor(Math.random() * a.length)];
    },
    randomFromObject: function (o) {
        var objOwnPropArray = Object.keys(o);
        return objOwnPropArray[Math.floor(Math.random() * objOwnPropArray.length)];
    },
    randomFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};

}());