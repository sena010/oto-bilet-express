"use client"
import style from "./Paymentpage.module.css"
import { useRouter } from "next/router";
export default function Paymentpage() {
    const router = useRouter();
    const handlePaymentClick = (e: any) => {
        e.preventDefault();
        router.push({ pathname: "/" });
    };
    return (
        <div className={style.main}>
            <div className={style.container}>
                <form action="">
                    <p>Ödeme Bilgileri</p>
                    <input placeholder="Kart Numarası"></input>
                    <input placeholder="Son kullanma tarihi"></input>
                    <input placeholder="CVV"></input>
                    <button className={style.payment} onClick={handlePaymentClick}>Ödeme Yap!</button>
                </form>

            </div>
        </div >
    )
}