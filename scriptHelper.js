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
    testInput.addEventListener("formSubmit", function (event) {
        if (testInput === "") {
            return "Empty";
        } else if (isNaN(testInput)) {
            return "Not a number";
        } else if (isNaN(testInput) === false) {
            return "Is a number";
        };
    });
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    pilot = document.querySelector("input[name=pilotName]");
    copilot = document.querySelector("input[name=copilotName]");
    fuelLevel = document.querySelector("input[name=fuelLevel]");
    cargoMass =document.querySelector("input[name=cargoMass]");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
        if (validateInput(pilot.value) === "Empty"|| validateInput(copilot.value) === "Empty" || validateInput(fuelLevel.value) === "Empty" || validateInput(cargoMass.value) === "Empty") {
            window.alert("All fields are required.");
            event.preventDefault();
        } else if (validateInput(pilot.value) === "Is a number" || validateInput(copilot.value) === "Is a number") {
            window.alert("Pilot and Copilot names cannot be numeric.");
            event.preventDefault();
        } else if (validateInput(fuelLevel.value) === "Not a number" || validateInput(cargoMass.value) === "Not a number") {
            window.alert("Fuel status and cargo status inputs must be numeric values.");
            event.preventDefault();
        } else if (validateInput(pilot.value) === "Not a number" && validateInput(copilot.value) === "Not a number" && validateInput(fuelLevel.value) === "Is a number" && validateInput(cargoMass.value) === "Is a number") {
            list = document.getElementById("faultyItems");
            list.style.visiblity = "visible";
            pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch.`;
            copilotStatus.innerHTML = `Copilot ${copilot.value} is ready for launch.`;
        };
            if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
                let launchStatus = document.getElementById("launchStatus");
                launchStatus.innerHTML = "Shuttle not ready for launch.";
                launchStatus.style.color = "red";
                fuelStatus.innerHTML = "Fuel level too low for launch.";
                cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
            } else if (fuelLevel.value >= 10000 && cargoMass.value > 10000) {
                launchStatus.innerHTML = "Shuttle not ready for launch.";
                launchStatus.style.color = "red";
                fuelStatus.innerHTML = `Fuel level is ${fuelLevel.value}L.`;
                cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
            } else if (fuelLevel.value < 10000 && cargoMass.value <= 10000) {
                launchStatus.innerHTML = "Shuttle not ready for launch.";
                launchStatus.style.color = "red";
                fuelStatus.innerHTML = "Fuel level too low for launch.";
                cargoStatus.innerHTML = `Cargo mass is ${cargoMass.value}kg.`;
            } else if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
                launchStatus.innerHTML = "Shuttle is ready for launch.";
                launchStatus.style.color = "green";
                fuelStatus.innerHTML = `Fuel level is ${fuelLevel.value}L.`;
                cargoStatus.innerHTML = `Cargo mass is ${cargoMass.value}kg.`;
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
    return listedPlanets[randomNumber];
};

module.exports = {
    addDestinationInfo: addDestinationInfo,
    validateInput: validateInput,
    formSubmission: formSubmission,
    pickPlanet: pickPlanet,
    myFetch: myFetch
};
