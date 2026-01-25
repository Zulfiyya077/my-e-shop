# ZipTech

> **Premium Gear. Seamless Shopping.**

**ZipTech** is a modern, high-performance e-commerce application designed to provide a premium shopping experience. Built with **React** and **Vite**, it features a dynamic, responsive interface with advanced filtering, real-time cart management, and smooth animations.

[zip-tech.vercel.app](https://zip-tech.vercel.app)

## Key Features

-   **Advanced Filtering**: Deep filtering capabilities by Category, Brand, Color, and Price Range with multi-select support.
-   **Fully Responsive**: Optimized layout for all devices, from mobile (375px+) to large desktops.
-   **High Performance**: Powered by Vite for instant HMR and optimized builds.
-   **Premium UI/UX**:
    -   Glassmorphism and gradient aesthetics.
    -   Smooth page transitions and micro-interactions using **Framer Motion**.
    -   Skeleton loading states for better perceived performance.
-   **Shopping Experience**:
    -   Real-time Cart management.
    -   Wishlist functionality.
    -   Dynamic pagination with mobile-optimized navigation.

## Tech Stack

-   **Core**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ziptech.git
    cd ziptech
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Visit `http://localhost:5173` to see the app in action.

## Project Structure

```bash
src/
├── components/     # Reusable UI components (Product, Skeleton, Dropdowns)
├── context/        # React Context (Cart, Wishlist, Filter)
├── services/       # API integration (getProducts, getBrands)
├── App.jsx         # Main application entry
└── main.jsx        # DOM rendering
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Designed with ❤️ by **ZipTech Team**
