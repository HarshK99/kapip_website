"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { getServices } from "@/data/services";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  getSectionReveal,
  getStaggerContainer,
  sectionRevealViewport,
  useSafeReducedMotion,
} from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) errors.email = "Please share an email address.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "That email address doesn't look right.";
  if (!values.service) errors.service = "Let us know which service you're interested in.";
  if (!values.message.trim()) errors.message = "Tell us a little about what you need.";
  return errors;
}

function inputClasses(hasError: boolean) {
  return cn(
    "rounded-card border bg-paper px-4 py-2.5 font-body text-body text-ink placeholder:text-ink-soft outline-none transition-colors focus:border-accent",
    hasError ? "border-accent" : "border-line"
  );
}

// No separate label row — the field's title lives inside the box itself
// (placeholder), with aria-label carrying the same text as the
// accessible name once the placeholder disappears on input.
//
// Each field is a stagger child of the form (variants only, no own
// initial/whileInView) — it inherits the "visible" state from the
// motion.form and arrives in sequence. The keystroke re-renders don't
// replay it: the state label never changes once settled.
function Field({ error, children }: { error?: string; children: ReactNode }) {
  const prefersReducedMotion = useSafeReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-2"
      variants={getSectionReveal(prefersReducedMotion)}
    >
      {children}
      {error ? <span className="font-body text-small text-accent">{error}</span> : null}
    </motion.div>
  );
}

export default function ContactForm() {
  const prefersReducedMotion = useSafeReducedMotion();
  const services = getServices();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `New enquiry from ${values.name} — ${site.name}`,
          name: values.name,
          email: values.email,
          phone: values.phone || undefined,
          service: values.service,
          message: values.message,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setValues(initialValues);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 md:p-8">
        <p className="font-display text-h3 font-semibold text-ink">Message sent.</p>
        <p className="font-body text-body text-ink-soft">
          Thank you for reaching out — we&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 md:p-8"
      initial="hidden"
      whileInView="visible"
      viewport={sectionRevealViewport}
      variants={getStaggerContainer(prefersReducedMotion)}
    >
      <Field error={errors.name}>
        <input
          type="text"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          placeholder="Name"
          aria-label="Name"
          className={inputClasses(Boolean(errors.name))}
        />
      </Field>

      <Field error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          placeholder="Email"
          aria-label="Email"
          className={inputClasses(Boolean(errors.email))}
        />
      </Field>

      <Field>
        <input
          type="tel"
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          placeholder="Phone (optional)"
          aria-label="Phone (optional)"
          className={inputClasses(false)}
        />
      </Field>

      <Field error={errors.service}>
        <select
          value={values.service}
          onChange={(event) => handleChange("service", event.target.value)}
          aria-label="Service you're interested in"
          className={inputClasses(Boolean(errors.service))}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </Field>

      <Field error={errors.message}>
        <textarea
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          rows={4}
          placeholder="Message"
          aria-label="Message"
          className={inputClasses(Boolean(errors.message))}
        />
      </Field>

      {status === "error" ? (
        <p className="font-body text-small text-accent">
          Something didn&apos;t go through on our end. Please try again, or reach us directly via
          WhatsApp or email.
        </p>
      ) : null}

      {/* flex-col so the inline-flex Button still stretches full width as it
          did when it was a direct child of the form. */}
      <motion.div className="flex flex-col" variants={getSectionReveal(prefersReducedMotion)}>
        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
          className={status === "submitting" ? "cursor-not-allowed opacity-60" : undefined}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </motion.div>
    </motion.form>
  );
}
