'use strict';
// prevNextProjects.js

// PROJECT LOOP
let prevNextProjects = () => {
    for (let project in projects) {
        // variables for project object properties
        let title = projects[project].title;
        let mobileImg = projects[project].mobileImg;
        let desktopImg = projects[project].desktopImg;
        let description = projects[project].description;
        let url = projects[project].url;

        // create project li element
        let projectListItem = document.createElement('li');
        projectListItem.classList = "project-list-item d-block col-12 d-md-flex col-lg-6";
        // html with project properties
        projectListItem.innerHTML = `
        <a href="` + url + `" class="col-12">
            <img src="` + mobileImg + `" alt="` + title + `" class="img-fluid col-12 d-block d-lg-none project-list-item__img">
            <div class="img-fluid col-8 d-none d-lg-block project-list-item__img" style="background-image: url(` + desktopImg + `);">
            </div>
            <div class="project-list-item__text col-12 col-md-8">
                <h3>` + title + `</h3>
                <p>` + description + `</p>
            </div>
        </a>`
        // append to #projectList
        projectList.appendChild(projectListItem);
    }
}