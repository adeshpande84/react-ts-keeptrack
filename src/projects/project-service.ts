import {Project} from './Project';
const baseUrl = 'http://localhost:3002';
const url = `${baseUrl}/projects`;

interface IProjectService {
    get: (page: number, limit: number, sort?: string) => Project[]
}

const ProjectService = {
    get: (page=1, limit=20, sort='name') => {
        return fetch(`${url}?page=${page}&limit=${limit}&sort=${sort}`)
            .then((response) => response.json())
            .then((data) => data.map((item:any) => new Project(item)))
            .catch((error) => {
                console.log('log client error ' + error);
                throw new Error('There was an error getting the projects. Please try again.');
            });
    }
}

export {ProjectService};