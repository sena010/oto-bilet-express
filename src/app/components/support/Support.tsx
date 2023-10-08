import style from "./support.module.css"
import React from "react";
interface SupportProps {
    supportItems: { image: string; description: string }[];
}

export default function Support({ supportItems }: SupportProps) {

    return (
        <div className={style.main}>
            {supportItems.map((item, index) => (
                <div key={index} className={style.container}>
                    <div className={style.image}>
                        <img width={100} height={100} src={item.image} />
                    </div>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}