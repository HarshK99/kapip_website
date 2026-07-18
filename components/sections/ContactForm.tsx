"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";
import { getServices } from "@/data/services";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
    "rounded-card border bg-surface px-4 py-3 font-body text-body text-ink outline-none transition-colors focus:border-accent",
    hasError ? "border-accent" : "border-line"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </span>
      {children}
      {error ? <span className="font-body text-small text-accent">{error}</span> : null}
    </label>
  );
}

export default function ContactForm() {
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
      <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6">
        <p className="font-display text-h3 font-semibold text-ink">Message sent.</p>
        <p className="font-body text-body text-ink-soft">
          Thank you for reaching out — we&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Name" error={errors.name}>
        <input
          type="text"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className={inputClasses(Boolean(errors.name))}
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className={inputClasses(Boolean(errors.email))}
        />
      </Field>

      <Field label="Phone (optional)">
        <input
          type="tel"
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          className={inputClasses(false)}
        />
      </Field>

      <Field label="Service you're interested in" error={errors.service}>
        <select
          value={values.service}
          onChange={(event) => handleChange("service", event.target.value)}
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

      <Field label="Message" error={errors.message}>
        <textarea
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          rows={5}
          className={inputClasses(Boolean(errors.message))}
        />
      </Field>

      {status === "error" ? (
        <p className="font-body text-small text-accent">
          Something didn&apos;t go through on our end. Please try again, or reach us directly via
          WhatsApp or email.
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className={status === "submitting" ? "cursor-not-allowed opacity-60" : undefined}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
