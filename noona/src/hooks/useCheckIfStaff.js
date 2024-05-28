import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

export default function userCheckIfStaff() {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');

        if (!isAdmin) {
            navigate('/forbidden');
        }
    }, [history]);
}