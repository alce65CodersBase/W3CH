# Week 3 - Challenge 4: Series

Nuevo challenge utilizando

- Componentes basados en clases
- CSS mediante module.css
- Vite como builder de la aplicación

## Preparación

- Se crea y selecciona la rama de git
- Se crea la carpeta /CH4.Series incluyendo index.html
- Se crea la carpeta /public/CH4.Series incluyendo favicon.png y /images
- Se crea la carpeta src/CH4.Series incluyendo main_series y css/styles.css
- Se añade nueva entrada en /vite.config.js
- Se crea un nuevo enlace en /index.html
- Se crea la carpeta src/CH4.Series/components
- Se añade el componente App
- Se crea la carpeta src/CH4.Series/pages
- Se añade el componente HomePage

## Series

Aquí tienes una aplicación maquetada con HTML y CSS. Se trata de una aplicación que gestiona un listado de series, separándolas entre series vistas y no vistas.

Esta aplicación se alimentará de un objeto JS que tienes en el archivo `series.js`.

Tienes que mostrar un listado de series, separándolas entre vistas y no vistas. Cada serie tiene que mostrar toda la información que ves en la maqueta. Si la serie es no vista, sus estrellas tienen que estar a 0 y el usuario debería poder hacer clic para valorar la serie con las estrellas que crea necesario. Al hacer clic en una estrella, la aplicación debe modificar la valoración y la serie debe pasar de no vista a vista (no hay ninguna manera de pasar una serie de vista a no vista).

Si el usuario hace click en el icono de la x, la serie se debe eliminar.

## Diseño de componentes

Series (Home) page
  ├── Header
  ├── List (Pending series / Watched series)
      ├── Serie card
          ├── Score stars
