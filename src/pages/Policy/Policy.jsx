import InfoPage from "../../components/InfoPage/InfoPage.jsx";
import { policies } from "../../data/policies.js";

export default function Policy({ slug }) {
  const policy = policies[slug];

  return (
    <InfoPage title={policy.title} intro="Last updated: November 2026">
      <div className="space-y-6">
        {policy.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-semibold">{s.h}</h2>
            <p className="mt-1 text-slate-600">{s.p}</p>
          </section>
        ))}
      </div>
    </InfoPage>
  );
}
