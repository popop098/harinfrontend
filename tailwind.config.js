/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./public/**/*.html",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    extend: {
      colors: {
        "discord-dark": "#36393f",
        "discord-white": "#ffffff",
        "discord-blurple": "#5865f2",
        "discord-green": "#57f287",
        "discord-yellow": "#f2e05d",
        "discord-red": "#ed4245",
        "discord-grey": "#99aab5",
        "discord-megenta": "#EB459E",
        "discord-dark-hover": "#3c3f44",
        "discord-dark-active": "#43464d",
        "discord-white-active": "#d2d5d9",
        "discord-white-hover": "#dcdfe2",
        "discord-white-active-text": "#060607",
        "discord-white-hover-text": "#2f3337",
        "discord-dark-active-text": "#edf6ff",
        "discord-dark-hover-text": "#dcddde",
        "discord-dark-text": "#96989d",
        "discord-dark-sidebar": "#2f3136",
        "discord-white-sidebar": "#f2f3f5",
      },
    },
  },
};
