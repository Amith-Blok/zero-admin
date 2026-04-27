import * as RPNInput from 'react-phone-number-input'
import { CountrySelect, FlagComponent, PhoneInput } from './phone-input'
import { Label } from '../ui/label'
import { Controller, useFormContext } from 'react-hook-form'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import React from 'react'

interface PhoneInputWrapperProps {
  fieldName: string // Field name for React Hook Form
  label?: string // Optional label
  defaultCountry?: RPNInput.Country // Default country for phone input
  divClass?: string
  labelClass?: string
  divProps?: ComponentProps<'div'>
  labelProps?: ComponentProps<'label'>
  placeHolder?: string
  disabled?: boolean
}

export default function PhoneInputWrapper({
  fieldName,
  label = 'Phone number',
  defaultCountry = 'IN',
  divClass,
  labelClass,
  labelProps = {},
  divProps = {},
  placeHolder = 'Enter phone number',
  disabled = false,
}: PhoneInputWrapperProps) {
  const { control } = useFormContext() // Use FormContext to access control

  const CustomPhoneInput = React.forwardRef<
    HTMLInputElement,
    ComponentProps<'input'>
  >((props, ref) => (
    <PhoneInput {...props} placeholder={placeHolder} ref={ref} />
  ))
  CustomPhoneInput.displayName = 'CustomPhoneInput'

  return (
    <div className={cn('space-y-2', divClass)} {...divProps}>
      {label && (
        <Label className={cn('', labelClass)} {...labelProps}>
          {label}
        </Label>
      )}
      <Controller
        name={fieldName}
        control={control}
        defaultValue=""
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <>
            <RPNInput.default
              className="flex rounded-lg shadow-sm shadow-black/5"
              international
              flagComponent={FlagComponent}
              countrySelectComponent={CountrySelect}
              defaultCountry={defaultCountry}
              countryCallingCodeEditable={false}
              inputComponent={CustomPhoneInput}
              id={`input-${fieldName}`}
              value={value}
              onChange={(newValue) => onChange(newValue ?? '')}
              ref={ref}
              disabled={disabled}
            />
            {error && (
              <span className="text-sm text-red-500">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  )
}
