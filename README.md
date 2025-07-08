# bomchil-multi-host-poc

Este proyecto es un Office Add-in (complemento para Office) desarrollado con React y TypeScript, pensado como arquetipo para múltiples hosts.

## Requisitos previos

- Node.js (recomendado: versión 18 o superior)
- npm (viene con Node.js)
- Office (Word, Excel, etc.) instalado en tu equipo o una cuenta de Microsoft 365 para probar en la web

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd bomchil-multi-host-add-in-archetype
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Comandos útiles

- **Iniciar en modo desarrollo (con recarga automática):**
  ```bash
  npm run dev-server
  ```
  Esto levanta el servidor en `https://localhost:3000/`.

- **Compilar para producción:**
  ```bash
  npm run build
  ```

- **Iniciar el add-in en Office (Word, Excel, etc.):**
  ```bash
  npm start
  ```
  Esto carga el complemento en tu aplicación de Office (por defecto Word en escritorio).

- **Detener el add-in:**
  ```bash
  npm stop
  ```

- **Validar el manifiesto:**
  ```bash
  npm run validate
  ```

- **Lint y formato:**
  ```bash
  npm run lint
  npm run lint:fix
  npm run prettier
  ```

## Estructura del proyecto

- `src/taskpane/`: Código fuente principal del add-in.
- `assets/`: Imágenes y recursos estáticos.
- `manifest.xml`: Manifiesto del add-in para Office.
- `webpack.config.js`: Configuración de Webpack.

## Pruebas y desarrollo

1. Ejecuta `npm run dev-server` para levantar el servidor local.
2. En otra terminal, ejecuta `npm start` para cargar el add-in en Office.
3. Abre Word (u otra app compatible), ve a "Mis complementos" y selecciona el add-in.

> **Nota:** Si es la primera vez que desarrollas add-ins de Office, puede que necesites instalar certificados de desarrollo. El sistema te guiará si es necesario.

## Despliegue

- Para producción, asegúrate de cambiar la URL de `urlProd` en `webpack.config.js` por la de tu entorno real.
- El manifiesto (`manifest.xml`) debe apuntar a la URL de producción.

## Recursos útiles

- [Documentación de Office Add-ins](https://learn.microsoft.com/es-es/office/dev/add-ins/)
- [React](https://es.react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Probar el add-in en Excel, Outlook o PowerPoint

Puedes probar este complemento en otras aplicaciones de Office como Excel, Outlook o PowerPoint siguiendo estos pasos:

1. Asegúrate de tener la aplicación de Office instalada (puede ser de escritorio o versión web con Microsoft 365).
2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev-server
   ```
3. En otra terminal, ejecuta:
   ```bash
   npm start
   ```
   Por defecto, el manifiesto está configurado para Word. Para probar en otro host, edita el archivo `package.json` y cambia la propiedad `config.app_to_debug` a uno de los siguientes valores según el host:
   - Para Excel: `"excel"`
   - Para Outlook: `"outlook"`
   - Para PowerPoint: `"powerpoint"`

   Ejemplo:
   ```json
   "config": {
     "app_to_debug": "excel",
     "app_type_to_debug": "desktop",
     "dev_server_port": 3000
   }
   ```

4. Guarda los cambios y vuelve a ejecutar `npm start`.
5. La aplicación correspondiente de Office se abrirá y cargará el add-in automáticamente.

**En la versión web de Office:**
- Puedes cargar el manifiesto manualmente desde la opción "Insertar > Mis complementos > Agregar un complemento personalizado" y seleccionando el archivo `manifest.xml`.

> **Nota:** No olvides volver a cambiar el valor de `app_to_debug` si quieres probar en otro host.

## Probar el add-in en Outlook (manual)

El sideload automático no está soportado para Outlook. Debes cargar el complemento manualmente:

### Outlook Web (recomendado para desarrollo)
1. Ve a [Outlook Web](https://outlook.office.com/) e inicia sesión.
2. Haz clic en el engranaje (⚙️) > “Ver toda la configuración de Outlook” > “Correo” > “Personalizar acciones” > “Complementos personalizados”.
3. Elige “Agregar un complemento personalizado” > “Agregar desde archivo” y selecciona tu `manifest.xml`.
4. El complemento aparecerá en la barra de complementos de Outlook.

### Outlook de escritorio
1. Abre Outlook.
2. Ve a “Inicio” > “Obtener complementos” > “Mis complementos” > “Agregar un complemento personalizado” > “Agregar desde archivo”.
3. Selecciona tu `manifest.xml` y sigue los pasos.

> **Nota:** Cada vez que cambies el manifiesto o el código, deberás recargar el complemento en Outlook.