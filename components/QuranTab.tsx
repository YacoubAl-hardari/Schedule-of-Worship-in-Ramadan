"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function QuranTab() {
  const [currentDay, setCurrentDay] = useState(1)
  const [expandedQuranDay, setExpandedQuranDay] = useState<number | null>(null)

  const quranPlan = [
    { day: 1, juz: "الجزء الأول", pages: "1-20", surahs: "الفاتحة - البقرة (آية 141)" },
    { day: 2, juz: "الجزء الثاني", pages: "21-40", surahs: "البقرة (142-252)" },
    { day: 3, juz: "الجزء الثالث", pages: "41-60", surahs: "البقرة (253) - آل عمران (92)" },
    { day: 4, juz: "الجزء الرابع", pages: "61-80", surahs: "آل عمران (93-200)" },
    { day: 5, juz: "الجزء الخامس", pages: "81-100", surahs: "النساء (1-147)" },
    { day: 6, juz: "الجزء السادس", pages: "101-120", surahs: "النساء (148) - المائدة (81)" },
    { day: 7, juz: "الجزء السابع", pages: "121-140", surahs: "المائدة (82) - الأنعام (110)" },
    { day: 8, juz: "الجزء الثامن", pages: "141-160", surahs: "الأنعام (111) - الأعراف (87)" },
    { day: 9, juz: "الجزء التاسع", pages: "161-180", surahs: "الأعراف (88-206)" },
    { day: 10, juz: "الجزء العاشر", pages: "181-200", surahs: "الأنفال - التوبة (92)" },
    { day: 11, juz: "الجزء الحادي عشر", pages: "201-220", surahs: "التوبة (93) - هود (5)" },
    { day: 12, juz: "الجزء الثاني عشر", pages: "221-240", surahs: "هود (6) - يوسف (52)" },
    { day: 13, juz: "الجزء الثالث عشر", pages: "241-260", surahs: "يوسف (53) - إبراهيم (52)" },
    { day: 14, juz: "الجزء الرابع عشر", pages: "261-280", surahs: "الحجر - النحل (128)" },
    { day: 15, juz: "الجزء الخامس عشر", pages: "281-300", surahs: "الإسراء - الكهف (74)" },
    { day: 16, juz: "الجزء السادس عشر", pages: "301-320", surahs: "الكهف (75) - طه (135)" },
    { day: 17, juz: "الجزء السابع عشر", pages: "321-340", surahs: "الأنبياء - الحج (78)" },
    { day: 18, juz: "الجزء الثامن عشر", pages: "341-360", surahs: "المؤمنون - الفرقان (20)" },
    { day: 19, juz: "الجزء التاسع عشر", pages: "361-380", surahs: "الفرقان (21) - النمل (55)" },
    { day: 20, juz: "الجزء العشرون", pages: "381-400", surahs: "النمل (56) - العنكبوت (45)" },
    { day: 21, juz: "الجزء الحادي والعشرون", pages: "401-420", surahs: "العنكبوت (46) - الأحزاب (30)" },
    { day: 22, juz: "الجزء الثاني والعشرون", pages: "421-440", surahs: "الأحزاب (31) - يس (27)" },
    { day: 23, juz: "الجزء الثالث والعشرون", pages: "441-460", surahs: "يس (28) - الزمر (31)" },
    { day: 24, juz: "الجزء الرابع والعشرون", pages: "461-480", surahs: "الزمر (32) - فصلت (46)" },
    { day: 25, juz: "الجزء الخامس والعشرون", pages: "481-500", surahs: "الشورى - الجاثية (37)" },
    { day: 26, juz: "الجزء السادس والعشرون", pages: "501-520", surahs: "الأحقاف - الذاريات (30)" },
    { day: 27, juz: "الجزء السابع والعشرون", pages: "521-540", surahs: "الذاريات (31) - الحديد (29)" },
    { day: 28, juz: "الجزء الثامن والعشرون", pages: "541-560", surahs: "المجادلة - التحريم (12)" },
    { day: 29, juz: "الجزء التاسع والعشرون", pages: "561-580", surahs: "الملك - المرسلات (50)" },
    { day: 30, juz: "الجزء الثلاثون", pages: "581-604", surahs: "النبأ - الناس" },
  ]

  const toggleQuranDay = (day: number) => {
    setExpandedQuranDay(expandedQuranDay === day ? null : day)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">جدول ختم القرآن في رمضان</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDay(currentDay > 1 ? currentDay - 1 : 1)}
            disabled={currentDay <= 1}
          >
            السابق
          </Button>
          <span className="text-sm font-medium">اليوم {currentDay}/30</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDay(currentDay < 30 ? currentDay + 1 : 30)}
            disabled={currentDay >= 30}
          >
            التالي
          </Button>
        </div>
      </div>

      <Progress value={(currentDay / 30) * 100} className="h-2 mb-4" />

      <Card className="bg-primary/5 border-primary/20 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">ورد اليوم {currentDay}</CardTitle>
          <CardDescription>
            {quranPlan[currentDay - 1].juz} | الصفحات: {quranPlan[currentDay - 1].pages}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base">{quranPlan[currentDay - 1].surahs}</p>
        </CardContent>
      </Card>

      <div className="grid gap-2">
        {quranPlan.map((day) => (
          <Card
            key={day.day}
            className={`overflow-hidden transition-all duration-200 hover:shadow-md ${day.day === currentDay ? "border-primary" : ""}`}
          >
            <CardHeader
              className="cursor-pointer p-3 flex flex-row items-center justify-between"
              onClick={() => toggleQuranDay(day.day)}
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant={day.day === currentDay ? "default" : "outline"}
                  className="h-6 w-6 flex items-center justify-center p-0"
                >
                  {day.day}
                </Badge>
                <CardTitle className="text-sm md:text-base">{day.juz}</CardTitle>
              </div>
              {expandedQuranDay === day.day ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </CardHeader>
            {expandedQuranDay === day.day && (
              <CardContent className="p-3 pt-0 bg-muted/30">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">الصفحات:</span> {day.pages}
                  </div>
                  <div>
                    <span className="font-medium">السور:</span> {day.surahs}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}