let scriptHelper = require('./scriptHelper.js');

window.addEventListener("load", function() {
   let listedPlanets;
   let listedPlanetsResponse = scriptHelper.myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
        console.log(listedPlanets);
        let planet = scriptHelper.pickPlanet(listedPlanets);
        let name = planet.name;
        let diameter = planet.diameter;
        let star = planet.star;
        let distance = planet.distance;
        let moons = planet.moons;
        let imageUrl = planet.imageUrl;
        scriptHelper.addDestinationInfo(planet, name, diameter, star, distance, moons, imageUrl);
    })
   
});