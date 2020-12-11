'use strict';
// jobListArray.js

// PROJECT ARRAY
const jobList = [
    {
        img: 'img/professional-experience/icon.jpeg',
        title: 'Digital Designer',
        company: 'Icon Marketing',
        dates: 'APR 2017–AUG 2020',
        description: [
            'Designed and developed websites for The U.S. Playing Card, Company, Union Savings Bank, Guardian Savings Bank, Raynor Gaming, and Braxton Brewery',
            'Concepted and implemented a landing page build system to deliver over 200 custom landing pages for retailers of Tempur-Pedic, Sealy, and Stearns & Foster',
            'Managed the digital design internship program'
        ]
    },
    {
        img: 'img/professional-experience/lisnr.png',
        title: 'Designer',
        company: 'LISNR',
        dates: 'JAN 2017–MAR 2020',
        description: [
            'Design email templates, web pages, white page & documentation PDFs, online publications, social media graphics, infographics and storyboards',
            'Create print collateral for trade shows to generate new business leads and investors',
            'Perform art direction for the marketing team, as well as communicate brand and design strategy internally and with partnering agencies'
        ]
    },
    {
        img: 'img/professional-experience/rockfish.png',
        title: 'Freelance Designer',
        company: 'Rockfish',
        dates: 'NOV 2016–JAN 2017',
        description: [
            'Create Amazon marketplace and e-commerce graphics for MARS Petcare',
            'Exhibit organization skills for thousands of graphics and appropriately package them for handoff to project management and clients',
            'Illustrate infographics for use in MARS Petcare marketing materials while adhering to their brand guidelines'
        ]
    },
    {
        img: 'img/professional-experience/clubessential.png',
        title: 'UI &amp; UX Designer',
        company: 'Clubessential',
        dates: 'JUN 2015–SEP 2016',
        description: [
            'Creates eye-catching and engaging websites for clients in the private club industry and ensures that all projects are delivered in a timely manner',
            'Liasing with customers via telephone and face-to-face meetings through client discovery calls and design presentations',
            'Collaborates with front end developers and project managers through packaging artwork and giving feedback throughout the development process',
            'Creates various in-house marketing materials for print and web.'
        ]
    },
]

'use strict';
// jobLoop.js

let workExperience = document.getElementById('workExperience');

let workLoop = () => {
    for (let job in jobList) {
        let title = jobList[job].title;
        let company = jobList[job].company;
        let dates = jobList[job].dates;
        let img = jobList[job].img;

        // Render work experience meta information
        let workExperienceItem = document.createElement('div');
        workExperienceItem.classList = 'row work-experience-item';

        workExperienceItem.innerHTML = `
        <div class="col col-12 col-lg-4">
            <div class="row no-gutters work-experience-meta">
                <img src="` + img + `" alt="` + company + ` logo" class="img-fluid work-experience__img">
                <div class="col">
                    <h4>` + title + `</h4>
                    <h5>` + company + `</h5>
                    <h6>` + dates + `</h6>
                </div>
            </div>
        </div>
        `

        // Render description bullets
        let description = jobList[job].description;
        let itemizedDescriptionDiv = document.createElement('div');
        itemizedDescriptionDiv.classList = "col col-12 col-lg-8";
        let itemizedDescription = document.createElement('ul');
        itemizedDescription.classList = 'work-experience__ul';
        let listItem;
        for (let bullet in description) {
            let listItem = document.createElement('li');
            listItem.classList = 'work-experience__li';
            listItem.innerHTML = description[bullet];
            itemizedDescription.appendChild(listItem);
        }
        itemizedDescriptionDiv.appendChild(itemizedDescription);

        
        workExperience.appendChild(workExperienceItem);
        workExperienceItem.appendChild(itemizedDescriptionDiv);
    }
}

// pageFade.js

function fadeInPage() {
    if (!window.AnimationEvent) { 
        return; 
    }
    const fader = document.getElementById("fader");
    fader.classList = 'fade-out';
}

document.addEventListener('DOMContentLoaded', function() {
    if (!window.AnimationEvent) { 
        return; 
    }
    let anchors = document.getElementsByTagName('a');
    for (let i in anchors) {
        if (anchors[i].hostname !== window.location.hostname || anchors[i].pathname === window.location.pathname) {
            continue;
        }
        anchors[i].addEventListener('click', function(e) {
            const fader = document.getElementById('fader');
            let anchor = e.currentTarget;
            let listener = function() {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            }
            fader.addEventListener('animationend', listener);
            e.preventDefault();
            fader.classList = 'fade-in';
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) {
        return;
    }
    const fader = document.getElementById('fader');
    fader.classList.remove('fade-in');
});

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

    // ######################
    // Render project displays
    // ######################

    let prevNextProjectsDiv = document.getElementById('prevNextProjects');

    // Previous project
    let prevProject = projects[prevProjectIndex];
    let prevProjectDiv = document.createElement('div');
    prevProjectDiv.classList = "project-list-item d-block col-12 d-md-flex col-lg-6";
    prevProjectDiv.innerHTML = `
    <a href="` + prevProject.url + `" class="col">
        <img src="` + prevProject.mobileImg + `" alt="U.S. Playing Card" class="img-fluid col-12 d-block d-lg-none project-list-item__img">
        <div class="img-fluid col-8 d-none d-lg-block project-list-item__img" style="background-image: url('` + prevProject.desktopImg + `');">
        </div>
        <div class="project-list-item__text col-12 col-md-8">
            <p class="col-12 text-left eyebrow prev-next-label prev-label">prev</p>
            <h3 class="text-left">` + prevProject.title + `</h3>
            <p class="text-left">`+ prevProject.description +`</p>
        </div>
    </a>
    `

    prevNextProjectsDiv.appendChild(prevProjectDiv);

    // Next project
    let nextProject = projects[nextProjectIndex];
    let nextProjectDiv = document.createElement('div');
    nextProjectDiv.classList = "project-list-item d-block col-12 d-md-flex col-lg-6";
    nextProjectDiv.innerHTML = `
    <a href="` + nextProject.url + `" class="col">
        <img src="` + nextProject.mobileImg + `" alt="U.S. Playing Card" class="img-fluid col-12 d-block d-lg-none project-list-item__img">
        <div class="img-fluid col-8 d-none d-lg-block project-list-item__img" style="background-image: url('` + nextProject.desktopImg + `');">
        </div>
        <div class="project-list-item__text col-12 col-md-8 align-items-end">
            <p class="col-12 text-right eyebrow prev-next-label next-label">Next</p>
            <h3 class="text-right">` + nextProject.title + `</h3>
            <p class="text-right">`+ nextProject.description +`</p>
        </div>
    </a>
    `

    prevNextProjectsDiv.appendChild(nextProjectDiv);

    console.log('Project length: ' + projects.length);

    // ######################
    // Render project displays
    // ######################

    let miniNav = document.getElementById('mini-nav');
    miniNav.innerHTML = `
    <a href="`+ prevProject.url +`"><p class="col-12 text-left eyebrow prev-next-label prev-label">`+ prevProject.title +`</p></a>
    <a href="`+ nextProject.url +`"><p class="col-12 text-right eyebrow prev-next-label next-label">`+ nextProject.title +`</p></a>
    `
}
'use strict';
// projectArray.js

// PROJECT ARRAY
const projects = [
    // {
    //     projectId: 'blue222',
    //     title: 'Blue222',
    //     mobileImg: 'img/thumbnails/blue222-thumb--mobile@2x.jpg',
    //     desktopImg: 'img/thumbnails/blue222-thumb@2x.jpg',
    //     description: 'Wordpress website design for an innovative real estate inspection service',
    //     url: './blue222.html'
    // },
    {
        projectId: 'usb',
        title: 'Union Savings Bank',
        mobileImg: 'img/thumbnails/usb-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/usb-thumb@2x.jpg',
        description: 'Website design for leading mortgage and lending banks in OH and KY',
        url: './usb.html'
    },
    {
        projectId: 'tempur-pedic',
        title: 'Tempur-Pedic',
        mobileImg: 'img/thumbnails/tempur-pedic-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/tempur-pedic-thumb@2x.jpg',
        description: 'Customizable and readymade landing page design system for mattress retailers',
        url: './tempur-pedic.html'
    },
    {
        projectId: 'uspc',
        title: 'U.S. Playing Card',
        mobileImg: 'img/thumbnails/uspc-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/uspc-thumb@2x.jpg',
        description: 'Website design for the leading playing card company in the United States',
        url: './uspc.html'
    },
    // {
    //     projectId: 'braxton',
    //     title: 'Braxton Brewing Co.',
    //     mobileImg: 'img/thumbnails/braxton-thumb--mobile@2x.jpg',
    //     desktopImg: 'img/thumbnails/braxton-thumb@2x.jpg',
    //     description: 'Wordpress website for a craft brewery in Covington, KY',
    //     url: './braxton-brewing.html'
    // }
];
'use strict';
// projectLoop.js

// PROJECT LOOP
const projectList = document.getElementById("projectList");
let projectLoop = () => {
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
// scrollRevealFunctions.js

let revealFromBottom = {
    distance: '150%',
    origin: 'bottom',
    opacity: null
};

ScrollReveal().reveal('.jumbotron__img', {
    delay: 400
});

ScrollReveal().reveal('.jumbotron__h1', {
    delay: 700
});