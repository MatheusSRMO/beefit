/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./src/**/*.{ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: "#080835",
                    secondary: "#528AA5",
                },
                text: {
                    primary: "#FFDC98",
                },
            },
        },
    },
    plugins: [],
};
