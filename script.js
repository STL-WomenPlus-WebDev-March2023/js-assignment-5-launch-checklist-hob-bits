

window.addEventListener("load", function() {
   let listedPlanets;
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function(result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function() {
        console.log(listedPlanets);
        let planet = pickPlanet(listedPlanetsResponse);
        console.log(planet);
        let name = planet.name;
        let diameter = planet.diameter;
        let star = planet.star;
        let distance = planet.distance;
        let moons = planet.moons;
        let imageUrl = planet.imageUrl;
        console.log(planet, name, diameter, star, distance, moons, imageUrl);
        addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
    })
});