import React, { useState } from 'react';
import style from "./loginpage.module.css";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../api/localStorage';
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegisterClick = (e: any) => {
        e.preventDefault();
        router.push({ pathname: "../Register/Registerpage" });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setEmailError('Geçerli bir e-posta adresi girin.');
            return;
        } else {
            setEmailError('');
        }

        if (!password || password.length < 6) {
            setPasswordError('Şifreniz en az 6 karakter olmalıdır.');
            return;
        } else {
            setPasswordError('');
        }
        const user = loginUser(email, password);

        if (user) {
            console.log('Giriş başarılı:', user);
            toast.success(user.cinsiyet);
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } else {
            console.error('Giriş başarısız: Geçersiz kullanıcı bilgileri.');
            toast.error('Giriş başarısız: Geçersiz kullanıcı bilgileri.');
        }
    };

    return (
        <div className={style.main}>
            <div className={style.container}>
                <form onSubmit={handleLogin}>
                    <p>Üye Girişi</p>
                    <input
                        type="email"
                        placeholder="E posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className={style.error}>{emailError}</span>
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className={style.error}>{passwordError}</span>
                    <button className={style.login} type="submit">Giriş yap</button>
                    <p>Henüz üye değil misin?</p>
                    <hr />
                    <button className={style.register} onClick={handleRegisterClick}>Kayıt Ol!</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
