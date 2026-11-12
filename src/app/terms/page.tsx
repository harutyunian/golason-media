import type { Metadata } from "next";
import React from "react";
import { EditorialMasthead } from "@/components/editorial/EditorialMasthead";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";

export const metadata: Metadata = {
  title: "Пользовательское соглашение (Terms of Use)",
  description: "Правила использования материалов и сервисов футбольного издания GOLASON.COM.",
  alternates: { canonical: "https://golason.com/terms" },
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#111827", minHeight: "100vh" }}>
      <EditorialMasthead />
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px 64px", lineHeight: 1.75 }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px" }}>
          Условия использования / Terms of Use
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "28px" }}>
          GOLASON.COM • Редакционный регламент и правила цитирования
        </p>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>1. Назначение портала (Editorial Scope)</h2>
          <p>
            GOLASON.COM — информационно-аналитическое издание о европейском и мировом футболе (Лига чемпионов УЕФА, АПЛ, Ла Лига, Серия А, Бундеслига, Лига 1). Все материалы носят исключительно журналистский, статистический и справочный характер и не являются призывом к заключению пари.
          </p>
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>2. Цитирование материалов (Citation Policy)</h2>
          <p>
            При цитировании аналитических статей, статистических сводок и переводов GOLASON.COM обязательна прямая индексируемая гиперссылка на страницу первоисточника на <code>https://golason.com</code>.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>3. Обратная связь (Editorial Inquiries)</h2>
          <p>
            Email редакции:{" "}
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
