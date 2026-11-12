import type { Metadata } from "next";
import React from "react";
import { EditorialMasthead } from "@/components/editorial/EditorialMasthead";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";

export const metadata: Metadata = {
  title: "Контакты редакции (Contact Us)",
  description: "Связаться с редакцией GOLASON.COM по вопросам партнёрства, аналитики и прессы.",
  alternates: { canonical: "https://golason.com/contact" },
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#111827", minHeight: "100vh" }}>
      <EditorialMasthead />
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px 64px", lineHeight: 1.75 }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "12px" }}>
          Контакты редакции / Contact Editorial Desk
        </h1>
        <p style={{ marginBottom: "20px" }}>
          По вопросам редакционного сотрудничества, исправления неточностей, размещения рекламы и цитирования материалов:
        </p>
        <ul style={{ fontSize: "16px", paddingLeft: "20px", marginBottom: "24px" }}>
          <li>
            <strong>Email редакции (Editorial &amp; Press):</strong>{" "}
            <a href="mailto:haruutyunyanr@gmail.com" style={{ color: "#DC2626", fontWeight: 700 }}>
              haruutyunyanr@gmail.com
            </a>
          </li>
          <li>
            <strong>Официальный Telegram-канал:</strong>{" "}
            <a href="https://t.me/futbolnaya_jara" target="_blank" rel="noopener noreferrer" style={{ color: "#DC2626", fontWeight: 700 }}>
              https://t.me/futbolnaya_jara
            </a>
          </li>
        </ul>
      </main>
      <EditorialFooter />
    </div>
  );
}
