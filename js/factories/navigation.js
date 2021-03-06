var imgPath = adminUrl + "upload/readFile";
var uploadUrl = adminUrl + "upload/";

if (window.location.host == 'mumbai.sfanow.in') {
    var adminUrl2 = "https://mumbaischool.sfanow.in/api/";
} else if (window.location.host == 'hyderabad.sfanow.in') {
    var adminUrl2 = "https://hyderabadschool.sfanow.in/api/";
} else if (window.location.host == 'testmumbai.sfanow.in') {
    var adminUrl2 = "https://mumbaischool.sfanow.in/api/";
} else if (window.location.host == 'testhyderabad.sfanow.in') {
    var adminUrl2 = "https://hyderabadschool.sfanow.in/api/";
}

// var imgPath2 = adminUrl2 + "upload/readFile";
// var uploadUrl2 = adminUrl2 + "upload/";

// var currentYears = ["2015", "2016"];
// var currentYears = [{
//     year: "2015",
//     display: "2015"
// }, {
//     year: "2016",
//     display: "2016"
// }];
var currentYears = [{
    year: "2015",
    display: "2015-16"
}, {
    year: "2016",
    display: "2016-17"
}];
var navigationservice = angular.module('navigationservice', []);

firstApp.factory('NavigationService', function ($http, $window, $q, $timeout, $log) {
    var standardDelay = 1000;
    var navigation = [{
        name: "Home",
        classis: "active",
        anchor: "home",
        subnav: [{
            name: "Subnav1",
            classis: "active",
            anchor: "home"
        }]
    }];

    return {

        getnav: function () {
            return navigation;
        },

        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

        getAllYears: function () {
            return currentYears;
        },

        getAllBanner: function (callback) {
            $http({
                url: adminUrl + 'banner/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },

        getAllEnabledBanner: function (callback) {
            $http({
                url: adminUrl + 'banner/getAllEnabledBanner',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },

        getFirstListSchool: function (request, callback) {
            $http({
                url: adminUrl + 'school/getFirstList',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getAllSchoolRank: function (request, callback) {
            $http({
                url: adminUrl + 'school/getAllSchoolRank',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(function (data) {
                data.data = _.filter(data.data, function (n) {
                    return n._id != "585764172f6a2920432518fb";
                });
                var ranks = _.map(data.data, function (n) {
                    n.points = (n.gold * 5) + (n.silver * 3) + (n.bronze * 2);
                    return n;
                });
                ranks = _.orderBy(ranks, ['points', 'gold', "silver", "bronze"], ["desc", 'desc', 'desc', 'desc']);
                ranks = _.map(ranks, function (n, key) {
                    n.rank = key + 1;
                    return n;
                });
                callback(ranks);
            });
        },

        getSearchDataSchool: function (input, callback) {
            $http({
                url: adminUrl + 'school/searchSchool',
                method: 'POST',
                withCredentials: true,
                data: input
            }).success(callback);
        },

        getDrawUpdatedSports: function (request, callback) {
            $http({
                url: adminUrl + 'StudentStats/getDrawUpdatedSports',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getLeagueKnockout: function (request, callback) {
            $http({
                url: adminUrl + 'leagueknockout/getAll',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getQualifyingRound: function (request, callback) {
            $http({
                url: adminUrl + 'qualifyinground/getAll',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getSearchDataStudent: function (input, i, callback) {
            $http({
                url: adminUrl + 'student/searchStudent',
                method: 'POST',
                withCredentials: true,
                data: input
            }).success(function (data) {
                callback(data, i);
            });
        },

        resultDispatcher: function (drawFormat) {
            switch (drawFormat) {
                case 'Knockout':
                    return 'draw';
                case 'League':
                    return 'round-robin';
                case 'League cum Knockout':
                    return 'league-knockout';
                case 'Heats':
                    return 'heats';
                case 'Qualifying Round':
                    return 'qualify';
                case 'Swiss League':
                    return 'draw';
            }
        },

        getSearchDataTeam: function (input, i, callback) {
            $http({
                url: adminUrl + 'team/searchTeam',
                method: 'POST',
                withCredentials: true,
                data: input
            }).success(function (data) {
                callback(data, i);
            });
        },

        getSchoolProfile: function (id, callback) {
            var schoolObj = {};
            if (id) {
                if (id.substr(0, 3) == 'Old') {
                    schoolObj.sfaid = id.substr(7);
                } else {
                    schoolObj._id = id;
                }
            }
            $http({
                url: adminUrl + 'school/getOne',
                method: 'POST',
                withCredentials: true,
                data: schoolObj
            }).success(callback);
        },

        getOneSportForResult: function (request, callback) {
            $http({
                url: adminUrl + 'sport/getOneSportForResult',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getOneSport: function (request, callback) {
            $http({
                url: adminUrl + 'sport/getOne',
                method: 'POST',
                data: request
            }).success(callback);
        },

        getOnePopulated: function (id, callback) {
            $http({
                url: adminUrl + 'school/getOnePopulated',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },

        contingentStrengthByYear: function (request, callback) {
            $http({
                url: adminUrl + 'school/contingentStrengthByYear',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getSchoolByYear: function (request, callback) {
            $http({
                url: adminUrl + 'school/getSchoolByYear',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getSportRuleByName: function (request, callback) {
            $http({
                url: adminUrl + 'sportrule/getOneByName',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getAllSportList: function (callback) {
            $http({
                url: adminUrl + 'sportsList/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },

        getOneBySportId: function (request, callback) {
            $http({
                url: adminUrl + 'sportrule/getOneBySportId',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getStudentProfile: function (id, callback) {
            var objToSend = {};
            if (id) {
                if (id.substr(0, 3) == 'Old') {
                    objToSend.sfaid = id.substr(7);
                } else {
                    objToSend._id = id;
                }
            }
            $http({
                url: adminUrl + 'student/getOne',
                method: 'POST',
                withCredentials: true,
                data: objToSend
            }).success(callback);
        },

        editStudent: function (request, callback) {
            $http({
                url: adminUrl + 'student/editStudent',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getTeamDetail: function (id, callback) {
            $http({
                url: adminUrl + 'team/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },

        schoolSearch: function (request, i, callback) {
            $http({
                url: adminUrl + 'school/getLimited',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(function (data) {
                callback(data, i);
            });
        },

        getSchoolSportByGender: function (request, callback) {
            $http({
                url: adminUrl + 'studentsport/getSchoolSportByGender',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getStudentSport: function (request, callback) {
            $http({
                url: adminUrl + 'studentsport/getsportspopulated',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        forFormSearch: function (request, i, callback) {
            $http({
                url: adminUrl + 'student/forFormSearch',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(function (data) {
                callback(data, i);
            });
        },

        forFormSearchSchool: function (request, i, callback) {
            $http({
                url: adminUrl + 'school/getLimitedSchool',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(function (data) {
                callback(data, i);
            });
        },

        getSchoolMedalCount: function (request, callback) {
            $http({
                url: adminUrl + 'medal/countOneSchoolMedal',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getStudentMedalCount: function (request, callback) {
            $http({
                url: adminUrl + 'medal/countOneStudentMedal',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getWinners: function (request, callback) {
            $http({
                url: adminUrl + 'medal/getMedalsBySport',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getStatsForStudent: function (request, callback) {
            $http({
                url: adminUrl + 'studentstats/getStudentStatByFilters',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getStatsForSchool: function (request, callback) {
            $http({
                url: adminUrl + 'studentstats/getSchoolStatByFilters',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getStatsForTeam: function (request, callback) {
            $http({
                url: adminUrl + 'studentstats/getTeamStatByFilters',
                method: 'POST',
                withCredentials: true,
                data: request
            }).success(callback);
        },

        getAgegroup: function (callback) {
            $http({
                url: adminUrl + 'agegroup/getAll',
                method: 'POST'
            }).success(callback);
        },

        countStudent: function (callback) {
            $http({
                url: adminUrl + 'student/countStudent',
                method: 'POST'
            }).success(callback);
        },

        countTeam: function (callback) {
            $http({
                url: adminUrl + 'team/countTeam',
                method: 'POST'
            }).success(callback);
        },

        filterStud: function (data, callback) {
            $http({
                url: adminUrl + 'school/filterStud',
                method: 'POST',
                data: data
            }).success(callback);
        },

        filterCategoryBySport: function (request, callback) {
            $http({
                url: adminUrl + 'sport/filterCategoryForFrontend',
                method: 'POST',
                data: request
            }).success(callback);
        },

        filterCategoryForFrontendGender: function (request, callback) {
            $http({
                url: adminUrl + 'sport/filterCategoryForFrontendGender',
                method: 'POST',
                data: request
            }).success(callback);
        },

        filterAgegroupBySport: function (request, callback) {
            $http({
                url: adminUrl + 'sport/filterAgegroupForFrontend',
                method: 'POST',
                data: request
            }).success(callback);
        },

        getFolders: function (request, callback) {
            $http({
                url: adminUrl + 'media/getFolders',
                method: 'POST',
                data: request
            }).success(callback);
        },

        getSportRoundKnockout: function (request, callback) {
            $http({
                url: adminUrl + 'knockout/getSportRoundKnockout',
                method: 'POST',
                data: request
            }).success(callback);
        },

        getSportRoundHeat: function (request, callback) {
            $http({
                url: adminUrl + 'heat/getSportRoundHeat',
                method: 'POST',
                data: request
            }).success(callback);
        },

        // apiCallWithData: function (url, formData, callback) {
        //     $http.post(adminUrl2 + url, formData).then(function (data) {
        //         data = data.data;
        //         callback(data);

        //     });
        // },

        getSportRoundLeague: function (request, callback) {
            $http({
                url: adminUrl + 'league/getSportRoundLeague',
                method: 'POST',
                data: request
            }).success(callback);
        },

        getMedal: function (formData, callback) {
            $http.post(adminUrl + 'medal/getStudentMedal', formData).success(callback);
        },

        pdfGenerate: function (formData, callback) {
            $http.post(adminUrl + 'student/generatePdf', formData).then(function (data) {
                data = data.data;
                _.each(data.data, function (n) {
                    window.open(n);

                });
                // window.open(data.url);
            });
            //   $window.open(data.url);
        },

        getLimitedMedia: function (request, callback) {
            $http({
                url: adminUrl + 'media/getLimitedMedia',
                method: 'POST',
                data: request
            }).success(callback);
        },
        setSfaCity: function (sfaCity) {
            $.jStorage.set("sfaCity", sfaCity, {
                TTL: 86400000
            });
        },
        getOneRuleBySportsName: function (name, callback) {
            $http({
                url: adminUrl + 'CityRule/getOneRuleBySportsName',
                method: 'POST',
                data: name
            }).success(callback);
        },
        getAllLiveUpdatedData: function (url, callback) {
            $http({
                url: adminUrl + url,
                method: 'POST'
            }).success(callback);
        },
        getSponsor: function (url, callback) {
            $http.post(url).then(callback);
        },
    };
});

//**********NEW MODULE Form Registration***********//

//         getSchoolName: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'school/getAllSchoolDetails',
//                 method: 'POST',
//                 data: request
//             }).success(callback);
//         },

//         getSchoolSFA: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'school/search',
//                 method: 'POST',
//                 data: {
//                     keyword: request
//                 },
//             }).success(callback);
//         },

//         getAtheleteSFA: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'student/search',
//                 method: 'POST',
//                 data: {
//                     keyword: request
//                 },
//             }).success(callback);
//         },

//         //**********NEW MODULE SPORTS REGISTRATION***********//

//         login: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'login/login',
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },

//         setUser: function (data) {
//             $.jStorage.set("userDetails", data, {
//                 TTL: 86400000
//             });
//         },
//         setTeamid: function (id) {
//             $.jStorage.set("teamId", id);
//             $.jStorage.set("tempTeamId", id);
//         },
//         setVariable: function (flag) {
//             $.jStorage.set("flag", flag);
//         },

//         editTeamId: function (id) {
//             $.jStorage.set("editTeamId", id);
//         },
//         setSportId: function (data) {
//             $.jStorage.set("sportId", data);
//         },
//         setAgeTitle: function (data) {
//             $.jStorage.set("ageTitle", data);
//         },
//         setGender: function (data) {
//             $.jStorage.set("gender", data);
//         },
//         setSportTitle: function (data) {
//             $.jStorage.set("sportTitle", data);
//         },
//         setUserType: function (data) {
//             $.jStorage.set("userType", data);
//         },

//         setUserSchool: function (schoolName) {
//             $.jStorage.set("schoolName", schoolName);
//         },
//         setSportTeamMembers: function (teamMember) {
//             $.jStorage.set("sportTeamMember", teamMember);
//         },
//         setSfaCity: function (sfaCity) {
//             $.jStorage.set("sfaCity", sfaCity);
//         },

//         // logoutCandidate: function (callback) {
//         //     var requestObjUserType = {};
//         //     var logoutObj = {};
//         //     if ($.jStorage.get("userType") !== null && $.jStorage.get("userDetails") !== null) {
//         //         if ($.jStorage.get("userType") == "school") {
//         //             requestObjUserType.schoolToken = $.jStorage.get("userDetails").accessToken;
//         //             this.logoutCommonFun(requestObjUserType, function (data) {
//         //                 logoutObj.isLoggedIn = data;
//         //                 callback(logoutObj);
//         //             });
//         //         } else {
//         //             requestObjUserType.athleteToken = $.jStorage.get("userDetails").accessToken;
//         //             this.logoutCommonFun(requestObjUserType, function (data) {
//         //                 logoutObj.isLoggedIn = data;
//         //                 callback(logoutObj);
//         //             });
//         //         }
//         //     }
//         // },

//         // logoutCommonFun: function (logData, callback) {
//         //     var returnObj = '';
//         //     this.logout(logData, function (data) {
//         //         if (data.value) {
//         //             returnObj = false;
//         //             callback(returnObj);
//         //         } else {
//         //             returnObj = true;
//         //             callback(returnObj);
//         //         }
//         //     });
//         // },

//         logout: function (request, callback) {
//             $.jStorage.flush();
//             $http({
//                 url: adminUrl2 + 'login/logout',
//                 method: 'POST',
//                 data: request
//             }).success(callback);
//         },

//         forgotPassword: function (request, url, callback) {
//             $http({
//                 url: adminUrl2 + url,
//                 method: 'POST',
//                 withCredentials: true,
//                 data: request
//             }).then(callback);
//         },

//         changePassword: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'login/changePassword',
//                 method: 'POST',
//                 withCredentials: true,
//                 data: request
//             }).then(callback);
//         },

//         getAllSportsListSubCategory: function (callback) {
//             $http({
//                 url: adminUrl2 + 'SportsListSubCategory/getAll',
//                 method: 'POST'
//             }).then(callback);
//         },

//         getSportsRules: function (id, callback) {
//             var data = {
//                 _id: id
//             };
//             $http({
//                 url: adminUrl2 + 'SportsListSubCategory/getRules',
//                 method: 'POST',
//                 data: data
//             }).then(callback);
//         },

//         getOneRuleBySportsName: function (name, callback) {
//             var data = {
//                 sportName: name
//             };
//             $http({
//                 url: adminUrl2 + 'SportsListSubCategory/getOneRuleBySportsName',
//                 method: 'POST',
//                 data: data
//             }).then(callback);
//         },

//         getSports: function (id, callback) {
//             $http({
//                 url: adminUrl2 + 'SportsListSubCategory/getSports',
//                 method: 'POST',
//                 data: id
//             }).then(callback);
//         },

//         getOneSportForRegistration: function (data, url, callback) {
//             $http({
//                 url: adminUrl2 + url,
//                 method: 'POST',
//                 data: data
//             }).then(callback);
//         },

//         getAthletePerSchool: function (request, url, callback) {
//             $http({
//                 url: adminUrl2 + url,
//                 //    url: adminUrl2 + 'sport/getAthletePerSchool',
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },
//         getIndividualAthlete: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'IndividualSport/getAthletePerSchool',
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },
//         teamConfirm: function (request, callback) {
//             var url = '';
//             if ($.jStorage.get("editTeamId") !== null) {
//                 url = 'teamSport/editSaveTeam';
//             } else {
//                 url = 'teamSport/teamConfirm';
//             }
//             $http({
//                 url: adminUrl2 + url,
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },
//         individualConfirm: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'individualSport/saveInIndividual',
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },
//         getEvents: function (request, callback) {
//             // var data = {
//             //     _id: id
//             // };
//             $http({
//                 url: adminUrl2 + 'SportsListSubCategory/getEvents',
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },
//         success: function () {
//             var defer = $q.defer();
//             $timeout(function () {
//                 $log.info('resolve');
//                 defer.resolve({
//                     msg: 'SUCCESS'
//                 });
//             }, standardDelay);
//             return defer.promise;
//         },
//         // error: function () {
//         //     var defer = $q.defer();
//         //     $timeout(function () {
//         //         $log.info('error');
//         //         defer.reject({
//         //             msg: 'ERROR'
//         //         });
//         //     }, standardDelay);
//         //     return defer.promise;
//         // },
//         // endless: function () {
//         //     var defer = $q.defer();
//         //     return defer.promise;
//         // }
//         //get subCategory Type Basic Details
//         getSportDetails: function (subCategoryId, callback) {
//             $http({
//                 url: adminUrl2 + 'SportsListSubCategory/getSportsDeails',
//                 method: 'POST',
//                 data: subCategoryId
//             }).then(function (data) {
//                 if (data.data.value) {
//                     callback(data.data);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         },
//         getAllRegisteredSport: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'RegisteredSports/getAllRegisteredSport',
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },
//         getDetailRegisteredSport: function (request, callback) {
//             $http({
//                 url: adminUrl2 + 'RegisteredSports/getDetailRegisteredSport',
//                 method: 'POST',
//                 data: request
//             }).then(callback);
//         },
//         editDetails: function (id, callback) {
//             $http({
//                 url: adminUrl2 + 'Login/editAccess',
//                 method: 'POST',
//                 data: id
//             }).then(callback);
//         },
//         editTeam: function (id, callback) {
//             $http({
//                 url: adminUrl2 + 'teamsport/editTeam',
//                 method: 'POST',
//                 data: id
//             }).then(callback);
//         },
//         getDetail: function (callback) {
//             $http({
//                 url: adminUrl2 + 'ConfigProperty/getDetail',
//                 method: 'POST'
//             }).then(callback);
//         }
//     };
// });