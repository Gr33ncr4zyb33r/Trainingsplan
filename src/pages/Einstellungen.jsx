/**
 * Einstellungen – App-Einstellungen und Datenverwaltung
 */
import { useState } from 'react'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useStorage'
import { TRAININGSPLAN } from '../data/trainingsplan'

export default function Einstellungen() {
  const [aktuelleGewichte, setAktuelleGewichte] = useLocalStorage(STORAGE_KEYS.AKTUELLE_GEWICHTE, {})
  const [trainingswoche, setTrainingswoche] = useLocalStorage(STORAGE_KEYS.TRAININGSWOCHE, 1)
  const [sessions, , removeSessions] = useLocalStorage(STORAGE_KEYS.WORKOUT_SESSIONS, {})
  const [history, , removeHistory] = useLocalStorage(STORAGE_KEYS.TRAINING_HISTORY, [])
  const [, , removeKg] = useLocalStorage(STORAGE_KEYS.KOERPERGEWICHT, [])

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

  const ALLE_UEBUNGEN = TRAININGSPLAN.flatMap((t) => t.uebungen)

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Einstellungen</h2>
        <p className="text-gray-400 text-sm mt-1">App-Konfiguration & Datenverwaltung</p>
      </div>

      {/* Erfolgs-Meldung */}
      {successMsg && (
        <div className="bg-green-900/50 border border-green-700/50 rounded-xl p-3">
          <p className="text-green-400 text-sm">✓ {successMsg}</p>
        </div>
      )}

      {/* Trainingswoche */}
      <Section title="Training">
        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
          <div>
            <div className="text-white text-sm font-medium">Aktuelle Trainingswoche</div>
            <div className="text-gray-400 text-xs">Für Deload-Empfehlung (alle 6 Wochen)</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTrainingswoche((w) => Math.max(1, w - 1))}
              className="w-8 h-8 rounded-lg bg-gray-600 text-white flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              −
            </button>
            <span className="text-white font-bold w-8 text-center">{trainingswoche}</span>
            <button
              onClick={() => setTrainingswoche((w) => w + 1)}
              className="w-8 h-8 rounded-lg bg-gray-600 text-white flex items-center justify-center hover:bg-gray-500 transition-colors"
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
              <div key={u.id} className="flex items-center justify-between px-3 py-2 bg-gray-700 rounded-lg">
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
                    className="w-16 bg-gray-600 border border-gray-500 rounded px-2 py-1 text-xs text-center text-white focus:outline-none focus:border-orange-500"
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
                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
              >
                Ja, zurücksetzen
              </button>
              <button
                onClick={() => setResetGewichteConfirm(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white text-sm py-2 rounded-lg transition-colors"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button
              onClick={() => setResetGewichteConfirm(true)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm py-2 rounded-lg transition-colors border border-gray-600"
            >
              Auf Sollgewichte zurücksetzen
            </button>
          )}
        </div>
      </Section>

      {/* Daten */}
      <Section title="Datenverwaltung">
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg text-sm">
            <span className="text-gray-300">Gespeicherte Daten</span>
            <span className="text-orange-400 font-medium">~{dateigroesse()} KB</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg text-sm">
            <span className="text-gray-300">Trainingseinheiten</span>
            <span className="text-white font-medium">{Object.keys(sessions).length}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg text-sm">
            <span className="text-gray-300">Historieneinträge</span>
            <span className="text-white font-medium">{history.length}</span>
          </div>

          <p className="text-gray-500 text-xs px-1 pt-1">
            ⚠️ Alle Daten werden ausschließlich lokal auf deinem Gerät gespeichert (localStorage).
            Es werden keine Daten an Server übertragen.
          </p>

          {resetConfirm ? (
            <div className="space-y-2">
              <p className="text-red-400 text-sm text-center">Alle Daten wirklich löschen?</p>
              <div className="flex gap-2">
                <button
                  onClick={resetAllesDaten}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                  Ja, alles löschen
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white text-sm py-2 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setResetConfirm(true)}
              className="w-full bg-red-900/30 hover:bg-red-900/50 border border-red-700/50 text-red-400 text-sm font-semibold py-2 rounded-lg transition-colors"
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
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-700 bg-gray-750">
        <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
