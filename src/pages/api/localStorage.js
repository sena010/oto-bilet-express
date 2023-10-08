import { storage } from "../api/Storage"
export function saveUserDataToLocalStorage(userData) {
    storage.setItem('userData', JSON.stringify(userData));
}
export function getUserDataFromLocalStorage() {
    const userDataJSON = storage.getItem('userData');
    return userDataJSON ? JSON.parse(userDataJSON) : null;
}
export function registerUser(ad, soyad, cinsiyet, dogumTarihi, email, sifre) {
    const userData = {
        ad,
        soyad,
        cinsiyet,
        dogumTarihi,
        email,
        sifre,
    };

    saveUserDataToLocalStorage(userData);

    return userData;
}
export function loginUser(email, password) {
    const savedUserData = getUserDataFromLocalStorage();

    if (savedUserData && savedUserData.email === email && savedUserData.sifre === password) {
        return savedUserData;
    } else {
        return null;
    }
}

