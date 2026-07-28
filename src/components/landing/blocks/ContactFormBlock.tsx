"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import * as z from "zod";
import { GenericForm, FieldConfig } from "../layout/generic-form";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ContactFormBlock as ContactFormBlockType } from "@/payload-types";
import { SectionReveal } from "@/components/ui/section-reveal";

type FormShape = Record<string, string>;

/**
 * ContactFormBlock Component - Renders dynamic contact/lead generation forms
 * configured from Payload CMS using TanStack Form & Zod.
 */
export const ContactFormBlock: React.FC<ContactFormBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  formBackgroundImage,
  formForegroundImage,
  formFields,
  formSubmitButtonText,
  backgroundImage,
  textureWavesImage,
}) => {
  const formBgImageUrl = getMediaUrl(formBackgroundImage);
  const formBgImageAlt = getMediaAlt(formBackgroundImage, "Background Image");
  const formFgImageUrl = getMediaUrl(formForegroundImage);
  const formFgImageAlt = getMediaAlt(formForegroundImage, "Foreground Image");
  const textureWavesImageUrl = getMediaUrl(textureWavesImage);
  const textureWavesImageAlt = getMediaAlt(textureWavesImage, "Texture Waves Image");
  const backgroundImageUrl = getMediaUrl(backgroundImage);
  const backgroundAlt = getMediaAlt(backgroundImage, "Background Image");

  // Transform Payload formFields to GenericForm field configs & generate dynamic Zod schema & default values
  const { fields, schema, defaultValues } = useMemo(() => {
    const fieldConfigs: FieldConfig<FormShape>[] = [];
    const schemaShape: Record<string, z.ZodString | z.ZodEmail> = {};
    const defaults: FormShape = {};

    if (formFields && Array.isArray(formFields)) {
      formFields.forEach((field) => {
        if (!field.name) return;

        fieldConfigs.push({
          name: field.name,
          label: field.label || field.name,
          type: field.type || "text",
          placeholder: field.placeholder || undefined,
          description: field.description || undefined,
        });

        defaults[field.name] = "";

        if (field.type === "email") {
          schemaShape[field.name] = z.email("Please enter a valid email address");
        } else {
          schemaShape[field.name] = z.string().min(1, `${field.label || field.name} is required`);
        }
      });
    }

    return {
      fields: fieldConfigs,
      schema: z.object(schemaShape),
      defaultValues: defaults,
    };
  }, [formFields]);

  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleSubmit = async (values: FormShape) => {
    setFormError(null);
    setFormSuccess(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form. Please try again.");
      }

      setFormSuccess(data.message || "Thank you! Your message has been sent successfully.");
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen pt-10 lg:py-18 lg:px-14" id="contact">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <Image src={backgroundImageUrl ?? ""} alt={backgroundAlt} fill className="object-cover" />
      </div>
      {/* Texture Waves */}
      <div className="absolute top-0 inset-e-0 w-51.5 h-37.5 lg:w-145.5 lg:h-105.75 pointer-events-none">
        <Image
          src={textureWavesImageUrl ?? ""}
          alt={textureWavesImageAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-8 lg:gap-18">
        {/* Heading */}
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col items-start gap-4 max-lg:px-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              {eyebrow && (
                <span className="font-poppins text-sm leading-[130%] uppercase text-primary-500 lg:text-base">
                  {eyebrow}
                </span>
              )}
              <h2 className="font-montserrat font-semibold text-xl leading-[130%] uppercase text-foreground md:text-3xl lg:text-5xl lg:max-w-2xl">
                <span>{titleBeforeHighlight}</span>
                {highlightedTitle && <span className="text-primary-500"> {highlightedTitle}</span>}
                {titleAfterHighlight && <span> {titleAfterHighlight}</span>}
              </h2>
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 lg:max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>
        <SectionReveal direction="up" delay={0.2} className="w-full">
          <div className="relative w-full h-full px-4 py-6 bg-black/50 cta-background lg:rounded-[1.5rem] lg:p-10 overflow-hidden">
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Image
                src={formBgImageUrl ?? ""}
                alt={formBgImageAlt}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/30" />

            <div className="rounded-[1.5rem] border border-outline/30 bg-black/30 flex flex-col lg:flex-row-reverse lg:px-10 lg:py-12 lg:rounded-[2.5rem] lg:gap-12 lg:bg-black/70 cta-foreground overflow-hidden">
              <div className="w-full lg:w-[55%] h-47.5 lg:h-auto lg:rounded-[1.5rem] relative overflow-hidden">
                <Image
                  src={formFgImageUrl ?? ""}
                  alt={formFgImageAlt}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 max-lg:p-6 max-lg:bg-black/50">
                <GenericForm
                  title=""
                  schema={schema}
                  defaultValues={defaultValues}
                  fields={fields}
                  onSubmit={handleSubmit}
                  submitText={formSubmitButtonText || "Submit"}
                  error={formError}
                  success={formSuccess}
                  className="space-y-5"
                  theme="dark"
                />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

