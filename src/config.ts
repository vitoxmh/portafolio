// Clave pública (site key) de Google reCAPTCHA v2.
// Es pública por diseño (va en el bundle del frontend).
// Reemplázala por tu site key (la consigues en https://www.google.com/recaptcha/admin).
// Vacía = el widget no se renderiza (útil en desarrollo).
// Alternativa: pásala en el build con VITE_RECAPTCHA_SITE_KEY (.env).
export const RECAPTCHA_SITE_KEY =
  (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined) ?? '6LdGQoUtAAAAACqyzeBkDfFcTn7xbLVLpfHBbKGg'

