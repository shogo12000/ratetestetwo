
import { useAuth } from "../context/myContext";

export default function LogoutBtn(){
    const { handleLogout } = useAuth();
    
 
    return(
        <button className="bg-amber-500" onClick={handleLogout}>Logout</button>
    )
}