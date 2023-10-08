import React from "react";
import Seat from "./Seat";

interface SeatRowProps {
    seats: { id: number; isOccupied: boolean; gender: "Erkek" | "Kadın" }[];
    onSelect: (id: number) => void;
}

const SeatRow: React.FC<SeatRowProps> = ({ seats, onSelect }) => {
    return (
        <div style={{ display: "flex", margin: "20px" }}>
            {seats.map((seat) => (
                <Seat
                    key={seat.id}
                    id={seat.id}
                    isOccupied={seat.isOccupied}
                    gender={seat.gender}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default SeatRow;
