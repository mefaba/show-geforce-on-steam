function page_constructor() {
  String.prototype.clearText = function () {
    return this.replace("’", "'")
      .replace("–", "-")
      .replace("®", "")
      .replace("©", "")
      .replace("™", "");
  };

  function nodeObserver(triggerNode, callFunction) {
    //call callFunction at least once
    callFunction();

    // Select the node that will be observed for mutations
    const targetNode = triggerNode;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationList, observer) {
      //Trigger InsertBanner when new games appears on screen.
      callFunction();
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }

  return Object.freeze({
    nodeObserver,
  });
}

function home_page_constructor() {
  const { nodeObserver } = page_constructor();
  //create html element that will be injectted to page
  let span = "<span class='geforce-button'>GeforceNow</span>";

  function insertBanner() {
    const gameNodes = document.querySelectorAll(".tab_item_content");
    gameNodes.forEach((gameNode) => {
      const game = gameNode
        .querySelector(".tab_item_name")
        .innerText.toLowerCase()
        .clearText();

      const gameAvailableOnGeforce = gameTitles.includes(game);

      if (gameAvailableOnGeforce) {
        let bannerDoesNotExist = !gameNode.querySelector(
          ".tab_item_details > .geforce-button"
        );
        if (bannerDoesNotExist) {
          let extensionTagDiv = gameNode.querySelector(".tab_item_details");
          extensionTagDiv.insertAdjacentHTML("afterbegin", span);
        }
      }
    });
  }
  nodeObserver(document.querySelector(".tabarea"), insertBanner);

  return Object.freeze({
    insertBanner,
  });
}
function search_page_constructor() {
  const { nodeObserver } = page_constructor();
  //create html element that will be injectted to page
  let span =
    "<span class='geforce-button vr_supported' style='top:0;'>GeforceNow</span>";
  function insertBanner() {
    const gameNodes = document.querySelectorAll(".search_result_row");
    gameNodes.forEach((gameNode) => {
      const game = gameNode
        .querySelector(".title")
        .textContent.toLowerCase()
        .clearText();

      if (gameTitles.includes(game)) {
        //Dont insert geforce button if geforceButton already inserted
        let bannerDoesNotExist = !gameNode.querySelector(
          ".responsive_search_name_combined > div > div > .geforce-button"
        );
        if (bannerDoesNotExist) {
          let extensionTagDiv = gameNode.querySelector(
            ".responsive_search_name_combined > div > div"
          );
          extensionTagDiv.innerHTML += span;
        }
      }
    });
  }

  nodeObserver(document.getElementById("search_results"), insertBanner);

  return Object.freeze({
    insertBanner,
  });
}

function game_page_constructor() {
  const { nodeObserver } = page_constructor();
  //create html element that will be injectted to page
  let span =
    "<span class='geforce-button vr_supported' style='top:0;'>GeforceNow</span>";
  function insertBanner() {
    const gameNode = document.getElementById("appHubAppName");
    const game = gameNode.innerText.toLowerCase().clearText();

    if (gameTitles.includes(game)) {
      //Dont insert geforce button if geforceButton already inserted
      let bannerDoesNotExist = !gameNode.querySelector(
        "#appHubAppName > .geforce-button"
      );
      if (bannerDoesNotExist) {
        gameNode.insertAdjacentHTML("beforeend", span);
      }
    }
  }

  nodeObserver(document.getElementById("appHubAppName"), insertBanner);

  return Object.freeze({
    insertBanner,
  });
}

function wishlist_page_constructor() {
  const { nodeObserver } = page_constructor();
  //create html element that will be injectted to page
  let span =
    "<span class='geforce-button vr_supported' style='top:0;'>GeforceNow</span>";
  function insertBanner() {
    const gameNodes = document.querySelectorAll(".wishlist_row");
    gameNodes.forEach((gameNode) => {
      let game = gameNode
        .querySelector(".title")
        .textContent.trim()
        .toLowerCase()
        .clearText();

      if (gameTitles.includes(game)) {
        //Dont insert geforce button if geforceButton already inserted
        let bannerDoesNotExist = !gameNode.querySelector(
          ".platform_icons > .geforce-button"
        );

        if (bannerDoesNotExist) {
          let extensionTagDiv = gameNode.querySelector(".platform_icons");
          extensionTagDiv.innerHTML += span;
        }
      }
    });
  }

  nodeObserver(document.getElementById("wishlist_ctn"), insertBanner);

  return Object.freeze({
    insertBanner,
  });
}

function setup() {
  if (window.location.pathname === "/search/") {
    const SearchPage = search_page_constructor();
    SearchPage.insertBanner;
  } else if (
    window.location.pathname === "/" ||
    window.location.pathname.includes("/category")
  ) {
    const HomePage = home_page_constructor();
    HomePage.insertBanner;
  } else if (window.location.pathname.includes("/app")) {
    const GamePage = game_page_constructor();
    GamePage.insertBanner;
  } else if (window.location.pathname.includes("/wishlist")) {
    wishlist_page_constructor().insertBanner;
  }
}
setup();
