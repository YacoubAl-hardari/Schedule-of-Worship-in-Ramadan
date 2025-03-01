"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AdhkarTab() {
  const [expandedAdhkar, setExpandedAdhkar] = useState<Record<string, boolean>>({})

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

  const toggleAdhkar = (index: string) => {
    setExpandedAdhkar((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="space-y-6">
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
    </div>
  )
}