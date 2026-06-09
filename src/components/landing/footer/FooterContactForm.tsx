"use client";

import { useState } from "react";

export function FooterContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setMessage("");
  };

  const fieldClass =
    "w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-[14px] text-white outline-none transition-colors placeholder:text-[#6b7280] focus:border-[#3a3a3a]";

  return (
    <div className="w-full lg:max-w-[360px] lg:justify-self-end">
      <h3 className="text-[18px] font-semibold text-white">Get in Touch</h3>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className={fieldClass}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
          rows={5}
          className={`${fieldClass} resize-none`}
        />
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="rounded-lg bg-[#f05a45] px-8 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#e04f3c]"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
