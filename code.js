function tspLS(distanceMatrix) {
    const n = distanceMatrix.length;
    let incumbent = getRandomRoute(n);
    let incumbentLength = calculateRouteLength(incumbent, distanceMatrix);
    const maxIterations = 1000;
    const maxFailedAttempts = 5;
    let failedAttempts = 0;
    for (let iteration = 0; iteration < maxIterations && failedAttempts < maxFailedAttempts; iteration++) {
        let i = getRandomIndex(n);
        let k = getRandomIndex(n);
        while (i === k) {
            k = getRandomIndex(n);
        }
        if (i > k) { // Ensure that i < k
            const temp = i;
            i = k;
            k = temp;
        }
        const newRoute = twoOptSwap(incumbent, i, k);
        const newLength = calculateRouteLength(newRoute, distanceMatrix);
        if (newLength < incumbentLength) {
            incumbent = newRoute;
            incumbentLength = newLength;
            failedAttempts = 0;
        } else {
            failedAttempts++;
        }
    }
    return incumbentLength;
}

function twoOptSwap(route, i, k) {
    return route.slice(0, i).concat(route.slice(i, k + 1).reverse(), route.slice(k + 1));
}

function calculateRouteLength(route, distanceMatrix) {
    let length = 0;
    for (let i = 0; i < route.length - 1; i++) {
        length += distanceMatrix[route[i]][route[i + 1]];
    }
    length += distanceMatrix[route[route.length - 1]][route[0]];
    return length;
}

function getRandomRoute(n) {
    const route = [];
    for (let i = 0; i < n; i++) {
        route.push(i);
    }
    return shuffleArray(route);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomIndex(n) {
    return Math.floor(Math.random() * n);
}
