import React from "react";
import styles from "./Seat.module.css";

export interface SeatProps {
    id: number;
    isOccupied: boolean;
    gender: "Erkek" | "Kadın";
    onSelect: (id: number) => void;
}

const Seat: React.FC<SeatProps> = ({ id, isOccupied, gender, onSelect }) => {
    const selectSeat = () => {
        if (!isOccupied) {
            onSelect(id);
        }
    };

    return (
        <div className={`${styles.seat} ${isOccupied ? styles.occupied : ""}`}
            onClick={selectSeat}>
            {isOccupied && gender && (
                <span className={styles.genderIcon}>{gender === "Erkek" ? "♂" : "♀"}</span>
            )}
            {id}
        </div>
    );
};

export default Seat;
