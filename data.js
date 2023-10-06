import ids from "./latest-geforce-now-games.json" assert { type: "json" };
// This list of IDs is from the official GFN Games page API. It's updated via a Github Action (./github/workflows/fetch-games.yml)
const steamIdsOnGeForceNow = new Set([ids])