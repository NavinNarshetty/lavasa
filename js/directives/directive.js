firstApp.directive('mycircle', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            var amount = 1;
            var myinterval = {};
            $element.ready(function () {
                $element.hover(function () {
                    clearInterval(myinterval);
                }, function () {


                    myinterval = setInterval(function () {
                        var $element = $(element);
                        var $elementli = $element.children("li");
                        $abc = $elementli;



                        amount++;
                        var elewidth = $elementli.eq(0).width();
                        //                        console.log(elewidth);
                        var num = amount % elewidth;
                        if (num === 0 && amount > 0) {
                            amount = -15;
                            //                            console.log(amount);
                            var $firstelement = $elementli.eq(0);
                            $element.append("<li>" + $firstelement.html() + "</li>");
                            $firstelement.eq(0).remove();
                        }



                        for (var i = 0; i < $elementli.length; i++) {
                            $elementli.eq(i).css("transform", "translateX(" + (-1 * amount) + "px)");
                            $elementli.eq(i).css("-webkit-transform", "translateX(" + (-1 * amount) + "px)");
                            $elementli.eq(i).css("-moz-transform", "translateX(" + (-1 * amount) + "px)");
                            $elementli.eq(i).css("-ms-transform", "translateX(" + (-1 * amount) + "px)");
                            $elementli.eq(i).css("-o-transform", "translateX(" + (-1 * amount) + "px)");
                        }

                    }, 20);

                });

                $element.trigger("mouseleave");


            });

        }
    };
});

firstApp.run(function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
        });
    }, false);
});

firstApp.directive('giveitmargin', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            $element = $(element);
            var i = 0;

            function addmarginleft(j) {
                $("ul.menu-list").css("margin-left", 0);
                var windowwidth = $(window).width();
                var navigationlogowidth = $(".logoli").width();
                var leftcomp = $(".logoli").position();
                var marginleft = ((windowwidth - navigationlogowidth) / 2) - leftcomp.left;
                if (j == i) {

                    $("ul.menu-list").css("margin-left", marginleft);
                }
            }
            $element.find("img").load(function () {
                addmarginleft(++i);
            });
            $(window).resize(function () {
                addmarginleft(++i);
            });
        }
    };
});

firstApp.directive('giveitmargin', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            $element = $(element);
            var i = 0;

            function addmarginleft(j) {
                $("ul.menu-list").css("margin-left", 0);
                var windowwidth = $(window).width();
                var navigationlogowidth = $(".logoli").width();
                var leftcomp = $(".logoli").position();
                var marginleft = ((windowwidth - navigationlogowidth) / 2) - leftcomp.left;
                if (j == i) {

                    $("ul.menu-list").css("margin-left", marginleft);
                }
            }
            $element.find("img").load(function () {
                addmarginleft(++i);
            });
            $(window).resize(function () {
                addmarginleft(++i);
            });
        }
    };
});

firstApp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                // $element.after("<img src='img/loading.gif' class='loading' />");
                $element.after("<img src='img/noimage.png' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});

firstApp.directive('mychart', function ($compile, $parse) {
    return {
        restrict: 'C',
        replace: false,
        link: function ($scope, element, attrs) {
            $(element).mychart();
        }
    };
});

firstApp.directive('fancyboxBox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                overflow: 'hidden',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstApp.directive('fancybox', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            $element = $(element);
            console.log("Checking Fancybox");
            setTimeout(function () {
                $(".various").fancybox({
                    maxWidth: 800,
                    maxHeight: 600,
                    fitToView: false,
                    overflow: 'hidden',
                    width: '70%',
                    height: '70%',
                    autoSize: false,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none'
                });
            }, 100);
        }
    };
});

firstApp.directive('hovericon', function ($document) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'views/directive/hovericon.html',
        scope: {
            game: '='
        },
        link: function (scope, element, attr) {

            var ishover;
            var $element = $(element);
            if (scope.game.grey) {
                $element.addClass("grey");
            } else {
                var $top = $element.children(".top");
                var $bottom = $element.children(".bottom");
                $bottom.width($top.width());

                $element.hover(function () {
                    $element.addClass("bigger");
                }, function () {
                    $element.removeClass("bigger");
                    $bottom.width($top.width());
                });
            }
        }

    };
});

firstApp.directive('scores', function ($document) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: "views/directive/score.html",
        link: function (scope, element, attr) {
            // console.info(scope.person);
        }
    };
});

firstApp.directive('draw', function ($document, $state) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: "views/directive/draw-list.html",
        scope: {
            knockout: '='
        },
        link: function ($scope, element, attr) {
            // console.info(scope.person);
            var sfastate = "";
            $scope.profiles = function (participantType, id) {
                console.log(participantType, id);
                if (participantType == 'player') {
                    sfastate = 'student-profile';
                } else {
                    sfastate = 'team-detail';
                }
                $state.go(sfastate, {
                    id: id
                });
            };
        }
    };
});

firstApp.directive('autoHeight', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            var addHeight = function () {
                $element.css("min-height", windowHeight);
            };
            addHeight();
        }
    };
});

firstApp.directive('fancyboxButton', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            $element = $(element);
            console.log("Checking Fancybox");
            setTimeout(function () {
                $(".varies").fancybox({
                    maxWidth: 800,
                    maxHeight: 600,
                    fitToView: false,
                    overflow: 'auto',
                    width: '70%',
                    height: '70%',
                    autoSize: false,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none'
                });
            }, 100);
        }
    };
});

firstApp.directive('uploadImage', function ($http, $filter, $timeout) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            console.log($scope.model);
            $scope.showImage = function () {};
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple == "true") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {
                console.log(newVal, oldVal);
                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        console.log(oldVal, newVal);
                        console.log(newVal.length);
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
                $scope.uploadStatus = "removed";
            };
            $scope.removeImage = function (index) {
                $scope.image = [];
                $scope.model.splice(index, 1);
                _.each($scope.model, function (n) {
                    $scope.image.push({
                        url: n
                    });
                });
            };

            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.file.name);
                $http.post(uploadUrl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function (data) {
                    data = data.data;
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {
                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data[0], ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "image";
                        }
                        $scope.model = data.data[0];
                        console.log($scope.model, 'model means blob');

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 100);

                });
            };
        }
    };
});

firstApp.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});

// firstApp.directive('uploadImage2', function ($http, $filter) {
//     // console.log(file-types);
//     return {
//         templateUrl: 'views/directive/uploadFile2.html',
//         scope: {
//             model: '=ngModel',
//             callback: '=ngCallback',
//             // mymodel: '=ngModel'
//             filetype: '=fileTypes'
//         },
//         link: function ($scope, element, attrs) {
//             $scope.isMultiple = false;
//             $scope.inObject = false;
//             if ($scope.filetype) {
//                 $scope.types = $scope.filetype.split(',');
//             }
//             if (attrs.multiple || attrs.multiple === "") {
//                 $scope.isMultiple = true;
//                 $("#inputImage").attr("multiple", "ADD");
//             }
//             if (attrs.noView || attrs.noView === "") {
//                 $scope.noShow = true;
//             }
//             $scope.$watch("image", function (newVal, oldVal) {
//                 if (newVal && newVal.file) {
//                     $scope.upload(newVal);
//                 }
//             });
//             if ($scope.model) {
//                 if (_.isArray($scope.model)) {
//                     $scope.image = [];
//                     _.each($scope.model, function (n) {
//                         $scope.image.push({
//                             url: $filter("serverimage2")(n)
//                         });
//                     });
//                 } else {
//                     $scope.image = {};
//                     $scope.image.url = $filter("serverimage2")($scope.model);
//                 }

//             }
//             if (attrs.inobj || attrs.inobj === "") {
//                 $scope.inObject = true;
//             }
//             $scope.clearOld = function () {
//                 $scope.model = [];
//             };
//             $scope.removeImage = function (index) {
//                 $scope.image = [];
//                 $scope.model.splice(index, 1);
//                 _.each($scope.model, function (n) {
//                     $scope.image.push({
//                         url: $filter("serverimage2")(n)
//                     });
//                 });
//             };
//             $scope.upload = function (image) {
//                 // console.log(filetype);
//                 if (_.findIndex($scope.types, function (key) {
//                         return image.file.type === key;
//                     }) !== -1) {
//                     // console.log('andar hain')
//                     // if (image.file.type == "image/png" || image.file.type == "image/jpeg") {
//                     // $scope.uploadStatus = "uploading";
//                     // console.log("AAAA", image.file.size);
//                     if (image.file.size > 1000000) {
//                         $scope.callback('Please Upload File Size Upto 1 MB', null);
//                     } else {
//                         $scope.callback('Uploading', null);
//                         var Template = this;
//                         image.hide = true;
//                         var formData = new FormData();
//                         formData.append('file', image.file, image.name);
//                         $http.post(uploadUrl2, formData, {
//                             headers: {
//                                 'Content-Type': undefined
//                             },
//                             transformRequest: angular.identity
//                         }).success(function (data) {
//                             if ($scope.callback) {
//                                 $scope.model = data.data[0];
//                                 if (data.value) {
//                                     $scope.callback(null, data);
//                                 } else {
//                                     $scope.callback('Not Uploaded', data);
//                                 }
//                             } else {
//                                 if ($scope.isMultiple) {
//                                     if ($scope.inObject) {
//                                         $scope.model.push({
//                                             "image": data.data[0]
//                                         });
//                                     } else {
//                                         $scope.model.push(data.data[0]);
//                                     }
//                                 } else {
//                                     $scope.model = data.data[0];
//                                 }
//                             }
//                         });
//                     }
//                 } else {
//                     $scope.callback('Please upload png or jpg.', null);
//                 }
//             };
//         }
//     };
// });

firstApp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            var digits;

            function inputValue(val) {
                if (val) {
                    if (attr.type == "tel") {
                        digits = val.replace(/[^0-9\+\\]/g, '');
                    } else {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

firstApp.directive('inputDate', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            value: "=ngModel",
        },
        templateUrl: 'views/directive/date.html',
        link: function ($scope, element, attrs) {
            console.log("This is loaded atlease");
            $scope.data = {};
            console.log($scope.value);
            $scope.dateOptions = {
                dateFormat: "dd/mm/yy",
                changeYear: true,
                changeMonth: true,
                yearRange: "1900:-0"
            };
            if (!_.isEmpty($scope.value)) {
                $scope.data.dob = moment($scope.value).toDate();
            }
            $scope.changeDate = function (data) {
                console.log("ChangeDate Called");
                $scope.value = $scope.data.dob;
            };
        }
    };
});

firstApp.directive('onlyAlpha', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^a-zA-Z\s]+/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput; // or return Number(transformedInput)
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

firstApp.directive('alphaSpecial', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^a-zA-Z\s\-\.,"']+/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput; // or return Number(transformedInput)
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

firstApp.directive('touppercase', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue === undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            };
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});

firstApp.directive('capitalize', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                var capitalized = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            };
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});

firstApp.directive('rules', function ($document, $uibModal, $state, toastr) {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: "views/directive/rules.html",
        scope: {
            items: "=value"
        },
        link: function (scope, element, attr) {
            console.log('enter');

        }
    };
});
// firstApp.directive('onlyDigits', function () {
//     return {
//         require: 'ngModel',
//         restrict: 'A',
//         link: function (scope, element, attr, ctrl) {
//             var digits;

//             function inputValue(val) {
//                 if (val) {
//                     if (attr.type == "tel") {
//                         digits = val.replace(/[^0-9\+\\]/g, '');
//                     } else {
//                         digits = val.replace(/[^0-9\-\\]/g, '');
//                     }


//                     if (digits !== val) {
//                         ctrl.$setViewValue(digits);
//                         ctrl.$render();
//                     }
//                     return parseInt(digits, 10);
//                 }
//                 return undefined;
//             }
//             ctrl.$parsers.push(inputValue);
//         }
//     };
// });