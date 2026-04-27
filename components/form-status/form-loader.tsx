import { MoonLoader } from 'react-spinners'

interface FormErrorProps {
  message?: string
}

export const FormLoad = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <div className="flex items-center gap-x-2 rounded-md p-3 text-sm">
      <MoonLoader color="#000000" size={20} />
      <p>{message}</p>
    </div>
  )
}
