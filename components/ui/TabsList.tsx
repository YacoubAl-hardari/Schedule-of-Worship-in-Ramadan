"use client"

export default function TabsList({ children, className }: { children: React.ReactNode, className: string }) {
  return (
    <div className={`tabs-list ${className}`}>
      {children}
    </div>
  )
}