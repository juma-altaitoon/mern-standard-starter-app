import { useState, useEffect, createContext} from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import propTypes from 'prop-types';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initial Authentication State
    const [ isAuthenticated, setIsAuthenticated ] = useState(false); 
    const [ user, setUser ] = useState(null);
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //Check for existing token
        const checkAuth = async () => {
            await Axios.get("http://localhost:5000/users/profile", { withCredentials: true })
            .then((response) => {
                if(response.data.authenticated){
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                }
            })
            .catch ((error) => {
                console.error("Failed Authentication: ", error.message)
            })
                
        };
        checkAuth();
    }, []);

    const login = async (userData) => {
        // POST Login
        await Axios.post("http://localhost:5000/users/signin", userData, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setIsAuthenticated(true);
            setUser(response.data.user);
            setMessage("Sign In Successful");
            navigate('/');
        })
        .catch((error) => {
            console.error("Login Failed: ", error.response.data);
            setMessage("Login Failed, try again later.");
        })
    };

    const logout = async() => {
        // Logout to call to the server to clear the token
        try {
            await Axios.delete("http://localhost:5000/users/logout",{}, { withCredentials: true });
            setIsAuthenticated(false);
            setUser(null)
            setMessage("Sign Out Succesful")
            navigate('/login')
        } catch (error) {
            console.error('Logout Failed: ', error);
            setMessage('Logout Failed')
        } 
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, message }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
}

// export const useAuth = () => useContext(AuthContext);

export default AuthContext;
