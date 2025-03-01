"use client"

export default function TabsTrigger({ children, className }: { children: React.ReactNode, className: string }) {
  return (
    <div className={`tabs-trigger ${className}`}>
      {children}
    </div>
  )
}
