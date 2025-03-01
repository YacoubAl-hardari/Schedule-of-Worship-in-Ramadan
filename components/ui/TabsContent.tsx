"use client"

export default function TabsContent({ children, value, className }: { children: React.ReactNode, value: string, className: string }) {
  return (
    <div className={`tabs-content ${className}`} value={value}>
      {children}
    </div>
  )
}