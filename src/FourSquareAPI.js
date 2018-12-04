const api = "https://api.foursquare.com/v2";

//-------Foursquare API details----------
const fsAuthKeys = {
	client_id : "BGAY1GJ4X1SJXAL1R2JBEBTUIHUGEGN13X43DCFANBTAABW1",
	client_secret : "14HPXWZ2C4ZGSVSIEIORLMUDNONRQ0BZBCIL5X5DKBLVJJE5",
	v: "20181204"
}

/*-----Construct the base authentication URL-------------
 * This returns a string which is in the below format
 * client_ID=BGAY1GJ4X1SJXAL1R2JBEBTUIHUGEGN13X43DCFANBTAABW1&client_secret=14HPXWZ2C4ZGSVSIEIORLMUDNONRQ0BZBCIL5X5DKBLVJJE5&v=20181129
 */
const baseAuthURL = Object.keys(fsAuthKeys).map((eachKey) => `${eachKey}=${fsAuthKeys[eachKey]}`).join("&");

const headers = {
	'Accept':'application/json'
}

const buildSearchURL = (searchParams) => (
	Object.keys(searchParams).map(key => `${key}=${searchParams[key]}`).join("&")
)

export const getVenueDetails = (venueID) => (
	fetch(`${api}/venues/${venueID}?${baseAuthURL}`,{ headers })
	.then(response => response.json())
)

export const searchVenue = (venueSearchParams) => (
	fetch(`${api}/venues/search?${baseAuthURL}&${buildSearchURL(venueSearchParams)}`,{ headers })
	.then(response => response.json())
)

export const getVenuePhoto = (venueID) => (
	fetch(`${api}/venues/${venueID}/photos?${baseAuthURL}`,{ headers })
	.then(response => response.json())
)
