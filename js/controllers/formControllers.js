var globalLinkSchool = schoolLink + "formregis";
var globalLinkSchoolAthlete = schoolLink + "formathlete";
var globalLinkCollege = collegeLink + "formregis";
var globalLinkCollegeAthlete = collegeLink + "formathlete";

firstApp.controller('RegisterCtrl', function ($scope, $uibModal, TemplateService, NavigationService, $timeout, errorService, toastr) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("register");
    $scope.menutitle = NavigationService.makeactive("Register");
    TemplateService.header = "views/header2.html";
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    NavigationService.getDetail(function (data) {
        errorService.errorCode(data, function (allData) {
            console.log(allData);
            if (!allData.message) {
                if (allData.value === true) {
                    $scope.city = allData.data.city;
                    $scope.district = allData.data.district;
                    $scope.state = allData.data.state;
                    $scope.year = allData.data.year;
                    $scope.sfaCity = allData.data.sfaCity;
                    if (allData.data.type == 'school') {
                        $scope.isCollege = false;
                        $scope.type = allData.data.type;
                        $scope.registrationLink = globalLinkSchool;
                        $scope.athleteLink = globalLinkSchoolAthlete;
                    } else {
                        $scope.isCollege = true;
                        $scope.type = allData.data.type;
                        $scope.registrationLink = globalLinkCollege;
                        $scope.athleteLink = globalLinkCollegeAthlete;
                    }
                }
            } else {
                toastr.error(allData.message, 'Error Message');
            }
        });
    });
    $scope.menu = "menu-out";
    $scope.closeAge = false;
    $scope.closeReg = false;
    $scope.regisBenModal = function (type, sfaCity, year) {
        $scope.type = type;
        $scope.sfaCity = sfaCity;
        $scope.year = year;
        if (type == 'school') {
            $scope.isCollege = false;
        } else {
            $scope.isCollege = true;
        }

        $scope.errInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            templateUrl: "views/modal/registerbenefits.html",
            size: 'lg'
        });
    };
    $scope.athBenModal = function (type, sfaCity, year) {
        $scope.type = type;
        $scope.sfaCity = sfaCity;
        $scope.year = year;
        if (type == 'school') {
            $scope.isCollege = false;
        } else {
            $scope.isCollege = true;
        }
        $scope.errInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            templateUrl: "views/modal/athletebenefits.html",
            size: 'lg'
        });
    };
    $scope.getMenu = function () {
        $(".side-menu").addClass("menu-in");
        $(".side-menu").removeClass("menu-out");
        $scope.closeReg = true;
    };
    $scope.closeMenu = function () {
        $(".side-menu").removeClass("menu-in");
        $(".side-menu").addClass("menu-out");
        $scope.closeReg = false;
    };

    $scope.getMenu1 = function () {
        $(".side-menu1").addClass("menu-in1 ");
        $(".side-menu1").removeClass("menu-out");
        $scope.closeAge = true;
    };

    $scope.closeMenu1 = function () {
        $(".side-menu1").removeClass("menu-in1 ");
        $(".side-menu1").addClass("menu-out");
        $scope.closeAge = false;
    };
});


firstApp.controller('FormathleteCtrl', function ($scope, TemplateService, $element, NavigationService, $timeout, $uibModal, GoogleAdWordsService, $location, $state, errorService, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("formathlete");
    $scope.menutitle = NavigationService.makeactive("Formathlete");
    TemplateService.header = "views/header2.html";
    TemplateService.footer = " ";
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.formData = {};
    NavigationService.getDetail(function (data) {
        errorService.errorCode(data, function (allData) {
            console.log(allData);
            if (!allData.message) {
                if (allData.value === true) {
                    $scope.city = allData.data.city;
                    $scope.district = allData.data.district;
                    $scope.state = allData.data.state;
                    $scope.formData.state = allData.data.state;
                    $scope.year = allData.data.year;
                    $scope.sfaCity = allData.data.sfaCity;
                    if (allData.data.type == 'school') {
                        $scope.isCollege = false;
                        $scope.type = allData.data.type;
                    } else {
                        $scope.isCollege = true;
                        $scope.type = allData.data.type;
                    }
                }
            } else {
                toastr.error(allData.message, 'Error Message');
            }
        });
    });
    $scope.changeitSchoolId = function (err, data) {
        console.log(err, data);
        if (err) {
            $scope.errorMsgpan = err;
            if (err == 'Please Upload File Size Upto 1 MB') {
                $scope.openUploadSizeModal();
                $timeout(function () {
                    $scope.uploadSizeInstances.close();
                }, 2000);
            }
            if (err == 'Please upload png or jpg.') {
                $scope.openUploadTypeModal();
                $timeout(function () {
                    $scope.uploadTypeInstances.close();
                }, 2000);
            }
        } else {
            $scope.errorMsgpan = " ";
            // $scope.errorMsgpan = "Successfully uploaded";
        }
    };
    $scope.changeitPhotograph = function (err, data) {
        console.log(err, data);
        if (err) {
            $scope.errorMsgpan = err;
            if (err == 'Please Upload File Size Upto 1 MB') {
                $scope.openUploadSizeModal();
                $timeout(function () {
                    $scope.uploadSizeInstances.close();
                }, 2000);
            }
            if (err == 'Please upload png or jpg.') {
                $scope.openUploadTypeModal();
                $timeout(function () {
                    $scope.uploadTypeInstances.close();
                }, 2000);
            }
        } else {
            $scope.errorMsgpan = " ";
            // $scope.errorMsgpan = "Successfully uploaded";
        }
    };
    $scope.changeitBirthImage = function (err, data) {
        console.log(err, data);
        if (err) {
            $scope.errorMsgpan = err;
            if (err == 'Please Upload File Size Upto 1 MB') {
                $scope.openUploadSizeModal();
                $timeout(function () {
                    $scope.uploadSizeInstances.close();
                }, 2000);
            }
            if (err == 'Please upload png or jpg.') {
                $scope.openUploadTypeModal();
                $timeout(function () {
                    $scope.uploadTypeInstances.close();
                }, 2000);
            }
        } else {
            $scope.errorMsgpan = " ";
            // $scope.errorMsgpan = "Successfully uploaded";
        }
    };
    $scope.changeitPhotoImage = function (err, data) {
        console.log(err, data);
        if (err) {
            $scope.errorMsgpan = err;
            if (err == 'Please Upload File Size Upto 1 MB') {
                $scope.openUploadSizeModal();
                $timeout(function () {
                    $scope.uploadSizeInstances.close();
                }, 2000);
            }
            if (err == 'Please upload png or jpg.') {
                $scope.openUploadTypeModal();
                $timeout(function () {
                    $scope.uploadTypeInstances.close();
                }, 2000);
            }
        } else {
            $scope.errorMsgpan = " ";
            // $scope.errorMsgpan = "Successfully uploaded";
        }
    };

    $scope.formData = {};
    $scope.formData.parentDetails = [];
    $scope.sportsLevelArray = [];
    $scope.sportsLevelArray.push({});
    $scope.m = 0;
    $scope.form = {};
    $scope.oneClick = false;
    //$scope.searchTerm = [];

    $scope.firstTime = 0;
    if ($scope.firstTime === 0) {
        $scope.formData.parentDetails.push({});
        $scope.firstTime++;
    }
    $scope.sfaId = '';
    $scope.schoolname = {};
    $scope.emailOtp = {};
    $scope.mobileOtp = {};
    $scope.showEmailOtpSuccess = {};
    $scope.showMobileOtpSuccess = {};

    //saves Athelete to database
    $scope.isDisabled = false;

    $scope.saveAthelete = function (formdata, formAthlete) { //formdata is data or body for this url
        console.log("Athlete data: ", formdata);
        // console.log('Value', $scope.isSchoolAdded(formdata));
        // $scope.isSchoolAdded(formdata);

        var isFormValid = function (form) {
            if (!form.atheleteSchoolIdImage) {
                $scope.openIdModal();
                $timeout(function () {
                    $scope.idInstances.close();
                }, 3000);
                // alert("School ID image is not uploaded");
                // return false;
            } else if (!form.photograph) {
                $scope.openPhotoModal();
                $timeout(function () {
                    $scope.photographInstances.close();
                }, 3000);
                // alert("Photograph not uploaded");
                // return false;
            } else if (!form.birthImage) {
                // alert("Birth proof is not uploaded");
                // return false;
                $scope.openBirthModal();
                $timeout(function () {
                    $scope.birthInstances.close();
                }, 3000);
            } else if (form.ageProof == "hello" && !form.photoImage) {
                // alert("Photo id not uploaded");
                // return false;
                $scope.openAgeModal();
                $timeout(function () {
                    $scope.ageInstances.close();
                }, 3000);
            } else {
                return true;
            }
        };
        var isRegistrationFee = function (form) {
            if (!form.registrationFee) {
                $scope.openPaymentModal();
                $timeout(function () {
                    $scope.paymentInstances.close();
                }, 3000);
            } else {
                return true;
            }
        };

        var isSchoolAdded = function (form) {
            console.log('enter', form);
            if (form.school || (form.atheleteSchoolName && form.atheleteSchoolLocality && form.atheleteSchoolContact)) {
                console.log('enter true');
                return true;
            } else {
                console.log('enter false');
                $scope.openSchoolModal();
                $timeout(function () {
                    $scope.schoolInstances.close();
                }, 3000);
                // return false;

            }
        };
        if (!isSchoolAdded(formdata)) {
            return;
        }
        if (!isFormValid(formdata)) {
            return;
        }
        // if ($scope.isSchoolAdded(formdata) == false) {
        //     console.log('Value', $scope.isSchoolAdded(formdata));
        //     // alert("Please select the school or enter all school details manually.");
        //     // return;
        // }
        if (!isRegistrationFee(formdata)) {
            return;
        }

        console.log("form", formdata);
        var sportLevelArray = [];

        if (formdata.school && formdata.schoolName) {
            formdata.school = "";
        }

        // console.log('tnc', formdata.termsAndCondition);
        if (formdata.termsAndCondition === undefined || formdata.termsAndCondition === false) {
            $scope.showTerm = true;

        } else {
            $scope.showTerm = false;
        }
        formdata.sfaId = $scope.sfaId;
        formdata.age = $scope.age;
        formdata.school = $scope.schoolname;
        if (_.isEmpty($location.search())) {
            $scope.extras = {};
        } else {
            $scope.extras = $location.search();
            console.log($scope.extras);
            formdata.utm_medium = $scope.extras.utm_medium;
            formdata.utm_source = $scope.extras.utm_source;
            formdata.utm_campaign = $scope.extras.utm_campaign;
            console.log(formdata);
        }

        if (formdata.university == 'Other') {
            if (formdata.universities) {
                formdata.university = formdata.universities;
            } else {
                toastr.error('Please Enter University.');
            }
        } else {
            delete formdata.universities;
        }

        if (formdata.course == 'Other') {
            if (formdata.courses) {
                formdata.course = formdata.courses;
            } else {
                toastr.error('Please Enter course.');
            }
        } else {
            delete formdata.courses;
        }

        if (formdata.faculty == 'Other') {
            if (formdata.faculties) {
                formdata.faculty = formdata.faculties;
            } else {
                toastr.error('Please Enter Faculty.');
            }
        } else {
            delete formdata.faculties;
        }

        $scope.url = "Athelete/saveAthelete";
        console.log($scope.url);
        console.log(formdata);
        if (formAthlete.$valid && $scope.showTerm === false) {
            if ($scope.showEmailOtpSuccess === false && $scope.showMobileOtpSuccess === false) {
                $scope.isDisabled = true;
                console.log('google', formdata);
                // NavigationService.apiCallWithData($scope.url, formdata, function (data) {
                //     if (data.value === true) {
                //         console.log("registrationFee", data.data[0].registrationFee);
                //         console.log("value", data.value);
                //         if (data.data[0].registrationFee == "online PAYU") {
                //             var id = data.data[0]._id;
                //             console.log("true and in payment", id);
                //             var url = "payU/atheletePayment?id=" + id;
                //             window.location.href = adminUrl2 + url;
                //         } else {
                //             console.log("opening modal");
                //             $scope.openModal();
                //         }
                //     } else {
                //         $scope.isDisabled = false;
                //         if (data.error == 'Athlete Already Exist') {
                //             console.log("User Already Exist");
                //             $scope.openExistModal();
                //             $timeout(function () {
                //                 $scope.existInstances.close();
                //             }, 3000);
                //         } else {
                //             $scope.openErrModal();
                //             $timeout(function () {
                //                 $scope.errInstances.close();
                //             }, 3000);
                //         }
                //     }
                // });
            }
        } else {
            $scope.isDisabled = false;
            console.log("Enter all mandatory fields");
            $scope.openErrorModal();
            $timeout(function () {
                $scope.modalInstances.close();
            }, 3000);
        }

    };


    $scope.count = 0;

    $scope.checkMobileOTP = function (otp) {
        console.log("opt", $scope.mobileOtp, otp);
        console.log(typeof otp, typeof $scope.mobileOtp);

        var otpCheck = otp.toString();
        console.log("length", otpCheck.length);
        if (otpCheck.length == 4) {

            if (_.isEqual($scope.mobileOtp, otpCheck)) {
                console.log("email OTP verified");
                $scope.showMobileOtpSuccess = false;
            } else {
                $scope.showMobileOtpSuccess = true;
            }
        } else if (otpCheck.length == 3) {
            otpCheck = "0" + otpCheck;
            console.log("otpCheck", otpCheck);
            if (_.isEqual($scope.emailOtp, otpCheck)) {
                console.log("email OTP verified");
                $scope.showMobileOtpSuccess = false;

            } else {
                $scope.showMobileOtpSuccess = true;
            }
        }
    };



    $scope.checkEmailOTP = function (otp) {
        console.log("opt", $scope.emailOtp, otp);
        console.log(typeof otp, typeof $scope.emailOtp);

        var otpCheck = otp.toString();
        console.log("length", otpCheck.length);
        if (otpCheck.length == 4) {

            if (_.isEqual($scope.emailOtp, otpCheck)) {
                // $(' .verify-otp-regis').html('<i class="fa fa-check"></i>').css("color", "green");
                console.log("email OTP verified");
                $scope.showEmailOtpSuccess = false;

            } else {
                // alert("Incorrect OTP!");
                // $(' .verify-otp-regis').html('<i class="fa fa-times"></i>').css("color", "red");
                $scope.showEmailOtpSuccess = true;
            }
        } else if (otpCheck.length == 3) {
            otpCheck = "0" + otpCheck;
            console.log("otpCheck", otpCheck);
            if (_.isEqual($scope.emailOtp, otpCheck)) {
                // $(' .verify-otp-regis').html('<i class="fa fa-check"></i>').css("color", "green");
                console.log("email OTP verified");
                $scope.showEmailOtpSuccess = false;

            } else {
                // alert("Incorrect OTP!");
                // $(' .verify-otp-regis').html('<i class="fa fa-times"></i>').css("color", "red");
                $scope.showEmailOtpSuccess = true;
            }
        }
    };

    $scope.ageCalculate = function (birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        $scope.age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return $scope.age;
    };

    $scope.sendMobileOTP = function (mobile) {
        var formData = {};
        console.log("form", formData);
        $scope.url = "athelete/generateMobileOTP";
        console.log($scope.url);
        formData.mobile = mobile;
        NavigationService.apiCallWithData($scope.url, formData, function (data) {
            $scope.mobileOtp = data.data;
        });
    };
    $scope.sendEmailOTP = function (email) {
        var formData = {};
        console.log("form", email);
        $scope.url = "athelete/generateEmailOTP";
        console.log($scope.url);
        formData.email = email;
        NavigationService.apiCallWithData($scope.url, formData, function (data) {
            $scope.emailOtp = data.data;
        });
    };

    //search filter
    $scope.refreshChange = function (paramData) {
        NavigationService.getAtheleteSFA(paramData, function (data) {
            console.log("sfa", data);
            $scope.atheleList = data.data.results;

        });
    };

    $scope.searchChange = function (paramData) {
        console.log("changekeyword", paramData);
        $scope.sfaId = paramData;
    };

    $scope.searchChangeSchool = function (paramData) {
        console.log("changekeyword", paramData);
        $scope.schoolname = paramData;
    };
    $scope.refreshChangeSchool = function (paramData) {
        NavigationService.getSchoolSFA(paramData, function (data) {
            console.log("sfa 1", data);
            $scope.schoolList = data.data.results;
        });
    };

    $scope.getDataBasedonSFA = function (uiselCust) {
        console.log("inside get");
        if (uiselCust.schoolName == "----Otributor Group") {
            $scope.uiCarrierGroups = {
                name: "abc-ui"
            };
        } else {
            $scope.uiCarrierGroups = {
                name: "def-ui"
            };
        }
    };


    // //get school name for binding with dropdown
    // NavigationService.getSchoolName({}, function (data) {
    //     console.log("schoolName", data);
    //     $scope.schoolList = data.data;

    //     // console.log("schoolName", $scope.schoolName);
    // });

    // NavigationService.getAtheleteSFA("", function (data) {
    //     console.log("sfa", data);
    //     $scope.atheleList = data.data.results;
    //     // $scope.atheleList = data.data;
    // });

    //removes image uploaded
    $scope.removeProof = function (data, className) {
        console.log(className);
        $("." + className + " input").val("");
        delete $scope.formData.birthImage;
        $scope.show = 0;
    };
    $scope.removeProof1 = function (data, className) {
        console.log(className);
        $("." + className + " input").val("");
        delete $scope.formData.photoImage;
        $scope.show = 0;
    };

    $scope.removePhoto = function (data, className) {
        console.log(className);
        $("." + className + " input").val("");
        delete $scope.formData.photograph;
        $scope.show = 0;
    };
    $scope.removeImage = function (data, className) {
        console.log(className);
        $("." + className + " input").val("");
        delete $scope.formData.atheleteSchoolIdImage;
        $scope.show = 0;
    };

    $scope.addSportForm = function () {
        if ($scope.formData.parentDetails.length < 3) {

            $scope.formData.parentDetails.push({});
            console.log("sportsDepartment", $scope.formData.parentDetails);

        }
    };

    $scope.removeSportForm = function (index) {
        console.log("hello remove", index);
        if (index !== 0) {
            $scope.formData.parentDetails.splice(index, 1);
            console.log("sportsDepartment", $scope.formData.parentDetails);
        }
    };

    $scope.goto = function () {
        if ($scope.oneClick === false) {
            $scope.showSchool = !$scope.showSchool;
            $scope.oneClick = true;
        }
    };

    $scope.goToPrevious = function () {
        $scope.showSchool = !$scope.showSchool;
        $scope.formData.atheleteSchoolName = '';
        $scope.formData.atheleteSchoolLocality = '';
        $scope.formData.atheleteSchoolContact = '';
        $scope.oneClick = false;
    };

    // $scope.formData.sportLevel = _.chunk($scope.sportsLevelArray, 3);
    // $scope.addSportLevelForm = function () {
    //     if ($scope.sportsLevelArray.length <= 9) {
    //         $scope.sportsLevelArray.push({});
    //         $scope.formData.sportLevel = _.chunk($scope.sportsLevelArray, 3);

    //     }
    //     // console.log("sportsLevelArray", $scope.sportsLevelArray);

    // };
    // $scope.removeSportLevelForm = function (indexX, indexY) {
    //     if (indexX >= 0 && indexY >= 0) {
    //         if ($scope.sportsLevelArray.length > 1) {
    //             $scope.formData.sportLevel[indexX].splice(indexY, 1);
    //             $scope.sportsLevelArray = _.flatten($scope.formData.sportLevel);
    //         } else {
    //             $scope.sportsLevelArray = [];
    //             $scope.sportsLevelArray.push({});
    //             $scope.myshow = false;
    //             $scope.formData.played = 'no';
    //         }

    //         $scope.formData.sportLevel = _.chunk($scope.sportsLevelArray, 3);
    //     }
    // };


    // $scope.formData.sportLevel = _.chunk($scope.sportsLevelArray, 3);
    $scope.addSportLevelForm = function (index) {
        if ($scope.formData.sportLevel.length < 9) {
            $scope.formData.sportLevel.splice(index + 1, 0, {});
            // $scope.formData.sportLevel.push({});
        }
    };
    $scope.removeSportLevelForm = function (index) {
        _.pullAt($scope.formData.sportLevel, index);
    };
    $scope.showLevels = function (value) {
        if (value) {
            $scope.formData.sportLevel = [{}];
        } else {
            $scope.formData.sportLevel = [];
        }
    };


    $scope.test = function (size) {

        $scope.testModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modal/modsub.html',
            scope: $scope,
            size: size,
            windowClass: "test-modal"

        });
    };
    $scope.athBenModal = function (type, sfaCity, year) {
        $scope.type = type;
        $scope.sfaCity = sfaCity;
        $scope.year = year;
        if (type == 'school') {
            $scope.isCollege = false;
        } else {
            $scope.isCollege = true;
        }
        $scope.errInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            templateUrl: "views/modal/athletebenefits.html",
            size: 'lg'
        });
    };
    $scope.termcondition = function (size) {

        $scope.termconditionModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modal/terms.html',
            scope: $scope,
            size: size,
            windowClass: "termcondition-modal"

        });
    };
    $scope.openModal = function () {
        // $timeout(function () {
        fbq('track', 'CompleteRegistration');
        GoogleAdWordsService.sendRegisterCustomerConversion();
        // });
        var modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/thankyou.html"
        });
    };

    // $scope.redirectTo = function () {
    //     $scope.isDisabled1 = true;
    //     fbq('track', 'CompleteRegistration');
    //     GoogleAdWordsService.sendRegisterCustomerConversion();
    //     $state.go('register');
    // };

    $scope.openErrorModal = function () {
        $scope.modalInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/error.html"
        });
    };

    $scope.openErrModal = function () {
        $scope.errInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/err.html"
        });
    };

    $scope.openExistModal = function () {
        $scope.existInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorExist.html"
        });
    };

    $scope.openPaymentModal = function () {
        $scope.paymentInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorPayment.html"
        });
    };
    $scope.openSchoolModal = function () {
        $scope.schoolInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorSchool.html"
        });
    };

    $scope.openPhotoModal = function () {
        $scope.photographInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorPhoto.html"
        });
    };

    $scope.openBirthModal = function () {
        $scope.birthInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorBirth.html"
        });
    };

    $scope.openAgeModal = function () {
        $scope.ageInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorPhoto.html"
        });
    };

    $scope.openIdModal = function () {
        $scope.idInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorId.html"
        });
    };

    $scope.openUploadSizeModal = function () {
        $scope.uploadSizeInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorUploadSize.html"
        });
    };

    $scope.openUploadTypeModal = function () {
        $scope.uploadTypeInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorUploadType.html"
        });
    };

});

//form-regis
firstApp.controller('FormregisCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, GoogleAdWordsService, $location, $state, errorService, toastr) {
    //Used to name the .html file
    $scope.formData = {};
    NavigationService.getDetail(function (data) {
        errorService.errorCode(data, function (allData) {
            console.log(allData);
            if (!allData.message) {
                if (allData.value === true) {
                    $scope.city = allData.data.city;
                    $scope.district = allData.data.district;
                    $scope.state = allData.data.state;
                    $scope.formData.state = allData.data.state;
                    $scope.year = allData.data.year;
                    $scope.sfaCity = allData.data.sfaCity;
                    if (allData.data.type == 'school') {
                        $scope.isCollege = false;
                        $scope.type = allData.data.type;
                    } else {
                        $scope.isCollege = true;
                        $scope.type = allData.data.type;
                    }
                }
            } else {
                toastr.error(allData.message, 'Error Message');
            }
        });
    });
    $scope.changeitSchoolLogo = function (err, data) {
        console.log(err, data);
        if (err) {
            $scope.errorMsgpan = err;
            if (err == 'Please Upload File Size Upto 1 MB') {
                $scope.openUploadSizeModal();
                $timeout(function () {
                    $scope.uploadSizeInstances.close();
                }, 2000);
            }
            if (err == 'Please upload png or jpg.') {
                $scope.openUploadTypeModal();
                $timeout(function () {
                    $scope.uploadTypeInstances.close();
                }, 2000);
            }
        } else {
            $scope.errorMsgpan = " ";
            // $scope.errorMsgpan = "Successfully uploaded";
        }
    };
    $scope.changeitPhotograph = function (err, data) {
        console.log(err, data);
        if (err) {
            $scope.errorMsgpan = err;
            if (err == 'Please Upload File Size Upto 1 MB') {
                $scope.openUploadSizeModal();
                $timeout(function () {
                    $scope.uploadSizeInstances.close();
                }, 2000);
            }
            if (err == 'Please upload png or jpg.') {
                $scope.openUploadTypeModal();
                $timeout(function () {
                    $scope.uploadTypeInstances.close();
                }, 2000);
            }
        } else {
            $scope.errorMsgpan = " ";
            // $scope.errorMsgpan = "Successfully uploaded";
        }
    };
    $scope.formData.sportsDepartment = [];
    $scope.sportDepart = {
        name: "",
        designation: "",
        email: "",
        photo: "",
        mobile: ""
    };
    // $scope.dateOptions = {
    //     changeYear: true,
    //     changeMonth: true,
    //     yearRange: '1900:-0',
    //     dateFormat: "dd/mm/yy"
    // };
    // $scope.menu = "menu-out";
    // $scope.getMenu = function () {
    //     if ($scope.menu == "menu-out") {
    //         $scope.menu = "menu-out";
    //     } else {
    //         $scope.menu = "menu-in";
    //     }
    // }

    $scope.formdata = {};

    $scope.openModal = function () {
        // $timeout(function () {
        fbq('track', 'CompleteRegistration');
        GoogleAdWordsService.sendRegisterCustomerConversion();
        // });
        var modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/thankyou.html"
        });
    };
    // $scope.redirectTo = function () {
    //     $scope.isDisabled1 = true;
    //     fbq('track', 'CompleteRegistration');
    //     GoogleAdWordsService.sendRegisterCustomerConversion();
    //     $state.go('register');
    // };

    $scope.openErrorModal = function () {
        $scope.modalInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/error.html"
        });
    };

    $scope.openErrModal = function () {
        $scope.errInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/err.html"
        });
    };
    $scope.regisBenModal = function (type, sfaCity, year) {
        $scope.type = type;
        $scope.sfaCity = sfaCity;
        $scope.year = year;
        if (type == 'school') {
            $scope.isCollege = false;
        } else {
            $scope.isCollege = true;
        }

        $scope.errInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            templateUrl: "views/modal/registerbenefits.html",
            size: 'lg'
        });
    };

    $scope.firstTime = 0;
    if ($scope.firstTime === 0) {
        $scope.formData.sportsDepartment.push($scope.sportDepart);
        $scope.firstTime++;
    }

    $scope.addSportForm = function () {
        if ($scope.formData.sportsDepartment.length < 3) {
            $scope.sportDepart = {
                name: null,
                designation: null,
                email: null,
                photo: null,
                mobile: null
            };
            $scope.formData.sportsDepartment.push($scope.sportDepart);
            console.log("sportsDepartment", $scope.formData.sportsDepartment);
        }
    };
    //    $scope.removeArrayImage = function (index) {
    //         console.log("remove me", document.getElementById("inputImage").value);
    //         $scope.formData.sportsDepartment[index].photograph = null;
    //     }

    $scope.removeSportForm = function (index) {
        console.log("hello remove", index);
        if (index !== 0) {
            $scope.formData.sportsDepartment.splice(index, 1);
            console.log("sportsDepartment", $scope.formData.sportsDepartment);
        }
    };
    $scope.teamSport = [];
    $scope.aquaticsSports = [];
    $scope.racquetSports = [];
    $scope.combatSports = [];
    $scope.targetSports = [];
    $scope.individualSports = [];
    $scope.sfaID = '';
    $scope.emailOtp = {};
    $scope.showOtpSuccess = {};

    // var isSportSelected = function (form) {
    //     if (formdata.teamSports.length > 0 || formdata.racquetSports.length > 0 || formdata.combatSports.length > 0 || formdata.targetSports.length > 0 || formdata.individualSports.length > 0 || formdata.aquaticsSports.length > 0) {
    //         $scope.showTeamSports = false;
    //     } else {
    //         console.log('enter');
    //         $scope.showTeamSports = true;
    //     }
    // }

    //save registerform to database
    $scope.isDisabled = false;
    $scope.saveRegis = function (formdata, formvalid) {
        formdata.teamSports = $scope.teamSport;
        formdata.racquetSports = $scope.racquetSports;
        formdata.combatSports = $scope.combatSports;
        formdata.targetSports = $scope.targetSports;
        formdata.individualSports = $scope.individualSports;
        formdata.aquaticsSports = $scope.aquaticsSports;
        formdata.sfaID = $scope.sfaID;

        $scope.value = {};

        // if (formdata.teamSports == '' || formdata.racquetSports == '' || formdata.combatSports == '' || formdata.targetSports == '' || formdata.individualSports == '' || formdata.aquaticsSports == '') {
        //     $scope.showTeamSports = true;
        // } else {
        //     $scope.showTeamSports = false;
        // }

        // if (formdata.teamSports == '') {
        //     $scope.showTeamSports = true;
        // } else
        // if (formdata.racquetSports == '') {
        //     $scope.showTeamSports = true;
        // } else if (formdata.combatSports == '') {
        //     $scope.showTeamSports = true;
        // } else if (formdata.targetSports == '') {
        //     $scope.showTeamSports = true;
        // } else if (formdata.individualSports == '') {
        //     $scope.showTeamSports = true;
        // } else if (formdata.aquaticsSports == '') {
        //     $scope.showTeamSports = true;
        // } else {
        //     $scope.showTeamSports = false;
        // }

        // if (formdata.teamSports != null || formdata.racquetSports != null || formdata.combatSports != null || formdata.targetSports != null || formdata.individualSports != null || formdata.aquaticsSports != null) {
        //     $scope.showTeamSports = false;
        // } else {
        //     console.log(enter);
        //     $scope.showTeamSports = true;
        // }
        if (formdata.teamSports.length > 0 || formdata.racquetSports.length > 0 || formdata.combatSports.length > 0 || formdata.targetSports.length > 0 || formdata.individualSports.length > 0 || formdata.aquaticsSports.length > 0) {
            $scope.showTeamSports = false;
        } else {
            console.log('enter');
            $scope.showTeamSports = true;
        }

        if (formdata.termsAndCondition === undefined || formdata.termsAndCondition === false) {
            $scope.showTerm = true;
        } else {
            $scope.showTerm = false;
        }
        if (_.isEmpty($location.search())) {
            $scope.extras = {};
        } else {
            $scope.extras = $location.search();
            console.log($scope.extras);
            formdata.utm_medium = $scope.extras.utm_medium;
            formdata.utm_source = $scope.extras.utm_source;
            formdata.utm_campaign = $scope.extras.utm_campaign;
        }

        if (formdata.affiliatedBoard == 'Other') {
            if (formdata.affiliatedBoards) {
                formdata.affiliatedBoard = formdata.affiliatedBoards;
            } else {
                toastr.error('Please Enter Affiliated Board.');
            }
        } else {
            delete formdata.affiliatedBoards;
        }

        $scope.url = "registration/saveRegistrationForm";
        console.log($scope.url);
        console.log('final data', formdata);
        if (formvalid.$valid && $scope.showTerm === false && $scope.showTeamSports === false) {
            if ($scope.showOtpSuccess === false) {
                $scope.isDisabled = true;
                NavigationService.apiCallWithData($scope.url, formdata, function (data) {
                    if (data.value === true) {
                        if (data.data.registrationFee == "online PAYU") {
                            var id = data.data._id;
                            console.log("true and in payment");
                            var url = "payU/schoolPayment?id=" + id;
                            window.location.href = adminUrl2 + url;
                        } else {
                            console.log("opening modal");
                            $scope.openModal();
                        }
                    } else {
                        $scope.isDisabled = false;
                        $scope.openErrModal();
                        $timeout(function () {
                            $scope.errInstances.close();
                        }, 3000);
                    }
                });
            }
        } else {
            $scope.isDisabled = false;
            console.log("Enter all mandatory fields");
            $scope.openErrorModal();
            $timeout(function () {
                $scope.modalInstances.close();
            }, 3000);
        }
    };
    // $scope.checkOTP = function (otp) {
    //     console.log("opt", $scope.emailOtp, otp);
    //     if ($scope.emailOtp == otp) {
    //         console.log("email OTP verified");
    //     } else {
    //         alert("Incorrect OTP!");
    //     }
    // }

    // $scope.checkOTP = function (otp) {
    //     console.log("opt", $scope.emailOtp, otp);
    //     if (_.isEqual($scope.emailOtp, otp)) {
    //         $(' .verify-otp-regis').html('<i class="fa fa-check"></i>').css("color", "green");
    //         console.log("email OTP verified");
    //     } else {
    //         alert("Incorrect OTP!");
    //         $(' .verify-otp-regis').html('<i class="fa fa-times"></i>').css("color", "red");
    //     }
    // }

    $scope.checkOTP = function (otp) {
        console.log("opt", $scope.emailOtp, otp);
        console.log(typeof otp, typeof $scope.emailOtp);

        var otpCheck = otp.toString();
        console.log("length", otpCheck.length);
        if (otpCheck.length == 4) {

            if (_.isEqual($scope.emailOtp, otpCheck)) {
                // $(' .verify-otp-regis').html('<i class="fa fa-check"></i>').css("color", "green");
                console.log("email OTP verified");
                $scope.showOtpSuccess = false;

            } else {
                // alert("Incorrect OTP!");
                // $(' .verify-otp-regis').html('<i class="fa fa-times"></i>').css("color", "red");
                $scope.showOtpSuccess = true;
            }
        } else if (otpCheck.length == 3) {
            otpCheck = "0" + otpCheck;
            console.log("otpCheck", otpCheck);
            if (_.isEqual($scope.emailOtp, otpCheck)) {
                // $(' .verify-otp-regis').html('<i class="fa fa-check"></i>').css("color", "green");
                console.log("email OTP verified");
                $scope.showOtpSuccess = false;

            } else {
                // alert("Incorrect OTP!");
                // $(' .verify-otp-regis').html('<i class="fa fa-times"></i>').css("color", "red");
                $scope.showOtpSuccess = true;
            }
        }

    };



    $scope.sendOTP = function (email) {
        var formdata = {};
        formdata.email = email;
        console.log("form", formdata);
        $scope.url = "registration/generateOTP";
        console.log($scope.url);
        NavigationService.apiCallWithData($scope.url, formdata, function (data) {
            $scope.emailOtp = data.data;
        });
    };

    $scope.termcondition = function (size) {

        $scope.termconditionModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modal/terms-school.html',
            scope: $scope,
            size: size,
            windowClass: "termcondition-modal"

        });
    };

    // $scope.addTeamSports = function (formdata) {
    //         // formdata.serviceRequest = $scope.serviceList;
    //         console.log("formdata", formdata);
    //         var frm = {};
    //         frm.name = formdata;
    //         //document.getElementById(formdata).checked
    //         $scope.teamSport.push(frm);

    //     }

    //team sports array
    $scope.addTeamSports = function (formdata) {
        var index = _.findIndex($scope.teamSport, function (n) {
            return n.name == formdata;
        });
        if (index >= 0) {
            _.pullAt($scope.teamSport, index);
        } else {
            $scope.teamSport.push({
                name: formdata
            });
        }
        console.log($scope.teamSport);
    };

    //racquet sports array
    $scope.addRacquetSports = function (formdata) {
        $scope.combatSports = [];
        $scope.targetSports = [];
        $scope.individualSports = [];
        var index = _.findIndex($scope.racquetSports, function (n) {
            return n.name == formdata;
        });
        if (index >= 0) {
            _.pullAt($scope.racquetSports, index);
        } else {
            $scope.racquetSports.push({
                name: formdata
            });
        }
    };

    //combatSports array
    $scope.addCombatSports = function (formdata) {
        var index = _.findIndex($scope.combatSports, function (n) {
            return n.name == formdata;
        });
        if (index >= 0) {
            _.pullAt($scope.combatSports, index);
        } else {
            $scope.combatSports.push({
                name: formdata
            });
        }
    };

    //targetSports array
    $scope.addTargetSports = function (formdata) {
        var index = _.findIndex($scope.targetSports, function (n) {
            return n.name == formdata;
        });
        if (index >= 0) {
            _.pullAt($scope.targetSports, index);
        } else {
            $scope.targetSports.push({
                name: formdata
            });
        }
    };

    //individualSports array
    $scope.addIndividualSports = function (formdata) {
        var index = _.findIndex($scope.individualSports, function (n) {
            return n.name == formdata;
        });
        if (index >= 0) {
            _.pullAt($scope.individualSports, index);
        } else {
            $scope.individualSports.push({
                name: formdata
            });
        }

    };
    //aquaticsSports array
    $scope.addAquaticsSports = function (formdata) {
        var index = _.findIndex($scope.aquaticsSports, function (n) {
            return n.name == formdata;
        });
        if (index >= 0) {
            _.pullAt($scope.aquaticsSports, index);
        } else {
            $scope.aquaticsSports.push({
                name: formdata
            });
        }
    };

    //called on refresh
    $scope.refreshSFA = function (paramData) {
        NavigationService.getSchoolSFA(paramData, function (data) {
            console.log("sfa regis", data);
            $scope.schoolList = data.data.results;
            //$scope.schoolList = data.data;
        });
    };

    //called on select for taking value
    $scope.searchSFA = function (paramData) {
        console.log("changekeyword", paramData);
        $scope.sfaID = paramData;
        console.log("sfaid", $scope.sfaID);
    };

    //get school name for binding with dropdown
    // NavigationService.getSchoolSFA("", function (data) {
    //     console.log("sfa regis", data);
    //     $scope.schoolList = data.data.results;
    //     //$scope.schoolList = data.data;
    // });


    $scope.template = TemplateService.changecontent("formregis");
    $scope.menutitle = NavigationService.makeactive("Form Registration");
    TemplateService.header = "views/header2.html";
    TemplateService.footer = "";
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.test = function (size) {

        $scope.testModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modal/modsub.html',
            scope: $scope,
            size: size,
            windowClass: "test-modal"

        });
    };

    $scope.openUploadSizeModal = function () {
        $scope.uploadSizeInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorUploadSize.html"
        });
    };

    $scope.openUploadTypeModal = function () {
        $scope.uploadTypeInstances = $uibModal.open({
            animation: true,
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            // size: 'sm',
            templateUrl: "views/modal/errorUploadType.html"
        });
    };

    //removes image uploaded
    $scope.removeImage = function (data, className) {
        // console.log("remove me", document.getElementById("inputImage").value);
        // $scope.formData.schoolLogo = null;
        console.log(className);
        $("." + className + " input").val("");
        delete $scope.formData.schoolLogo;
        $scope.show = 0;
    };
    $scope.removeArrayImage = function (index, className) {
        // console.log("remove me", document.getElementById("inputImage").value);
        // $scope.formData.sportsDepartment[index].photograph = null;
        console.log(className);
        $("." + className + " input").val("");
        console.log($scope.formData.sportsDepartment[index].photograph);
        delete $scope.formData.sportsDepartment[index].photograph;
        console.log($scope.formData.sportsDepartment[index].photograph);
        $scope.show = 0;
    };

});

firstApp.controller('PaymentSuccessCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("paymentSuccess");
    $scope.menutitle = NavigationService.makeactive("paymentSuccess");
    TemplateService.header = "views/header2.html";
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    fbq('track', 'CompleteRegistration');
    GoogleAdWordsService.sendRegisterCustomerConversion();
    // $scope.redirectTo = function () {
    //     $scope.isDisabled1 = true;
    //     $state.go('register');
    // };
    // window.setTimeout(function () {

    //     // Move to a new location or you can do something else
    //     window.location.href = adminUrl + "/register";

    // }, 10000);

});

firstApp.controller('SorryAtheleteCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("sorryAthelete");
    $scope.menutitle = NavigationService.makeactive("sorryAthelete");
    TemplateService.header = "views/header2.html";
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


    window.setTimeout(function () {

        // Move to a new location or you can do something else
        window.location.href = adminUrl + "/formathlete";

    }, 5000);

});

firstApp.controller('PaymentFailureCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("paymentFailure");
    $scope.menutitle = NavigationService.makeactive("paymentFailure");
    TemplateService.header = "views/header2.html";
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    window.setTimeout(function () {
        // Move to a new location or you can do something else
        window.location.href = adminUrl + "/formregis";

    }, 5000);

});