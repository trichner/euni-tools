app.factory('Minions', function($q) {
    var Minions = {};

    Minions.linkCharacter = function(id,name){
        return '<url=showinfo:1373\/\/' + id + '>' + name +'</url>'
    }

    Minions.linkFit = function(shipDNA,shipName){
        return '<url=fitting:' + shipDNA + '>' + shipName + '</url>'
    }

    Minions.getQueryParam = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    return Minions;
});