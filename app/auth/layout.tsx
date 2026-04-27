const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-600 to-slate-900">
      {children}
    </div>
  )
}

export default AuthLayout
