# 🎲 Bingo Takali App

![Bingo Takali Screenshot](https://via.placeholder.com/800x400?text=Bingo+Takali+App+Screenshot) <!-- Reemplazar con una captura de pantalla real del proyecto -->

## Descripción

Bingo Takali es una aplicación web comunitaria de bingo diseñada para proyectarse en pantallas grandes en salones o eventos. Ofrece una experiencia de juego moderna, visualmente atractiva y fácil de usar, permitiendo a un anfitrión cantar números y llevar un registro claro del progreso del juego.

El proyecto está construido con React y TypeScript, utilizando Tailwind CSS para estilos de alto impacto y modularidad.

## Características

-   **Tablero de Bingo (1-75):** Un tablero visual que muestra todos los números, resaltando claramente los que ya han sido cantados.
-   **Panel de Control Intuitivo:**
    -   Botón prominente para "Sacar Siguiente Número".
    -   Indicador gigante y llamativo del último número cantado (ej. "B-12").
    -   Contador de cuántos números quedan por salir.
    -   Historial de los últimos 5 números cantados en formato de "píldoras".
-   **Nuevos Modos de Juego y Opciones:**
    -   Implementación de nuevos modos de juego: `COLUMN_B`, `COLUMN_N`, `COLUMN_G`, `COLUMN_O`, `VOWELS_ONLY`, `CONSONANTS_ONLY`, `B_AND_O`, `U_PATTERN`.
    -   Menú de opciones para reiniciar el juego y generar nuevas tarjetas de bingo.
    -   Persistencia del modo de juego activo.
-   **Generación de Tarjetas de Bingo:** Capacidad de generar tarjetas de bingo aleatorias para los jugadores.
-   **Experiencia de Usuario (UX/UI) Mejorada:**
    -   Efectos visuales y animaciones sutiles al cantar un nuevo número para atraer la atención.
    -   Efectos de sonido cortos (campanilla) al cantar un número.
    -   Interfaz completamente responsiva, adaptándose a pantallas grandes y dispositivos móviles.
    -   Diseño moderno, festivo y de alto impacto con fondos degradados y tarjetas translúcidas.
    -   Colores de acento distintos para las columnas B-I-N-G-O.
-   **Persistencia de Datos:** El estado del juego (números cantados, disponibles, etc.) se guarda automáticamente en el `localStorage` del navegador, permitiendo continuar una partida incluso después de cerrar la pestaña o el navegador.
-   **Desarrollo Robusto:** Proyecto migrado a TypeScript para tipado estático, mejorando la mantenibilidad y reduciendo errores.
-   **Modularidad de Estilos:** Todas las clases de Tailwind CSS están encapsuladas en archivos `.module.css` para una mejor organización y aislamiento de estilos.

## Tecnologías Utilizadas

-   **React:** Biblioteca de JavaScript para construir interfaces de usuario.
-   **TypeScript:** Superset de JavaScript que añade tipado estático.
-   **Vite:** Herramienta de construcción rápida para proyectos web.
-   **Tailwind CSS:** Framework CSS utility-first para un diseño rápido y responsivo.
-   **CSS Modules:** Para la modularización y encapsulación de estilos.
-   **HTML5 / CSS3 / JavaScript (ESNext)**

## Configuración y Ejecución del Proyecto

Para poner en marcha el proyecto en tu entorno local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/cisco336/bingo-app.git
    cd bingo-app
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Preparar archivos de sonido (Opcional pero recomendado):**
    La aplicación está configurada para reproducir un sonido (`bingo-ding.mp3`) cuando se canta un número.
    Crea una carpeta `public/sounds` en la raíz del proyecto y coloca tu archivo de sonido allí:
    ```bash
    mkdir -p public/sounds
    # Copia tu archivo bingo-ding.mp3 aquí
    ```
    Si no proporcionas un archivo, el sonido simplemente no se reproducirá, pero la aplicación funcionará.

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará la aplicación en `http://localhost:5173/` (o un puerto similar).

5.  **Compilar para producción:**
    ```bash
    npm run build
    ```

## Persistencia de Datos

El estado del juego se guarda automáticamente en `localStorage`. Si cierras la pestaña o el navegador, la próxima vez que abras la aplicación, el juego continuará desde donde lo dejaste.

Para **reiniciar el juego** por completo (borrar el estado guardado), puedes borrar los datos del sitio en la configuración de tu navegador para `localStorage`, o usar la consola de desarrollador:

```javascript
localStorage.removeItem('bingoGameState');
location.reload();
```

## Mejoras de UX/UI

Se han implementado diversas mejoras visuales y funcionales para una experiencia de usuario óptima:

-   **Animaciones:** Efectos de `ping` para el último número y `pop` para los números cantados en el tablero.
-   **Diseño:** Fondos degradados, tarjetas translúcidas, sombras y bordes redondeados.
-   **Responsividad:** La interfaz se adapta dinámicamente a diferentes tamaños de pantalla, desde móviles hasta proyectores.
-   **Sonidos:** Retroalimentación auditiva al cantar números.

## Organización del Código

El proyecto sigue una estructura modular:

-   `src/`: Contiene el código fuente principal.
    -   `App.tsx`: Componente principal que gestiona el estado global y la lógica del juego.
    -   `components/`: Componentes reutilizables (`ControlPanel.tsx`, `TablaBingo.tsx`, `OptionsMenu.tsx`, `BingoCard.tsx`).
    -   `hooks/`: Custom hooks para lógicas específicas (`useBingoGame.ts`, `useSound.ts`).
    -   `utils/`: Funciones de utilidad (`bingoUtils.ts`, `patternUtils.ts`).
    -   `types/`: Definiciones de tipos e interfaces (`types.ts`).
    -   `*.module.css`: Archivos CSS Modules para la encapsulación de estilos de cada componente.
    -   `main.tsx`: Punto de entrada de la aplicación.
    -   `index.css`: Contiene directivas de Tailwind y animaciones `@keyframes` globales.
-   `public/`: Archivos estáticos como imágenes y sonidos.
-   `tailwind.config.js`: Configuración de Tailwind CSS.
-   `tsconfig.json`: Configuración de TypeScript.

## Futuras Mejoras

Aquí hay algunas ideas para futuras mejoras del proyecto:

-   **Personalización de Tarjetas:** Permitir a los usuarios personalizar sus tarjetas (por ejemplo, eligiendo un diseño o cargando sus propios números).
-   **Múltiples Jugadores:** Implementar la lógica para que varios jugadores puedan conectar sus propias tarjetas y el sistema valide automáticamente los bingos.
-   **Integración con Backend:** Para juegos más complejos o seguimiento de estadísticas, considerar una integración con un backend para persistencia de datos a largo plazo y gestión de salas.
-   **Más Modos de Juego:** Continuar añadiendo nuevos y creativos patrones de bingo.
-   **Soporte Multilingüe:** Permitir la internacionalización de la interfaz de usuario.
-   **Accesibilidad:** Mejorar la accesibilidad para usuarios con diferentes necesidades.
-   **Temas Personalizados:** Ofrecer opciones de temas visuales para la aplicación.

## Contribuciones de Agentes de Codificación

Este proyecto está configurado para facilitar la contribución de agentes de codificación. Sigue estas directrices para asegurar una integración fluida de tus cambios:

1.  **Entender el Contexto:** Antes de hacer cambios, asegúrate de comprender completamente la estructura del proyecto, los componentes existentes y la lógica del juego, especialmente en `App.tsx` y los custom hooks.
2.  **Crear una Nueva Rama:** Siempre crea una nueva rama para tus cambios, utilizando un nombre descriptivo (ej., `feature/nombre-de-la-feature`, `bugfix/descripcion-del-bug`).
    ```bash
    git checkout -b feature/tu-caracteristica
    ```
3.  **Desarrollar y Probar:** Implementa tus cambios y asegúrate de que pasen las pruebas existentes (si las hay) y no introduzcan nuevos errores.
4.  **Mensajes de Commit Claros:** Utiliza mensajes de commit claros y concisos, siguiendo la convención de `feat:`, `fix:`, `docs:`, `chore:`, etc.
    ```bash
    git commit -m "feat: Agrega tu nueva característica"
    Co-Authored-By: Claude Code <noreply@anthropic.com>
    ```
5.  **Abrir un Pull Request:** Una vez que tus cambios estén listos y probados, sube tu rama y abre un Pull Request contra la rama `main`.
    ```bash
    git push origin feature/tu-caracteristica
    # Luego, abre un Pull Request a través de la interfaz de GitHub.
    ```
    Asegúrate de incluir una descripción clara de tus cambios en el Pull Request.
6.  **Revisión de Código:** Esté preparado para la revisión del código y realiza los ajustes necesarios según la retroalimentación.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
