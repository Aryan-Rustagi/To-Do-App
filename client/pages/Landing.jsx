import react from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

function Landing(){
    const navigate = useNavigate();
    return(
        <div>
            <h1>Welcome to the To-Do App</h1>
            <h3>Create your account here and start your journey</h3>
            <button onClick={() => navigate('/signup')}>Get started</button>
            <br /><br />
            <Link to="/login">Login</Link>
            {' | '}
            <Link to="/signup">Signup</Link>
        </div>
    );
}

export default Landing;