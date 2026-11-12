import type { Metadata } from "next";
import React from "react";
import { EditorialMasthead } from "@/components/editorial/EditorialMasthead";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";

export const metadata: Metadata = {
  title: "Политика конфиденциальности и Cookie (Privacy Policy)",
  description:
    "Политика конфиденциальности, обработки файлов cookie, Google Analytics (GA4) и Google AdSense издания GOLASON.COM.",
  alternates: { canonical: "https://golason.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#111827", minHeight: "100vh" }}>
      <EditorialMasthead />
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px 64px", lineHeight: 1.75 }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px" }}>
          Политика конфиденциальности / Privacy &amp; Cookie Policy
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "28px" }}>
          Последнее обновление / Last updated: November 2026 • GOLASON.COM
        </p>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>1. Общие положения (Overview)</h2>
          <p>
            Международное спортивное издание <strong>GOLASON.COM</strong> уважает конфиденциальность читателей. Мы не требуем обязательной регистрации для чтения новостей, просмотра live-результатов матчей и турнирных таблиц.
          </p>
          <p>
            <strong>EN:</strong> GOLASON.COM respects reader privacy. You can browse match centers, football analytics, and league standings without creating an account or submitting personal data.
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>
            2. Google AdSense &amp; DoubleClick Cookie Disclosure
          </h2>
          <p>
            На сайте используется рекламная сеть <strong>Google AdSense</strong> (<code>ca-pub-2879690973470436</code>). Сторонние поставщики, включая компанию Google, используют файлы cookie (в том числе DoubleClick DART cookie) для показа объявлений на основе предыдущих посещений пользователем нашего сайта или других сайтов в интернете.
          </p>
          <p>
            <strong>EN:</strong> Third-party vendors, including Google, use cookies (such as the DoubleClick cookie) to serve ads based on a user&apos;s prior visits to GOLASON.COM or other websites. Users may opt out of personalized advertising by visiting{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#DC2626" }}>
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: "#DC2626" }}>
              www.aboutads.info
            </a>.
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>
            3. Веб-аналитика (Google Analytics 4 &amp; Google Tag Manager)
          </h2>
          <p>
            Мы используем <strong>Google Analytics 4</strong> (<code>G-ZPT15DVDBY</code>) и <strong>Google Tag Manager</strong> (<code>GTM-WWG6VJWJ</code>) исключительно для агрегированной статистики посещаемости страниц, популярности футбольных рубрик и технического качества работы сайта.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>4. Контакты по вопросам данных (Contact)</h2>
          <p>
            По всем вопросам конфиденциальности и обработки данных вы можете связаться с редакцией по адресу:{" "}
            <a href="mailto:haruutyunyanr@gmail.com" style={{ color: "#DC2626", fontWeight: 700 }}>
              haruutyunyanr@gmail.com
            </a>
          </p>
        </section>
      </main>
      <EditorialFooter />
    </div>
  );
}
