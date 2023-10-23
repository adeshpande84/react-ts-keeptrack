import { Project } from "./Project";

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
};

function ProjectCard({project, onEdit}: ProjectCardProps) {
    
    const handleEditClick = (projectToBeEdited: Project) => {
        
        onEdit(projectToBeEdited);
    }

    const formatDescription = (description: string): string => {
        return description.substring(0,60) + '...';
    }

    return (
        
        <div className="card">
            <img src={project.imageUrl} alt={project.name}></img>
            <section className="section dark">
                <h5 className="strong"><strong>{project.name}</strong></h5>
                <p>{formatDescription(project.description)}</p>
                <p>Budget: {new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(project.budget)}</p>
                <button className="bordered" onClick={() => handleEditClick(project)}>
                    <span className="icon-edit"></span>
                    Edit
                </button>
            </section>
        </div>
        
    );
}

export default ProjectCard;