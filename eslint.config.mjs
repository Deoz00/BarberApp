import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Obtener __filename y __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear instancia de FlatCompat para manejar configuraciones
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extender configuraciones de ESLint para Next.js
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // Configuración base de Next.js
  // ...compat.extends("next/typescript") // Descomenta si usas TypeScript
];

eslintConfig.push({
  rules: {
    "no-unused-vars": "off", // Desactiva la regla de variables no utilizadas
    "@typescript-eslint/no-unused-vars": "off", // Desactiva la regla para TypeScript si es necesario
    "react-hooks/exhaustive-deps": "off", // Desactiva la regla de dependencias de useEffect
  },
});

export default eslintConfig;
