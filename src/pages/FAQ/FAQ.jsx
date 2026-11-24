import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import InfoPage from "../../components/InfoPage/InfoPage.jsx";
import { faqs } from "../../data/policies.js";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <InfoPage title="Frequently asked questions" intro="Quick answers to common questions.">
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="rounded-2xl border border-slate-200 bg-white">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left font-semibold"
              aria-expanded={open === i}
            >
              {f.q}
              <FiChevronDown className={`shrink-0 transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="px-4 pb-4 text-slate-600">{f.a}</p>}
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
