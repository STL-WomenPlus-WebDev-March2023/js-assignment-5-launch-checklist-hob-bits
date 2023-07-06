

window.addEventListener("load", function() {
   let listedPlanets;
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function(result) {
       listedPlanets = result;
   }).then(function() {
        let planet = pickPlanet(listedPlanets);
        let name = planet.name;
        let diameter = planet.diameter;
        let star = planet.star;
        let distance = planet.distance;
        let moons = planet.moons;
        let imageUrl = planet.imageUrl;
        let destinationInfo = addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
            return destinationInfo;
    })
});