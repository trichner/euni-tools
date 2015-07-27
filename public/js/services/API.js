/**
 * Created by Thomas on 13.04.2015.
 */
app.factory('API', ['$q','$http',function($q,$http) {
    var API = {};
    var API_PREFIX = 'api'
    var URL = {
        AUTH : API_PREFIX +'/auth',
        ACCOUNTS : API_PREFIX +'/accounts',
        LINKED: '/linked',
        CHARACTERS : API_PREFIX +'/characters',
        API_PULLS : '/api-pulls',
        NOTES : '/notes',
        DETAILS : '/details',
        LOGS : '/logs',
        STANDINGS : '/standings',
        EMPLOYMENT_HISTORY : '/employment-history',
        APPS : API_PREFIX +'/apps',
        ME : API_PREFIX +'/me'
    }

    API.getAccounts = function(){
        return $http.get(URL.ACCOUNTS);
    }

    API.getAccount = function(accountID){
        return $http.get(URL.ACCOUNTS + '/' + accountID);
    }

    API.getCharacter = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID);
    }

    API.getCharacterApiPulls = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + URL.API_PULLS);
    }

    API.getCharacterLogs = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + URL.LOGS);
    }

    API.getCharacterNotes = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + URL.NOTES);
    }

    API.getCharacterEmploymentHistory = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + URL.EMPLOYMENT_HISTORY)
            .then(function (res) {
                res.data = res.data.map(function (employment) {
                    employment.startDate = new Date(employment.startDate);
                    return employment;
                })
                return res;
            })
    }

    API.getCharacterDetails = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + URL.DETAILS)
            .then(function (res) {
                res.data.dateOfBirth = new Date(res.data.dateOfBirth);
                return res;
            })
    }


    API.login = function(){
        return $http.get(URL.AUTH);
    }

    API.logout = function(){
        return $http({
                method: 'DELETE',
                url: URL.AUTH,
                headers: {'content-type':'application/json'}
            })
    }

    return API;
}]);