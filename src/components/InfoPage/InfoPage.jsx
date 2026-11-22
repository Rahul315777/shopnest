import Breadcrumb from "../Breadcrumb/Breadcrumb.jsx";

export default function InfoPage({ title, intro, children }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumb items={[{ label: title }]} />
      <h1 className="text-3xl font-bold">{title}</h1>
      {intro && <p className="mt-2 text-slate-500">{intro}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}
