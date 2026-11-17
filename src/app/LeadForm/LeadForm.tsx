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
            ageRange: '0-6',
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
                ageRange: '0-6',
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
                    ageRange: '0-6',
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
        <div>
            <div>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="relative mb-3">
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
                    <p className="invisible peer-invalid:visible ...">Por favor ingrese un nombre</p>

                    <div>
                        <input
                            name="caregiverWhatsapp"
                            type="text"
                            placeholder="WhatsApp"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverWhatsapp}
                            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition"
                        />
                        <p className="invisible peer-invalid:visible ...">Por favor ingrese un número de WhatsApp válido</p>
                    </div>

                    <div>
                        <input
                            name="caregiverEmail"
                            placeholder="Correo"
                            type="text"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverEmail}
                            className="w-full px-4 py-3 bg-white border border-pink-100 rounded-xl text-sm focus:border-pink-400 focus:outline-none transition"
                        />
                        <p className="invisible peer-invalid:visible ...">Por favor ingrese un correo válido</p>
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
                    >
                        Agregar otro bebé
                    </button>

                    <hr></hr>
                    <div>
                        <input
                            name="caregiverDataAuthorization"
                            type="checkbox"
                            onChange={(e) => handlerCheckBox(e.target.checked)}
                            checked={leadData.caregiverDataAuthorization}
                            className="peer ..."
                        />
                        <span>Autoriza el tratamiento de sus datos.</span>
                        <p className="invisible peer-invalid:visible ...">Debe autorizar el tratamiento de datos para continuar</p>
                    </div>

                    <button
                        type="submit"
                    >
                        Enviar
                    </button>

                </form>
            </div>
        </div>
    )
} 