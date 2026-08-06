"use client";

import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Field as UIField,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CustomPhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DeepValue, FormValidateOrFn, Updater, useForm } from "@tanstack/react-form";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import "react-international-phone/style.css";
import * as z from "zod";
import { $ZodTypeInternals } from "zod/v4/core";

/**
 * Configuration for a single form field.
 *
 * @template T - The type of the form data.
 */
export type FieldConfig<T> = {
  /** The key in the form data object that this field corresponds to */
  name: Extract<keyof T, string>;
  /** The display label for the field */
  label: string;
  /** The input type (default: "text") */
  type?: "text" | "textarea" | "email" | "password" | "phone" | "tel";
  /** Optional placeholder text for the input */
  placeholder?: string;
  /** Optional descriptive text displayed below the field */
  description?: string;
};

/**
 * Props for the GenericForm component.
 *
 * @template T - The type of the form data.
 */
interface GenericFormProps<T> {
  /** Optional title of the form */
  title?: string;
  /** Optional description for the form */
  description?: string;
  /** The Zod validation schema for the form */
  schema: z.ZodType<T, unknown, $ZodTypeInternals<T, unknown>>;
  /** Initial values for the form fields */
  defaultValues: T;
  /** Callback function triggered on valid form submission */
  onSubmit: (values: T) => Promise<void> | void;
  /** Array of field configurations */
  fields: FieldConfig<T>[];
  /** Optional custom text for the submit button (default: "Submit") */
  submitText?: string;
  /** Optional global error message to display in the form */
  error?: string | null;
  /** Optional global success message to display in the form */
  success?: string | null;
  /** Optional callback function to reset the form */
  onReset?: () => void;
  /** Optional theme configuration (default: "light") */
  theme?: "dark" | "light";
  /** Optional class names for the form */
  className?: string;
}

/**
 * A highly reusable, type-safe generic form component built on TanStack Form and Zod.
 *
 * @template T - The type of the form data, typically a Zod schema inference.
 *
 * @param {GenericFormProps<T>} props - The component props.
 * @param {z.ZodType<T>} props.schema - The Zod validation schema for the form.
 * @param {T} props.defaultValues - The initial values for the form fields.
 * @param {(values: T) => void | Promise<void>} props.onSubmit - Callback function triggered on valid form submission.
 * @param {FieldConfig<T>[]} props.fields - Array of field configurations defining labels, names, and input types.
 * @param {string} [props.submitText="Submit"] - Optional custom text for the submit button.
 * @param {string} [props.error] - Optional global error message to display in the form.
 * @param {() => void} [props.onReset] - Optional callback function to reset the form.
 * @param {boolean} [props.isDark=false] - Optional flag to indicate if the form should use dark mode styles.
 *
 * @example
 * ```tsx
 * const schema = z.object({ email: z.string().email() });
 * <GenericForm
 *   schema={schema}
 *   defaultValues={{ email: "" }}
 *   fields={[{ name: "email", label: "Email Address", type: "email" }]}
 *   onSubmit={(values) => console.log(values)}
 * />
 * ```
 */

export function GenericForm<T>({
  title,
  schema,
  defaultValues,
  onSubmit,
  fields,
  submitText = "Submit",
  error,
  success,
  onReset,
  theme = "light",
  className,
}: GenericFormProps<T>) {
  const form = useForm({
    defaultValues,
    validators: {
      onBlur: schema as FormValidateOrFn<T>,
      onChange: schema as FormValidateOrFn<T>,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value as T);
      form.reset();
    },
  });

  const locale = useLocale();
  const isArabic = locale === "ar";

  const isDark = theme === "dark";
  const inputClassName = isDark
    ? "bg-transparent border-outline/30 input-blur text-white placeholder:text-white/30 focus-visible:border-white/50 focus-visible:ring-white/20 rounded-[0.75rem] h-16"
    : "bg-black/2 border-black/10 text-black placeholder:text-black/30 focus-visible:border-blue/50 focus-visible:ring-blue/20";

  const labelClassName = isDark ? "text-white" : "text-black/70";
  const descriptionClassName = isDark ? "text-white/50" : "text-black/50";

  return (
    <form
      id="generic-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("space-y-6", className)}
      title={title}
    >
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive animate-in fade-in slide-in-from-top-1">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400 animate-in fade-in slide-in-from-top-1">
          <p className="font-medium">{success}</p>
        </div>
      )}

      <FieldGroup className="">
        {fields.map((fieldConfig, idx) => (
          <form.Field key={fieldConfig.name} name={fieldConfig.name}>
            {(field) => {
              const isInvalid =
                (field.state.meta.isTouched || field.state.meta.isBlurred) &&
                !field.state.meta.isValid;
              // Higher z-index for earlier fields so dropdowns render above subsequent fields
              const fieldZIndex = fields.length - idx;

              return (
                <UIField
                  data-invalid={isInvalid}
                  style={{ zIndex: fieldZIndex }}
                  className="relative"
                >
                  <div className="relative flex flex-col justify-center">
                    {fieldConfig.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={(field.state.value as string) ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as Updater<DeepValue<T, Extract<keyof T, string>>>,
                          )
                        }
                        placeholder={fieldConfig.placeholder || " "}
                        className={cn("peer min-h-28 pt-6 pb-2 px-4 resize-none", inputClassName)}
                        aria-invalid={isInvalid}
                      />
                    ) : fieldConfig.type === "phone" || fieldConfig.type === "tel" ? (
                      <div
                        className={cn(
                          "peer flex items-center h-16 rounded-[0.75rem]",
                          inputClassName,
                        )}
                      >
                        <CustomPhoneInput
                          id={field.name}
                          name={field.name}
                          value={(field.state.value as string) ?? ""}
                          onBlur={field.handleBlur}
                          onChange={(phoneVal) =>
                            field.handleChange(
                              phoneVal as Updater<DeepValue<T, Extract<keyof T, string>>>,
                            )
                          }
                          placeholder={fieldConfig.placeholder || " "}
                          isDark={isDark}
                          isInvalid={isInvalid}
                          className="pt-5 pb-1 pe-4 text-sm font-medium"
                        />
                      </div>
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={fieldConfig.type || "text"}
                        value={(field.state.value as string) ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as Updater<DeepValue<T, Extract<keyof T, string>>>,
                          )
                        }
                        placeholder={fieldConfig.placeholder || " "}
                        className={cn("peer pt-5 pb-1 px-4 h-16", inputClassName)}
                        aria-invalid={isInvalid}
                      />
                    )}
                    <FieldLabel
                      htmlFor={field.name}
                      className={cn(
                        "absolute inset-s-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ease-in-out origin-left rtl:origin-right",
                        "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs",
                        "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
                        fieldConfig.type === "textarea" && "peer-placeholder-shown:top-5",
                        labelClassName,
                      )}
                    >
                      {fieldConfig.label}
                    </FieldLabel>
                  </div>

                  {fieldConfig.description && (
                    <FieldDescription className={descriptionClassName}>
                      {fieldConfig.description}
                    </FieldDescription>
                  )}

                  {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                </UIField>
              );
            }}
          </form.Field>
        ))}
      </FieldGroup>
      <UIField
        orientation="horizontal"
        className="w-full justify-between max-md:flex-col max-md:*:w-full"
      >
        {onReset ? (
          <Button
            type="button"
            size="lg"
            variant={"outline"}
            onClick={() => {
              form.reset();
              onReset?.();
            }}
          >
            Reset
          </Button>
        ) : (
          <div></div>
        )}

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              form="generic-form"
              disabled={!canSubmit || isSubmitting}
              size="lg"
              variant={"default"}
              className="rounded-full p-3 gap-1.5 items-center h-auto cursor-pointer lg:px-4 lg:py-3.25 lg:gap-2"
            >
              <span className="font-montserrat font-medium text-base text-white">
                {isSubmitting ? (isArabic ? "جاري الإرسال..." : "Submitting...") : submitText}
              </span>
              <span className="w-6 h-6 lg:w-7.5 lg:h-7.5 flex items-center justify-center bg-white rounded-full">
                <ArrowRight className="text-primary-500 w-4.5 h-4.5 lg:w-5.5 lg:h-5.5 -rotate-30 rtl:-rotate-150" />
              </span>
            </Button>
          )}
        </form.Subscribe>
      </UIField>
    </form>
  );
}
