import { useEffect, useState } from "react"
import { formatDate } from "./useDateTimeFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["year", 86400 * 7 * 4 * 12],
  ["month", 86400 * 7 * 4],
  ["week", 86400 * 7],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]
const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsUnit)
      return { value, unit }
    }
  }
}
export default function useTimeAgo(timestamp) {
  const [timeago, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeAgo(newTimeAgo)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [timestamp])

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat("es", { style: "long" })

  const { value, unit } = timeago
  return rtf.format(value, unit)
}
