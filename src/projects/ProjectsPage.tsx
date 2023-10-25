import React, {Fragment, useState, useEffect} from 'react';
//import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { ProjectService } from './project-service';

function ProjectsPage() {
    
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        (async () => {
            setLoading(true);

            try{
                const data = await ProjectService.get(currentPage, limit);
                setError('');
                //setProjects(data);
                if(currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data]);
                }
            } catch(e) {
                if(e instanceof Error) {
                    setError(e.message);
                }
                
            } finally {
                setLoading(false);
            }
        })();
    },[currentPage, limit]);

    const handleProjectSave = (projectToBeSaved: Project) => {
        let updatedProjects = projects.map((project) => 
            project.id === projectToBeSaved.id ? projectToBeSaved : project
        );
        setProjects(updatedProjects);
        
    }

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    }

    return (
        <Fragment>

        {
            error && (
                <div className='row'>
                    <div className='card large error'>
                        <section>
                            <p>
                                <span className='icon-alert inverse'></span>
                                {error}
                            </p>
                        </section>
                    </div>

                </div>
            )
        }

        <h1>Projects</h1>
        <ProjectList projects={projects} onSave={handleProjectSave}></ProjectList>

        {!loading && !error && (
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='button-group fluid'>
                        <button className='button default' onClick={handleMoreClick}>More...</button>
                    </div>

                </div>
            </div>
        )}

        {loading && (<div className='center-page'>
            <span className='spinner primary'></span>
            <p>Loading...</p>
        </div>)}

        </Fragment>
        
    )
}

export default ProjectsPage;