'use strict';

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
