// src/lookbook/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Lookbook } from "./lookbook";

document.querySelectorAll("[data-lookbook-root]").forEach((el) => {
  const config = {
    handles: JSON.parse(el.dataset.lookbookHandles || "[]"),
    shopDomain: el.dataset.shopDomain,
    storefrontToken: el.dataset.storefrontToken,
    apiVersion: el.dataset.apiVersion,
    country: el.dataset.country, // "AU" or "JP"
  };
  createRoot(el).render(<Lookbook config={config} />);
});