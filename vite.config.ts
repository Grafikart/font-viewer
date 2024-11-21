import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import UnoCSS from "unocss/vite";
import {
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from "unocss";

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [
    preact(),
    UnoCSS({
      transformers: [transformerVariantGroup()],
      presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
          provider: "bunny",
          fonts: {
            sans: ["Inter"],
          },
        }),
      ],
      theme: {
        colors: {
          dark: "#1A1B26",
          light: "#C0CAF5",
          purple: "#9D7CD8",
          pink: "#BB9AF7",
          blue: "#7AA2F7",
          gray: "#5D6791",
          green: "#9DCC65",
          yellow: "#E0AF68",
        },
        container: {
          center: true,
        },
      },
    }),
  ],
});
