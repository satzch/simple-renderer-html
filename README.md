# A Simple 3D Renderer in HTML Canvas 2D

This project is a self-made 3D renderer built with pure JavaScript and HTML 2D Canvas, designed to render 3D meshes.

I created this as a personal challenge to test my understanding of graphics concepts, and it turned out to be a fun project involving some interesting maths!

## Live Site

[Try it here](https://satzch.github.io/simple-renderer-html/)

## Project Motivation

The goal was to explore how 3D shapes can be displayed on a 2D canvas, and the project evolved into an exciting journey where I implemented a **triangle rasterizer** and added support for vertex-colored rendering. Throughout the project, I focused on applying math and graphics principles to achieve the desired results.

**Note: This project is not intended to be a fully polished or professional 3D renderer. It turned out to be a fun project with just the right amount of maths and problem-solving, and I’m happy to share it as a learning experience!**

## Key Features

- **3D Rendering:** Rendering of 3D meshes onto a 2D canvas.
- **Triangle Rasterization:** Rasterizing triangles to render 3D objects.
- **Vertex Colors:** Support for vertex-colored meshes.
- **.obj File Import (Wireframe Mode):** Basic support for importing .obj files (currently in wireframe mode).

## Why HTML Canvas?

I chose HTML5 Canvas because it was a simple and flexible way to get graphics on the screen without needing to dive into complex low-level stuff. I already knew the basics of HTML Canvas, so it felt like a good starting point to explore 3D rendering without getting lost in hardware-level details. HTML Canvas 2D API gave me an easy way to experiment while keeping things straightforward, allowing me to focus on learning the core concepts without overcomplicating things.

I was able to improve the initial project I created months ago only because I learned OpenGL basics. It helped me understand the concepts much better, allowing me to make significant improvements. That being said, I’ve only barely scratched the surface.

## Issues

- **Performance:** Super slow as it is my self-implementation based on my understanding of the maths and concepts. Also because of per-pixel calculations. A lot of optimizations are required.
- **Limited .obj Support:** It only works with basic wavefront (.obj) files that contain only face and vertex data. No materials, UVs, or other metadata. The mesh must consist of triangles, with the Z-axis pointing inside the screen and the Y-axis pointing upwards.

---

### Updates

Future updates are not guaranteed and will depend on my ongoing interest in the project. While I may add new features or improvements, there is no fixed timeline for updates. I’d like to add texture sampling, lighting, and proper .obj loading.

Date: 14-01-2025

- The renderer now supports displaying the cube with the provided vertex colors. _Note:_ colors for .obj file is not yet implemented.
- Added basic depth checking with a 2D array as a depth buffer and a rough back-face culling solution.
- Added an option to toggle between using a color buffer (canvas image data) and rendering each pixel as a 1px rectangle on the canvas (default).

Date: 02-01-2025

- Refactored the code by organizing it into classes, improving maintainability, readability, and scalability.
- Added option to change resolution. Lower resolution will give better performance since my fill algorithm puts every pixel one-by-one.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

By using, modifying, or distributing this code, you agree to the terms outlined in the MIT License.
