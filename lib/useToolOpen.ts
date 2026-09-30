"use client";

import { useEffect } from "react";
import { track } from "./analytics";

/** Fire a one-time tool_open event when a tool mounts. */
export function useToolOpen(slug: string) {
  useEffect(() => {
    track("tool_open", { tool: slug });
  }, [slug]);
}
