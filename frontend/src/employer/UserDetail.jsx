// import { FaUserCircle } from 'react-icons/fa';
// import { Card, CardContent } from '/';

// const UserDetails = () => {
//   const users = [
//     { _id: '1', name: 'John Doe', email: 'john@example.com', resume: 'Resume.pdf' },
//     { _id: '2', name: 'Jane Smith', email: 'jane@example.com', resume: 'Jane_CV.pdf' },
//     { _id: '3', name: 'Alice Johnson', email: 'alice@example.com', resume: 'Alice_Resume.pdf' },
//   ];

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold text-center mb-6">Applicants for Job 101</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <Card key={user._id} className="shadow-lg rounded-2xl overflow-hidden">
//               <CardContent className="p-5 flex flex-col items-center text-center">
//                 <FaUserCircle className="text-6xl text-blue-500 mb-4" />
//                 <h2 className="text-xl font-semibold">{user.name}</h2>
//                 <p className="text-gray-600">{user.email}</p>
//                 <p className="mt-2 text-gray-800 font-medium">{user.resume}</p>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <p className="text-center col-span-full">No applicants found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDetails;
