(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('AuthService', AuthService);

    /** @ngInject */
    function AuthService($rootScope, $log, $q, appSettings, IlpTeacher) {
        var console = $log;

        this.login = login;
        this.isAuthenticated = isAuthenticated;
        this.logout = logout;
        this.getUserId = getUserId;
        this.getDefaultUser = getDefaultUser;
        this.isAdmin = isAdmin;

        // gets the current teacher id
        function getUserId() {
            if (!isAuthenticated()) {
                return null;
            }

            return $rootScope.user.idTeacher;
        }

        function isAdmin() {
            if (isAuthenticated()) {
                // console.log($rootScope.user);
                return $rootScope.user.isAdmin;
            }

            return false;
        }

        function login(_uname, _upass) {

            // create a deferred promise so we can work with our login
            var deferred = $q.defer();

            // try to find the user
            if (_uname) {
                var searchname = _uname + '@newschoolsf.org';
                // console.log("looking to login: ", searchname);

                IlpTeacher.findOne( { filter: { "where": {  "username": searchname  }  }
                    }).$promise
                    .then(function(results) {
                        // console.log("AuthService.login: found user ", results );
                        var passCheck = results.nameLast + results.nameFirst.length.toString();
                        // console.log("AuthService.login: looking for password:", passCheck);

                        if (_upass === passCheck) {
                            $rootScope.user = results;
                            $rootScope.user.loggedin = true;
                            // console.log("Teacher Record Matched: ", results);
                            deferred.resolve("logged in: " + results.name);
                        } else {
                            console.log("password entered", _upass, "didn't match ", passCheck);
                            deferred.reject("Incorrect passsword for " + _uname);
                        }
                    }, function(err) {
                        // TODO: Show an error here
                        if (!$rootScope.user && appSettings.appTesting) {
                            $rootScope.user = getTestUser();
                            if ($rootScope.user.username !== _uname) {
                                console.log("diff username on test login", _uname, $rootScope.user.username, _upass);
                            }
                            deferred.resolve("Logged in test user");
                        }

                        // Error occurred
                        console.log("No user found :(", err);

                        //TODO: verify user login
                        if (err.status === 404) {
                            deferred.reject("I couldn't find your username in the database: " + searchname);
                        } else {
                            deferred.reject("couldn't login '" + _uname + "' :  '" + err.statusText + "'");
                        }
                    });
            }

            return deferred.promise;

        }


        function isAuthenticated() {
            // console.log("Authenticating: ", $rootScope.user);

            // check user 
            if ($rootScope.user) {
                if ($rootScope.user.loggedin) {
                    // TODO: check token

                    // Yay
                    return true;
                }
            } else if (appSettings.appTesting) {
                console.log("getting default user");
                $rootScope.user = getDefaultUser();

                return true;

            }

            //nope
            return false;
        }

        function logout() {
            // TODO: invalidate token

            // 
            $rootScope.user = null;

            return true;
        }

        function getDefaultUser() {
            var defaultUser = {
                "idTeacher": 29,
                "name": "Severus Snape",
                "nameFirst": "Severus ",
                "nameLast": "Snape",
                "teacherId": "90983664",
                "cohort": "Slytherin",
                "username": "snape",
                "password": "debug",
                "thumbnail": "assets/images/snape.jpg",
                "validated": false,
                "loggedin": true
            };

            return defaultUser;
        }

        function getTestUser() {
            var testUser = {
                "idTeacher": 13,
                "name": "Filius Flitwick",
                "nameFirst": "Filius ",
                "nameLast": "Flitwick",
                "teacherId": "145860408",
                "cohort": "",
                "username": "filius",
                "password": "password",
                "thumbnail": "assets/images/flitwick.jpeg",
                "validated": true,
                "loggedin": true
            };

            return testUser;

        }
    }


})();
