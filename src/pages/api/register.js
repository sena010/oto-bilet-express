import { registerUser } from './localStorage';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { ad, soyad, cinsiyet, dogumTarihi, email, sifre } = req.body;

        if (ad && soyad && cinsiyet && dogumTarihi && email && sifre) {
            try {
                res.status(200).json({ message: 'Kayıt başarılı', userData: req.body });
            } catch (error) {
                console.error('Kayıt hatası:', error);
                res.status(500).json({ error: error.message, errorMessage: error.message });
            }
        } else {
            res.status(400).json({ error: 'Geçersiz veri' });
        }
    } else {
        res.status(405).json({ error: 'İzin verilmeyen yöntem' });
    }
}
