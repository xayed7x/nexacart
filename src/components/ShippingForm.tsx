// src/components/ShippingForm.tsx
"use client";

// The FormField helper component remains the same.
const FormField = ({ name, label, register, error, ...props }: any) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-charcoal dark:text-soft-grey"
    >
      {label}
    </label>
    <div className="mt-1">
      <input
        id={name}
        {...register(name)}
        {...props}
        className="block w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-charcoal focus:border-mocha-mousse focus:ring-mocha-mousse sm:text-sm p-2 disabled:bg-soft-grey/20"
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
  </div>
);

// 1. The component now accepts an `isDisabled` prop.
export default function ShippingForm({
  register,
  errors,
  isDisabled,
}: {
  register: any;
  errors: any;
  isDisabled: boolean;
}) {
  return (
    // 2. We wrap the entire form content in a <fieldset> element.
    //    Disabling the fieldset automatically disables all input fields within it.
    <fieldset disabled={isDisabled} className="space-y-4">
      <FormField
        name="email"
        label="Email Address"
        type="email"
        register={register}
        error={errors.email}
      />

      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        <FormField
          name="firstName"
          label="First Name"
          type="text"
          register={register}
          error={errors.firstName}
        />
        <FormField
          name="lastName"
          label="Last Name"
          type="text"
          register={register}
          error={errors.lastName}
        />
      </div>

      <FormField
        name="address"
        label="Address"
        type="text"
        register={register}
        error={errors.address}
      />

      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
        <FormField
          name="city"
          label="City"
          type="text"
          register={register}
          error={errors.city}
        />
        <FormField
          name="postalCode"
          label="Postal Code"
          type="text"
          register={register}
          error={errors.postalCode}
        />
        <FormField
          name="country"
          label="Country"
          type="text"
          register={register}
          error={errors.country}
        />
      </div>
    </fieldset>
  );
}
