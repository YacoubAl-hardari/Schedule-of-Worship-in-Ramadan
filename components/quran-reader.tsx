"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

type Surah = {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
}

type Ayah = {
  number: number
  text: string
  audio: string
  numberInSurah: number
}

type Reader = {
  identifier: string
  language: string
  name: string
  englishName: string
  format: string
  type: string
}

export default function QuranReader() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [selectedSurah, setSelectedSurah] = useState<number>(1)
  const [fromVerse, setFromVerse] = useState<number>(1)
  const [toVerse, setToVerse] = useState<number>(7)
  const [verses, setVerses] = useState<Ayah[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentAudio, setCurrentAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(0)
  const [volume, setVolume] = useState<number>(80)
  const [readers, setReaders] = useState<Reader[]>([])
  const [selectedReader, setSelectedReader] = useState<string>("ar.alafasy")

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Fetch all surahs on component mount
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah")
        const data = await response.json()
        if (data.code === 200) {
          setSurahs(data.data)
        }
      } catch (error) {
        console.error("Error fetching surahs:", error)
      }
    }

    fetchSurahs()
  }, [])

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/edition");
        const data = await response.json();
        if (data.code === 200) {
          // Filter Arabic audio readers
          const arabicReaders = data.data.filter(
            (reader: Reader) => reader.format === "audio" && reader.language === "ar"
          );
  
          // Check for valid audio links
          const validReaders = await Promise.all(
            arabicReaders.map(async (reader: Reader) => {
              const audioUrl = `https://cdn.islamic.network/quran/audio/128/${reader.identifier}/1.mp3`;
              const audioExists = await checkAudioExists(audioUrl);
              return audioExists ? reader : null;
            })
          );
  
          // Filter out null values
          const filteredReaders = validReaders.filter(reader => reader !== null);
          setReaders(filteredReaders);
        }
      } catch (error) {
        console.error("Error fetching readers:", error);
      }
    };
  
    fetchReaders();
  }, []);
  
  const checkAudioExists = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      
      console.error("Error fetching verses:", error); // استخدام المتغير error
    
    }
  };

  // Update toVerse when selectedSurah changes
  useEffect(() => {
    if (surahs.length > 0) {
      const surah = surahs.find((s) => s.number === selectedSurah)
      if (surah) {
        setFromVerse(1)
        setToVerse(Math.min(7, surah.numberOfAyahs))
      }
    }
  }, [selectedSurah, surahs])

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100

      const audioElement = audioRef.current

      const handleEnded = () => {
        if (currentVerseIndex < verses.length - 1) {
          setCurrentVerseIndex((prev) => prev + 1)
          setCurrentAudio(verses[currentVerseIndex + 1].audio)
        } else {
          setIsPlaying(false)
          setCurrentVerseIndex(0)
        }
      }

      audioElement.addEventListener("ended", handleEnded)

      return () => {
        audioElement.removeEventListener("ended", handleEnded)
      }
    }
  }, [currentVerseIndex, verses, volume])

  // Update audio when currentAudio changes
  useEffect(() => {
    if (audioRef.current && currentAudio) {
      audioRef.current.src = currentAudio
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Error playing audio:", err))
      }
    }
  }, [currentAudio, isPlaying])

  const fetchVerses = async () => {
    if (fromVerse > toVerse) {
      alert("الآية الأولى يجب أن تكون أقل من أو تساوي الآية الأخيرة")
      return
    }

    setLoading(true)
    try {
      // Fetch verses text
      const textResponse = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${selectedReader}`)
      const textData: { code: number; data: { ayahs: Ayah[] } } = await textResponse.json()

      if (textData.code === 200) {
        const filteredVerses = textData.data.ayahs
          .filter((ayah: Ayah) => ayah.numberInSurah >= fromVerse && ayah.numberInSurah <= toVerse)
          .map((ayah: Ayah) => ({
            number: ayah.number,
            text: ayah.text,
            numberInSurah: ayah.numberInSurah,
            audio: `https://cdn.islamic.network/quran/audio/128/${selectedReader}/${ayah.number}.mp3`,
          }))

        setVerses(filteredVerses)

        if (filteredVerses.length > 0) {
          setCurrentAudio(filteredVerses[0].audio)
          setCurrentVerseIndex(0)
        }
      }
    } catch (error) {
      console.error("Error fetching verses:", error)
    } finally {
      setLoading(false)
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((err) => console.error("Error playing audio:", err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playNextVerse = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex((prev) => prev + 1)
      setCurrentAudio(verses[currentVerseIndex + 1].audio)
      setIsPlaying(true)
    }
  }

  const playPreviousVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex((prev) => prev - 1)
      setCurrentAudio(verses[currentVerseIndex - 1].audio)
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
    }
  }

  // Map reader identifiers to their Arabic names
  const getArabicReaderName = (identifier: string) => {
    const reader = readers.find((r) => r.identifier === identifier)
    return reader ? reader.name : "غير معروف"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">قارئ القرآن الكريم</CardTitle>
          <CardDescription>استمع إلى تلاوة القرآن الكريم مع النص</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">السورة</label>
              <Select
                value={selectedSurah.toString()}
                onValueChange={(value) => setSelectedSurah(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر السورة" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {surahs.map((surah) => (
                    <SelectItem key={surah.number} value={surah.number.toString()}>
                      {surah.number}. {surah.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">القارئ</label>
              <Select
                value={selectedReader}
                onValueChange={(value) => setSelectedReader(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر القارئ" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {readers.map((reader) => (
                    <SelectItem key={reader.identifier} value={reader.identifier}>
                      {getArabicReaderName(reader.identifier)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">من الآية</label>
              <Input
                type="number"
                min={1}
                max={surahs.find((s) => s.number === selectedSurah)?.numberOfAyahs || 1}
                value={fromVerse}
                onChange={(e) => setFromVerse(Number.parseInt(e.target.value) || 1)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">إلى الآية</label>
              <Input
                type="number"
                min={fromVerse}
                max={surahs.find((s) => s.number === selectedSurah)?.numberOfAyahs || 1}
                value={toVerse}
                onChange={(e) => setToVerse(Number.parseInt(e.target.value) || fromVerse)}
              />
            </div>
          </div>

          <Button onClick={fetchVerses} className="w-full" disabled={loading}>
            {loading ? "جاري التحميل..." : "عرض الآيات"}
          </Button>
        </CardContent>
      </Card>

      {verses.length > 0 && (
        <>
          <Card className="bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>
                  {surahs.find((s) => s.number === selectedSurah)?.name} - الآيات {fromVerse} إلى {toVerse}
                </CardTitle>
                <Badge variant="outline">
                  {currentVerseIndex + 1} / {verses.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {verses.map((verse, index) => (
                  <div
                    key={verse.number}
                    className={`p-4 rounded-lg text-right text-lg leading-loose ${
                      index === currentVerseIndex ? "bg-primary/20 border border-primary/30" : "bg-muted/30"
                    }`}
                  >
                    <p>
                      {verse.text} ﴾ <b style={{ color: 'red' }}>{verse.numberInSurah}</b>﴿
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={playPreviousVerse} disabled={currentVerseIndex === 0}>
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button variant={isPlaying ? "secondary" : "default"} size="icon" onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={playNextVerse}
                    disabled={currentVerseIndex === verses.length - 1}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 w-1/3">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider value={[volume]} min={0} max={100} step={1} onValueChange={handleVolumeChange} />
                </div>
              </div>

              <audio ref={audioRef} className="hidden" />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}