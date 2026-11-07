"use client"

import React from "react";
import { useState } from "react"
import { createLead } from "@/lib/api";
import { LeadPayload, Child } from "@/types/lead";
import { ChildForm } from "../ChildForm/ChildForm";


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
            alert('No es posible eliminar el último hijo')
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
                console.log(response.message)
                alert(response.message)
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
            alert(response.message)
        } catch (error) {
            console.error(error)
            return
        }
    }
    
    return (
        <div>
            <div>
                <form
                    onSubmit={onSubmit}
                >
                    <label>
                        <span>Nombre del acudiente*</span>
                        <input
                            name="caregiverName"
                            type="text"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverName}
                            className="peer ..."
                        />
                        <p className="invisible peer-invalid:visible ...">Por favor ingrese un nombre</p>
                    </label>

                    <label>
                        <span>Número de WhatsApp*</span>
                        <input
                            name="caregiverWhatsapp"
                            type="text"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverWhatsapp}
                            className="peer ..."
                        />
                        <p className="invisible peer-invalid:visible ...">Por favor ingrese un número de WhatsApp válido</p>
                    </label>

                    <label>
                        <span>Correo Electrónico</span>
                        <input
                            name="caregiverEmail"
                            type="text"
                            onChange={(e) => handlerChangeInput(e.target.name, e.target.value)}
                            value={leadData.caregiverEmail}
                            className="peer ..."
                        />
                        <p className="invisible peer-invalid:visible ...">Por favor ingrese un correo válido</p>
                    </label>

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
                    <label>
                        <input
                            name="caregiverDataAuthorization"
                            type="checkbox"
                            onChange={(e) => handlerCheckBox(e.target.checked)}
                            checked={leadData.caregiverDataAuthorization}
                            className="peer ..."
                        />
                        <span>Autoriza el tratamiento de sus datos.</span>
                        <p className="invisible peer-invalid:visible ...">Debe autorizar el tratamiento de datos para continuar</p>
                    </label>

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