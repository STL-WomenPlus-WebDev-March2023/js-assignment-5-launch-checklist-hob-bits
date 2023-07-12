window.addEventListener("load", function () {
    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        let planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
    });

    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let pilotName = document.querySelector("input[name=pilotName]");
            pilot = pilotName.value;
        let copilotName = document.querySelector("input[name=copilotName]");
            copilot = copilotName.value;
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
            fuelLevel = Number(fuelLevelInput.value);
        let cargoMassInput = document.querySelector("input[name=cargoMass]");
            cargoMass = Number(cargoMassInput.value);
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
        });
});