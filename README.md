# e Mission: Multilingual Blog

A multilingual blog built with **Nuxt.js 3**, featuring **TailwindCSS**, **Google Analytics integration**, **Dynamic Routing**, **Form Validation**, and **Support for Multiple Languages**.

## Features

- **Multilingual Support**:
  - Supported languages: English, French, Spanish, German.
  - Language-specific routes (e.g., `/en`, `/fr`).
  - Seamless language switching with dynamic route updates.

- **Dynamic Blog Posts**:
  - JSON-based blog content with translations.
  - Routes like `/en/posts/:id` dynamically render post content.
  - Paginated list of blog posts with search functionality.

- **Contact Form**:
  - Fields: Name, Email, Phone Number, Message.
  - Basic validation for required fields and proper formats (email, phone).
  - Real-time error messages for invalid inputs.

- **Google Analytics Integration**:
  - Tracks page views and custom events.
  - Implemented using the `vue-gtag-next` library.

## Technologies Used

- **Nuxt.js 3**: Framework for server-side rendering and static site generation.
- **Vue.js 3**: Reactive UI framework.
- **TailwindCSS**: Utility-first CSS framework.
- **vue-gtag-next**: Google Analytics integration for Vue 3.
- **PostCSS**: CSS transformations and optimizations.

## Project Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. Install dependencies:
    ```bash
    npm install

3. Run the development server:
   ```bash
    npm run dev

## Folder Structure
- **/components**: Contains reusable components.
- **/pages**: Contains pages, including blog (***posts***) and contact form.
- **/plugins**: Google Analytics initialization (***vue-gtag.client.ts***).
- **/public**: Static files like ***posts.json*** with localized blog content.
- **/styles**: TailwindCSS configuration.

## Customization
- **Blog Content**: Modify *public/posts.json* for blog posts in all supported languages.
- **Google Analytics**: Replace the Measurement ID in *plugins/vue-gtag.client.ts* with your own.

## Deployment
The project is configured for static hosting on platforms like Vercel.
[e Mission: Blog Website](https://blog-project-puce-sigma.vercel.app/)


Happy coding! 🚀


