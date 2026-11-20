import Image from "next/image";
import { LeadForm } from "./LeadForm/LeadForm";

export default function Home() {

    return (
        <div className="grid gap-4 justify-items-stretch">
            <div>
                header
            </div>
            <div className="w-4/5 h-56 justify-self-center p-2 rounded-xl relative">
                <img src="/portada.png" className="w-full h-full object-cover rounded-xl"/>
                <p className="absolute bottom-5 left-5 text-[22px] text-sm/6 font-bold">Estimulación temprana <br/> hecha con amor</p>
            </div>
            <div className="justify-self-center w-4/5">
                <p className="text-[17px] text-[#7d6b6b] text-center">Planes personalizados diseñados por una Licenciada en Educación Infantil</p>
                <button
                    className="flex items-center justify-center gap-2 bg-[#ee8b8b] w-full p-2 rounded-xl text-[#fff] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#ff4141]"
                >
                    <i className="ti ti-heart"></i>
                    Quiero mi plan
                </button>
            </div>
            <LeadForm />
        </div>
    );
}
