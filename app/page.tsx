"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GitHubStarButton } from "@/components/ui/github-star-button";
import ScheduleTab from "@/components/ScheduleTab";
import AdhkarTab from "@/components/AdhkarTab";
import QuranTab from "@/components/QuranTab";
import QuranReaderTab from "@/components/QuranReaderTab";
import { Calendar, Book, MapPin, Clock, Headphones } from "lucide-react";

export default function RamadanSchedule() {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);

  // جلب الموقع الجغرافي وأوقات الصلاة
  useEffect(() => {
    const fetchPrayerTimes = async (latitude: number, longitude: number) => {
      try {
        // جلب اسم المدينة أو المنطقة
        const locationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ar`,
        );
        const locationData = await locationResponse.json();
        setUserLocation(locationData.address.city || locationData.address.town || locationData.address.state);

        // جلب أوقات الصلاة
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const prayerResponse = await fetch(
          `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=4`,
        );
        const prayerData = await prayerResponse.json();
        setPrayerTimes(prayerData.data[date.getDate() - 1].timings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserLocation("غير معروف");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchPrayerTimes(latitude, longitude);
        },
        () => {
          setUserLocation("غير معروف");
        },
      );
    } else {
      setUserLocation("غير معروف");
    }
  }, []);

  // تحديد الصلاة التالية
  useEffect(() => {
    if (prayerTimes) {
      const now = new Date();
      const prayerTimesArray = [
        { name: "الفجر", time: prayerTimes.Fajr },
        { name: "الظهر", time: prayerTimes.Dhuhr },
        { name: "العصر", time: prayerTimes.Asr },
        { name: "المغرب", time: prayerTimes.Maghrib },
        { name: "العشاء", time: prayerTimes.Isha },
      ];

      // البحث عن الصلاة التالية
      let nextPrayer = null;
      for (const prayer of prayerTimesArray) {
        const prayerTime = new Date(`${now.toDateString()} ${prayer.time}`);
        if (prayerTime > now) {
          nextPrayer = prayer;
          break;
        }
      }

      // إذا لم يتم العثور على صلاة تالية، نضبط الصلاة الأولى لليوم التالي
      if (!nextPrayer) {
        nextPrayer = prayerTimesArray[0];
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        nextPrayer.time = `${tomorrow.toDateString()} ${nextPrayer.time}`;
      }

      setNextPrayer(nextPrayer);
    }
  }, [prayerTimes]);

  // حساب الوقت المتبقي للصلاة التالية
  useEffect(() => {
    if (nextPrayer) {
      const interval = setInterval(() => {
        const now = new Date();
        const prayerTime = new Date(`${now.toDateString()} ${nextPrayer.time}`);

        // إذا كان وقت الصلاة قد انقضى، نضيف يومًا كاملاً
        if (prayerTime < now) {
          prayerTime.setDate(prayerTime.getDate() + 1);
        }

        const diff = prayerTime.getTime() - now.getTime();

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          // تنسيق الوقت المتبقي
          const formattedHours = String(hours).padStart(2, "0");
          const formattedMinutes = String(minutes).padStart(2, "0");
          const formattedSeconds = String(seconds).padStart(2, "0");

          setCountdown(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
        } else {
          setCountdown(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextPrayer]);

  // تنسيق وقت الصلاة
  const formatPrayerTime = (time: string) => {
    if (!time) return "";
    return time.replace(" (EET)", "").replace(" (EEST)", "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950 p-4 md:p-6 lg:p-8 rtl">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="mt-4">
            <GitHubStarButton />
          </div>
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

          {nextPrayer && countdown && (
            <div className="mt-4">
              <Badge variant="default" className="flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" /> الوقت المتبقي لصلاة {nextPrayer.name}: {countdown}
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

          <TabsContent value="schedule">
            <ScheduleTab />
          </TabsContent>

          <TabsContent value="adhkar">
            <AdhkarTab />
          </TabsContent>

          <TabsContent value="quran">
            <QuranTab />
          </TabsContent>

          <TabsContent value="quran-reader">
            <QuranReaderTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}