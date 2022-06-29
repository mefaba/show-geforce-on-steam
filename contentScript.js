function home_page_constructor() {
  //create html element that will be injectted to page
  let span = "<span class='geforce-button'>GeforceNow</span>";

  function insertBanner() {
    const gameNodes = document.querySelectorAll(".tab_item_content");
    gameNodes.forEach((gameNode) => {
      const game = gameNode
        .querySelector(".tab_item_name")
        .innerText.toLowerCase()
        .replace("’", "'")
        .replace("–", "-")
        .replace("®", "")
        .replace("™", "");
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
  function triggerInsertion() {
    //Insert at least once
    insertBanner();

    // Select the node that will be observed for mutations
    const targetNode = document.querySelector(".tabarea");

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationList, observer) {
      //Trigger InsertBanner when new games appears on screen.
      insertBanner();
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
  triggerInsertion();

  return Object.freeze({
    insertBanner,
  });
}
function search_page_constructor() {
  //create html element that will be injectted to page
  let span =
    "<span class='geforce-button vr_supported' style='top:0;'>GeforceNow</span>";
  function insertBanner() {
    const gameNodes = document.querySelectorAll(".search_result_row");
    gameNodes.forEach((gameNode) => {
      const game = gameNode
        .querySelector(".title")
        .textContent.toLowerCase()
        .replace("’", "'")
        .replace("–", "-")
        .replace("®", "")
        .replace("™", "");
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
  function triggerInsertion() {
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("search_results");

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationList, observer) {
      //Trigger InsertBanner when new games appears on screen.
      insertBanner();
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
  triggerInsertion();
  return Object.freeze({
    insertBanner,
  });
}

function game_page_constructor() {
  //create html element that will be injectted to page
  let span =
    "<span class='geforce-button vr_supported' style='top:0;'>GeforceNow</span>";
  function insertBanner() {
    const gameNode = document.getElementById("appHubAppName");
    const game = gameNode.innerText
      .toLowerCase()
      .replace("’", "'")
      .replace("–", "-")
      .replace("®", "")
      .replace("™", "");

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

  function triggerInsertion() {
    insertBanner();
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("appHubAppName");

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationList, observer) {
      //Trigger InsertBanner when new games appears on screen.
      insertBanner();
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
  triggerInsertion();
  return Object.freeze({
    insertBanner,
  });
}

function wishlist_page_constructor() {
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
        .replace("’", "'")
        .replace("–", "-")
        .replace("®", "")
        .replace("™", "");

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

  function triggerInsertion() {
    insertBanner();
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("wishlist_ctn");

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationList, observer) {
      //Trigger InsertBanner when new games appears on screen.
      insertBanner();
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
  triggerInsertion();
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
