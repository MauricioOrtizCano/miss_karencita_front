"use client"

import React from "react";
import { useState } from "react"
import { createLead } from "@/lib/api";
import { LeadPayload, Child } from "@/types/lead";
import { ChildForm } from "../ChildForm/ChildForm";
import Swal from "sweetalert2";


export const LeadForm = () => {
    const [leadData, setLeadData] = useState<LeadPayload>({
        caregiverName: '',
        caregiverWhatsapp: '',
        caregiverEmail: '',
        caregiverDataAuthorization: false,
        children: [{
            name: '',
            ageRange: '6-8',
            gender: '',
            message: ''
        }]
    })

    const handlerChangeInput = (field: string, value: string) => {
        setLeadData((prev) => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const handlerChildInput = (position: number, field: string, value: string) => {
        setLeadData((prev) => {
            return {
                ...prev,
                children: prev.children.map((child, i) => (
                    i === position
                        ? {
                            ...child,
                            [field]: value
                        } : child
                ))
            }
        })
    }

    const handlerCheckBox = (value: boolean) => {
        setLeadData((prev) => {
            return {
                ...prev,
                caregiverDataAuthorization: value
            }
        })
    }

    const handlerAdd = () => {
        setLeadData((prev) => {
            const newChild: Child = {
                name: '',
                ageRange: '6-8',
                gender: '',
                message: ''
            }
            return {
                ...prev,
                children: [...prev.children, newChild]
            }
        })
    }

    const handlerRemove = (position: number) => {
        if (leadData.children.length === 1) {
            Swal.fire({
                title: 'Acción inválida',
                text: 'No es posible eliminar el último hijo',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            })
            return
        }

        setLeadData((prev) => ({
            ...prev,
            children: prev.children.filter((child, i) => i !== position)
        }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const response = await createLead(leadData)

            if (!response.success) {
                Swal.fire({
                    title: 'Ha ocurrido un error',
                    text: 'No se pudo guardar la información. Por favor inténtalo de nuevo',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
                return
            }

            setLeadData({
                caregiverName: '',
                caregiverWhatsapp: '',
                caregiverEmail: '',
                caregiverDataAuthorization: false,
                children: [{
                    name: '',
                    ageRange: '6-8',
                    gender: '',
                    message: ''
                }]
            })
            
            Swal.fire({
                title: 'Registro exitoso',
                text: 'Información guardada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Ha ocurrido un error',
                text: 'No pudimos conectar con el servidor, revisa tu conexión e intenta de nuevo',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return
        }
    }
    
    return (
        <div className="grid gap-4 w-4/5 bg-[#fbeaf0] place-self-center py-[18px] text-[#8a3d5a] rounded-xl">
            <div className="place-self-center w-4/5 grid gap-4">
                <h2 className="place-self-center text-2xl">Cuéntanos de tu bebé</h2>
                <form
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <div className="relative">
                        <i className="ti ti-user absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a9b4] pointer-events-none" ></i>
                        <input
                            name="caregiverName"
                            type="text"
                            placeholder="Tú nombre"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverName}
                            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition pl-11 placeholder:text-[#c4a9b4]"
                        />
                    </div>

                    <div className="relative">
                        <i className="ti ti-brand-whatsapp absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a9b4] pointer-events-none" ></i>
                        <input
                            name="caregiverWhatsapp"
                            type="text"
                            placeholder="WhatsApp"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverWhatsapp}
                            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition pl-11 placeholder:text-[#c4a9b4]"
                        />
                    </div>

                    <div className="relative">
                        <i className="ti ti-mail absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a9b4] pointer-events-none" ></i>
                        <input
                            name="caregiverEmail"
                            placeholder="Correo"
                            type="text"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverEmail}
                            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition pl-11 placeholder:text-[#c4a9b4]"
                        />
                    </div>

                    {leadData.children.map((child, i) => {
                        return (
                            <ChildForm
                                key={`child_${i}`}
                                handler={handlerChildInput}
                                handlerRemove={handlerRemove}
                                childInfo={child}
                                index={i}
                            />
                        )
                    })}

                    <button
                        type="button"
                        onClick={handlerAdd}
                        className="text-[#ee6794] hover:text-[#f80053]"
                    >
                        + Agregar otro bebé
                    </button>

                    <hr></hr>
                    <div className="flex justify-start gap-4 items-center">
                        <input
                            name="caregiverDataAuthorization"
                            type="checkbox"
                            onChange={(e) => handlerCheckBox(e.target.checked)}
                            checked={leadData.caregiverDataAuthorization}
                            className="accent-pink-500"
                        />
                        <span className="grow">Autorizas el tratamiento de tus datos personales.</span>
                    </div>

                    
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-[#ee8b8b] w-full p-2 rounded-xl text-[#fff] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#ff4141]"
                    >
                        <i className="ti ti-send"></i>
                        Enviar
                    </button>
                    

                </form>
            </div>
        </div>
    )
} 