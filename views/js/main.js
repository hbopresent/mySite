var socket = io();
var mySite = (function(global) {
  // invokes DOM
  var homePage           = document.getElementById("homePage");
  var mainContent        = document.getElementById("mainContent");
  var aboutContent       = document.getElementById("aboutContent");
  var workContent        = document.getElementById("workContent");
  var workContentDetail  = document.getElementById("workContentDetail");
  var mainNavButton      = document.getElementById("mainNavButton");
  var mainNav            = document.getElementById("mainNav");
  var navHomePage        = document.getElementById("navHomePage");
  var navAboutPage       = document.getElementById("navAboutPage");
  var navWorkPage        = document.getElementById("navWorkPage");
  var navLifePage        = document.getElementById("navLifePage");
  var entrance           = document.getElementById("entrance");
  var projectPrevButton  = document.getElementById("projectPrevButton");
  var projectNextButton  = document.getElementById("projectNextButton");
  var projectCloseButton = document.getElementById("projectCloseButton");
  var projectRoulette    = document.getElementById("roulette");
  var projectBaccarat    = document.getElementById("baccarat");
  var projectZootopia    = document.getElementById("zootopia");
  var projectSicbo       = document.getElementById("sicbo");
  var loadingAnimation   = document.getElementById("loadingAnimation");


  // setting and binding whole handlers here
  var eventListener = {
    clickHandlers: function() {
      mainNavButton.addEventListener("click", mainNavigation.openMenu);
      navHomePage.addEventListener("click", mainNavigation.goToHomePage);
      navAboutPage.addEventListener("click", mainNavigation.goToAboutPage);
      navWorkPage.addEventListener("click", mainNavigation.goToWorkPage);
      // entrance events of homepage
      entrance.addEventListener("click", function() {
        document.getElementById("mainContentEntrance").classList.add("entranceAnimation1");
      });
      // works navbar events
      projectPrevButton.addEventListener("click", workCollection.showPrevPjoject);
      projectNextButton.addEventListener("click", workCollection.showNextProject);
      projectCloseButton.addEventListener("click", workCollection.closeProject);
      // check works events
      projectRoulette.addEventListener("click", function() { workCollection.sendWorkSignal(projectRoulette.id);});
      projectBaccarat.addEventListener("click", function() { workCollection.sendWorkSignal(projectBaccarat.id);});
      projectZootopia.addEventListener("click", function() { workCollection.sendWorkSignal(projectZootopia.id);});
      projectSicbo.addEventListener("click", function() { workCollection.sendWorkSignal(projectSicbo.id);});
    },

    animationHandlers: function() {
      entrance.addEventListener("animationend", function(e) {
        // entranceAnimation1:
        // animation of scaling down circle size at home page
        if(e.animationName == "entranceAnimation1") {
          document.getElementById("entranceArrow").classList.add("entranceAnimation2");
        }

        // entranceAnimation2:
        // arrow animation at home page
        if(e.animationName == "entranceAnimation2") {
          document.getElementById("homePage").style.display = "none";
          document.getElementById("mainContent").style.display = "block";
          document.getElementById("mainNavButton").style.display = "block";
          document.getElementById("aboutContent").style.display = "block";
          document.getElementById("mainContentEntrance").classList.remove("entranceAnimation1");
          document.getElementById("entranceArrow").classList.remove("entranceAnimation2");
        }
      });

      // nav items animation event
      mainNav.addEventListener("animationend", function(e) {
        if(e.animationName == "closeMainNav") {
          navAboutPage.classList.remove("fadeInNavItem");
          navWorkPage.classList.remove("fadeInNavItem");
          navHomePage.classList.remove("fadeInNavItem");
        }
      });
    }
  };

  // open socket
  var openSocket = function() {
    socket.on("rouletteWork", function(msg) {
      setTimeout(function() {
        loadingAnimation.style.display = "none";
        workCollection.showProjectDetail(msg);
      }, 2000);
    });
    socket.on("baccaratWork", function(msg) {
      setTimeout(function() {
        loadingAnimation.style.display = "none";
        workCollection.showProjectDetail(msg);
      }, 2000);
    });
    socket.on("zootopiaWork", function(msg) {
      setTimeout(function() {
        loadingAnimation.style.display = "none";
        workCollection.showProjectDetail(msg);
      }, 2000);
    });
    socket.on("sicboWork", function(msg) {
      setTimeout(function() {
        loadingAnimation.style.display = "none";
        workCollection.showProjectDetail(msg);
      }, 2000);
    });
  }


  var mainNavigation = {
    mainNavButtonFlag: false,

    openMenu: function() {
      mainNavigation.mainNavButtonFlag = !mainNavigation.mainNavButtonFlag;
      if(mainNavigation.mainNavButtonFlag) {
        mainNavButton.style.backgroundColor = "rgb(184, 4, 200)";
        document.getElementById("mainNav").classList.add("showMainNav");
        document.getElementById("mainNav").classList.remove("closeMainNav");
      }
      else {
        mainNavButton.style.backgroundColor = "transparent";
        document.getElementById("mainNav").classList.remove("showMainNav");
        document.getElementById("mainNav").classList.add("closeMainNav");
      }
    },

    goToHomePage: function() {
      navAboutPage.classList.add("fadeInNavItem");
      navWorkPage.classList.add("fadeInNavItem");
      setTimeout(function() {
        aboutContent.style.display = "none";
        workContent.style.display = "none";
        workContentDetail.style.display = "none";
        mainNavigation.openMenu();
        setTimeout(function() {
          homePage.style.display = "flex";
          document.getElementById("mainNavButton").style.display = "none";
        }, 500);
      }, 500);
    },

    goToAboutPage: function() {
      navHomePage.classList.add("fadeInNavItem");
      navWorkPage.classList.add("fadeInNavItem");
      setTimeout(function() {
        workContent.style.display = "none";
        workContentDetail.style.display = "none";
        mainNavigation.openMenu();
        setTimeout(function() {
          aboutContent.style.display = "block";
        }, 500);
      }, 500);
    },

    goToWorkPage: function() {
      navAboutPage.classList.add("fadeInNavItem");
      navHomePage.classList.add("fadeInNavItem");
      setTimeout(function() {
        aboutContent.style.display = "none";
        workContentDetail.style.display = "none";
        mainNavigation.openMenu();
        setTimeout(function() {
          workContent.style.display = "block";
        }, 500);
      }, 500);
    }
  }

  var workCollection = {
                stateIndex: 0,
                 workState: null,
                 workArray: ["roulette", "baccarat", "zootopia", "sicbo"],
               projectInfo: document.getElementById("projectInfo"),
       projectResponsibilities: document.getElementById("projectResponsibilities"),
               projectTech: document.getElementById("projectTech"),

    showNextProject: function() {
      if(workCollection.stateIndex + 1 == workCollection.workArray.length) {
        workCollection.stateIndex = 0;
      }
      else {
        workCollection.stateIndex += 1;
      }
      workCollection.clearProject();
      workCollection.sendWorkSignal(workCollection.workArray[workCollection.stateIndex]);
    },

    showPrevPjoject: function() {
      if(workCollection.stateIndex - 1 < 0) {
        workCollection.stateIndex = workCollection.workArray.length - 1;
      }
      else {
        workCollection.stateIndex -= 1;
      }
      workCollection.clearProject();
      workCollection.sendWorkSignal(workCollection.workArray[workCollection.stateIndex]);
    },

    closeProject: function() {
      workCollection.stateIndex = 0;
      document.getElementById("workContentDetail").style.display = "none";
      document.getElementById("workContent").style.display = "block";
      workCollection.clearProject();
    },

    clearProject: function() {
      document.getElementById("projectInfo").innerHTML = "";
      document.getElementById("projectResponsibilities").innerHTML = "";
      document.getElementById("projectTech").innerHTML = "";
    },

    sendWorkSignal: function(project) {
      loadingAnimation.style.display = "flex";
      // project: project name
      workCollection.workState = project;
      // send message to server side with socket
      if(workCollection.workState == "roulette") {
        socket.emit("roulette");
      }
      if(workCollection.workState == "baccarat") {
        socket.emit("baccarat");
      }
      if(workCollection.workState == "zootopia") {
        socket.emit("zootopia");
      }
      if(workCollection.workState == "sicbo") {
        socket.emit("sicbo");
      }
    },

    showProjectDetail: function(msg) {
      document.getElementById("workContentDetail").style.display = "block";
      document.body.scrollTop = 0;
      document.getElementById("workContent").style.display = "none";

      // update project data (rerender UI)
      var projectInfoTitle = document.createElement("h3");
      var projectInfoText = document.createElement("p");
      projectInfoTitle.innerHTML = "Info";
      projectInfoText.innerHTML = msg.data.info;
      projectInfoTitle.classList.add("project__titleName");
      workCollection.projectInfo.appendChild(projectInfoTitle);
      workCollection.projectInfo.appendChild(projectInfoText);


      var projectResponsibilitiesTitle = document.createElement("h3");
      var projectResponsibilitiesList = document.createElement("ul");
      projectResponsibilitiesTitle.innerHTML = "Responsibilities";
      projectResponsibilitiesList.classList.add("project__featureList");
      for(var i = 0 ; i < msg.data.responsibilities.length ; i++) {
        var list = document.createElement("li");
        list.innerHTML = msg.data.responsibilities[i];
        projectResponsibilitiesList.appendChild(list);
      }
      workCollection.projectResponsibilities.appendChild(projectResponsibilitiesTitle);
      workCollection.projectResponsibilities.appendChild(projectResponsibilitiesList);


      var projectTechTitle = document.createElement("h3");
      var projectTechList = document.createElement("ul");
      projectTechTitle.innerHTML = "Tech";
      projectTechList.classList.add("project__techList");
      for(var i = 0 ; i < msg.data.tech.length ; i++) {
        var list = document.createElement("li");
        list.innerHTML = msg.data.tech[i];
        projectTechList.appendChild(list);
      }
      workCollection.projectTech.appendChild(projectTechTitle);
      workCollection.projectTech.appendChild(projectTechList);
    }
  }

  // initialize settings
  var initialize = function() {
    eventListener.clickHandlers();
    eventListener.animationHandlers();
    openSocket();
  }

  return {
    init: initialize
  };
}(window));

mySite.init();
