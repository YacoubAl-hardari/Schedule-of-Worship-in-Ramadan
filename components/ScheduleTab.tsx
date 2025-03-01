"use client"

import { useState } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ScheduleTab() {
  const [isWorkDay, setIsWorkDay] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const workSchedule = [
    { time: "4:00 AM - 5:00 AM 🌅 قبل الفجر", activities: ["قيام الليل", "قراءة 4 صفحات", "سحور صحي", "صلاة الوتر"] },
    { time: "5:00 AM - 6:00 AM 🌄 بعد الفجر", activities: ["صلاة الفجر", "أذكار الصباح", "قراءة 4 صفحات", "راحة"] },
    {
      time: "8:00 AM - 4:00 PM 🕗 أثناء العمل",
      activities: ["قراءة 4 صفحات في الاستراحات", "صلاة الظهر والعصر", "الدعاء والاستغفار"],
    },
    { time: "4:00 PM - 6:00 PM 🏡 بعد الدوام", activities: ["قيلولة قصيرة", "قراءة 5 صفحات"] },
    { time: "6:30 PM - 7:00 PM 🌇 قبل المغرب", activities: ["الدعاء قبل الفطور", "تحضير الفطور"] },
    { time: "7:00 PM - 8:00 PM 🌙 بعد الإفطار والمغرب", activities: ["صلاة المغرب", "قراءة 5 صفحات", "راحة"] },
    { time: "8:30 PM - 10:00 PM 🕌 بعد العشاء والتراويح", activities: ["صلاة العشاء والتراويح", "قراءة 4 صفحات"] },
    { time: "10:30 PM - 11:00 PM 📖 قبل النوم", activities: ["إكمال الورد اليومي", "أذكار النوم"] },
  ]

  const weekendSchedule = [
    { time: "4:00 AM - 5:30 AM 🌅 قبل الفجر", activities: ["قيام الليل", "قراءة 6 صفحات", "سحور صحي"] },
    { time: "5:30 AM - 6:30 AM 🌄 بعد الفجر", activities: ["صلاة الفجر", "أذكار الصباح", "قراءة 6 صفحات"] },
    { time: "7:00 AM - 11:00 AM ☀️ الصباح الحر", activities: ["راحة", "قراءة 6 صفحات"] },
    { time: "11:00 AM - 1:00 PM ☀️ منتصف النهار", activities: ["صلاة الظهر", "قراءة 6 صفحات"] },
    { time: "1:00 PM - 4:00 PM ⏳ بعد الظهر", activities: ["قيلولة قصيرة", "قراءة 6 صفحات"] },
    { time: "4:00 PM - 6:00 PM 📖 العصر", activities: ["صلاة العصر", "جلسة ذكر", "قراءة 5 صفحات"] },
    { time: "6:30 PM - 7:00 PM 🌇 قبل المغرب", activities: ["الدعاء قبل الفطور", "تحضير الفطور"] },
    { time: "7:00 PM - 8:00 PM 🌙 بعد الإفطار والمغرب", activities: ["صلاة المغرب", "راحة"] },
    { time: "8:30 PM - 10:00 PM 🕌 بعد العشاء والتراويح", activities: ["صلاة العشاء والتراويح", "قراءة 6 صفحات"] },
    { time: "10:30 PM - 11:30 PM 🌙 قبل النوم", activities: ["أذكار النوم", "النوم مبكرًا"] },
  ]

  const toggleItem = (index: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <Button onClick={() => setIsWorkDay(!isWorkDay)} variant="outline" className="flex items-center gap-2">
          {isWorkDay ? (
            <>
              <Sun className="h-4 w-4" />
              <span>عرض جدول العطلة</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              <span>عرض جدول العمل</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-4">
        {(isWorkDay ? workSchedule : weekendSchedule).map((item, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <CardHeader
              className="cursor-pointer p-4 flex flex-row items-center justify-between"
              onClick={() => toggleItem(`${index}`)}
            >
              <CardTitle className="text-base md:text-lg">{item.time}</CardTitle>
              {expandedItems[`${index}`] ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </CardHeader>
            {expandedItems[`${index}`] && (
              <CardContent className="p-4 pt-0 bg-muted/30">
                <ul className="list-disc list-inside space-y-1">
                  {item.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="text-sm md:text-base">
                      {activity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}