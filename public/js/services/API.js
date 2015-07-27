/**
 * Created by Thomas on 13.04.2015.
 */
app.factory('API', ['$q','$http',function($q,$http) {
    var API = {};
    var API_PREFIX = 'api'
    var URL = {
        AUTH : API_PREFIX +'/auth',
        ACCOUNTS : API_PREFIX +'/accounts',
        CHARACTERS : API_PREFIX +'/characters',
        APIPULLS : API_PREFIX +'/eveapi',
        NOTES : API_PREFIX +'/notes',
        LOGS : API_PREFIX +'/notes',
        APPS : API_PREFIX +'/apps',
        ME : API_PREFIX +'/me'
    }

    API.getAccounts = function(){
        return $http.get(URL.ACCOUNTS);
    }

    API.getAccount = function(accountID){
        return $http.get(URL.ACCOUNTS + '/' + accountID);
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