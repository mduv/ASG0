// Assuming cuon-matrix.js is already included in your HTML and available here
// Step 1: Instantiate a vector
// var v1 = new Vector3([1, 1, 0]);
var ctx;
var canvas;

function main() {
    // Retrieve <canvas> element
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Clear the canvas with black background
    ctx = canvas.getContext('2d');
    // Check if context was successfully retrieved
    if (!ctx) {
        console.log('Failed to retrieve the 2D context');
        return false;
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // // Step 3: Call drawVector to draw the vector v1 in red
    // drawVector(v1, "red", ctx);
}

// Step 2: Create the drawVector function
function drawVector(v, color, ctx) {
    console.log('drawVector called');

    var scale = 20; // Scale factor for better visualization
    var originX = 200; // Canvas center x
    var originY = 200; // Canvas center y

    // Check if ctx is defined
    if (!ctx) {
        console.log('The context is not defined.');
        return;
    } else {
        console.log('Context is defined, drawing the vector.');
    }

    // Start drawing
    ctx.beginPath();
    ctx.moveTo(originX, originY); // Move to the center of the canvas
    // Calculate and move to the end point of the vector
    // Remember to scale the vector components by 'scale'
    ctx.lineTo(originX + v.elements[0] * scale, originY - v.elements[1] * scale);
    ctx.strokeStyle = color;
    ctx.stroke();

    // Log the final drawing coordinates
    console.log(`Drawing vector at: ${originX + v.elements[0] * scale}, ${originY - v.elements[1] * scale}`);
}

function handleDrawEvent() {
    console.log('handleDrawEvent called');

    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Read the values of the text boxes to create v1
    var x1 = parseFloat(document.getElementById('x1Coord').value);
    var y1 = parseFloat(document.getElementById('y1Coord').value);
    // x1 = isNaN(x1) ? 0 : x1;
    // y1 = isNaN(y1) ? 0 : y1;
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, "red", ctx); // Draw v1 in red

    // Read the values of the text boxes to create v2
    var x2 = parseFloat(document.getElementById('x2Coord').value);
    var y2 = parseFloat(document.getElementById('y2Coord').value);
    // x2 = isNaN(x2) ? 0 : x2;
    // y2 = isNaN(y2) ? 0 : y2;
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, "blue", ctx); // Draw v2 in blue

    // Log the input values
    console.log(`v1: (${x1}, ${y1}), v2: (${x2}, ${y2})`);
}

function angleBetween(v1, v2) {
    var dotProd = Vector3.dot(v1, v2);
    var magV1 = v1.magnitude();
    var magV2 = v2.magnitude();
    var cosAngle = dotProd / (magV1 * magV2);
    var angleRadians = Math.acos(cosAngle);
    var angleDegrees = angleRadians * (180 / Math.PI); // Convert radians to degrees
    return angleDegrees;
}

function areaTriangle(v1, v2) {
    let crossProd = Vector3.cross(v1, v2);
    let area = crossProd.magnitude() / 2;
    return area;
}

function handleDrawOperationEvent() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Read and draw v1 in red
    var x1 = parseFloat(document.getElementById('x1Coord').value);
    var y1 = parseFloat(document.getElementById('y1Coord').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, "red", ctx);

    // Read and draw v2 in blue
    var x2 = parseFloat(document.getElementById('x2Coord').value);
    var y2 = parseFloat(document.getElementById('y2Coord').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, "blue", ctx);

    // Perform the selected operation and draw results
    var operation = document.getElementById('operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);
    var v3, v4; // v4 is used for div and mul operations on v2

    switch (operation) {
        case "area":
            var area = areaTriangle(v1, v2);
            console.log("Area of the triangle formed by v1 and v2: " + area.toFixed(2));
            break;
        case "angleBetween":
            var angle = angleBetween(v1, v2);
            console.log("Angle between v1 and v2: " + angle.toFixed(2) + " degrees");
            break;
        case "magnitude":
            console.log("v1 magnitude: " + v1.magnitude());
            console.log("v2 magnitude: " + v2.magnitude());
            break;
        case "normalize":
            var v1Normalized = new Vector3(v1.elements).normalize();
            var v2Normalized = new Vector3(v2.elements).normalize();
            
            drawVector(v1Normalized, "green", ctx);
            drawVector(v2Normalized, "green", ctx);
            break;
        case "add":
            v3 = new Vector3(v1.elements).add(v2);
            drawVector(v3, "green", ctx);
            break;
        case "sub":
            v3 = new Vector3(v1.elements).sub(v2);
            drawVector(v3, "green", ctx);
            break;
        case "mul":
            // v1 * scalar
            v3 = new Vector3(v1.elements).mul(scalar);
            drawVector(v3, "green", ctx);
            // v2 * scalar, if needed, uncomment below
            v4 = new Vector3(v2.elements).mul(scalar);
            drawVector(v4, "green", ctx);
            break;
        case "div":
            if (scalar !== 0) { // Prevent division by zero
                // v1 / scalar
                v3 = new Vector3(v1.elements).div(scalar);
                drawVector(v3, "green", ctx);
                // v2 / scalar, if needed, uncomment below
                v4 = new Vector3(v2.elements).div(scalar);
                drawVector(v4, "green", ctx);
            } else {
                console.log("Cannot divide by zero.");
            }
            break;
    }
}

