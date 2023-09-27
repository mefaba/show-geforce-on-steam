function page_constructor() {

    function nodeObserver(triggerNode, callFunction) {
        //call callFunction at least once
        callFunction();

        // Select the node that will be observed for mutations
        const targetNode = triggerNode;

        // Options for the observer (which mutations to observe)
        const config = {attributes: true, childList: true, subtree: true};

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

const filterBySteamID = gameNode => {
    const steamID = gameNode.getAttribute('data-ds-appid')
    return steamIdsOnGeForceNow.includes(steamID);
}

function home_page_constructor() {
    const {nodeObserver} = page_constructor();
    //create html element that will be injected to page
    const span = "<span class='geforce-button'>GeforceNow</span>";

    function insertBanner() {
        [...document.querySelectorAll(".tab_item")]
            .filter(filterBySteamID)
            .forEach(gameNode => {
                const bannerDoesNotExist = !gameNode.querySelector(
                    ".tab_item_details > .geforce-button"
                );
                if (bannerDoesNotExist) {
                    let extensionTagDiv = gameNode.querySelector(".tab_item_details");
                    extensionTagDiv.insertAdjacentHTML("afterbegin", span);
                }
            })
    }

    nodeObserver(document.querySelector(".tabarea"), insertBanner);

    return Object.freeze({
        insertBanner,
    });
}

function search_page_constructor() {
    const {nodeObserver} = page_constructor();
    /*Insert Geforce Now Button for Each Game payable in Geofrce */
    //create html element that will be injectted to page
    let span =
        "<span class='geforce-button' style='top:0;'>GeforceNow</span>";

    function insertBanner() {
        [...document.querySelectorAll(".search_result_row")]
            .filter(filterBySteamID)
            .forEach(gameNode => {
                let bannerDoesNotExist = !gameNode.querySelector(
                    ".responsive_search_name_combined > div > div > .geforce-button"
                );
                if (bannerDoesNotExist) {
                    let extensionTagDiv = gameNode.querySelector(
                        ".responsive_search_name_combined > div > div"
                    );
                    extensionTagDiv.innerHTML += span;
                }
            })
    }

    let isChecked = false;
    /**Put Geforce Tag to Filter Options on Right Panel */

    function insertGeforceFilter() {
        if (isChecked) {
            removeNonGeforceGamesFromList();
        }

        const div = `<div id="geforce-filter"   class="tab_filter_control_row geforce-filter" data-param="tags" data-value="" data-loc="Indie">
		<span   class="tab_filter_control tab_filter_control_include">
			<span>
					<span class="tab_filter_control_checkbox"></span>
					<span class="tab_filter_control_label" style="color:#a3ff00;">
						Geforce Now</span>
			</span>
		</span>
					<span class="tab_filter_control_not" onclick="disableGeforceFilter()" data-icon="https://store.akamai.steamstatic.com/public/images/search_crouton_not.svg" data-loc="Indie" data-clientside="0" data-tooltip-text="Exclude results with this tag" data-gpfocus="item"><img src="https://store.akamai.steamstatic.com/public/images/search_checkbox_not.svg" width="16px" height="16px"></span>
</div>`;
        const filterContainer = document.getElementById("TagFilter_Container");
        if (!document.getElementById("geforce-filter")) {
            filterContainer.insertAdjacentHTML("afterbegin", div);
            //add event listener of button
            const geforceFilterElement = document.getElementById("geforce-filter");
            geforceFilterElement.addEventListener("click", toggleGeforceFilter, true);
            if (isChecked) {
                const checkInputClassList = geforceFilterElement.querySelector(
                    ".tab_filter_control_include"
                ).classList;
                checkInputClassList.add("checked");
            }
        }
    }

    function removeNonGeforceGamesFromList() {
        //remove node from list
        const gameNodes = document.querySelectorAll(".search_result_row");
        gameNodes.forEach((gameNode) => {
            let bannerDoesNotExist = !gameNode.querySelector(
                ".responsive_search_name_combined > div > div > .geforce-button"
            );
            if (bannerDoesNotExist) {
                gameNode.style.visibility = "hidden";
                gameNode.style.height = "0";
                gameNode.style.margin = "0";
                gameNode.style.border = "0";
            }
        });
    }

    function toggleGeforceFilter() {
        const geforceFilterElement = document.getElementById("geforce-filter");
        if (!geforceFilterElement) {
            return;
        }
        const checkInputClassList = geforceFilterElement.querySelector(
            ".tab_filter_control_include"
        ).classList;
        if (isChecked) {
            isChecked = false;
            checkInputClassList.remove("checked");
            const gameNodes = document.querySelectorAll(".search_result_row");
            gameNodes.forEach((gameNode) => {
                gameNode.style.visibility = "visible";
                gameNode.style.height = "45px";
                gameNode.style["margin-bottom"] = "5px";
            });
        } else {
            isChecked = true;
            insertGeforceFilter();
            checkInputClassList.add("checked");
        }
    }

    nodeObserver(document.getElementById("search_results"), insertBanner);
    nodeObserver(document.getElementById("search_results"), insertGeforceFilter);

    return Object.freeze({
        insertBanner,
        insertGeforceFilter,
    });
}

/*function game_page_constructor() {
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
}*/

/*function wishlist_page_constructor() {
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
}*/

function setup() {
    if (window.location.pathname === "/search/") {
        const SearchPage = search_page_constructor();
        SearchPage.insertGeforceFilter();
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
