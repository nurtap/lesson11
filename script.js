fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Call a function to display the data
        displayCV(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function displayCV(data) {
    const personalInfo = data.personalInformation;
    document.getElementById('name').textContent = personalInfo.name;
    document.getElementById('title').textContent = personalInfo.title;
    document.getElementById('email').textContent = personalInfo.email;
    document.getElementById('phone').textContent = personalInfo.phone;
    document.getElementById('linkedin').textContent = personalInfo.linkedin;
    document.getElementById('github').textContent = personalInfo.github;
    document.getElementById('location').textContent = personalInfo.location;

    populateSection('work-entries', data.workExperience, formatWorkExperience);
    populateSection('education-entries', data.education, formatEducation);
    populateList('tech-skills-list', data.techSkills);
    populateList('soft-skills-list', data.softSkills);
    populateSection('project-entries', data.projects, formatProjects);
}

function populateSection(containerId, items, formatter) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(formatter).join('');
}

function populateList(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

function formatWorkExperience(entry) {
    return `
        <div>
            <strong>${entry.title} at ${entry.company}</strong>
            <span>${entry.startDate} - ${entry.endDate}</span>
            <p>${entry.description}</p>
        </div>
    `;
}

function formatEducation(entry) {
    return `
        <div>
            <strong>${entry.degree} at ${entry.institution}</strong>
            <span>${entry.startDate} - ${entry.endDate}</span>
            <p>${entry.description}</p>
        </div>
    `;
}

function formatProjects(project) {
    return `
        <div>
            <strong>${project.name}</strong>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
            <a href="https://${project.link}" target="_blank">View Project</a>
        </div>
    `;
}