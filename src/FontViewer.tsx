import { useFont } from "./hooks/useFont.ts";
import { clsx } from "clsx";
import { useEffect, useId, useState } from "preact/hooks";
import { fonts } from "./config.ts";
import { createStyleString, FontMetrics } from "@capsizecss/core";

/**
 * Allow users to view and interact with different fonts,
 * displaying their metrics, CSS to fix line height issue, and a demonstration of the font with and
 * without correction.
 */

export function FontViewer() {
  const [name, setName] = useState("Inter");
  const { metrics, className } = useFont(name);

  return (
    <div class="space-y-10 max-w-[500px]">
      {/* Metrics viewer */}
      <div>
        <select
          onChange={(e) => setName(e.currentTarget.value)}
          class="bg-black/20 border-1 border-light/10 px-2 py-1 text-md color-light"
        >
          {fonts.map((font) => (
            <option value={font} selected={name === font}
            class=" color-dark">
              {font}
            </option>
          ))}
        </select>
        <div
          class="font-size-[100px] leading-none bg-gray/20 relative w-max my-8"
          style={{ fontFamily: name }}
        >
          <div>BojglÉ|</div>
          {metrics && <Rules metrics={metrics} />}
        </div>
        <ul class="color-light font-bold space-y-1">
          <li>
            <span class="color-gray font-normal">UnitsPerEm:</span>{" "}
            {metrics?.unitsPerEm}
          </li>
          <li>
            <span class="color-gray font-normal">Ascent:</span>{" "}
            {metrics?.ascent}
          </li>
          <li>
            <span class="color-gray font-normal">Descent:</span>{" "}
            {metrics?.descent}
          </li>
          <li>
            <span class="color-gray font-normal">xHeight:</span>{" "}
            {metrics?.xHeight}
          </li>
        </ul>
      </div>

      {/* CSS Viewer */}
      {metrics && (
        <CSSViewer name={className} metrics={metrics} family={name} />
      )}

      {/* Fix demonstration */}
      <div>
        <div class="text-lg font-semibold color-light mb-2">
          Démonstration :
        </div>
        <div class="text-md  mb-2 color-gray">Sans correction</div>
        <button
          class="bg-gray p-2 rounded leading-none"
          style={{ fontFamily: name }}
        >
          Acheter les produits
        </button>
        <div class="text-md  mb-2 mt-4 color-gray">Avec correction</div>
        <button
          class={clsx("bg-gray p-2 rounded leading-none", className)}
          style={{ fontFamily: name }}
        >
          Acheter les produits
        </button>
      </div>
    </div>
  );
}

/**
 * Displays the CSS code required to fix line height issues for a given font.
 */
function CSSViewer({
  name,
  metrics,
  family,
}: {
  name: string;
  family: string;
  metrics: FontMetrics;
}) {
  const [value, setValue] = useState(1);
  const code = createStyleString(name, {
    fontSize: 16,
    leading: 16 * value,
    fontMetrics: metrics,
  });
  const id = useId();
  useEffect(() => {
    const style = document.createElement("style");
    document.head.appendChild(style);
    style.textContent = createStyleString(id, {
      fontSize: 18,
      leading: 18 * value,
      fontMetrics: metrics,
    });
    return () => {
      style.remove();
    };
  }, [value]);

  return (
    <div>
      <div class="text-lg font-semibold color-light mb-2">CSS :</div>
      <input
        class="w-full"
        type="range"
        min="1"
        max="2"
        step="0.1"
        value={value}
        onInput={(e) => setValue(e.currentTarget.valueAsNumber)}
      />
      <div class="flex gap-2">
        <pre class="bg-gray/10 rounded color-gray p-4">
          {code
            .replace(/  font-size: .*\n/g, "")
            .replace(/  line-height: (.*)\n/g, `  line-height: ${value}\n`)
            .trim()}
        </pre>
        <div class="bg-gray/10 rounded color-gray p-4">
          <p class={id} style={{ lineHeight: value, fontFamily: family }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            exercitationem illo ipsam magnam neque nisi quam repellat voluptas!
            Ad cum dolorum eligendi ex exercitationem laborum, omnis quis sequi
            tempore voluptas!
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Render visual rules for font metrics for the font
 */
function Rules({ metrics }: { metrics: FontMetrics }) {
  const baseline =
    (metrics.ascent +
      0.5 * (metrics.unitsPerEm - metrics.ascent - Math.abs(metrics.descent))) /
    metrics.unitsPerEm;
  return (
    <div
      class="absolute h-0 left-0 w-full r-0"
      style={{ top: `${baseline}em` }}
    >
      <Line
        border="border-yellow/70"
        color="color-yellow/70"
        top={0}
        name="Baseline"
      />
      <Line
        border="border-green/70"
        color="color-green/70"
        top={metrics.xHeight / metrics.unitsPerEm}
        name="xHeight"
      />
      <Line
        border="border-green/70"
        color="color-green/70"
        top={metrics.capHeight / metrics.unitsPerEm}
        name="capHeight"
      />
      <Line top={metrics.ascent / metrics.unitsPerEm} name="Ascent" />
      <Line top={metrics.descent / metrics.unitsPerEm} name="Descent" />
    </div>
  );
}

/**
 * Renders a horizontal line at a specified position relative to baseline.
 */
function Line({
  top,
  name,
  border = "border-purple/70",
  color = "color-purple/70",
}: {
  top: number;
  name: string;
  border?: string;
  color?: string;
}) {
  return (
    <div
      class={clsx(
        border,
        color,
        "border-t-1 border-t-dashed pointer-events-none h-0 absolute left-0 right-0 -transform-translate-[1px]",
      )}
      style={{ top: `${-top}em` }}
    >
      <div class="absolute left-full -translate-y-1/2 pl-2 text-sm font-sans">
        {name}
      </div>
    </div>
  );
}
