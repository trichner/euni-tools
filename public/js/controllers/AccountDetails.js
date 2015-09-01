app.controller('AccountDetailsCtrl',function ($scope,$http,$location,$interval,$window,API,EveIGB,EveLinky,Notification,EveIMG,Linky) {

    var characterId = 698922015;

    //=== Static data
    //=== Vars
    $scope.waitlists = {waitlists:[]};

    $scope.me = null;
    $scope.authenticated = false;

    $scope.isIGB = EveIGB.isIGB();
    EveIGB.requestTrust($location.protocol + "//" + $location.host + "/*");
    console.log('You are' + ($scope.isIGB ? '' : ' not') + ' in Eve IGB')

    $scope.window = $window;

    $scope.eveimg = EveIMG;
    $scope.eveigb = EveIGB;

    $scope.character = {};
    $scope.employmentHistory = [];
    $scope.characterDetails = {};
    $scope.characterStandings = {agents:[],NPCCorporations:[],factions:[]};
    $scope.thirdPartySearches = [];

    $scope.notes = [];
    $scope.logs = [];
    $scope.actions = [];

    $scope.note = "";
    $scope.log = "";

    $scope.logTypes = [
        {name:"Interview"},
        {name:"Titles"},
        {name:"Director"}
    ]

    $scope.noteTypes = [
        {name:"Personnel"},
        {name:"Titles"},
        {name:"Director"}
    ]

    $scope.conditionalClass = function(condition){
        return condition ? 'text-green' : 'text-red';
    }

    $scope.postLog = function (type) {
        var description = me.name;
        API.postCharacterLog($scope.character.id, type.name,description, $scope.log)
            .then(function () {
                return API.getCharacterLogs($scope.character.id);
            })
            .then(function (res) {
                $scope.logs = res.data;
                $scope.log = '';
            })
    }

    $scope.postNote = function (type) {
        API.postCharacterNote($scope.character.id, type.name, $scope.note)
            .then(function () {
                return API.getCharacterNotes($scope.character.id);
            })
            .then(function (res) {
                $scope.notes = res.data;
                $scope.note = '';
            })
    }

    API.getCharacter(characterId)
        .then(function (res) {
            $scope.character = res.data;
            $scope.thirdPartySearches = Linky.urlsThirdPartySearch(res.data);
        })

    API.getCharacterEmploymentHistory(characterId)
        .then(function (res) {
            $scope.employmentHistory = res.data;
        })

    API.getCharacterDetails(characterId)
        .then(function (res) {
            $scope.characterDetails = res.data;
        })

    API.getCharacterStandings(characterId)
        .then(function (res) {
            $scope.characterStandings = res.data;
        })

    API.getCharacterLogs(characterId)
        .then(function (res) {
            $scope.logs = res.data;
        })

    API.getCharacterNotes(characterId)
        .then(function (res) {
            $scope.notes = res.data;
        })

    API.getCharacterActions(characterId)
        .then(function (res) {
            $scope.actions = res.data;
        })

    API.getCharacterMe()
        .then(function (res) {
            $scope.me = res.data;
            $scope.authenticated = true;
            console.log('Welcome ' + $scope.me.name + '!');
        })

});