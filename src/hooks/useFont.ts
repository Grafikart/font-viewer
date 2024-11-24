import { useEffect, useState } from "preact/hooks";
import { camelize } from "../functions/string.ts";
import type { FontMetrics } from "@capsizecss/core";
import { createStyleString } from "@capsizecss/core";
import { customFonts } from "../config.ts";

const fontsWithLocalMetrics = customFonts.map((c) => c.name);

export function useFont(name: string) {
  const className = `font-${camelize(name)}`;
  // Load the font from a CDN
  useEffect(() => {
    if (fontsWithLocalMetrics.includes(name)) {
      const style = document.createElement("style");
      style.textContent = `
      @font-face {
        font-family: '${name}';
        src: url('${camelize(name)}.otf') format('opentype');
      }`;
      document.head.appendChild(style);
      return () => {
        style.remove();
      };
    }
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", `https://fonts.bunny.net/css?family=${name}:400`);
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [name]);

  const [metrics, setMetrics] = useState(null as null | FontMetrics);

  // Add additional CSS
  useEffect(() => {
    if (!metrics) {
      return;
    }
    const style = document.createElement("style");
    document.head.appendChild(style);
    style.textContent = createStyleString(className, {
      fontSize: 18,
      leading: 18,
      fontMetrics: metrics,
    });
    return () => {
      style.remove();
    };
  }, [metrics]);

  useEffect(() => {
    if (fontsWithLocalMetrics.includes(name)) {
      setMetrics(customFonts.find((c) => c.name === name)!.metrics);
      return;
    }
    const url = `https://cdn.jsdelivr.net/npm/@capsizecss/metrics@3.4.0/entireMetricsCollection/${camelize(name)}/index.mjs`;
    import(url).then((r: { default: FontMetrics }) => {
      setMetrics(r.default);
    });
  }, [name]);

  return {
    className: className,
    metrics,
  };
}
