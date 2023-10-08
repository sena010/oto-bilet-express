"use client"
import { useRouter } from "next/navigation";
import style from "./header.module.css";

export default function Header() {
    const router = useRouter();

    const handleLoginClick = (e: any) => {
        e.preventDefault()
        router.push("Login/Loginpage");
    };
    const handleRegisterClick = (e: any) => {
        e.preventDefault()
        router.push("Register/Registerpage");
    };

    return (
        <div>
            <div className={style.container}>
                <div className={style.leftSide}>OtoBiletExpress.com</div>
                <div className={style.rightSide}>
                    <button onClick={handleLoginClick}>Üye Girişi</button>
                    <button onClick={handleRegisterClick}>Kayıt Ol!</button>
                </div>
            </div>
        </div>
    );
}
