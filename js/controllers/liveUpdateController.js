firstApp.controller('LiveUpdatesCtrl', function ($scope, $stateParams, $location, TemplateService, NavigationService, $timeout, cityService, toastr, $state, $uibModal, $interval) {
  $scope.template = TemplateService.changecontent("liveupdates");
  $scope.menutitle = NavigationService.makeactive("Live Updates");
  // TemplateService.header = "views/header2.html";
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  // ITIALISE VARIABLES
  $scope.drawObj = {
    institute: 'school',
  }
  $scope.calenderLink = '';
  cityService.getCurrentCity(function (response) {
    if (window.location.host == response.link1) {
      // $scope.drawObj.link = response.data.Mumbai;
      $scope.drawObj.college = true;
      $scope.calenderLink = '';
    } else if (window.location.host == response.link2) {
      // $scope.drawObj.link = response.data.Hyderabad;
      $scope.calenderLink = '';
      $scope.drawObj.college = true;
    } else if (window.location.host == response.link3) {
      // $scope.drawObj.link = response.data.Ahmedabad;
      $scope.drawObj.college = true;
      $scope.calenderLink = '';
    }
    $scope.drawObj.college = false;
  });
  // ITIALISE VARIABLES END

  // BANNER SWIPER INIT
  $scope.initSwiper = function () {
    $scope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        var liveupdateBanner = new Swiper('.liveupdate-bannerswiper .swiper-container', {
          slidesPerView: 1,
          direction: 'horizontal',
          loop: true,
          grabCursor: true,
          nextButton: '.liveupdate-bannernext',
          prevButton: '.liveupdate-bannerprev',
          touchEventsTarget: 'container',
        })
      }, 300);
    });
  };
  $scope.initSwiper();
  // BANNER SWIPER INIT END

  // BANNERS
  NavigationService.getAllEnabledBanner(function (responses) {
    console.log('data', responses);
    if (responses.value) {
      cityService.getCurrentCity(function (response) {
        if (window.location.host == response.link1) {
          $scope.banners = responses.data.Mumbai;
        } else if (window.location.host == response.link2) {
          $scope.banners = responses.data.Hyderabad;
        } else if (window.location.host == response.link3) {
          // $scope.banners = response.data.Ahmedabad;
        }
      });
    } else {
      console.log("Banner not found");
    }
  });

  // MOBILE BANNERS

  cityService.getCurrentCity(function (response) {
    if (window.location.host == response.link1) {
      $scope.bannerss = [{
        "img": "img/mobweb-2.jpg",
        "link": "http://mumbaischool.sfanow.in/register"
      }, {
        "img": "img/mobweb-3.jpg",
        "link": "http://mumbaicollege.sfanow.in/register"
      }, {
        "img": "img/mobweb-1.jpg",
        "link": "http://mumbaischool.sfanow.in/register"
      }, {
        "img": "img/mobweb-4.jpg",
        "link": "http://mumbaicollege.sfanow.in/register"
      }];
    } else if (window.location.host == response.link2) {
      $scope.bannerss = [{
        "img": "img/Hyderabad_4.jpg",
        "link": "http://hyderabadschool.sfanow.in/register"
      }, {
        "img": "img/Hyderabad_5.jpg",
        "link": "http://hyderabadschool.sfanow.in/register"
      }, {
        "img": "img/Hyderabad_6.jpg",
        "link": "http://hyderabadschool.sfanow.in/register"
      }];
    } else if (window.location.host == response.link3) {
      $scope.bannerss = [{
        "img": "img/mobweb-2.jpg",
        "link": "http://ahmedabadschool.sfanow.in/register"
      }, {
        "img": "img/mobweb-3.jpg",
        "link": "http://ahmedabadschool.sfanow.in/register"
      }, {
        "img": "img/mobweb-1.jpg",
        "link": "http://ahmedabadschool.sfanow.in/register"
      }];
    }
    // MOBILE BANNERS END
    // BANNERS END
  });


  //Rank Table school or College
  $scope.getRankTable = function () {
    $scope.url = 'LiveUpdate/getAllRankingTables';
    NavigationService.getAllLiveUpdatedData($scope.url, function (data) {
      console.log(data, "data");
      if (data.value) {
        if (data.data) {
          $scope.rankTables = _.groupBy(data.data, 'city');
          $scope.cityMumbai = _.cloneDeep($scope.rankTables.mumbai);
          $scope.cityHyderabad = _.cloneDeep($scope.rankTables.hyderabad);
          $scope.cityAhmedabad = _.cloneDeep($scope.rankTables.ahmedabad);
          $scope.cityMumbai = _.groupBy($scope.cityMumbai, 'institutionType');

          console.log("window.location.host", window.location.host);
          cityService.getCurrentCity(function (response) {
            if (window.location.host === response.link1) {
              //Mumbai
              if ($scope.cityMumbai.school || $scope.cityMumbai.college) {
                $scope.mumbaiSchool = _.cloneDeep($scope.cityMumbai.school);
                $scope.mumbaiCollege = _.cloneDeep($scope.cityMumbai.college);
                if ($scope.mumbaiSchool) {
                  $scope.schoolDate = $scope.mumbaiSchool[0].date;
                  $scope.rankTableSchool = $scope.mumbaiSchool[0].rankingTable;
                }
                if ($scope.mumbaiCollege) {
                  $scope.collegeDate = $scope.mumbaiCollege[0].date;
                  $scope.rankTableCollege = $scope.mumbaiCollege[0].rankingTable;
                  console.log("$scope.rankTableCollege ", $scope.rankTableCollege);
                }
              }

            } else if (window.location.host == response.link2) {
              //Hyderabad
              if ($scope.cityHyderabad.school || $scope.cityHyderabad.college) {
                $scope.hyderabadSchool = _.cloneDeep($scope.cityHyderabad.school);
                $scope.hyderabadCollege = _.cloneDeep($scope.cityHyderabad.college);
                if ($scope.hyderabadSchool) {
                  $scope.schoolDate = $scope.mumbaiSchool[0].date;
                  $scope.rankTableSchool = $scope.hyderabadSchool[0].rankingTable;
                }
                if ($scope.hyderabadCollege) {
                  $scope.collegeDate = $scope.mumbaiCollege[0].date;
                  $scope.rankTableCollege = $scope.hyderabadCollege[0].rankingTable;
                }

              }

            } else if (window.location.host == response.link3) {
              //Ahmedabad
              if ($scope.cityAhmedabad.school || $scope.cityAhmedabad.college) {
                $scope.ahmedabadSchool = _.cloneDeep($scope.cityAhmedabad.school);
                $scope.ahmedabadCollege = _.cloneDeep($scope.cityAhmedabad.college);
                if ($scope.ahmedabadSchool) {
                  $scope.schoolDate = $scope.mumbaiSchool[0].date;
                  $scope.rankTableSchool = $scope.ahmedabadSchool[0].rankingTable;
                }
                if ($scope.ahmedabadCollege) {
                  $scope.collegeDate = $scope.mumbaiCollege[0].date;
                  $scope.rankTableCollege = $scope.ahmedabadCollege[0].rankingTable;
                }

              }

            }
          });
        }
      }
    });
  };
  $scope.getRankTable();

  //live Videos
  $scope.getAllVideos = function () {
    $scope.url = 'LiveVideos/getAll';
    NavigationService.getAllLiveUpdatedData($scope.url, function (data) {
      if (data.value) {
        console.log("data.data", data.data);
        $scope.allVideos = _.groupBy(data.data, 'city');
        cityService.getCurrentCity(function (response) {
          if (window.location.host === response.link1) {
            // Mumbai
            $scope.allVideos = _.cloneDeep($scope.allVideos.mumbai);

          } else if (window.location.host === response.link2) {
            //Hyderabad
            $scope.allVideos = _.cloneDeep($scope.allVideos.hyderabad);
          } else if (window.location.host === response.link3) {
            //     //Ahmedabad
            $scope.allVideos = _.cloneDeep($scope.allVideos.ahmedabad);
          }

        });
        $scope.allVideos = _.chunk($scope.allVideos, 3);
        $scope.videoArr1 = _.cloneDeep($scope.allVideos[0]);
        $scope.videoArr2 = _.cloneDeep($scope.allVideos[1]);
      }
    });
  };
  $scope.getAllVideos();
  //special Events
  $scope.getSpecialEvents = function () {
    $scope.url = 'SpecialEvents/getAllSpecialEvents';
    NavigationService.getAllLiveUpdatedData($scope.url, function (data) {
      if (data.value) {
        $scope.specialEvents = _.groupBy(data.data, 'city');
        cityService.getCurrentCity(function (response) {
          if (window.location.host === response.link1) {
            // Mumbai
            $scope.specialEvents = _.cloneDeep($scope.specialEvents.mumbai);

          } else if (window.location.host === response.link2) {
            //Hyderabad
            $scope.specialEvents = _.cloneDeep($scope.specialEvents.hyderabad);
          } else if (window.location.host === response.link3) {
            //     //Ahmedabad
            $scope.specialEvents = _.cloneDeep($scope.specialEvents.ahmedabad);
          }

        });
        console.log($scope.specialEvents, "data");
      }

    });
  };
  $scope.getSpecialEvents();
  //Photo Album
  $scope.getPhotoAlbum = function () {
    $scope.url = 'LiveAlbum/getAllAlbums';
    NavigationService.getAllLiveUpdatedData($scope.url, function (data) {
      if (data.value) {

        $scope.phtoAlbum = _.groupBy(data.data, 'city');

        cityService.getCurrentCity(function (response) {
          if (window.location.host === response.link1) {
            // Mumbai
            $scope.phtoAlbum = _.cloneDeep($scope.phtoAlbum.mumbai);

          } else if (window.location.host === response.link2) {
            //Hyderabad
            $scope.phtoAlbum = _.cloneDeep($scope.phtoAlbum.hyderabad);
          } else if (window.location.host === response.link3) {
            //     //Ahmedabad
            $scope.phtoAlbum = _.cloneDeep($scope.phtoAlbum.ahmedabad);
          }

        });
        console.log(" $scope.phtoAlbum", $scope.phtoAlbum);
      }
    });
  };
  $scope.getPhotoAlbum();
  //get all Photos
  $scope.getAllPhotos = function () {
    $scope.url = 'LivePhotos/getAll';
    NavigationService.getAllLiveUpdatedData($scope.url, function (data) {
      if (data.value) {
        $scope.allphotos = _.groupBy(data.data, 'city');
        cityService.getCurrentCity(function (response) {
          if (window.location.host === response.link1) {
            // Mumbai
            $scope.allphotos = _.cloneDeep($scope.allphotos.mumbai);

          } else if (window.location.host === response.link2) {
            //Hyderabad
            $scope.allphotos = _.cloneDeep($scope.allphotos.hyderabad);
          } else if (window.location.host === response.link3) {
            //     //Ahmedabad
            $scope.allphotos = _.cloneDeep($scope.allphotos.ahmedabad);
          }

        });
        console.log($scope.allphotos, "data");
      }
    });
  };
  $scope.getAllPhotos();

  $scope.getTickers = function () {
    $scope.url = 'Ticker/getAllTickers';
    NavigationService.getAllLiveUpdatedData($scope.url, function (data) {
      if (data.value) {
        cityService.getCurrentCity(function (response) {
          if (window.location.host === response.link1) {
            // Mumbai
            if (data.data.mumbai) {
              $scope.tickerData = _.cloneDeep(data.data.mumbai);
            }

          } else if (window.location.host === response.link2) {
            //Hyderabad
            if (data.data.hyderabad) {
              $scope.tickerData = _.cloneDeep(data.data.hyderabad);
            }

          } else if (window.location.host === response.link3) {
            //     //Ahmedabad
            if (data.data.ahmedabad) {
              $scope.tickerData = _.cloneDeep(data.data.ahmedabad);
            }

          }

        });
      }
    });
  };
  $scope.getTickers();
  // DRAWS LINK
  $scope.drawSelect = function (institute) {
    switch (institute) {
      case 'school':
        $scope.drawObj = {
          institute: 'school',
          link: '',
        }
        break;
      case 'college':
        $scope.drawObj = {
          institute: 'college',
          link: '',
        }
        break;
    }
  }
  // DRAWS LINK END
  // SHOW ALBUM VIEW
  $scope.openAlbumView = function (album) {
    console.log('album', album);
    $scope.currentAlbum = album;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/album-modal.html',
      size: 'lg',
      scope: $scope,
      windowClass: "album-modal"
    });
  }
  // SHOW ALBUM VIEW END

  //Social Media
  function twitterReload(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = p + "://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  }

  function facebookReload(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    //  if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId=1452795161694777";
    fjs.parentNode.insertBefore(js, fjs);

  }
  $timeout(function () {
    twitterReload(document, "script", "twitter-wjs");
    facebookReload(document, 'script', 'facebook-jssdk');
  }, 1000);

  var f, t;
  f = $interval(function () {
    if (typeof FB !== undefined) {
      FB = null;
      $interval.cancel(f);
      facebookReload(document, 'script', 'facebook-jssdk');
    }
  }, 100);
  t = $interval(function () {
    if (typeof twttr !== undefined) {
      twttr.widgets.load();
      $interval.cancel(t);

    }
  }, 100);
});