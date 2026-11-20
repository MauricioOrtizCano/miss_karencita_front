import { ChildFormProps } from "@/types/lead";


export const ChildForm = ({handler, handlerRemove, childInfo, index}: ChildFormProps) => {
    
    
    
    return (
        <div className="bg-[#fff] rounded-xl p-4 my-2 space-y-4">
            <div className="flex justify-between items-center gap-2 mb-6">
                <h5>Bebé {index + 1}</h5>
                <button
                    type="button"
                    onClick={() => handlerRemove(index)}
                    className="transition hover:rotate-12 hover:scale-125"
                >
                    <i className="ti ti-trash text-[#ee6794] transition hover:text-[#f80053]"></i>
                </button>
            </div>
            <div className="relative">
                <i className="ti ti-mood-kid absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a9b4] pointer-events-none"></i>
                <input
                    name="name"
                    placeholder="Nombre*"
                    type="text"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.name}
                    className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition pl-11 placeholder:text-[#c4a9b4]"
                />
            </div>

            <div className="relative">
                <i className="ti ti-baby-carriage absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a9b4] pointer-events-none"></i>
                <select
                    name="ageRange"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.ageRange}
                    className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition pl-11 placeholder:text-[#c4a9b4]"
                >
                    <option value="" disabled>Rango de edad en meses</option>
                    <option value="6-8">6-8</option>
                    <option value="9-12">9-12</option>
                    <option value="13-18">13-18</option>
                    <option value="19-24">19-24</option>
                    <option value="25-36">25-36</option>
                </select>
            </div>

            <div className="relative">
                <i className="ti ti-baby-bottle absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a9b4] pointer-events-none"></i>
                <select
                    name="gender"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.gender === undefined ? '' : childInfo.gender}
                    className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition pl-11 placeholder:text-[#c4a9b4]"
                >
                    <option value="" disabled>Selecciona genero</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="no_dice">Prefiero no decirlo</option>
                </select>
            </div>

            <div className="relative">
                <i className="ti ti-file-text absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a9b4] pointer-events-none"></i>
                <input
                    name="message"
                    placeholder="Descripción"
                    type="text"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.message === undefined ? '' : childInfo.message}
                    className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition pl-11 placeholder:text-[#c4a9b4]"
                />
            </div>
        </div>
    )
}