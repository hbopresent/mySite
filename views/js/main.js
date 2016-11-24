var mySite = (function(global) {
  var mainNavButtonFlag = false;

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

  var aboutObj = {

  };

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

    mainNavButton.addEventListener("click", openMenu);
    navHomePage.addEventListener("click", goToHomePage);
    navAboutPage.addEventListener("click", goToAboutPage);
    navWorkPage.addEventListener("click", goToWorkPage);
    navLifePage.addEventListener("click", goToLifePage);
    entrance.addEventListener("click", homeObj.enterToMainContent);
  }

  // open main navigation
  function openMenu() {
    mainNavButtonFlag = !mainNavButtonFlag;
    console.log("mainNavButtonFlag: " + mainNavButtonFlag);
    if(mainNavButtonFlag) {
      document.getElementById("mainNav").style.display = "block";
      document.getElementById("mainContent").style.overflow = "hidden";
    }
    else {
      document.getElementById("mainNav").style.display = "none";
      document.getElementById("mainContent").style.overflow = "";
    }
  }

  function closeAllPage() {
    document.getElementById("aboutContent").style.display = "none";
    document.getElementById("workContent").style.display = "none";
    document.getElementById("lifeContent").style.display = "none";
    document.getElementById("mainNav").style.display = "none";
    mainNavButtonFlag = false;
  }

  function goToHomePage() {
    closeAllPage();
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("homePage").style.display = "block";
  }

  function goToAboutPage() {
    closeAllPage();
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("mainContent").style.overflow = "";
    document.getElementById("aboutContent").style.display = "block";
  }

  function goToWorkPage() {
    closeAllPage();
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("mainContent").style.overflow = "";
    document.getElementById("workContent").style.display = "block";
  }

  function goToLifePage() {
    closeAllPage();
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("mainContent").style.overflow = "";
    document.getElementById("lifeContent").style.display = "block";
  }


  return {
    aboutObj: aboutObj,
    bindingHandlers: settingHandlers
  };
}(window));

window.onload = mySite.bindingHandlers;
