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

  var workObj = {

  };

  var lifeObj = {};

  // setting and binding whole handlers here
  function settingHandlers() {
    var mainNavButton = document.getElementById("mainNavButton");
    var navHomePage   = document.getElementById("navHomePage");
    var navAboutPage  = document.getElementById("navAboutPage");
    var navWorkPage   = document.getElementById("navWorkPage");
    var navLifePage   = document.getElementById("navLifePage");
    var entrance      = document.getElementById("entrance");

    mainNavButton.addEventListener("click", mainNavigation.openMenu);
    navHomePage.addEventListener("click", mainNavigation.goToHomePage);
    navAboutPage.addEventListener("click", mainNavigation.goToAboutPage);
    navWorkPage.addEventListener("click", mainNavigation.goToWorkPage);
    navLifePage.addEventListener("click", mainNavigation.goToLifePage);
    entrance.addEventListener("click", homeObj.enterToMainContent);
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
      document.getElementById("lifeContent").style.display = "none";
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
    },

    goToLifePage: function() {
      mainNavigation.closeAllPage();
      document.getElementById("mainContent").style.display = "block";
      document.getElementById("mainContent").style.overflow = "";
      document.getElementById("lifeContent").style.display = "block";
    }
  }

  var initialize = function() {
    settingHandlers();
  }

  return {
    init: initialize
  };
}(window));

// window.onload = mySite.init;
