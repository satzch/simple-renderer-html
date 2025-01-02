# A Simple 3D Renderer in HTML Canvas 2D

This is my implementation of a 3D renderer that uses HTML 2D Canvas for rendering 3D meshes.

I made this as a challenge to check if I understand the graphics concepts and also it was pretty fun project involving little use of maths.

## Issues

- Slow because it is my self-implementation based on my understanding of the maths and concepts.
- Only works with plain wavefront(.obj) files, with no materials, uv or other data attached. Only face and vertex data should be present.

---

### Updates

Date: 02-12-2025

- Refactored the code by organizing it into classes, improving maintainability, readability, and scalability.
- Added option to change resolution. Lower resolution will give better performance since my fill algorithm puts every pixel one-by-one.

---

### Live Site

[Try it here](https://satzch.github.io/simple-renderer-html/)  
