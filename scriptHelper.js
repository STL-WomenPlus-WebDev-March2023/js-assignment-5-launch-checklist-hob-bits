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
        if (testInput === "") {
            return "Empty";
        } else if (isNaN(testInput)) {
            return "Not a number";
        } else if (typeof testInput === "number") {
            return "Is a number";
        };
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
        if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
            window.alert("All fields are required.");
        } else if (validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number" || validateInput(fuelLevel) === "Not a number" || validateInput(cargoMass) === "Not a number") {
            window.alert("Pilot and copilot names cannot be numeric, and fuel status and cargo status inputs must be numeric values.");
        } else {
            let launchStatus = document.getElementById("launchStatus");
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch.`;
            copilotStatus.innerHTML = `Copilot ${copilot} is ready for launch.`;
                if (fuelLevel < 10000 && cargoMass > 10000) {
                    launchStatus.innerHTML = "Shuttle not ready for launch.";
                    launchStatus.style.color = "red";
                    fuelStatus.innerHTML = "Fuel level too low for launch.";
                    cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
                } else if (fuelLevel >= 10000 && cargoMass > 10000) {
                    launchStatus.innerHTML = "Shuttle not ready for launch.";
                    launchStatus.style.color = "red";
                    fuelStatus.innerHTML = `Fuel level is ${fuelLevel}L.`;
                    cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
                } else if (fuelLevel < 10000 && cargoMass <= 10000) {
                    launchStatus.innerHTML = "Shuttle not ready for launch.";
                    launchStatus.style.color = "red";
                    fuelStatus.innerHTML = "Fuel level too low for launch.";
                    cargoStatus.innerHTML = `Cargo mass is ${cargoMass}kg.`;
                } else if (fuelLevel >= 10000 && cargoMass <= 10000) {
                    launchStatus.innerHTML = "Shuttle is ready for launch.";
                    launchStatus.style.color = "green";
                    fuelStatus.innerHTML = `Fuel level is ${fuelLevel}L.`;
                    cargoStatus.innerHTML = `Cargo mass is ${cargoMass}kg.`;
                };
        };
    };


async function myFetch() {
    let planetsReturned;
    try {
        planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
                return response.json();
        });
    } catch (err) {
        console.error(err);
    };
    return planetsReturned;
};

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports = {
    addDestinationInfo: addDestinationInfo,
    validateInput: validateInput,
    formSubmission: formSubmission,
    pickPlanet: pickPlanet,
    myFetch: myFetch
};
