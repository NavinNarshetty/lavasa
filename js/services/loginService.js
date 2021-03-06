  firstApp.service('loginService', function ($http, TemplateService, $state, toastr, $uibModal, NavigationService) {
      this.loginGet = function (callback) {
          var getJ = $.jStorage.get("userDetails");
          var getData = {};
          if (getJ !== null) {
              console.log(getJ);
              getData.isLoggedIn = true;
              if ($.jStorage.get("userType") == "school") {
                  console.log(getJ);
                  getData.userType = 'school';
                  getData.sfaIdObj = getJ.sfaID;
                  getData.schoolName = getJ.schoolName;
                  getData.accessToken = getJ.accessToken;
                  if (getJ.mixAccess) {
                      getData.mixAccess = getJ.mixAccess;
                  }
                  NavigationService.setUserSchool(getData.schoolName);
              } else {
                  console.log(getJ);
                  getData.userType = 'athlete';
                  getData.firstName = getJ.firstName;
                  getData.surname = getJ.surname;
                  getData.sfaIdObj = getJ.sfaId;
                  getData.gender = getJ.gender;
                  getData.accessToken = getJ.accessToken;
                  if (getJ.mixAccess) {
                      getData.mixAccess = getJ.mixAccess;
                  }
                  if (getJ.atheleteSchoolName) {
                      getData.schoolName = getJ.atheleteSchoolName;
                      NavigationService.setUserSchool(getData.schoolName);
                  } else {
                      if (getJ.school) {
                          getData.schoolName = getJ.school.name;
                          NavigationService.setUserSchool(getData.schoolName);
                      }
                  }
              }
          } else {
              getData.isLoggedIn = false;
          }
          callback(getData);
      };

      this.logoutCandidate = function (callback) {
          var requestObjUserType = {};
          var logoutObj = {};
          if ($.jStorage.get("userType") !== null && $.jStorage.get("userDetails") !== null) {
              if ($.jStorage.get("userType") == "school") {
                  requestObjUserType.schoolToken = $.jStorage.get("userDetails").accessToken;
                  this.logoutCommonFun(requestObjUserType, function (data) {
                      logoutObj.isLoggedIn = data;
                      callback(logoutObj);
                  });
              } else {
                  requestObjUserType.athleteToken = $.jStorage.get("userDetails").accessToken;
                  this.logoutCommonFun(requestObjUserType, function (data) {
                      logoutObj.isLoggedIn = data;
                      callback(logoutObj);
                  });
              }
          }
      }

      this.logoutCommonFun = function (logData, callback) {
          var returnObj = '';
          NavigationService.logout(logData, function (data) {
              if (data.value) {
                  returnObj = false;
                  callback(returnObj);
              } else {
                  returnObj = true;
                  callback(returnObj);
              }
          });
      };

  });