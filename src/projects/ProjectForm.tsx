import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";


interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
    onSave: (project: Project) => void; 
}

function ProjectForm({project, onCancel, onSave}: ProjectFormProps) {
    const [updatedProject, setUpdatedProject] = useState(project);
    
    //setName(project.name);

    const handleFormSave = (event: SyntheticEvent) => {
        event.preventDefault();
        onSave(updatedProject);
    }

    const handleFormCancel = () => {
        onCancel();
    }

    const handleChange = (event: any) => {
        
        let elementName = event.target.name;
        let elementType = event.target.type;
        let value: any = '';
        
        console.log(elementType,elementName,event.target.checked);
        const change: any = {};

        if(elementType === 'checkbox') {
            value = event.target.checked;
        } else if(elementType === 'number') {
            value = Number(event.target.value);
        } else {
            value = event.target.value;
        }

        change[elementName] = value;

        setUpdatedProject((p) => new Project({...p, ...change}));

    }

    return (
        <form className="input-group vertical" onSubmit={handleFormSave}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" onChange={handleChange} value={updatedProject.name}/>
            
            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" onChange={handleChange} value={updatedProject.description}></textarea>
            
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget" onChange={handleChange} value={updatedProject.budget}/>

            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={!!updatedProject.isActive} onChange={(e) => handleChange(e)} />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={handleFormCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default ProjectForm;