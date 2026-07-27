"use client";

import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubscribeToNewsletterBlock as SubscribeToNewsletterBlockType } from "@/payload-types";
import Image from "next/image";
import React, { useState } from "react";

/**
 * SubscribeToNewsletterBlock Component - Displays newsletter subscription section
 * configured from Payload CMS.
 */
export const SubscribeToNewsletterBlock: React.FC<SubscribeToNewsletterBlockType> = ({
  title,
  description,
  emailInputPlaceholder,
  submitButtonText,
  backgroundImage,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "Newsletter Background");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setStatus("success");
      setMessage(data.message || "Thank you for subscribing!");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  return (
    <section className="relative overflow-hidden ">
      <div className="w-full relative py-10 px-4 flex flex-col lg:flex-row lg:justify-between gap-8 lg:py-22.5 lg:px-14">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src={bgImageUrl ?? ""}
            alt={bgImageAlt ?? ""}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/50"></div>
        <div className="flex flex-col gap-3 relative">
          <h4 className="font-display font-bold text-xl text-white lg:text-3xl">{title}</h4>
          <p className="font-poppins text-sm text-gray-60 lg:text-[0.9375rem] leading-[130%] lg:max-w-150">
            {description}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-row relative max-lg:pb-12">
          <div className="relative h-full max-w-62 lg:min-w-123">
            <input
              type="email"
              placeholder={emailInputPlaceholder ?? "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-l-[1rem] lg:rounded-l-[1.25rem] border-t border-b border-l py-5 pe-6 ps-4 bg-black/30 border-outline/30 lg:py-5 lg:px-6 max-w-62 lg:min-w-123 h-full placeholder:text-white/70 text-white"
              required
            />
            {message && (
              <p className="text-white absolute left-4 lg:left-6 -bottom-16 lg:-bottom-10">
                {message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="cursor-pointer rounded-r-[1rem] lg:rounded-r-[1.25rem] max-lg:p-3 bg-primary-500 text-white font-display font-medium text-sm leading-[130%] lg:py-3 lg:px-6 lg:font-bold lg:text-lg border-none outline-none"
          >
            {status === "loading" ? "Subscribing..." : submitButtonText}
          </button>
        </form>
      </div>
    </section>
  );
};
