'use client'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { BlokVerificationSchema } from '@/schema/blok-verificaiton'
import PhoneInputWrapper from '../shared/phone-input-wrapper'
import { useState, useTransition } from 'react'
import { blokVerificationAction } from '@/actions/user-action'
import { Loader2Icon } from 'lucide-react'

interface BlokVerificationDialogFormProps {
  userId: string
  open: boolean
  redirectTo?: string
}
export const BlokVerificationDialogForm = (
  props: BlokVerificationDialogFormProps
) => {
  const [open, setOpen] = useState(props.open)
  const [loading, startTransition] = useTransition()
  const blokVerificationForm = useForm<z.infer<typeof BlokVerificationSchema>>({
    resolver: zodResolver(BlokVerificationSchema),
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = blokVerificationForm
  const onHandleSubmit = async (
    data: z.infer<typeof BlokVerificationSchema>
  ) => {
    console.log({ data })
    startTransition(async () => {
      const response = await blokVerificationAction(
        props.userId,
        data.companyName,
        data.phone
      )
      if (response.error) {
        setError('phone', { message: 'Something went please try again later' })
      }
      setOpen(false)
    })
    window.location.reload()
  }
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Blok Verification</DialogTitle>
          <DialogDescription>
            Please enter your company name to verify your blok.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...blokVerificationForm}>
          <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-5">
            <Input
              placeholder="enter company name"
              {...register('companyName')}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">
                {errors.companyName.message}
              </p>
            )}
            <PhoneInputWrapper
              fieldName="phone"
              label="Phone Number"
              placeHolder="Enter phone number"
            />
            <DialogFooter>
              <Button type="submit" disabled={!isValid} className="w-full">
                Submit
                {loading && (
                  <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
