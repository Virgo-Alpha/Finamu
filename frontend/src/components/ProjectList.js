// // ProjectList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await axios.get('/api/projects');
//         setProjects(res.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   return (
//     <div>
//       <h1>My Projects</h1>
//       <ul>
//         {projects.map((project) => (
//           <li key={project._id}>
//             <h2>{project.name}</h2>
//             <p>{project.description}</p>
//             <Link to={`/edit/${project._id}`}>Edit</Link>
//             <button onClick={() => /* Logic to set public/private */}>
//               {project.isPublic ? 'Set Private' : 'Launch'}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProjectList;
