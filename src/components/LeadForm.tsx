import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null); setErr(null); setLoading(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      fullName: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(),
      phone: String(data.get("phone") || "").trim(),
      destination: String(data.get("destination") || "").trim(),
      studyLevel: String(data.get("studyLevel") || "").trim(),
      message: String(data.get("message") || "").trim(),
      source: window.location.href,
      createdAt: serverTimestamp(),
    };

    if (!payload.fullName || !payload.email.includes("@")) {
      setErr("Please provide your name and a valid email.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "leads"), payload);
      (e.target as HTMLFormElement).reset();
      setMsg("Thanks! We’ve received your details.");
    } catch (e: any) {
      setErr(e?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <input name="company" tabIndex={-1} style={{ display: "none" }} />
      <div><label>Full name</label><input name="fullName" required className="w-full border rounded p-2" /></div>
      <div><label>Email</label><input type="email" name="email" required className="w-full border rounded p-2" /></div>
      <div><label>Phone</label><input name="phone" className="w-full border rounded p-2" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label>Destination</label>
          <select name="destination" className="w-full border rounded p-2">
            <option value="">Select...</option><option>UK</option><option>US</option><option>Canada</option><option>UAE</option><option>Europe</option>
          </select>
        </div>
        <div>
          <label>Study Level</label>
          <select name="studyLevel" className="w-full border rounded p-2">
            <option value="">Select...</option><option>Foundation/Pathway</option><option>Undergraduate</option><option>Postgraduate</option>
          </select>
        </div>
      </div>
      <div><label>Message</label><textarea name="message" rows={4} className="w-full border rounded p-2" /></div>
      <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-60">
        {loading ? "Submitting..." : "Submit"}
      </button>
      {msg && <p className="text-green-700">{msg}</p>}
      {err && <p className="text-red-700">{err}</p>}
    </form>
  );
}
