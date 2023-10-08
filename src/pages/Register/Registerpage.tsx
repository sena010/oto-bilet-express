"use client"
import style from "./registerpage.module.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '@/pages/api/localStorage'
import { storage } from '@/pages/api/Storage'
interface FormData {
    ad: string;
    soyad: string;
    cinsiyet: string;
    dogumTarihi: string;
    email: string;
    sifre: string;
}

interface Errors {
    ad?: string;
    soyad?: string;
    cinsiyet?: string;
    dogumTarihi?: string;
    email?: string;
    sifre?: string;
}

export default function Registerpage() {
    const [formData, setFormData] = useState<FormData>({
        ad: "",
        soyad: "",
        cinsiyet: "",
        dogumTarihi: "",
        email: "",
        sifre: "",
    }
    );
    const router = useRouter();

    const [errors, setErrors] = useState<Errors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Errors = {};

        if (!formData.ad) {
            newErrors.ad = "Ad alanı boş bırakılamaz";
        }

        if (!formData.soyad) {
            newErrors.soyad = "Soyad alanı boş bırakılamaz";
        }

        if (!formData.cinsiyet) {
            newErrors.cinsiyet = "Cinsiyet alanı boş bırakılamaz";
        }

        if (!formData.dogumTarihi) {
            newErrors.dogumTarihi = "Doğum Tarihi alanı boş bırakılamaz";
        }

        if (!formData.email) {
            newErrors.email = "E-posta alanı boş bırakılamaz";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = "Geçerli bir e-posta adresi girin";
        }

        if (!formData.sifre) {
            newErrors.sifre = "Şifre alanı boş bırakılamaz";
        } else if (formData.sifre.length < 6) {
            newErrors.sifre = "Şifre en az 6 karakter olmalıdır";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    try {

                        console.log("response.status1")
                        const savedUserData = registerUser(formData.ad, formData.soyad, formData.cinsiyet, formData.dogumTarihi, formData.email, formData.sifre);

                        toast.success('Kayıt başarılı');
                        setTimeout(() => {
                            router.push({ pathname: "../Login/Loginpage" });
                        }, 3000);
                    } catch (error) {
                        console.log("response.status2")

                        console.error('Kayıt hatası:', error);
                        console.log(response.status)
                        toast.error('Kayıt başarısız');
                    }

                } else {
                    const errorData = await response.json();
                    console.error(errorData.error);
                    console.log(response.status)

                    toast.error(errorData.error);

                }
            } catch (error) {
                console.log("response.status4")

                console.error('Error:', error);
            }
        }
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className={style.main}>
            <div className={style.container}>
                <form onSubmit={handleSubmit}>
                    <p>Üye ol</p>
                    <input
                        type="text"
                        name="ad"
                        placeholder="Adınız"
                        value={formData.ad}
                        onChange={handleInputChange}
                    />
                    {errors.ad && <p className={style.error}>{errors.ad}</p>}
                    <input
                        type="text"
                        name="soyad"
                        placeholder="Soyadınız"
                        value={formData.soyad}
                        onChange={handleInputChange}
                    />
                    {errors.soyad && <p className={style.error}>{errors.soyad}</p>}
                    <div className={style.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                name="cinsiyet"
                                value="Kadın"
                                checked={formData.cinsiyet === 'Kadın'}
                                onChange={handleInputChange}
                            />
                            Kadın
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="cinsiyet"
                                value="Erkek"
                                checked={formData.cinsiyet === 'Erkek'}
                                onChange={handleInputChange}
                            />
                            Erkek
                        </label>
                    </div>
                    {errors.cinsiyet && <p className={style.error}>{errors.cinsiyet}</p>}
                    <input
                        type="text"
                        name="dogumTarihi"
                        placeholder="Doğum Tarihi"
                        value={formData.dogumTarihi}
                        onChange={handleInputChange}
                    />
                    {errors.dogumTarihi && <p className={style.error}>{errors.dogumTarihi}</p>}
                    <input
                        type="email"
                        name="email"
                        placeholder="E-posta"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className={style.error}>{errors.email}</p>}
                    <input
                        type="password"
                        name="sifre"
                        placeholder="Şifre"
                        value={formData.sifre}
                        onChange={handleInputChange}
                    />
                    {errors.sifre && <p className={style.error}>{errors.sifre}</p>}
                    <button className={style.register}>Üye ol</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}