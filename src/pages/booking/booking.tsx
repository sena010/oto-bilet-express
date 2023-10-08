"use client"
import React, { useState } from "react";
import SeatRow from "@/app/components/SeatRow";
import { useRouter } from "next/router";
import styles from "./busLayout.module.css"
import { SeatProps } from "@/app/components/Seat";

const BusLayout: React.FC = () => {
    const [selectedSeats, setSelectedSeats] = useState<SeatProps[]>([]);

    const router = useRouter();
    const maxSeats = 5;
    const data = router.query;
    const seats1 = [
        { id: 1, isOccupied: false, gender: "Erkek" as "Erkek" | "Kadın" },
        { id: 2, isOccupied: false, gender: "Kadın" as "Erkek" | "Kadın" },
        { id: 3, isOccupied: true, gender: "Erkek" as "Erkek" | "Kadın" },
    ];

    const seats2 = [
        { id: 4, isOccupied: false, gender: "Kadın" as "Erkek" | "Kadın" },
        { id: 5, isOccupied: false, gender: "Erkek" as "Erkek" | "Kadın" },
        { id: 6, isOccupied: true, gender: "Kadın" as "Erkek" | "Kadın" },
    ];


    const isAdjacentGenderMatch = (selectedSeats: SeatProps[], newSeat: SeatProps): boolean => {
        const occupiedSeats = selectedSeats.filter(seat => seat.isOccupied);
        const lastSelectedSeatGender = occupiedSeats.length > 0 ? occupiedSeats[occupiedSeats.length - 1].gender : null;
        console.log(occupiedSeats)
        console.log(lastSelectedSeatGender)
        const user = localStorage.getItem("userData");

        if (user === null) {
            console.log("userData not found in localStorage");
            return false;
        }
        const parsedUser = JSON.parse(user);
        const userGender = parsedUser.cinsiyet
        console.log(userGender)
        console.log(parsedUser)
        if (lastSelectedSeatGender === "Erkek" && newSeat.gender === "Kadın") {
            return false;
        }

        if (lastSelectedSeatGender === "Kadın" && newSeat.gender === "Erkek") {
            return false;
        }
        return true;
    };

    const selectSeat = (selectedSeats: SeatProps[], seat: SeatProps, maxSeats: number): SeatProps[] => {
        const seatIndex = selectedSeats.findIndex(selectedSeat => selectedSeat.id === seat.id && !selectedSeat.isOccupied);
        if (seatIndex !== -1) {
            selectedSeats.splice(seatIndex, 1);
        } else {
            if (!seat.isOccupied && isAdjacentGenderMatch(selectedSeats, seat) && selectedSeats.length < maxSeats) {
                selectedSeats.push(seat);
            }
        }
        return [...selectedSeats];
    };

    const handleSeatSelect = (seatId: any) => {
        const seat = seats1.concat(seats2).find(seat => seat.id === seatId) as SeatProps;
        if (seat) {
            setSelectedSeats(prevSelectedSeats => selectSeat([...prevSelectedSeats], seat, maxSeats));
        }
    };
    const calculateTotalPrice = (selectedSeats: SeatProps[]): number => {
        const priceParam = data?.price;
        let priceAsInt = 10;

        /**if (Array.isArray(priceParam)) {
            // Handle case when priceParam is an array of strings
            priceAsInt = parseInt(priceParam[0].replace(/\D/g, '') || "10", 10);
        } else {
            // Handle case when priceParam is a single string
            priceAsInt = parseInt(priceParam?.replace(/\D/g, '') || "10", 10);
        } */ //VERİYİ ALMAMA RAĞMEN ÇEVİREMEDİM

        const pricePerSeat = priceAsInt;
        const totalPrice = pricePerSeat * selectedSeats.length;

        return totalPrice;
    };

    const handlePaymentClick = (e: any) => {
        e.preventDefault();
        router.push({ pathname: "../Payment/Paymentpage" });
    };

    return (
        <div className={styles.busLayout}>
            <h1>Otobüs Düzeni</h1>
            <SeatRow seats={seats1} onSelect={handleSeatSelect} />
            <SeatRow seats={seats2} onSelect={handleSeatSelect} />
            <div className={styles.totalPrice}>Ücret: {calculateTotalPrice(selectedSeats)}</div>
            <button className={styles.paymentButton} onClick={handlePaymentClick}>Ödeme Yap</button>
        </div>
    );
};

export default BusLayout;
