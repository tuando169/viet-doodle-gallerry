import { useState, useEffect } from "react";
import { setCookie } from "../../components/Cookies/Cookies"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/DangNhap";
import { Link, NavLink, Outlet } from "react-router-dom";

function DangNhap(){
    const [message, setMessage] = useState([]);
    const [emailUser, setEmailUser] = useState([]);
    const navigate = useNavigate();

    const dispath = useDispatch();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        setEmailUser(email);
        const password = e.target[1].value;
        
        if(email && password){
            const response = await fetch('https://google-doodle-v2-v2.vercel.app/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: `${email}`,
                    password: `${password}`,
                }),
            })
            .then(response => response.json())
            .then(data => setMessage(data))
            .catch(error => console.error('Error:', error));
        }
    }
    if(message.code === 200){
        console.log(message);
        setCookie("email", emailUser, 30);
        setCookie("token", message.token, 30);
        dispath(checkLogin(true));
        navigate("/")
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Đăng nhập</h2>
                <div>
                    <input type="email"/>
                </div>
                <div>
                    <input type="password"/>
                </div>
                <button>Đăng nhập</button>
            </form>
            <Link to="/dangky">
                Dang Ky
            </Link>
        </>
    )
}

export default DangNhap;