# Sistema de Gestión Académica

Aplicación web funcional desarrollada como **Momento 2** del proyecto de la asignatura FrontEnd 1 – CESDE.

## Descripción

Módulo de gestión de usuarios para una institución educativa. Permite realizar operaciones CRUD completas sobre usuarios, con persistencia en `localStorage` y validación de acceso mediante login.

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript (Vanilla) – manipulación del DOM, eventos, localStorage

## Funcionalidades

- **Login** con validación de credenciales (admin por defecto y usuarios registrados)
- **Registrar** usuarios con documento, nombre, usuario, correo, contraseña y rol
- **Listar** usuarios de forma dinámica sin recargar la página
- **Editar** nombre y rol de un usuario existente
- **Eliminar** usuarios con confirmación
- **Persistencia** con `localStorage` – los datos sobreviven al recargar
- **Cierre de sesión**

## Estructura del proyecto

```
momento 2/
├── index.html   → Estructura de la interfaz
├── style.css    → Estilos de la aplicación
├── script.js    → Lógica CRUD + DOM + Login
└── README.md    → Este archivo
```

## Cómo ejecutar

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sguarin757/Equipo-fronent.git
   ```
2. Abrir `index.html` en el navegador (doble clic o con Live Server en VS Code).

## Credenciales por defecto

| Usuario | Contraseña |
|---------|-----------|
| `admin` | `admin123` |

> También puedes iniciar sesión con cualquier usuario que hayas registrado previamente.

## Criterios académicos cubiertos

- Manipulación del DOM mediante selectores (`getElementById`, `querySelector`)
- Manejo de eventos con `addEventListener`
- Creación y eliminación de nodos (`createElement`, `appendChild`, `innerHTML`)
- Actualización dinámica de contenido en pantalla
- Operaciones CRUD completas
- Persistencia con `localStorage`

## Docente

Diego Giraldo Zapata – dgiraldoza@cesde.net
