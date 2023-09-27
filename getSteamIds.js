/* This is the official API used by the GFN Games Page at https://www.nvidia.com/en-us/geforce-now/games/
While officially undocumented, a third-party developer, Ighor July (@JulyIghor at https://github.com/JulyIghor), documented its inner workings in a blog post: https://ighor.medium.com/i-unlocked-nvidia-geforce-now-and-stumbled-upon-pirates-dc48a3f8ff7
There is also a GraphQL playground from him: http://gfn.uax.co/graphql?query=%23%20Source%3A%20https%3A//ighor.medium.com%0A%7B%0A%20%20apps%28vpcId%3A%20%22NP-SEA-01%22%20language%3A%20%22en_US%22%20first%3A%201200%29%20%7B%0A%20%20%20%20__typename%0A%20%20%20%20numberReturned%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20endCursor%0A%20%20%20%20%7D%0A%20%20%20%20items%20%7B%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20cmsId%0A%20%20%20%20%20%20sortName%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20longDescription%0A%20%20%20%20%20%20contentRatings%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20categoryKey%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20developerName%0A%20%20%20%20%20%20geForceUrl%0A%20%20%20%20%20%20images%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20FEATURE_IMAGE%0A%20%20%20%20%20%20%20%20GAME_BOX_ART%0A%20%20%20%20%20%20%20%20HERO_IMAGE%0A%20%20%20%20%20%20%20%20MARQUEE_HERO_IMAGE%0A%20%20%20%20%20%20%20%20ANSEL_360_IMAGES%0A%20%20%20%20%20%20%20%20KEY_ART%0A%20%20%20%20%20%20%20%20KEY_ICON%0A%20%20%20%20%20%20%20%20KEY_IMAGE%0A%20%20%20%20%20%20%20%20TV_BANNER%0A%20%20%20%20%20%20%20%20SCREENSHOTS%0A%20%20%20%20%20%20%20%20SCREENSHOT_THUMB%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20keywords%0A%20%20%20%20%20%20maxLocalPlayers%0A%20%20%20%20%20%20maxOnlinePlayers%0A%20%20%20%20%20%20apks%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20version%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20publisherName%0A%20%20%20%20%20%20storeIds%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20store%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20streamingModes%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20framesPerSecond%0A%20%20%20%20%20%20%20%20heightInPixels%0A%20%20%20%20%20%20%20%20widthInPixels%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20supportedGamePlayModes%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20computedValues%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20earliestReleaseDate%0A%20%20%20%20%20%20%20%20earliestStreetDate%0A%20%20%20%20%20%20%20%20allKeywords%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20genres%0A%20%20%20%20%20%20appStore%0A%20%20%20%20%20%20variants%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20appStore%0A%20%20%20%20%20%20%20%20developerName%0A%20%20%20%20%20%20%20%20gfn%20%7B%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20status%0A%20%20%20%20%20%20%20%20%20%20visibility%0A%20%20%20%20%20%20%20%20%20%20releaseDate%0A%20%20%20%20%20%20%20%20%20%20isInLibrary%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20osType%0A%20%20%20%20%20%20%20%20storeId%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
 */
const GFN_API_URL = 'https://api-prod.nvidia.com/gfngames/v1/gameList'

/* Make the request and paginate through it until we have all the games */
const getSteamIds = async () => {
    let steamIdsOfGamesOnGeForceNow = new Set();

    const fetchGamesQuery = /*GraphQL*/ `

        # HUGE thanks to @JulyIghor for help optimizing this query!

        # Reusable fragment for the body that we want
        fragment queryFields on AppQueryType
        {
            numberReturned

            pageInfo {
                endCursor
                hasNextPage
            }

            items {
                variants
                {
                    storeId
                }
            }
        }

        {

            # Fetch games 0 to 1300
            page1: apps(country:"US" appStore:"STEAM" first:1300)
            {
                ...queryFields
            }

            # Fetch games 1300 to 2600, though there should only be about 1600 total games as of Sept 2023
            page2: apps(country:"US" appStore:"STEAM" first:1300 after:"MTMwMA==") # Base64 encoded "1300"
            {
                ...queryFields
            }

            # Future-proofing just in case. GFN probably won't grow by thousands THAT quickly
            page3: apps(country:"US" appStore:"STEAM" first:1300 after:"MjYwMA==") # Base64 encoded "2600"
            {
                ...queryFields
            }

        }
    `

    const fetchConfig = {
        body: fetchGamesQuery,
        method: "POST",
    };

    const fetchGamesResponse = await fetch(GFN_API_URL, fetchConfig);
    const responseJSON = await fetchGamesResponse.json()
    const pages = ["page1", "page2", "page3"]
    pages.forEach(page => {
        const gamesOnThisPage = responseJSON.data?.[page].items ?? []

        gamesOnThisPage.forEach((game) => {
            if (!game.variants[0]?.storeId) {
                return
            }
            steamIdsOfGamesOnGeForceNow.add(game.variants[0].storeId)
        })
    })

    return [...steamIdsOfGamesOnGeForceNow]
}

getSteamIds().then(ids => {
    console.log(JSON.stringify(ids))
    console.log(`Total games listed: ${ids.length}`)
});
