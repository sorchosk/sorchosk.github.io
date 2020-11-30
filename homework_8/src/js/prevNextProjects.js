'use strict';
// prevNextProjects.js

// PROJECT LOOP
let prevNextProjects = () => {
    // get id from page
    let body = document.getElementsByTagName('body')[0];
    let pageProjectId = body.id;
    console.log('Page ID: ' + pageProjectId)
    // get corresponding number from projects
    let thisProjectObject = projects.find(project => project.projectId === pageProjectId);
    // This project's index
    let thisProjectIndex = projects.indexOf(thisProjectObject);
    console.log('This project Index: ' + thisProjectIndex);
    
    // get the index before
    let prevProjectIndex;
    if (thisProjectIndex - 1 === -1) {
        // if first in array, use last
        prevProjectIndex = projects.length - 1;
    } else {
        prevProjectIndex = thisProjectIndex - 1;
    }
    console.log('Prev project Index: ' + prevProjectIndex);
        
    // get index after
    let nextProjectIndex;
    if (thisProjectIndex + 1 === projects.length) {
        // if last in array, use 0
        nextProjectIndex = 0;
    } else {
        nextProjectIndex = thisProjectIndex + 1;
    }

    console.log('Next project Index: ' + nextProjectIndex);

    console.log('Project length: ' + projects.length);
}