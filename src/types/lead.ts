export type AgeRange = '0-6' | '7-12' | '13-24' | '25-36'

export interface Child {
    name: string;
    ageRange: AgeRange;
    gender?: string;
    message?: string;
}

export interface LeadPayload {
    caregiverName: string;
    caregiverWhatsapp: string;
    caregiverEmail?: string;
    caregiverDataAuthorization: boolean;
    children: Child[];
}

export interface MethodResponse {
    success: boolean;
    message: string;
    data?: any;
    errors?: any;
}

export interface ChildFormProps {
    childInfo: Child,
    index: number,
    handler: (pos: number, field: string, value: string) => void
    handlerRemove: (pos: number) => void
}