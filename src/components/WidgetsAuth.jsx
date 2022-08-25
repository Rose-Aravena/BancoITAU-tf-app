import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, db } from '../firebase/init';
import { useNavigate } from "react-router-dom";
import wellcome from '../img/bienvenida.png';

const WidgetsAuth = () => {
    const [data, setData] = useState([]);
    const [result, setResult] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        onSnapshot(collection(db, 'transaction'), (snapshot) => {
            const dataFromFirestore = snapshot.docs.map((doc) => {
                return { ...doc.data() };
            });
            setData(dataFromFirestore);
        });
    }, []);

    useEffect(() => {
        filterData()
    }, [data]);

    const filterData = () => {
        const result = data.filter(item => item.status === 'pendiente');
        setResult(result);
    };

    return (
        <div className='flex flex-col mr-8 mt-6'>
        <a>
            <img src={wellcome} alt="banner bienvenida" className='rounded-2xl'/>
        </a>
            <div className={result!=0? 'bg-[#EC7000] h-fit flex flex-col rounded-2xl m-6 shadow-lg ': 'bg-[#FFFFFF] flex flex-col rounded-2xl m-6 shadow-lg border-[#EC7000] border pb-6'}>
                <div className={result !=0? 'flex items-center justify-center text-[#FFFFFF]' : 'flex items-center justify-center text-[#EC7000]'}>
                    <span className="pt-6 text-xl">Tienes <b>{result ? result.length : '0'}</b> Transacciones <br /> por revisar</span>
                </div>
                <section className='flex justify-end'>
                    <div className={result !=0 ? 'mr-6 mb-3 h-8 w-20 group ml-20 text-[#FFFFFF]' : 'hidden'}>
                        <button onClick={() => navigate('/authorization')} className='group-hover:text-[#007AB7]'>Ver mas → </button>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default WidgetsAuth