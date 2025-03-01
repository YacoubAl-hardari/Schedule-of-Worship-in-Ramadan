"use client"

export default function TabsContent({ children, className }: { children: React.ReactNode, className: string }) {
  return (
    <div className={`tabs-content ${className}`}>
      {children}
    </div>
  )
}
