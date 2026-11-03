import { LeadPayload, MethodResponse } from "@/types/lead";

const postURL = `${process.env.NEXT_PUBLIC_API_URL}/leads`

export const createLead = async (payload: LeadPayload) => {
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    }


    try {
        const response = await fetch(postURL, postOptions)
        const data = await response.json()

        const responseCreate: MethodResponse = {
            success: data.success,
            message: data.message,
        }

        if (!response.ok) {
            responseCreate.errors = data.errors
        } else {
            responseCreate.data = data.data
        }

        return responseCreate

    } catch (error) {
        const catchResponse: MethodResponse = {
            success: false,
            message: "Hubo un problema de conexión, por favor intenta de nuevo más tarde",
        }
        
        console.error(error)
        return catchResponse
    }
}