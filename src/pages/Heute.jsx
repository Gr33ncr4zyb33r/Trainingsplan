/**
 * Heute – Aktuelle Trainingseinheit
 *
 * Zeigt das heutige Workout (falls Trainingstag) oder einen Ruhetag.
 * Speichert alle Eingaben in localStorage.
 */
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ExerciseCard from '../components/ExerciseCard'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useStorage'
import { getHeutigerTrainingTag, TRAININGSPLAN } from '../data/trainingsplan'
import {
  berechneAbschlussProz,
  heuteDatum,
  istDeloadEmpfohlen,
} from '../utils/progression'

export default function Heute() {
  const [sessions, setSessions] = useLocalStorage(STORAGE_KEYS.WORKOUT_SESSIONS, {})
  const [_history, setHistory] = useLocalStorage(STORAGE_KEYS.TRAINING_HISTORY, [])
  const [trainingswoche, setTrainingswoche] = useLocalStorage(STORAGE_KEYS.TRAININGSWOCHE, 1)
  const [aktuelleGewichte, setAktuelleGewichte] = useLocalStorage(STORAGE_KEYS.AKTUELLE_GEWICHTE, {})
  const [workoutAbgeschlossen, setWorkoutAbgeschlossen] = useState(false)

  const trainingstag = getHeutigerTrainingTag()
  const datum = heuteDatum()

  // Session-Key: tagId + datum
  const sessionKey = trainingstag ? `${trainingstag.id}_${datum}` : null
  const aktuelleSession = sessionKey ? (sessions[sessionKey] ?? null) : null

  // Initialisiert die Übungszustände für eine Session
  function initSession(tag) {
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
    return { datum, tagId: tag.id, uebungen, beendet: false }
  }

  // Startet oder lädt eine Session
  function startWorkout() {
    if (!trainingstag || !sessionKey) return
    const neueSession = initSession(trainingstag)
    setSessions((prev) => ({ ...prev, [sessionKey]: neueSession }))
  }

  // Aktualisiert eine einzelne Übung in der Session
  const handleUebungChange = useCallback(
    (uebungIndex, neuerZustand) => {
      if (!sessionKey || !aktuelleSession) return
      const neueUebungen = aktuelleSession.uebungen.map((u, i) =>
        i === uebungIndex ? { ...u, ...neuerZustand } : u
      )
      const aktualisierteSession = { ...aktuelleSession, uebungen: neueUebungen }
      setSessions((prev) => ({ ...prev, [sessionKey]: aktualisierteSession }))
    },
    [sessionKey, aktuelleSession, setSessions]
  )

  // Workout abschließen: in Historie speichern, Gewichte aktualisieren
  function beendeWorkout() {
    if (!aktuelleSession || !trainingstag) return

    // Neue Gewichte für nächstes Training speichern (basierend auf was eingegeben wurde)
    const neueGewichte = { ...aktuelleGewichte }
    aktuelleSession.uebungen.forEach((u) => {
      const letzteGewicht = u.saetze[u.saetze.length - 1]?.gewicht
      if (letzteGewicht) neueGewichte[u.id] = Number(letzteGewicht)
    })
    setAktuelleGewichte(neueGewichte)

    // Persönliche Rekorde aktualisieren
    // (werden im Fortschritt-View behandelt)

    // Session als beendet markieren
    const beendeteSession = { ...aktuelleSession, beendet: true }
    setSessions((prev) => ({ ...prev, [sessionKey]: beendeteSession }))

    // Zur Historie hinzufügen
    const historieneintrag = {
      id: sessionKey,
      datum,
      tagId: trainingstag.id,
      tagName: trainingstag.tag,
      uebungen: aktuelleSession.uebungen,
      abschlussProz: berechneAbschlussProz(aktuelleSession.uebungen),
    }
    setHistory((prev) => [historieneintrag, ...prev.filter((h) => h.id !== sessionKey)])

    // Trainingswoche erhöhen (nach jedem Freitag-Training)
    if (trainingstag.id === 'freitag') {
      setTrainingswoche((w) => w + 1)
    }

    setWorkoutAbgeschlossen(true)
  }

  // Berechne Fortschritt
  const fortschrittProz = aktuelleSession
    ? berechneAbschlussProz(aktuelleSession.uebungen)
    : 0

  const deloadHinweis = istDeloadEmpfohlen(trainingswoche)

  // ── Kein Trainingstag heute ──────────────────────────────
  if (!trainingstag) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">😴</div>
          <h2 className="text-2xl font-bold text-white">Ruhetag</h2>
          <p className="text-gray-400">Heute ist kein Training geplant.</p>
          <p className="text-gray-500 text-sm">
            Nächste Trainingstage: Mo · Do · Fr
          </p>
        </div>

        {/* Manuell einen Tag auswählen */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Manuell starten</h3>
          <div className="space-y-2">
            {TRAININGSPLAN.map((tag) => (
              <Link
                key={tag.id}
                to={`/plan/${tag.id}`}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <span className="text-white font-medium">{tag.tag}</span>
                <span className="text-gray-400 text-sm">{tag.uebungen.length} Übungen →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Deload-Hinweis ────────────────────────────────────────
  const DeloadBanner = () =>
    deloadHinweis ? (
      <div className="mx-4 mt-4 p-3 bg-yellow-900/40 border border-yellow-700/50 rounded-xl">
        <p className="text-yellow-400 text-sm font-semibold">⚡ Deload-Woche empfohlen!</p>
        <p className="text-yellow-300/80 text-xs mt-1">
          Du trainierst seit {trainingswoche} Wochen. Reduziere diese Woche das Gewicht auf ~60% und erhöhe danach wieder progressiv.
        </p>
      </div>
    ) : null

  // ── Workout noch nicht gestartet ─────────────────────────
  if (!aktuelleSession) {
    return (
      <div className="p-4 space-y-4">
        <DeloadBanner />
        <div className="text-center py-8 space-y-2">
          <div className="text-5xl">🏋️</div>
          <h2 className="text-xl font-bold text-white">{trainingstag.tag}</h2>
          <p className="text-gray-400 text-sm">
            {trainingstag.uebungen.length} Übungen · Woche {trainingswoche}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-2">
          {trainingstag.uebungen.map((u) => (
            <div key={u.id} className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="text-orange-500">•</span>
              <span>{u.name}</span>
              <span className="text-gray-500 text-xs ml-auto">
                {u.saetze}×{u.wdhMin}–{u.wdhMax}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={startWorkout}
          className="w-full bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
        >
          Training starten 💪
        </button>
      </div>
    )
  }

  // ── Workout beendet ───────────────────────────────────────
  if (aktuelleSession.beendet || workoutAbgeschlossen) {
    return (
      <div className="p-4 space-y-4 text-center">
        <div className="py-8 space-y-3">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold text-white">Training abgeschlossen!</h2>
          <p className="text-gray-400">{trainingstag.tag} · {datum}</p>
          <div className="text-4xl font-bold text-orange-500">{fortschrittProz}%</div>
          <p className="text-gray-400 text-sm">Übungen erledigt</p>
        </div>
        <Link
          to="/fortschritt"
          className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Fortschritt ansehen →
        </Link>
      </div>
    )
  }

  // ── Aktives Workout ───────────────────────────────────────
  return (
    <div className="p-4 space-y-4">
      <DeloadBanner />

      {/* Kopfzeile */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">{trainingstag.tag}</h2>
          <p className="text-gray-400 text-sm">Woche {trainingswoche} · {datum}</p>
        </div>
        {/* Fortschrittsring */}
        <div className="flex flex-col items-center">
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="#374151" strokeWidth="4" />
              <circle
                cx="28" cy="28" r="22" fill="none"
                stroke="#f97316" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - fortschrittProz / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {fortschrittProz}%
            </span>
          </div>
        </div>
      </div>

      {/* Übungen */}
      <div className="space-y-4">
        {trainingstag.uebungen.map((uebung, index) => (
          <ExerciseCard
            key={uebung.id}
            uebung={uebung}
            state={aktuelleSession.uebungen[index]}
            onChange={(neuerZustand) => handleUebungChange(index, neuerZustand)}
          />
        ))}
      </div>

      {/* Training beenden */}
      <button
        onClick={beendeWorkout}
        className="w-full bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors mt-4"
      >
        Training beenden ✓
      </button>
    </div>
  )
}
