import React, {useState} from 'react';
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";

function ProjectsPage() {
    
    const [projects,setProjects] = useState<Project[]>(MOCK_PROJECTS);

    const handleProjectSave = (projectToBeSaved: Project) => {
        let updatedProjects = projects.map((project) => 
            project.id === projectToBeSaved.id ? projectToBeSaved : project
        );
        setProjects(updatedProjects);
        
    }

    return (
        <>
        <h1>Projects</h1>
        <ProjectList projects={projects} onSave={handleProjectSave}></ProjectList>
        </>
        
    )
}

export default ProjectsPage;