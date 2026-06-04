# 📖 Pluviómetro INVU — Liberia Centro, Guanacaste
## Manual de uso rápido

---

## 🚀 Cómo abrir la app

Abrir el archivo `index.html` con cualquier navegador moderno (Chrome, Edge, Firefox).  
**No requiere instalación ni internet** para funcionar en modo local.

---

## 📋 Flujo diario de trabajo

1. Cada **mañana** (después de las 7:00 a.m.) abrir la app
2. Hacer clic en **"Registrar Lectura de Hoy"**
3. Verificar que la fecha sea la de hoy
4. Ingresar los **mm de lluvia** leídos en el pluviómetro
5. Ingresar la **temperatura** (°C) si se dispone de ella
6. Agregar notas opcionales (condiciones especiales, etc.)
7. Hacer clic en **"Guardar Registro"**

> El período medido siempre es: **7:00 a.m. del día anterior → 7:00 a.m. de hoy**

---

## 📱 Pantallas de la app

| Pantalla | Función |
|---|---|
| 🏠 **Inicio** | Resumen del mes, período actual, último registro, mini gráfico |
| ✏️ **Registrar** | Formulario de nueva lectura (lluvia + temperatura + notas) |
| 📋 **Historial** | Todos los registros, filtro por mes, editar o eliminar |
| 📈 **Estadísticas** | Gráficas de lluvia y temperatura, tabla anual |

---

## ☁️ Configurar Google Sheets (sincronización en la nube)

### Paso 1 — Crear la Hoja de Cálculo
1. Ir a [sheets.google.com](https://sheets.google.com)
2. Crear una hoja nueva → darle un nombre (ej. "Pluviómetro Liberia 2026")
3. Copiar el **ID** de la URL:  
   `https://docs.google.com/spreadsheets/d/`**`ESTE_ES_EL_ID`**`/edit`

### Paso 2 — Crear el Apps Script
1. Ir a [script.google.com](https://script.google.com) → **Nuevo proyecto**
2. Copiar y pegar el contenido del archivo `google_apps_script.js`
3. Reemplazar `'PEGAR_AQUI_EL_ID_DE_LA_HOJA'` con el ID copiado en el Paso 1
4. Guardar (Ctrl+S)

### Paso 3 — Implementar como Aplicación Web
1. Clic en **"Implementar"** → **"Nueva implementación"**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Quién tiene acceso: **Cualquier persona**
5. Clic en **"Implementar"** → Autorizar → Copiar la URL

### Paso 4 — Configurar en la App
1. En la app, hacer clic en el ícono ⚙️ (esquina superior derecha)
2. Pegar la URL del Apps Script en el campo correspondiente
3. Ingresar el nombre del operador
4. Activar "Sincronización automática" si se desea
5. Hacer clic en **"Probar Conexión"** para verificar
6. Guardar configuración

---

## 🔔 Recordatorio diario

1. Ir a ⚙️ Configuración
2. Activar **"Recordatorio diario"** → permitir notificaciones en el navegador
3. Configurar la hora (por defecto: 7:15 a.m.)
4. Guardar

> **Nota:** El navegador debe estar abierto (puede estar minimizado) para recibir el recordatorio.

---

## 📥 Exportar datos (CSV)

- Hacer clic en el ícono **📥** en la barra superior
- Se descarga un archivo CSV compatible con Excel/LibreOffice
- El archivo incluye: fecha, mm lluvia, temperatura, notas, período medido

---

## 💾 Almacenamiento de datos

Los datos se guardan automáticamente en el **localStorage del navegador**.  
⚠️ Si se borra el caché/cookies del navegador, los datos locales se perderán.  
**Se recomienda activar la sincronización con Google Sheets** como respaldo.

---

## 🌐 Usar en el celular (Android / iOS)

1. Abrir Chrome en el celular
2. Navegar al archivo (o subir `index.html` a Google Drive y abrirlo)
3. En Chrome → menú (**⋮**) → **"Agregar a pantalla de inicio"**
4. La app se instala como ícono en el escritorio

---

## 📁 Archivos del proyecto

| Archivo | Descripción |
|---|---|
| `index.html` | **App completa** (abrir este archivo) |
| `google_apps_script.js` | Código para Google Sheets (instalar en script.google.com) |
| `README.md` | Este manual |
