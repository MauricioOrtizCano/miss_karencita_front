"use client"

import { createLead } from "@/lib/api";
import { Child, LeadPayload } from "@/types/lead";

const Hijo: Child = {
    name: "Emmanuel Ortiz",
    ageRange: "7-12",
    gender: "Masculino"
}

const Madre: LeadPayload = {
    caregiverName: "Karen Espinosa",
    caregiverWhatsapp: "+573226549898",
    caregiverEmail: "karen.ejemplo@ejemplo.com",
    caregiverDataAuthorization: true,
    children: [Hijo]
}

export default function Home() {
  
  const handleClic = async () => {
    await createLead(Madre)
  }


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button
        onClick={() => handleClic()}
      >
        Clic
      </button>
    </div>
  );
}
