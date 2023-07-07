require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
            `;
};

function validateInput(testInput) {
    testInput = document.querySelector("testForm");
    testInput.addEventListener("submit", function (event) {
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");
        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass === "") {
            event.preventDefault();
            return "Empty";
        } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
            event.preventDefault();
            return "Not a number";
        } else if (!isNaN(fuelLevel.value) || !isNaN(cargoMass.value)) {
            return "Is a number";
        };
    });
};

function formSubmission(document, list, pilotInput, copilotInput, fuelLevelInput, cargoMassInput) {
    list = document.querySelector("testForm");
    pilotInput = document.querySelector("input[name=pilotName]");
    copilotInput = document.querySelector("input[name=copilotName]");
    fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    cargoMassInput = document.querySelector("input[name=cargoMass]");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    if (validateInput(list) === "Is a number") {
        pilotStatus.innerHTML = `Pilot ${pilotInput.value} is ready for launch.`;
        copilotStatus.innerHTML = `Copilot ${copilotInput.value} is ready for launch.`;
        if (fuelLevelInput.value < 10000) {
            faultyItems.visible = true;
            launchStatus.innerHTML = "Shuttle not ready for launch.";
            launchStatus.style.color = "red";
            fuelStatus.innerHTML = "Fuel level too low for launch.";
        } else if (fuelLevelInput.value >= 10000) {
            launchStatus.innerHTML = "Shuttle is ready for launch.";
            launchStatus.style.color = "green";
            fuelStatus.innerHTML = `Fuel level is ${fuelLevelInput.value}L.`;
        };
        if (cargoMassInput.value > 10000) {
            faultyItems.visible = true;
            launchStatus.innerHTML = "Shuttle not ready for launch.";
            launchStatus.style.color = "red";
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
        } else if (fuelLevelInput.value <= 10000) {
            launchStatus.innerHTML = "Shuttle is ready for launch.";
            launchStatus.style.color = "green";
            cargoStatus.innerHTML = `Cargo mass is ${cargoMassInput.value}kg.`;
        };
    };
};

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        response.json().then(function (json) {
            console.log(json);
        });
    });
    return planetsReturned;
};

function pickPlanet(listedPlanets) {
    let randomNumber = Math.floor(Math.random() * listedPlanets.length);
    let planet = listedPlanets[randomNumber];
    return planet;
};

module.exports = {
    addDestinationInfo: addDestinationInfo,
    validateInput: validateInput,
    formSubmission: formSubmission,
    pickPlanet: pickPlanet,
    myFetch: myFetch
};
