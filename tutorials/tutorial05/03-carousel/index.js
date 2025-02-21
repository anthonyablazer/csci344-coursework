let currentPosition = 0;
let gap = 10;
const slideWidth = 400;

//declares function
function moveCarousel(direction) {

    //gets all the attributes with the class name
    const items = document.querySelectorAll(".carousel-item");

    //if the HTML button is sent backward
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        //Also checks to make sure you aren't at the last of the items
        if (currentPosition >= items.length - 2) {
            return false; // if you are, then you can't move forward any more
        }
        currentPosition++; // If you aren't at the last item, then show the next

    //if the HTML button is sent backwards
    } else {
        //If we are at the first items
        if (currentPosition == 0) {
            return false;//We cannot move back anymore since we are back to the front of the items 
        }
        currentPosition--;//If we aren't to the first item yet, move back an item
    }

    //Allow an offset so that the slides don't overlap or output with incorrect proportions
    const offset = (slideWidth + gap) * currentPosition;

    //loop through the items and apply the CSS styling in order to slide them horizontally
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
