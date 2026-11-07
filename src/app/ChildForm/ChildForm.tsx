import { ChildFormProps } from "@/types/lead";


export const ChildForm = ({handler, handlerRemove, childInfo, index}: ChildFormProps) => {
    
    
    
    return (
        <div>
            <label>
                <span>Nombre del/la bebé*</span>
                <input
                    name="name"
                    type="text"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.name}
                    className="peer ..."
                />
                <p className="invisible peer-invalid:visible ...">Por favor ingrese el nombre del o la bebé</p>
            </label>

            <label>
                <span>Rango de edad*</span>
                <select
                    name="ageRange"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.ageRange}
                    className="peer ..."
                >
                    <option value="0-6">0-6</option>
                    <option value="7-12">7-12</option>
                    <option value="13-24">13-24</option>
                    <option value="25-36">25-36</option>
                </select>
                <p className="invisible peer-invalid:visible ..."></p>
            </label>

            <label>
                <span>Genero</span>
                <select
                    name="gender"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.gender === undefined ? '' : childInfo.gender}
                    className="peer ..."
                >
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="no_dice">Prefiero no decirlo</option>
                </select>
                <p className="invisible peer-invalid:visible ..."></p>
            </label>

            <label>
                <span>Descripción del/la bebé</span>
                <input
                    name="message"
                    type="text"
                    onChange={(e) => handler(index, e.target.name, e.target.value)}
                    value={childInfo.message === undefined ? '' : childInfo.message}
                    className="peer ..."
                />
                <p className="invisible peer-invalid:visible ..."></p>
            </label>

            <button
                type="button"
                onClick={() => handlerRemove(index)}
            >
                Eliminar
            </button>
        </div>
    )
}