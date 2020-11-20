'use strict';

// PROJECT ARRAY
const projects = [
    {
        title: 'Blue222',
        mobileImg: 'img/thumbnails/blue222-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/blue222-thumb@2x.jpg',
        description: 'Wordpress website design for an innovative real estate inspection service',
        url: './blue222.html'
    },
    {
        title: 'Union Savings Bank',
        mobileImg: 'img/thumbnails/usb-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/usb-thumb@2x.jpg',
        description: 'Website design for leading mortgage and lending banks in OH and KY',
        url: './union-savings-bank.html'
    },
    {
        title: 'Tempur-Pedic',
        mobileImg: 'img/thumbnails/tempur-pedic-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/tempur-pedic-thumb@2x.jpg',
        description: 'Customizable and readymade landing page design system for mattress retailers',
        url: './tempur-pedic.html'
    },
    {
        title: 'U.S. Playing Card',
        mobileImg: 'img/thumbnails/uspc-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/uspc-thumb@2x.jpg',
        description: 'Website design for the leading playing card company in the United States',
        url: './us-playing-card.html'
    },
    {
        title: 'Braxton Brewing Company',
        mobileImg: 'img/thumbnails/braxton-thumb--mobile@2x.jpg',
        desktopImg: 'img/thumbnails/braxton-thumb@2x.jpg',
        description: 'Wordpress website for a craft brewery in Covington, KY',
        url: './braxton-brewing.html'
    }
];

// PROJECT LOOP
const projectList = document.getElementById("projectList");
let projectLoop = () => {
    for (let project in projects) {
        let title = projects[project].title;
        let mobileImg = projects[project].mobileImg;
        let desktopImg = projects[project].desktopImg;
        let description = projects[project].description;
        let url = projects[project].url;

        let projectListItem = document.createElement('li');
        projectListItem.classList = "project-list-item col-12 col-md-6";
        projectListItem.innerHTML = `
        <a href="` + url + `">
            <img src="` + mobileImg + `" alt="` + title + `" class="img-fluid col-12 d-block d-md-none">
            <img src="` + desktopImg + `" alt="` + title + `" class="img-fluid col-4 d-none d-md-block">
            <div class="project-list-item__text col-12">
                <h3>` + title + `</h3>
                <p>` + description + `</p>
            </div>
        </a>
        `
        
        projectList.appendChild(projectListItem);
    }
}