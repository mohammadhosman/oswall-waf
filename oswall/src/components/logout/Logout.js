import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(()=> {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/login'); // Redirect to login page
    }, [navigate]);

    return null; // No UI to render yet, just redirecting
}

export default Logout;