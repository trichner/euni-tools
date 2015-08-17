/**
 * API
 *
 * Angular service to interact with the e-uni tools backend.
 *
 *  Created: 13.04.2015
 *  Author: Thomas Richner - mail@trichner.ch
 */
app.factory('API', ['$q','$http',function($q,$http) {
    var API = {};
    var API_PREFIX = 'api'
    var URL = {
        AUTH : API_PREFIX +'/auth',
        ACCOUNTS : API_PREFIX +'/accounts',
        LINKED: '/linked.json',
        CHARACTERS : API_PREFIX +'/characters',
        API_PULLS : '/api-pulls.json',
        NOTES : '/notes.json',
        ACTIONS : '/actions.json',
        DETAILS : '/details.json',
        LOGS : '/logs.json',
        STANDINGS : '/standings.json',
        EMPLOYMENT_HISTORY : '/employment-history.json',
        APPS : API_PREFIX +'/apps.json',
        ME : API_PREFIX +'/me.json'
    }

    API.getAccounts = function(){
        return $http.get(URL.ACCOUNTS);
    }

    API.getAccount = function(accountID){
        return $http.get(URL.ACCOUNTS + '/' + accountID);
    }

    API.getCharacter = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + '.json');
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

    API.getCharacterActions = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + URL.ACTIONS);
    }

    API.getCharacterStandings = function(characterID){
        return $http.get(URL.CHARACTERS + '/' + characterID + URL.STANDINGS);
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


    API.postCharacterLog = function(characterID,type,log){
        return $http.post(URL.CHARACTERS + '/' + characterID + URL.LOGS,{
            log: log,
            type: type
        });
    }

    API.postCharacterNote = function(characterID,type,note){
        return $http.post(URL.CHARACTERS + '/' + characterID + URL.NOTES,{
            note: note,
            type: type
        });
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