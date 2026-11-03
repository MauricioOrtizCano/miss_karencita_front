# Miss Karencita — Frontend (Landing)

Landing page desarrollado en **Next.ts / React** para **Miss Karencita**, un servicio de planes de estimulación temprana para bebés diseñados por una Licenciada en Educación Infantil.

En esta primera etapa el objetivo es **validar la demanda**: presentar el servicio, generar confianza y capturar los datos de contacto de las familias interesadas a través de un formulario. Esos _leads_ se envían al [backend en Laravel](#integración-con-el-backend) para su almacenamiento.

---

## Tabla de contenido

- [Stack](#stack)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Identidad de marca](#identidad-de-marca)
- [Formulario y consentimiento](#formulario-y-consentimiento)
- [Integración con el backend](#integración-con-el-backend)
- [Consideraciones legales](#consideraciones-legales)
- [Despliegue](#despliegue)
- [Roadmap](#roadmap)

---

## Stack

- **Next.ts** 14+ (App Router)
- **React** 18+
- **CSS**: [TS, CSS Modules, Tailwind CSS, etc.]
- **Node.js** 18.18+ (requerido por Next.js)

El backend se desarrolla por separado en **Laravel / MariaDB** y expone la API que este landing consume.

---

## Requisitos previos

- Node.js 18.18 o superior
- npm, pnpm o yarn
- El [backend](#integración-con-el-backend) corriendo y accesible (localmente en `http://localhost:8000` por defecto)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de entorno
cp .env.example .env.local

# 4. Configurar la URL de la API (ver sección siguiente)

# 5. Levantar el servidor de desarrollo
npm run dev
```

El landing quedará disponible en `http://localhost:3000`.

---

## Variables de entorno

En `.env.local`:

```env
# URL base de la API de Laravel.
# El prefijo NEXT_PUBLIC_ es necesario para exponerla al navegador.
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

> **Nota:** solo las variables con prefijo `NEXT_PUBLIC_` llegan al cliente. Nunca pongas secretos ahí; para el envío de leads no se necesita ninguno.

---

## Scripts disponibles

```bash
npm run dev     # Servidor de desarrollo (http://localhost:3000)
npm run build   # Compilación de producción
npm run start   # Servir la compilación de producción
npm run lint    # Linter
```

---

## Estructura del proyecto

El landing es de una sola página, dividido en secciones (según la propuesta de diseño elegida). Estructura sugerida con App Router:

```
src/
├── app/
│   ├── layout.tsx            # Layout raíz, fuentes y metadata
│   ├── page.tsx              # Landing: compone todas las secciones
│   ├── globals.css           # Estilos globales y variables de marca
│   └── politica-datos/
│       └── page.tsx          # Política de tratamiento de datos
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx              # Promesa principal + CTA
│   ├── Problema.tsx          # Conecta con la duda del acudiente
│   ├── ComoFunciona.tsx      # Los 4 pasos del servicio
│   ├── SobreMi.tsx           # Perfil de la Licenciada (clave para convertir)
│   ├── Diferencial.tsx       # Por qué no es contenido genérico
│   ├── Testimonios.tsx       # Solo con testimonios reales
│   ├── PreguntasFrecuentes.tsx
│   ├── LeadForm.tsx          # Formulario de captura + consentimiento
│   └── Footer.tsx            # Contacto y enlaces legales
└── lib/
    └── api.js                # Cliente para llamar a la API
```

> El bloque **SobreMi** es el que más peso tiene en la conversión: la gente compra confianza en una persona. Incluye foto real, nombre, título y experiencia de la Licenciada.

---

## Identidad de marca

Colores derivados del logo de Miss Karencita. Se recomienda declararlos como variables CSS y reutilizarlos en todo el landing.

| Rol                    | Color            | Hex        |
| ---------------------- | ---------------- | ---------- |
| Ancla / textos         | Morado ciruela   | `#4B2E63`  |
| Secundario oscuro      | Ciruela medio    | `#6B4C8A`  |
| Acento / botones (CTA) | Coral            | `#EE8B8B`  |
| Detalles finos         | Dorado           | `#C9A24B`  |
| Fondos suaves          | Lila muy claro   | `#F4EEF3`  |
| Base                   | Crema / marfil   | `#FFFDFB`  |

```css
:root {
  --color-ancla: #4B2E63;
  --color-ciruela: #6B4C8A;
  --color-acento: #EE8B8B;
  --color-dorado: #C9A24B;
  --color-suave: #F4EEF3;
  --color-base: #FFFDFB;
}
```

**Tipografías sugeridas** (vía `next/font/google`):

- Titulares (con carácter editorial): **Fraunces** o **Playfair Display**
- Texto corrido (limpio y legible): **Nunito** o **Inter**

Esa dupla _serif con carácter + sans neutra_ es la que da el equilibrio entre ternura y seriedad profesional.

> **Logo:** el logo actual funciona como marca principal, pero conviene derivar una versión simplificada para el favicon y el header móvil (a tamaño pequeño el detalle se pierde). Coloca el favicon en `src/app/favicon.ico` y el logo en `public/`.

---

## Formulario y consentimiento

El componente `LeadForm` captura los datos mínimos del lead:

- **Nombre** del acudiente (requerido)
- **Contacto**: correo y/o teléfono (al menos uno)
- **Niños**: por defecto uno (nombre + rango de edad), con opción secundaria de "+ agregar otro hijo"
- **Mensaje** opcional ("¿qué te gustaría lograr?")
- **Casilla de autorización** de tratamiento de datos

Reglas de UX/validación en el cliente:

- La casilla de autorización nace **desmarcada**.
- El botón de envío permanece **deshabilitado** hasta que la casilla esté marcada.
- Validación básica en el cliente; la validación final y de seguridad ocurre en el backend.
- El rango de edad se maneja con opciones fijas: `0-6`, `7-12`, `13-24`, `25-36` (meses).

> El repetidor de "agregar hijos" debe ser discreto: la mayoría llenará un solo bebé y cada campo extra en la boca del embudo cuesta conversiones.

---

## Integración con el backend

El envío del lead se hace con una petición `POST` a la API:

```
POST ${NEXT_PUBLIC_API_URL}/leads
```

**Ejemplo de cuerpo:**

```json
{
  "nombre": "Laura Gómez",
  "correo": "laura@example.com",
  "telefono": null,
  "mensaje": "Quiero acompañar mejor el desarrollo de mi bebé.",
  "autorizacion_datos": true,
  "ninos": [
    { "nombre": "Emmanuel", "rango_edad": "13-24" }
  ]
}
```

**Respuestas esperadas:**

- `201 Created` — mostrar mensaje de éxito y limpiar el formulario
- `422 Unprocessable Entity` — mostrar los errores de validación devueltos por el backend

> El backend registra automáticamente la fecha del consentimiento y la versión de la política; el front solo envía la aceptación (`autorizacion_datos: true`).

---

## Consideraciones legales

Aunque el landing solo capture datos de contacto, ya trata **datos personales de menores**, sujetos a la **Ley 1581 de 2012**. Del lado del frontend:

- Publicar la **política de tratamiento de datos** (`/politica-datos`) y enlazarla desde el formulario y el footer.
- La casilla de autorización **no** puede venir premarcada.
- No enviar datos personales por la URL (query params); usar siempre el cuerpo del `POST`.
- Mostrar de forma visible que el servicio es un acompañamiento pedagógico y **no** reemplaza la valoración médica.

> Guía técnica, no asesoría jurídica. Conviene validar el cumplimiento con un profesional antes de producción.

---

## Despliegue

El landing puede desplegarse en cualquier plataforma que soporte Next.js (Vercel, Netlify, un VPS con Node, etc.). Recuerda configurar la variable `NEXT_PUBLIC_API_URL` apuntando a la API de producción y habilitar ese origen en el CORS del backend.

```bash
npm run build
npm run start
```

---

## Roadmap

Este landing es la primera pieza de un producto más amplio. Fases previstas:

1. **Landing + captura de leads** (etapa actual) — validar demanda.
2. **Portal del acudiente**: caracterización del bebé, malla de actividades, registro de avances.
3. **Panel de la Licenciada**: gestión de leads, creación de planes, seguimiento.
4. **Asistente de IA** de apoyo para la administración.

---

_Proyecto de [TU_NOMBRE] — [AÑO]._
