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

    $scope.postLog = function (type) {
        API.postCharacterLog($scope.character.id, type.name, $scope.log);
    }

    $scope.postNote = function (type) {
        API.postCharacterNote($scope.character.id, type.name, $scope.note);
    }

    API.getCharacter(698922015)
        .then(function (res) {
            $scope.character = res.data;
            $scope.thirdPartySearches = Linky.urlsThirdPartySearch(res.data);
        })

    API.getCharacterEmploymentHistory(698922015)
        .then(function (res) {
            $scope.employmentHistory = res.data;
        })

    API.getCharacterDetails(698922015)
        .then(function (res) {
            $scope.characterDetails = res.data;
        })

    API.getCharacterLogs(698922015)
        .then(function (res) {
            $scope.logs = res.data;
        })

    API.getCharacterNotes(698922015)
        .then(function (res) {
            $scope.notes = res.data;
        })

    API.getCharacterActions(698922015)
        .then(function (res) {
            $scope.actions = res.data;
        })

    $scope.logout = function () {
        //API.logout()
        //    .then(function () {
        //        Notification.success("Logged out")
        //    })
        //    .then(null,function () {
        //        Notification.error('failed to logout :(');
        //    })
    }

}]);