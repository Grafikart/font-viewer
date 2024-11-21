import { FontViewer } from "./FontViewer.tsx";
import { useState } from "preact/hooks";
import { withTransition } from "./functions/dom.ts";

export function App() {
  const [hasComparison, setComparison] = useState(false);
  return (
    <div class="flex gap-22 justify-center">
      <div style={{ viewTransitionName: "font1" }}>
        <FontViewer />
      </div>
      {hasComparison ? (
        <div style={{ viewTransitionName: "font2" }}>
          <FontViewer />
        </div>
      ) : (
        <button
          onClick={() => withTransition(() => setComparison(true))}
          class="py-1 px-2 mt-[100px] h-max rounded bg-purple hover:(bg-light) flex gap-1 items-center transition"
        >
          <span class="block i-ri-layout-column-line"></span>
          Comparer
        </button>
      )}
    </div>
  );
}
