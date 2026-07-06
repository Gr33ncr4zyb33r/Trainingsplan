/**
 * Einstellungen – App-Einstellungen und Datenverwaltung
 */
import { useState } from 'react'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useStorage'
import { STANDARD_TRAININGSPLAN } from '../data/trainingsplan'
import { useTrainingsplan } from '../hooks/useTrainingsplan'

const STANDARD_UEBUNGEN_COUNT = STANDARD_TRAININGSPLAN.reduce((sum, tag) => sum + tag.uebungen.length, 0)

export default function Einstellungen() {
  const [aktuelleGewichte, setAktuelleGewichte] = useLocalStorage(STORAGE_KEYS.AKTUELLE_GEWICHTE, {})
  const [trainingswoche, setTrainingswoche] = useLocalStorage(STORAGE_KEYS.TRAININGSWOCHE, 1)
  const [sessions, , removeSessions] = useLocalStorage(STORAGE_KEYS.WORKOUT_SESSIONS, {})
  const [history, , removeHistory] = useLocalStorage(STORAGE_KEYS.TRAINING_HISTORY, [])
  const [, , removeKg] = useLocalStorage(STORAGE_KEYS.KOERPERGEWICHT, [])
  const { trainingsplan, resetPlan } = useTrainingsplan()

  const [resetConfirm, setResetConfirm] = useState(false)
  const [resetGewichteConfirm, setResetGewichteConfirm] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  function showSuccess(msg) {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 2500)
  }

  function resetAllesDaten() {
    removeSessions()
    removeHistory()
    removeKg()
    resetPlan()
    setAktuelleGewichte({})
    setTrainingswoche(1)
    setResetConfirm(false)
    showSuccess('Alle Daten wurden zurückgesetzt.')
  }

  function resetSollgewichte() {
    setAktuelleGewichte({})
    setResetGewichteConfirm(false)
    showSuccess('Sollgewichte wurden zurückgesetzt.')
  }

  // Berechnet Gesamtdatengröße (ca.)
  function dateigroesse() {
    try {
      let total = 0
      for (const key of Object.values(STORAGE_KEYS)) {
        const v = localStorage.getItem(key)
        if (v) total += v.length
      }
      return (total / 1024).toFixed(1)
    } catch {
      return '?'
    }
  }

  const ALLE_UEBUNGEN = trainingsplan.flatMap((t) => t.uebungen)

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Einstellungen</h2>
        <p className="text-gray-400 text-sm mt-1">App-Konfiguration & Datenverwaltung</p>
      </div>

      {/* Erfolgs-Meldung */}
      {successMsg && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3">
          <p className="text-white text-sm">✓ {successMsg}</p>
        </div>
      )}

      {/* Trainingswoche */}
      <Section title="Training">
        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-700">
          <div>
            <div className="text-white text-sm font-medium">Aktuelle Trainingswoche</div>
            <div className="text-gray-400 text-xs">Für Deload-Empfehlung (alle 6 Wochen)</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTrainingswoche((w) => Math.max(1, w - 1))}
              className="w-8 h-8 rounded-lg bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              −
            </button>
            <span className="text-white font-bold w-8 text-center">{trainingswoche}</span>
            <button
              onClick={() => setTrainingswoche((w) => w + 1)}
              className="w-8 h-8 rounded-lg bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </Section>

      {/* Aktuelle Sollgewichte */}
      <Section title="Aktuelle Gewichte">
        <div className="space-y-2">
          <p className="text-gray-400 text-xs px-1">
            Diese Gewichte werden als Startwert für neue Workouts verwendet. Sie werden automatisch nach jedem Training aktualisiert.
          </p>
          <div className="max-h-60 overflow-y-auto space-y-1.5">
            {ALLE_UEBUNGEN.map((u) => (
              <div key={u.id} className="flex items-center justify-between px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-700">
                <span className="text-gray-300 text-xs flex-1 mr-2">{u.name}</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={aktuelleGewichte[u.id] ?? u.sollgewicht}
                    onChange={(e) =>
                      setAktuelleGewichte((prev) => ({
                        ...prev,
                        [u.id]: Number(e.target.value),
                      }))
                    }
                    className="w-16 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-xs text-center text-white focus:outline-none focus:border-zinc-300"
                  />
                  <span className="text-gray-400 text-xs">kg</span>
                </div>
              </div>
            ))}
          </div>

          {resetGewichteConfirm ? (
            <div className="flex gap-2">
              <button
                onClick={resetSollgewichte}
                className="flex-1 bg-white hover:bg-zinc-200 text-black text-sm font-semibold py-2 rounded-lg transition-colors"
              >
                Ja, zurücksetzen
              </button>
              <button
                onClick={() => setResetGewichteConfirm(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-sm py-2 rounded-lg transition-colors"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button
              onClick={() => setResetGewichteConfirm(true)}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-gray-300 text-sm py-2 rounded-lg transition-colors border border-zinc-700"
            >
              Auf Sollgewichte zurücksetzen
            </button>
          )}
        </div>
      </Section>

      {/* Daten */}
      <Section title="Datenverwaltung">
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm">
            <span className="text-gray-300">Gespeicherte Daten</span>
            <span className="text-white font-medium">~{dateigroesse()} KB</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm">
            <span className="text-gray-300">Trainingseinheiten</span>
            <span className="text-white font-medium">{Object.keys(sessions).length}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm">
            <span className="text-gray-300">Historieneinträge</span>
            <span className="text-white font-medium">{history.length}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm">
            <span className="text-gray-300">Aktive Plan-Übungen</span>
            <span className="text-white font-medium">{ALLE_UEBUNGEN.length}/{STANDARD_UEBUNGEN_COUNT}</span>
          </div>

          <p className="text-gray-500 text-xs px-1 pt-1">
            Alle Daten werden ausschließlich lokal auf deinem Gerät gespeichert (localStorage).
            Es werden keine Daten an Server übertragen.
          </p>

          {resetConfirm ? (
            <div className="space-y-2">
              <p className="text-gray-200 text-sm text-center">Alle Daten wirklich löschen?</p>
              <div className="flex gap-2">
                <button
                  onClick={resetAllesDaten}
                  className="flex-1 bg-white hover:bg-zinc-200 text-black text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                  Ja, alles löschen
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-sm py-2 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirm(true)}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-gray-200 text-sm font-semibold py-2 rounded-lg transition-colors"
            >
              Alle Daten zurücksetzen
            </button>
          )}
        </div>
      </Section>

      {/* Info */}
      <Section title="Über die App">
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>Version</span><span className="text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Technologie</span><span className="text-white">React + Vite + PWA</span>
          </div>
          <div className="flex justify-between">
            <span>Datenspeicherung</span><span className="text-white">localStorage</span>
          </div>
          <p className="text-xs text-gray-500 pt-2">
            Persönliche Trainings-App. Alle Daten bleiben auf deinem Gerät.
            Installierbar als PWA über den Browser.
          </p>
        </div>
      </Section>
    </div>
  )
}

// Wiederverwendbare Sektion-Komponente
function Section({ title, children }) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-zinc-700 bg-zinc-900">
        <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
