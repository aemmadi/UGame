const rp = require('request-promise');
const parseString = require('xml2js').parseString;
const steam = require('steam-web');
const config = require('dotenv').config();
let value;
let steamid = getSteamID(value);
// console.log(steamid);
// let games = getGames(steamid);

function getSteamID(value) {
  // let username = await document.getElementById("steamuser").value;
  let username = "KannaDaPro";
  console.log(username);
  let baseURL = "http://steamcommunity.com/id/";
  let URL = baseURL + username + "/?xml=1";

  let s = new steam({
    apiKey: process.env.STEAM_API, // <<--PROVIDE API KEY HERE
    format: 'json' //optional ['json', 'xml', 'vdf']
  });

  /**
   * Example implementing steam-web
   * If you want to test a different user, just edit the 'username' variable as needed
   * Don't forget to add your own Steam API key
   * 'result' variable represents the value to be integrated into your application
   * @param {string} URL - Full URL profile for specific user.
   */
  getSteamID64(URL)
    .then(function (result) {
      //steamid = result;
      s.getPlayerSummaries({
        steamids: [result],
        callback: function (err, data) {
          value = data["response"]["players"][0].steamid;
        }
      })
    })
    .catch(function (reason) {
      console.error("%s; %s", reason.error.message, reason.options.url);
      console.log("%j", reason.response.statusCode);
      return reason.error.message;
    });
  console.log(value);
}
/**
 * Goes to Steam, fetches the user's XML and then parses it to JSON
 * @param {string} URL - Full URL profile for specific user.
 * @return {string} The steamID64.
 */
function getSteamID64(URL) {
  return rp(URL)
    .then(function (xml) {
      return new Promise(function (resolve, reject) {
        parseString(xml, {
          explicitArray: false,
          ignoreAttrs: true,
          trim: true
        }, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result["profile"]["steamID64"]);
          }
        });
      });
    });
}

function getGames(steamid) {
  // let s = new steam({
  //   apiKey: process.env.STEAM_API, // <<--PROVIDE API KEY HERE
  //   format: 'json' //optional ['json', 'xml', 'vdf']
  // });
  // s.getOwnedGames({
  //   steamid: steamid,
  //   callback: function (err, data) {
  //     console.log(data)
  //   }
  // })
}