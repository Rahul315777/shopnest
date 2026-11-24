import { useState } from "react";
import { FiMail, FiPhone, FiClock } from "react-icons/fi";
import InfoPage from "../../components/InfoPage/InfoPage.jsx";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import { useToast } from "../../context/ToastContext.jsx";

const empty = { name: "", email: "", message: "" };

export default function Contact() {
  const [, setMessages] = useLocalStorage("shopnest_messages", []);
  const { showToast } = useToast();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (form.message.trim().length < 10) return setError("Please write at least 10 characters.");
    setMessages((prev) => [{ ...form, date: new Date().toISOString() }, ...prev]);
    setForm(empty);
    setError("");
    showToast("Message sent. We will get back to you soon.");
  };

  const field = "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500";

  return (
    <InfoPage title="Contact us" intro="Questions about an order or product? Send us a message.">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 text-slate-600">
          <p className="flex items-center gap-3"><FiMail className="text-indigo-600" /> help@shopnest.example</p>
          <p className="flex items-center gap-3"><FiPhone className="text-indigo-600" /> +91 98765 43210</p>
          <p className="flex items-center gap-3"><FiClock className="text-indigo-600" /> Mon to Sat, 10am to 6pm</p>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
          <input required placeholder="Your name" value={form.name} onChange={set("name")} className={field} />
          <input required type="email" placeholder="Email" value={form.email} onChange={set("email")} className={field} />
          <textarea required rows={4} placeholder="How can we help?" value={form.message} onChange={set("message")} className={field} />
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">
            Send message
          </button>
        </form>
      </div>
    </InfoPage>
  );
}
