"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Calendar, Book, MapPin, Clock, ChevronDown, ChevronUp, Headphones } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QuranReader } from "@/components/quran-reader"

export default function RamadanSchedule() {
  const [isWorkDay, setIsWorkDay] = useState(true)
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [currentDay, setCurrentDay] = useState(1)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [expandedAdhkar, setExpandedAdhkar] = useState<Record<string, boolean>>({})
  const [expandedQuranDay, setExpandedQuranDay] = useState<number | null>(null)
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            // Get location name from coordinates
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ar`,
            )
            const data = await response.json()
            setUserLocation(data.address.city || data.address.town || data.address.state)

            // Get prayer times based on location
            const date = new Date()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const prayerResponse = await fetch(
              `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=4`,
            )
            const prayerData = await prayerResponse.json()
            setPrayerTimes(prayerData.data[date.getDate() - 1].timings)
          } catch (error) {
            console.error("Error fetching location data:", error)
            setUserLocation("غير معروف")
          }
        },
        () => {
          setUserLocation("غير معروف")
        },
      )
    } else {
      setUserLocation("غير معروف")
    }
  }, [])

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

  const dailyAdhkar = [
    {
      title: "أذكار الصباح",
      items: [
        "سبحان الله وبحمده عدد خلقه ورضا نفسه وزنة عرشه ومداد كلماته (ثلاث مرات)",
        "اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل، وأعوذ بك من الجبن والبخل، وأعوذ بك من غلبة الدين وقهر الرجال (ثلاث مرات)",
        "أعوذ بكلمات الله التامات من شر ما خلق (ثلاث مرات)",
        "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور",
        "أصبحنا على فطرة الإسلام وكلمة الإخلاص ودين نبينا محمد صلى الله عليه وسلم وملة أبينا إبراهيم حنيفاً مسلماً وما كان من المشركين",
        "سبحان الله وبحمده (مائة مرة)",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير (مائة مرة)",
      ],
    },
    {
      title: "أذكار المساء",
      items: [
        "أعوذ بالله من الشيطان الرجيم: الله لا إله إلا هو الحي القيوم لا تأخذه سنة ولا نوم... (آية الكرسي)",
        "أعوذ بالله من الشيطان الرجيم: قل هو الله أحد... (الإخلاص والمعوذتين، ثلاث مرات)",
        "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير...",
        "اللهم ما أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر",
        "اللهم إني أمسيت أشهدك، وأشهد حملة عرشك، وملائكتك، وجميع خلقك، أنك أنت الله لا إله إلا أنت وحدك لا شريك لك، وأن محمداً عبدك ورسولك (أربع مرات)",
        "اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل، وأعوذ بك من الجبن والبخل، وأعوذ بك من غلبة الدين وقهر الرجال",
      ],
    },
  ]

  const prayerAdhkar = [
    {
      prayer: "الفجر",
      adhkar: [
        "أستغفر الله (ثلاث مرات)",
        "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجد منك الجد",
        "سبحان الله (٣٣ مرة)، الحمد لله (٣٣ مرة)، الله أكبر (٣٣ مرة)، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير (مرة واحدة)",
        "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً",
      ],
    },
    {
      prayer: "الظهر",
      adhkar: [
        "أستغفر الله (ثلاث مرات)",
        "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجد منك الجد",
        "سبحان الله (٣٣ مرة)، الحمد لله (٣٣ مرة)، الله أكبر (٣٣ مرة)، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير (مرة واحدة)",
      ],
    },
    {
      prayer: "العصر",
      adhkar: [
        "أستغفر الله (ثلاث مرات)",
        "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجد منك الجد",
        "سبحان الله (٣٣ مرة)، الحمد لله (٣٣ مرة)، الله أكبر (٣٣ مرة)، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير (مرة واحدة)",
        "اللهم إني أعوذ بك من عذاب جهنم، ومن عذاب القبر، ومن فتنة المحيا والممات، ومن شر فتنة المسيح الدجال",
      ],
    },
    {
      prayer: "المغرب",
      adhkar: [
        "أستغفر الله (ثلاث مرات)",
        "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجد منك الجد",
        "سبحان الله (٣٣ مرة)، الحمد لله (٣٣ مرة)، الله أكبر (٣٣ مرة)، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير (مرة واحدة)",
        "بسم الله الرحمن الرحيم: قل هو الله أحد... (الإخلاص والمعوذتين، ثلاث مرات)",
      ],
    },
    {
      prayer: "العشاء",
      adhkar: [
        "أستغفر الله (ثلاث مرات)",
        "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجد منك الجد",
        "سبحان الله (٣٣ مرة)، الحمد لله (٣٣ مرة)، الله أكبر (٣٣ مرة)، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير (مرة واحدة)",
      ],
    },
  ]

  // Quran reading plan for Ramadan (30 days)
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

  const toggleItem = (index: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const toggleAdhkar = (index: string) => {
    setExpandedAdhkar((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const toggleQuranDay = (day: number) => {
    setExpandedQuranDay(expandedQuranDay === day ? null : day)
  }

  const formatPrayerTime = (time: string) => {
    if (!time) return ""
    return time.replace(" (EET)", "").replace(" (EEST)", "")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950 p-4 md:p-6 lg:p-8 rtl">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">🌙 جدول العبادات في رمضان</h1>
          <p className="text-muted-foreground">برنامج شامل للعبادات والأذكار وختم القرآن في شهر رمضان المبارك</p>

          {userLocation && (
            <div className="flex items-center justify-center mt-4 gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">موقعك: {userLocation}</span>
            </div>
          )}

          {prayerTimes && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4">
              <Badge variant="outline" className="flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" /> الفجر: {formatPrayerTime(prayerTimes.Fajr)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" /> الظهر: {formatPrayerTime(prayerTimes.Dhuhr)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" /> العصر: {formatPrayerTime(prayerTimes.Asr)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" /> المغرب: {formatPrayerTime(prayerTimes.Maghrib)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" /> العشاء: {formatPrayerTime(prayerTimes.Isha)}
              </Badge>
            </div>
          )}
        </header>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>الجدول اليومي</span>
            </TabsTrigger>
            <TabsTrigger value="adhkar" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>الأذكار</span>
            </TabsTrigger>
            <TabsTrigger value="quran" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>ختم القرآن</span>
            </TabsTrigger>
            <TabsTrigger value="quran-reader" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span>قارئ القرآن</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="adhkar" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center mb-4">الأذكار اليومية</h2>
              {dailyAdhkar.map((adhkar, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                  <CardHeader
                    className="cursor-pointer p-4 flex flex-row items-center justify-between"
                    onClick={() => toggleAdhkar(`daily-${index}`)}
                  >
                    <CardTitle className="text-base md:text-lg">{adhkar.title}</CardTitle>
                    {expandedAdhkar[`daily-${index}`] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </CardHeader>
                  {expandedAdhkar[`daily-${index}`] && (
                    <CardContent className="p-4 pt-0 bg-muted/30">
                      <ul className="list-disc list-inside space-y-3">
                        {adhkar.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm md:text-base">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              ))}

              <h2 className="text-xl font-bold text-center mb-4 mt-8">أذكار الصلوات</h2>
              {prayerAdhkar.map((adhkar, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                  <CardHeader
                    className="cursor-pointer p-4 flex flex-row items-center justify-between"
                    onClick={() => toggleAdhkar(`prayer-${index}`)}
                  >
                    <CardTitle className="text-base md:text-lg">أذكار صلاة {adhkar.prayer}</CardTitle>
                    {expandedAdhkar[`prayer-${index}`] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </CardHeader>
                  {expandedAdhkar[`prayer-${index}`] && (
                    <CardContent className="p-4 pt-0 bg-muted/30">
                      <ul className="list-disc list-inside space-y-3">
                        {adhkar.adhkar.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm md:text-base">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quran" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="quran-reader" className="space-y-6">
            <QuranReader />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

