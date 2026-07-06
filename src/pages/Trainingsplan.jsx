/**
 * Trainingsplan – Übersicht des gesamten Plans
 * Zeigt alle Trainingstage mit Übungen, Soll-Gewichten und Sätzen/Wdh.
 * Ermöglicht auch das manuelle Starten eines beliebigen Trainingstages.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TRAININGSPLAN } from '../data/trainingsplan'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useStorage'
import { heuteDatum } from '../utils/progression'

export default function TrainingsplanPage() {
  const [offenerTag, setOffenerTag] = useState(null)
  const [sessions, setSessions] = useLocalStorage(STORAGE_KEYS.WORKOUT_SESSIONS, {})
  const [aktuelleGewichte] = useLocalStorage(STORAGE_KEYS.AKTUELLE_GEWICHTE, {})
  const navigate = useNavigate()

  function starteManuellesWorkout(tag) {
    const datum = heuteDatum()
    const sessionKey = `${tag.id}_${datum}`

    if (!sessions[sessionKey]) {
      const uebungen = tag.uebungen.map((u) => ({
        id: u.id,
        abgeschlossen: false,
        rir: '',
        notiz: '',
        saetze: Array.from({ length: u.saetze }, () => ({
          wdh: u.wdhMax,
          gewicht: aktuelleGewichte[u.id] ?? u.sollgewicht,
          checked: false,
        })),
      }))
      setSessions((prev) => ({
        ...prev,
        [sessionKey]: { datum, tagId: tag.id, uebungen, beendet: false },
      }))
    }

    // Navigiert zur Heute-Seite um das Workout zu starten
    navigate('/')
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Trainingsplan</h2>
        <p className="text-gray-400 text-sm mt-1">Mo · Do · Fr – 3 Einheiten pro Woche</p>
      </div>

      {TRAININGSPLAN.map((tag) => (
        <div key={tag.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {/* Tag-Header */}
          <button
            onClick={() => setOffenerTag(offenerTag === tag.id ? null : tag.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-500 font-bold text-sm">{tag.tag.slice(0, 2)}</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{tag.tag}</div>
                <div className="text-gray-400 text-xs">{tag.uebungen.length} Übungen</div>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${offenerTag === tag.id ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Übungsliste */}
          {offenerTag === tag.id && (
            <div className="border-t border-gray-700">
              {/* Übungen */}
              <div className="divide-y divide-gray-700/50">
                {tag.uebungen.map((uebung, i) => (
                  <div key={uebung.id} className="px-4 py-3 flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-sm w-6 shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{uebung.name}</div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        <span className="text-xs text-gray-400">
                          {uebung.saetze} Sätze
                        </span>
                        <span className="text-xs text-gray-400">
                          {uebung.wdhMin}–{uebung.wdhMax} Wdh
                        </span>
                        <span className="text-xs text-gray-400">
                          Soll: {uebung.sollgewicht === 0 ? 'KG' : `${uebung.sollgewicht} kg`}
                        </span>
                        {aktuelleGewichte[uebung.id] !== undefined &&
                          aktuelleGewichte[uebung.id] !== uebung.sollgewicht && (
                            <span className="text-xs text-orange-400 font-medium">
                              Aktuell: {aktuelleGewichte[uebung.id]} kg
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Manuell starten */}
              <div className="p-4 border-t border-gray-700">
                <button
                  onClick={() => starteManuellesWorkout(tag)}
                  className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 font-semibold py-2 rounded-lg text-sm transition-colors"
                >
                  {tag.tag}-Training starten →
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Legende */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-300">Progression</h3>
        <p className="text-xs text-gray-400">
          Wenn alle Sätze mit maximalen Wiederholungen abgeschlossen werden,
          wird beim nächsten Training eine Gewichtserhöhung empfohlen (+2,5 kg / +5 kg bei Beinübungen).
        </p>
        <p className="text-xs text-gray-400">
          Nach <span className="text-yellow-400 font-medium">6 Wochen</span> wird ein Deload empfohlen.
        </p>
      </div>
    </div>
  )
}
