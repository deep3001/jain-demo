import DashboardMain from "@/components/dashboard/DashboardMain";

export default function Home() {
  return <DashboardMain />;
}
/**
// export default function Home() {
//   return ;
// }




/////////////////////////
import { useAuth } from '../context/AuthContext';
import DashboardMain from "@/components/dashboard/DashboardMain";

function Home() {
 // const { user, login } = useAuth();
 const login =()=>{

 }
const user =false
  return (
    <div>
      <h1>Home Page</h1>
      {user===true? (
        <button onClick={login}>Log in</button>
      ) : (
        <>
          <p>Welcome, {user.name}!</p>
          <DashboardMain />
          <button onClick={login}>Log out</button>
        </>
      )}
    </div>
  );
}

export default Home;
 */