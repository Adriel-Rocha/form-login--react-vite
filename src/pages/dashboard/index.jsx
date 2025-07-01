import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { isAuthenticated, logout } from "../../services/authService";
import './dashboard.module.css'

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
  }, []);

  return (
    <>
        <h2>Dashboard! <br />
        Wellcome { sessionStorage.getItem('name') }.</h2>
        <p>For made your logout click <a href='' onClick={logout}>here</a></p>
    </>
  )
}