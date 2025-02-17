let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    //draw5Circles();
    //draw5RedSquares();
    draw5CirclesWhile(); //Task 2
    draw5CirclesFor(); //Task 3
    drawNCircles(20); //Task 4
    drawNCirclesFlexible(30, 25, 400, 0); //Task 5
    drawNCirclesFlexible(4, 100, 100, 200);
    drawNCirclesFlexible(8, 50, 700, 100);
    drawNShapesFlexible(4, 100, 120, 200, "circle"); //Task 6
    drawNShapesFlexible(8, 50, 725, 25, "square");
    drawNShapesFlexible(30, 30, 335, 0, "square");
    drawNShapesDirectionFlexible(30, 30, 335, 0, "square", "column"); //Task 7
    drawNShapesDirectionFlexible(4, 100, 120, 200, "circle", "row");
    drawNShapesDirectionFlexible(8, 50, 725, 425, "circle", "row");

    randomPlaceArt(30); //optional task


    drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
    noFill();
    // fill('red');
    circle(100, 200, 50); // centerX, centerY, radius
    circle(100, 250, 50);
    circle(100, 300, 50);
    circle(100, 350, 50);
    circle(100, 400, 50);
}

function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}


//Task 2: While()
function draw5CirclesWhile(){
    let i = 0;
    let centerYval = 300;
    while (i < 5){
        //fill("blue");
        circle(100, centerYval, 50);
        centerYval += 50;
        i++;
    }
}

//Task 3: For()
function draw5CirclesFor(){
    for (let centerY = 400; centerY > 150; centerY-=50){
        //fill("green");
        circle(200, centerY, 50);
    }
}

//Task 4: N Times
function drawNCircles(n){

    let centerY = 500;
    for (let x = 0; x < n; x++){
        circle(300, centerY, 50);
        centerY -= 10;
    }

}

//Task 5: flexible
function drawNCirclesFlexible(n, size, x, y){

    let placement = y;
    for (let z = 0; z < n; z++){
        circle(x, placement, size);
        placement+=size;
    }

}


//Task 6: Even more flexible
function drawNShapesFlexible(n, size, x, y, shape){
    if (shape == "circle"){
        drawNCirclesFlexible(n,size,x,y);
    }else{
        let placement = y;
        for (let z = 0; z < n; z++){
            square(x, placement, size);
            placement+=size;
        }
    }
}


//Task 7: Most flexible
function drawNShapesDirectionFlexible(n, size, x, y, shape, direction){

    let placementY = y;
    let placementX = x;

    //circles
    if (shape === "circle"){

        if (direction === "row"){

            //Moving on a row loop
            let placement = x;
            for (let z = 0; z < n; z++){
                circle(placement, y, size);
                placement+=size;
            }

        }else{
            drawNCirclesFlexible(n,size,x,y);
        }

    }else{

        if (direction == "row"){

            //Moving on a row loop
            let placement = x;
            for (let z = 0; z < n; z++){
                square(placement, y, size);
                placement+=size;
            }

        }else{
            drawNShapesFlexible(n,size,x,y,"square");
        }

    }

}


//OPTIONAL: Creating a function that invokes random art
//Insert how many shaped you'd like added
function randomPlaceArt(shapeAmt){
    let colors = ["blue", "red", "green", "purple", "orange", "yellow"];
    let shapes = ["circle", "square"];

    for (let x = 0; x < shapeAmt; x++){
        let random_color = colors[getRandomIntInclusive(0, colors.length-1)];
        let random_shape = shapes[getRandomIntInclusive(0,1)];
        let random_size = getRandomIntInclusive(1,100);
        let random_X = getRandomIntInclusive(1,1200);
        let random_Y = getRandomIntInclusive(1, 700);

        fill(random_color);
        drawNShapesFlexible(1, random_size, random_X, random_Y, random_shape);

    }
}

//Helper Method (from mdn web docs for inclusive random)
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

