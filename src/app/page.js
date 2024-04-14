"use client"

// import { useQuery, gql } from "@apollo/client";

// const GET_LOCATIONS = gql`
//   query getAllUsers {
//     users {
//       id
//       username
//       name
//       email
//       phone
//     }
//   }
// `;


// function DisplayLocations() {
//   const { loading, error, data } = useQuery(GET_LOCATIONS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :</p>;
//   console.log(data);

//   return (
//     <div>
//       <h2>Locations</h2>
//       {data.users.map(({ id, username, name, email, phone }) => (
//         <div key={id}>
//           <h3>{username}</h3>
//           <p>Name: {name}</p>
//           <p>Email: {email}</p>
//           <p>Phone: {phone}</p>
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// }


// export default function Home() {
//   return (
//     <main>
//       <h1>Hello World!</h1>
//       <div>
//         <h2>
//           My first Apollo app
//           <span role="img" aria-label="rocket">

//           </span>
//         </h2>
//         <br />
//         <DisplayLocations />
//       </div>
//     </main>
//   );
// }



// pages/index.js (or any other page)
import { useEffect, useState } from 'react';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                users {
                  id
                  username
                  name
                  email
                  phone
                }
              }
            `,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          setUserData(responseData.data.users);
        } else {
          throw new Error(responseData.errors[0].message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      {userData && (
        <ul>
          {userData.map(user => (
            <li key={user.id}>
              <p>Username: {user.username}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

