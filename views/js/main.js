var socket = io();
var mySite = (function(global) {
  // var mainNavButtonFlag = false;

  var homeObj = {
    enterToMainContent: function() {
      // people come from home page is the about page
      document.getElementById("homePage").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
      document.getElementById("mainNavButton").style.display = "block";
      document.getElementById("aboutContent").style.display = "block";
      document.getElementById("mainHeader").style.display = "block";
    }
  };

  var aboutObj = {};

  var workObj = {};

  // setting and binding whole handlers here
  function settingHandlers() {
    var mainNavButton      = document.getElementById("mainNavButton");
    var navHomePage        = document.getElementById("navHomePage");
    var navAboutPage       = document.getElementById("navAboutPage");
    var navWorkPage        = document.getElementById("navWorkPage");
    var navLifePage        = document.getElementById("navLifePage");
    var entrance           = document.getElementById("entrance");
    var projectPrevButton  = document.getElementById("projectPrevButton");
    var projectNextButton  = document.getElementById("projectNextButton");
    var projectCloseButton = document.getElementById("projectCloseButton");

    // main navbar events
    mainNavButton.addEventListener("click", mainNavigation.openMenu);
    navHomePage.addEventListener("click", mainNavigation.goToHomePage);
    navAboutPage.addEventListener("click", mainNavigation.goToAboutPage);
    navWorkPage.addEventListener("click", mainNavigation.goToWorkPage);
    // entrance events of homepage
    entrance.addEventListener("click", homeObj.enterToMainContent);
    // works navbar events
    projectPrevButton.addEventListener("click", workCollection.showPrevProject);
    projectNextButton.addEventListener("click", workCollection.showNextProject);
    projectCloseButton.addEventListener("click", workCollection.closeProject);
  }

  // open socket
  var openSocket = function() {
    console.log("open socket!!");
    socket.on("rouletteWork", function(msg) { workCollection.showProjectDetail(msg)});
    socket.on("baccaratWork", function(msg) { workCollection.showProjectDetail(msg)});
    socket.on("zootopiaWork", function(msg) { workCollection.showProjectDetail(msg)});
    socket.on("sicboWork", function(msg) { workCollection.showProjectDetail(msg)});
  }


  var mainNavigation = {
    mainNavButtonFlag: false,

    openMenu: function() {
      mainNavigation.mainNavButtonFlag = !mainNavigation.mainNavButtonFlag;
      console.log("mainNavigation.mainNavButtonFlag: " + mainNavigation.mainNavButtonFlag);
      if(mainNavigation.mainNavButtonFlag) {
        document.getElementById("mainNav").style.display = "block";
        document.getElementById("mainContent").style.overflow = "hidden";
      }
      else {
        document.getElementById("mainNav").style.display = "none";
        document.getElementById("mainContent").style.overflow = "";
      }
    },

    closeAllPage: function() {
      document.getElementById("aboutContent").style.display = "none";
      document.getElementById("workContent").style.display = "none";
      document.getElementById("mainNav").style.display = "none";
      mainNavigation.mainNavButtonFlag = false;
    },

    goToHomePage: function() {
      mainNavigation.closeAllPage();
      document.getElementById("mainContent").style.display = "none";
      document.getElementById("homePage").style.display = "block";
    },

    goToAboutPage: function() {
      mainNavigation.closeAllPage();
      document.getElementById("mainContent").style.display = "block";
      document.getElementById("mainContent").style.overflow = "";
      document.getElementById("aboutContent").style.display = "block";
    },

    goToWorkPage: function() {
      mainNavigation.closeAllPage();
      document.getElementById("mainContent").style.display = "block";
      document.getElementById("mainContent").style.overflow = "";
      document.getElementById("workContent").style.display = "block";
    }
  }

  var workCollection = {
    stateIndex: 0,
    workState: null,
    workArray: ["roulette", "baccarat", "zootopia", "sicbo"],
    projectInfo: document.getElementById("projectInfo"),
    projectFeature: document.getElementById("projectFeature"),
    projectTech: document.getElementById("projectTech"),

    showNextProject: function() {
      if(workCollection.stateIndex + 1 == workCollection.workArray.length) {
        workCollection.stateIndex = 0;
      }
      else {
        workCollection.stateIndex += 1;
      }
      console.log("workCollection.stateIndex: " + workCollection.stateIndex);
      workCollection.clearProject();
      workCollection.sendWorkSignal(workCollection.workArray[workCollection.stateIndex]);
    },

    showPrevPjoject: function() {
      if(workCollection.stateIndex - 1 == workCollection.workArray.length) {
        workCollection.stateIndex = workCollection.workArray.length - 1;
      }
      else {
        workCollection.stateIndex -= 1;
      }
      workCollection.clearProject();
      workCollection.sendWorkSignal(workCollection.workArray[workCollection.stateIndex]);
    },

    closeProject: function() {
      document.getElementById("workContentDetail").style.opacity = 0;
    },

    clearProject: function() {
      document.getElementById("projectInfo").innerHTML = "";
      document.getElementById("projectFeature").innerHTML = "";
      document.getElementById("projectTech").innerHTML = "";
    },

    sendWorkSignal: function(project) {
      workCollection.workState = project;
      console.log("workCollection.workState: " + workCollection.workState);
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
      // update project data (rerender UI)
      var projectInfoTitle = document.createElement("h3");
      var projectInfoText = document.createElement("p");
      projectInfoTitle.innerHTML = "Info";
      projectInfoText.innerHTML = msg.data.info;
      projectInfoTitle.classList.add("project__titleName");
      workCollection.projectInfo.appendChild(projectInfoTitle);
      workCollection.projectInfo.appendChild(projectInfoText);


      var projectFeatureTitle = document.createElement("h3");
      var projectFeatureList = document.createElement("ul");
      projectFeatureTitle.innerHTML = "Feature";
      projectFeatureList.classList.add("project__featureList");
      for(var i = 0 ; i < msg.data.feature.length ; i++) {
        var list = document.createElement("li");
        list.innerHTML = msg.data.feature[i];
        projectFeatureList.appendChild(list);
      }
      workCollection.projectFeature.appendChild(projectFeatureTitle);
      workCollection.projectFeature.appendChild(projectFeatureList);


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

  var initialize = function() {
    settingHandlers();
    openSocket();
    console.log("initialize mySite!");
  }

  return {
    init: initialize
  };
}(window));

mySite.init();
