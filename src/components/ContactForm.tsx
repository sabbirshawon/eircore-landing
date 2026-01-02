"use client";

import { useState, useRef } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function clearMessageTimeout() {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    clearMessageTimeout();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSuccess(true);
      form.reset();

      // ✅ Auto-hide success after 3s
      messageTimeoutRef.current = setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch {
      setError("Something went wrong. Please try again.");

      // ✅ Auto-hide error after 4s
      messageTimeoutRef.current = setTimeout(() => {
        setError(null);
      }, 4000);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Full Name */}
        <div className="form-group">
          <input
            type="text"
            name="name"
            required
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Full Name</label>
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            name="email"
            required
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Email Address</label>
        </div>

        {/* Phone */}
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            required
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Phone Number</label>
        </div>

        {/* Message */}
        <div className="form-group">
          <textarea
            name="message"
            rows={3}
            placeholder=" "
            className="form-input"
          />
          <label className="form-label">Message / Notes</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Sending..." : "Submit"}
        </button>

        {/* Status Messages */}
        {success && (
          <p className="text-center text-sm text-green-600">
            Message sent successfully.
          </p>
        )}

        {error && (
          <p className="text-center text-sm text-red-600">
            {error}
          </p>
        )}

      </form>
    </div>
  );
}
