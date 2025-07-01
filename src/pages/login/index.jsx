import { useNavigate } from 'react-router-dom';
import { isAuthenticated, login, register } from '../../services/authService';
import { useEffect, useState } from 'react';
import styles from './login.module.css';
import Toast from '../../components/toast/index';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        }
  }, []);


    /*------ANIMATION CONFIG------*/
    const [pageRegisterActive, setPageRegisterActive] = useState(false);

    const toggleClass = () => {
        setPageRegisterActive(!pageRegisterActive);
        setSubmitted(false);
    }
    
    /*------REQ API------ */
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const EmailValidation = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const passwordMatch = (password, confirmPassword) => {
        if(password == confirmPassword) {
            return true
        }
        return false
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        if(!email || !password) {
            setError('Fill in all fields.');
            return;
        }

        if(!EmailValidation(email)) {
            setError('Invalid email.');
            return;
        }

        setIsLoading(true);

        try {
            const data = await login(email, password);
            sessionStorage.setItem('name', data.name);
            sessionStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        if(!name || !email || !password ||!confirmPassword ) {
            setError('Fill in all fields.');
            return;
        }

        if(!EmailValidation(email)) {
            setError('Invalid email.');
            return;
        }

        if(!passwordMatch(password, confirmPassword)) {
            setError('The password and its confirmation must match.')
            return;
        }

        setIsLoading(true);

        try {
            const data = await register(name, email, password);
            sessionStorage.setItem('name', data.name);
            sessionStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const inputErrorStyle = {
    border: '1px solid rgba(255, 0, 0, .4)',
    outline: 'none',
  };

    return (
        <section className={styles.main_container}>
            <div className={`${styles.card} ${pageRegisterActive ? styles.register_active : styles.login_active}`}>
                <div className={styles.left}>
                    <div className={styles.form_login}>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={submitted && !email ? inputErrorStyle : {}}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={submitted && !password ? inputErrorStyle : {}}
                            />

                            <button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                    </>
                                ) : ('Login')}
                            </button>
                            {error && (<Toast 
                                        message={error}
                                        type="error"
                                        onClose={() => setError('')}
                                    />
                            )}
                        </form>
                    </div>
                    <div className={styles.sign_in}>
                        <h2>
                            Already have <br/>
                            an account?
                        </h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat doloribus omnis autem labore </p>
                        <button className={styles.login_button}  onClick={toggleClass}>Login</button>
                    </div>
                </div>
                
                <div className={styles.rigth}>
                    <div className={styles.form_register}>
                        <h2>Register</h2>
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={submitted && !name ? inputErrorStyle : {}}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={submitted && !email ? inputErrorStyle : {}}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={submitted && !password ? inputErrorStyle : {}}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={submitted && !password ? inputErrorStyle : {}}
                            />

                            <button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                    </>
                                ) : ('Register')}
                            </button>
                            {error && (<Toast 
                                        message={error}
                                        type="error"
                                        onClose={() => setError('')}
                                    />
                            )}
                        </form>
                    </div>
                    <div className={styles.sign_in_up}>
                        <h2>
                            Don't have <br/>
                            an account?
                        </h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates nulla blanditiis</p>
                        <button className={styles.register_button}  onClick={toggleClass}>Register Now</button>
                    </div>
                </div>

            </div>
        </section>
    )
}