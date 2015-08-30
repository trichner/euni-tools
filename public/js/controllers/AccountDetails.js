app.controller('AccountDetailsCtrl',[ '$scope','$http','$location','$interval','$window','API','EveIGB','Notification','EveIMG','Linky',function ($scope,$http,$location,$interval,$window,API,EveIGB,Notification,EveIMG,Linky) {

    var mailTemplates = [
        {
            name: 'Join Queue',
            subject : 'Application to EVE University - Join the Queue',
            body:
            'Dear {:toName}\n\nThank you for applying to {:corporationName}. I have reviewed your' +
            ' application and you may now join the queue for an interview.\n\nPlease click {:queueUrl} to' +
            ' join' +
            ' the queue for an interview. Make sure you read this wiki page which explains how the queue works. ' +
            'You will be called for interview in the following in-game chat channel: E-Uni. The interview will ' +
            'be via an in-game chat rather than through mumble.\n\nDuring your interview we will expect that' +
            ' you have your {:overviewUrl} and {:mumbleUrl} set up, have obtained {:jumpClonesUrl}' +
            ' (although this is optional), ' +
            'and have relocated your possessions if you want to do so. If you still need to do any of' +
            ' these things please do them before you join the queue for an interview.\n\nIn EVE University, ' +
            'as with most major corporations, we often find ourselves at war. In order to check whether ' +
            'we are currently at war, check the "War History" of {:allianceName} for Active Wars. If you' +
            ' are ' +
            'unsure, please ask the Personnel Officer who interviews you.\n\nIf you do not join the queue ' +
            'for an interview for over thirty days you will need to start the process again.\n\nIf you have ' +
            'any questions please let me know.\n\nBest wishes,\n\{:fromName}\nPersonnel Department\n' +
            '{:corporationName}'
        }
    ];

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

}]);