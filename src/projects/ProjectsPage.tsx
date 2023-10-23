//import React from 'react';
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";

function ProjectsPage() {

    const handleProjectSave = (project: Project) => {
        console.log('ProjectsPage',project);
    }

    return (
        <>
        <h1>Projects</h1>
        <ProjectList projects={MOCK_PROJECTS} onSave={handleProjectSave}></ProjectList>
        </>
        
    )
}

export default ProjectsPage;