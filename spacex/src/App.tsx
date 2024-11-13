import { useQuery, gql } from "@apollo/client";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

// GraphQL query to fetch the latest 5 SpaceX launches
const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function App() {
  // Use Apollo Client's useQuery hook to execute the GraphQL query
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SpaceX Launches</h1>

      {/* Displaying the fetched SpaceX launches */}
      <div className="launches-list">
        <ul>
          {data.launches.map((launch: any) => (
            <li key={launch.id}>
              <p><strong>Launch Date:</strong> {launch.launch_date_utc}</p>
              <p><strong>Rocket:</strong> {launch.rocket.rocket_name}</p>
              <p><strong>Details:</strong> {launch.details || 'No details available'}</p>
              {launch.links?.video_link && (
                <p><a href={launch.links.video_link} target="_blank" rel="noopener noreferrer">Watch the launch video</a></p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
