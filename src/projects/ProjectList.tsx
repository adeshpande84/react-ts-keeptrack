import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

function ProjectList(props: ProjectListProps) {

    const [projectBeingEdited, setProjectBeingEdited] = useState(new Project({id: null}));

    const handleEdit = (projectToBeEdited: Project) => {        
        setProjectBeingEdited(projectToBeEdited);
    }

    const handleFormCancel = () => {
        setProjectBeingEdited(new Project({id: null}))
    }

    const handleFormSave = (project: Project) => {
        //console.log('Add new project',project);
        props.onSave(project);
        setProjectBeingEdited(new Project({id: null}));
    }

    return (
        <div className="row">
            {
                props.projects.map((project) => {
                    return (
                        <div key={project.id} className="cols-sm">
                            {
                                project.id === projectBeingEdited.id ? 
                                    <ProjectForm project={project} onCancel={handleFormCancel} onSave={handleFormSave}/> : <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
                            
                            }
                            
                            
                        </div>
                    );
                })
            }
        </div>

    );
}

export default ProjectList;