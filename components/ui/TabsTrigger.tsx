"use client"

export default function TabsTrigger({ children, value, className }: { children: React.ReactNode, value: string, className: string }) {
  return (
    <div className={`tabs-trigger ${className}`} value={value}>
      {children}
    </div>
  )
}