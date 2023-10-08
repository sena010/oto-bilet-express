"use client"
import { filteredVoyages } from "@/app/components/voyages/voyage"
import { VoyagesProps } from "@/app/components/voyages/Voyages"
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./query.module.css"
import { format } from 'date-fns';
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link'

import { BiTime, BiRightArrowAlt } from 'react-icons/bi';

const Query: React.FC = () => {
    const [routerReady, setRouterReady] = useState<boolean>(false);
    const [departure, setDeparture] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [formatdate, setFormatdate] = useState<string>('');
    const [filteredVoyage, setFilteredVoyages] = useState<VoyagesProps[]>([]);
    const router = useRouter();

    const cities = [
        { name: "İstanbul" },
        { name: "Ankara" },
        { name: "Şırnak" },
        { name: "Hakkari" },
        { name: "Artvin" }
    ]
    let filtered: VoyagesProps[] = [];

    const handleSearch = () => {
        console.log("Departure:", departure)
        console.log("Destination:", destination)
        console.log("Date:", formatdate)

        filtered = filteredVoyages.filter((voyage) => {
            return (

                voyage.kalkis === departure &&
                voyage.varis === destination &&
                voyage.tarih === formatdate
            );
        });
        setFilteredVoyages(filtered)
        console.log(filtered)
        console.log(filtered)

    }
    const handleDepartureChange = (e: any) => {
        setDeparture(e.target.value);
    }

    const handleDestinationChange = (e: any) => {
        setDestination(e.target.value);
    }

    return (

        <div className={style.container}>
            <div className={style.querybox}><select className={style.selectbox} onChange={handleDepartureChange} value={departure}>
                <option value="">Kalkış Yeri Seçin</option>
                {cities.map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                ))}
            </select>

                <select className={style.selectbox} onChange={handleDestinationChange} value={destination}>
                    <option value="">Varış Yeri Seçin</option>
                    {cities.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>

                <DatePicker dateFormat="yyyy/MM/dd" className={style.datepicker} selected={startDate} onChange={(date) => {
                    if (date) { setFormatdate(format(date, 'dd.MM.yyyy')); setStartDate(date) }
                    console.log(formatdate);
                }} />

                <div className={style.buttoncontainer}>

                    <button onClick={handleSearch}>Bilet Ara</button>
                </div>

            </div>
            <div >
                {filteredVoyage.map((voyage) => (

                    <div key={voyage.id} className={style.voyagesbox}>
                        <div className={style.acenty}>{voyage.acenty}</div>
                        <div className={style.time}>
                            <BiTime />
                            <span>{voyage.saat}</span>
                            <p>({voyage.sure})</p>
                        </div>
                        <div className={style.route}>
                            <p>
                                {voyage.kalkis}
                                <BiRightArrowAlt />
                                {voyage.varis}
                            </p>
                        </div>
                        <div className={style.price}>
                            <span>{voyage.fiyat}</span>
                        </div>
                        <Link className={style.button}
                            href={{
                                pathname: '../booking/booking',
                                query: voyage.fiyat
                            }}>
                            Koltuk Seç
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Query;