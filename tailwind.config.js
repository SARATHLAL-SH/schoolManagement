/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        spinOnce: "spinOnce 0.5s ease-in-out",
        "scan-line": "scan-line 2s linear infinite",
      },
      keyframes: {
        spinOnce: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(2000%)" },
        },
      },

      perspective: {
        none: "none",
        1000: "1000px",
      },
      rotate: {
        "y-180": "180deg",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      transformOrigin: {
        center: "center",
      },
      backgroundImage: {
        "student-card": "url('/public/6515.jpg')",
      },
      
    },
    
  },
  plugins: [],
};
