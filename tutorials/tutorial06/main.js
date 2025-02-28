// global variables tracking the user's preferences:
let searchTerm = "";
let openOnly = false;

const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Set user's preferences (global variables) from the DOM:
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;

    // Invoke the show matching courses function
    showMatchingCourses();
};

// Part 1.1a
const isClassFull = (course) => {
    // modify this to accurately apply the filter:
    return course.EnrollmentCurrent < course.EnrollmentMax;
    //false means it is full; True it is open
   // return true;
};

// Part 1.1b
//includes(): Partial matching
//toLowerCase(): Easier comparison
const doesTermMatch = (course) => {
    // modify this to accurately apply the filter:
    const term = searchTerm.toLowerCase();
    
    let valid_room = false;

    if (course.Location.FullLocation == null){
        valid_room = false;
    }else{
       valid_room =  course.Location.FullLocation.toLowerCase().includes(term) ? true : false;
    }

    return (
        course.Title.toLowerCase().includes(term) ||
        course.Instructors[0].Username.includes(term) ||
        course.Instructors[0].Name.toLowerCase().includes(term) ||
        course.Department.toLowerCase().includes(term) ||
        course.CRN.toString().includes(term) || valid_room
    );

};

// Part 1.2
const dataToHTML = (course) => {
    // modify this to be more detailed

    //check if full
    const full = isClassFull(course);
    return `
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                <i class="fa-solid ${full ? "fa-circle-check" : "fa-circle-xmark"}"></i> 
                ${full ? "Open" : "Closed"} &bull; ${course.CRN} &bull; 
                ${full ? `Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}` : `Number on Waitlist: ${course.WaitlistAvailable}`}
            </p>
            <p>
                ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
    `;
};

// Part 2
const showMatchingCourses = () => {
    console.log(`Search term: ${searchTerm}`);
    console.log(`Only show open classes: ${openOnly}`);
    console.log(`Course data:`, courseList);

    // output all of the matching courses to the screen:
    const container = document.querySelector(".courses");
    container.innerHTML = "";

    let filtered = null;

    if(openOnly){

        filtered = courseList
        .filter(isClassFull)
        .filter(doesTermMatch);

    }else{

        filtered = courseList
        .filter(doesTermMatch);

    }
    
    filtered.forEach((course) => {
        const snippet = dataToHTML(course);
        container.insertAdjacentHTML("beforeend", snippet);
    })

    console.log(filtered);
};
