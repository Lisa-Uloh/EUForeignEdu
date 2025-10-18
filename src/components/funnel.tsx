import React, { useState } from "react";
// ❌ Remove Firestore imports
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Env (Vite)
const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/edidiong-uloh/30min";
const SHEET_WEBHOOK = import.meta.env.VITE_SHEET_WEBHOOK as string; // <-- NEW
const GUIDE_URL = "/study_abroad_guide.pdf"; // file in /public
const HERO_VIDEO_URL = import.meta.env.VITE_HERO_VIDEO_URL;
const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL || "/";

/** -------------------- Lead Magnet -------------------- */
const LeadMagnet: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "" }); // website = honeypot
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);           // <-- boolean now
  const [error, setError] = useState<string | null>(null);

    // NEW: modal state
  const [showModal, setShowModal] = useState(false);

  // Show the modal a moment after success (unless user previously hid it)
  React.useEffect(() => {
    if (success && localStorage.getItem("guide_popup_dismissed") !== "1") {
      const t = setTimeout(() => setShowModal(true), 1200);
      return () => clearTimeout(t);
    }
  }, [success]);

  React.useEffect(() => {
  const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowModal(false);
  if (showModal) window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [showModal]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(false);
    try {
      if (form.website) return; // honeypot: bots only
      if (!form.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
        throw new Error("Enter your name and a valid email.");
      }

      // ✅ Send to Google Sheets (Apps Script Web App)
      const res = await fetch(SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "text/plain" }, // avoids CORS preflight
        body: JSON.stringify({
          name: form.name,
          email: form.email.toLowerCase(),
          phone: form.phone || "",
          source: "homepage-funnel",
          tag: "Free Guide: 10 Steps to Study Abroad (2025)",
          ua: navigator.userAgent,
        }),
      });

      // If the script returns JSON, check it (opaque responses are ok)
      if (!res.ok) {
        try {
          const j = await res.json();
          if (!j.ok) throw new Error(j.error || "Failed to save lead");
        } catch { /* ignore parse for opaque */ }
      }

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", website: "" });
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
    // Helpers for modal buttons
  const closeModal = (remember = false) => {
    if (remember) localStorage.setItem("guide_popup_dismissed", "1");
    setShowModal(false);
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Free Download
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Free Guide: <span className="text-indigo-600">10 Steps to Study Abroad</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Choose the right country & university, prepare winning applications,
              find scholarships, and nail your student visa — all in one guide.
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Country comparison + intake timelines</li>
              <li>• Scholarship checklist & links</li>
              <li>• Visa documentation cheat sheet</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
           <form onSubmit={onSubmit} className="space-y-4">
              {/* Honeypot field (hidden) */}
              <input type="text" name="website" value={form.website} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  required name="name" value={form.name} onChange={onChange}
                  placeholder="e.g., Andino Inyang"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none ring-indigo-200 focus:ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  required type="email" name="email" value={form.email} onChange={onChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none ring-indigo-200 focus:ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">WhatsApp (Optional)</label>
                <input
                  name="phone" value={form.phone} onChange={onChange}
                  placeholder="+234 801 234 5678"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none ring-indigo-200 focus:ring"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending…" : "Get the Free Guide"}
              </button>

              {success && (
                <p className="text-sm font-medium text-green-700">
                  Success! Check your email for the guide.{" "}
                  <a className="underline" href={GUIDE_URL} download onClick={() => setTimeout(() => setShowModal(true), 300)}>
                    Download PDF
                  </a>
                </p>
              )}
              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <p className="pt-2 text-center text-xs text-gray-500">
                By submitting you agree to receive helpful emails about study abroad. Unsubscribe anytime.
              </p>
            </form>
          </div>
          
        </div>
      </div>
        {/* --- POPUP MODAL --- */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog" aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Guide is downloading 🎉
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Want to continue on our website to explore programs, scholarships, and next intake deadlines?
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={MAIN_SITE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700"
              >
                Visit the Website
              </a>
              <button
                onClick={() => closeModal(false)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-800 hover:bg-gray-50"
              >
                Not now
              </button>
            </div>

            <button
              onClick={() => closeModal(true)}
              className="mt-3 w-full text-center text-xs text-gray-500 underline"
            >
              Don’t show this again
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

/** -------------------- Hero -------------------- */
const Hero: React.FC = () => (
  <header className="relative w-full overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
    <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
      {/* Logo left */}
      <img src="/src/assets/2.png" alt="EUFES Logo" className="h-10 w-auto" />
      {/* Optional CTA top-right */}
      <a
        href={CALENDLY_URL}
        className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
      >
        Book Now
      </a>
    </div>
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Study Abroad Made Simple —
          <span className="block text-indigo-600">3,000+ Success Stories Since 2007</span>
        </h1>
        <p className="mt-4 max-w-xl text-gray-700">
          Expert counseling for UK, US, Canada, Dubai & more. Start with a free consultation,
          or download the free guide to get started.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={CALENDLY_URL} target="_blank" rel="noreferrer"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow hover:bg-indigo-700"
          >
            Book Free Consultation
          </a>
          <a
            href="#lead-magnet"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
          >
            Download Free Guide
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-600">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm">✓ Visa & Admission Guidance</span>
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm">✓ IELTS/SAT Support</span>
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 shadow-sm">✓ Scholarships & Deadlines</span>
        </div>
      </div>
      <div className="order-first md:order-last">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="flex h-full w-full items-center justify-center text-gray-400">
        
          <video
            className="h-full w-full object-cover rounded-2xl"
            src={HERO_VIDEO_URL}
            controls
            playsInline
            preload="metadata"
            poster="/hero-thumbnail.jpg" // Optional: a preview image from /public folder
          />

          </div>
        </div>
      </div>
    </div>

    <div className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-6 text-xs text-gray-600">
        <span>Trusted by students heading to</span>
        <span className="font-semibold">UK</span>
        <span className="font-semibold">US</span>
        <span className="font-semibold">Canada</span>
        <span className="font-semibold">Dubai</span>
        <span className="font-semibold">Mauritius</span>
      </div>
    </div>
  </header>
);

/** -------------------- Social Proof -------------------- */
const SocialProof: React.FC = () => {
  const items = [
    { quote: "EUFES guided me step-by-step — I’m now at Middlesex University, Dubai.", name: "Andino I." },
    { quote: "Visa approved on first attempt. The team was amazing and responsive!", name: "Sarah O." },
    { quote: "From school selection to scholarships, everything was simplified.", name: "Michael A." },
  ];
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h3 className="text-center text-2xl font-bold md:text-3xl">Real Students. Real Results.</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <p className="text-gray-700">“{t.quote}”</p>
              <p className="mt-3 text-sm font-semibold text-gray-900">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** -------------------- Services -------------------- */
const Services: React.FC = () => {
  const items = [
    { title: "Counseling", desc: "Personalized program & country matching." },
    { title: "Admissions", desc: "Application strategy & documentation review." },
    { title: "Visa Support", desc: "Guidance to maximize approval odds." },
    { title: "Test Prep", desc: "IELTS, SAT, GRE — targeted coaching." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h3 className="text-center text-2xl font-bold md:text-3xl">What We Do</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {items.map((s, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900">{s.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** -------------------- CTA Banner -------------------- */
const ConsultationCTA: React.FC = () => (
  <section className="relative w-full bg-indigo-600">
    <div className="mx-auto max-w-6xl px-4 py-10 text-center text-white md:py-12">
      <h2 className="text-2xl font-bold md:text-3xl">Next Intake Deadline is Approaching — Don’t Miss Out</h2>
      <p className="mx-auto mt-2 max-w-2xl text-indigo-100">
        Book a free 15-minute consultation. We’ll assess your eligibility and map your best options.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={CALENDLY_URL} target="_blank" rel="noreferrer"
          className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow hover:bg-indigo-50"
        >
          Book Free Consultation
        </a>
        <a
          href="https://wa.me/" target="_blank" rel="noreferrer"
          className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          Quick Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>
);

/** -------------------- Page Wrapper -------------------- */
const HomepageFunnel: React.FC = () => (
  <div className="min-h-screen bg-white">
    <main>
      <Hero />
      <div id="lead-magnet">
        <LeadMagnet />
      </div>
      <SocialProof />
      <Services />
      <ConsultationCTA />
    </main>
  </div>
);

export default HomepageFunnel;
