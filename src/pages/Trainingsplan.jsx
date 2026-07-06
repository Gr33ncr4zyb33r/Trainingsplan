import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useStorage'
import { heuteDatum } from '../utils/progression'
import { useTrainingsplan } from '../hooks/useTrainingsplan'

const NEUE_UEBUNG = {
  name: '',
  sollgewicht: 0,
  saetze: 3,
  wdhMin: 8,
  wdhMax: 12,
}

function toId(name) {
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  return normalized || `uebung-${Date.now()}`
}

export default function TrainingsplanPage() {
  const [offenerTag, setOffenerTag] = useState(null)
  const [bearbeiteTag, setBearbeiteTag] = useState(null)
  const [neueUebung, setNeueUebung] = useState({})
  const [sessions, setSessions] = useLocalStorage(STORAGE_KEYS.WORKOUT_SESSIONS, {})
  const [aktuelleGewichte] = useLocalStorage(STORAGE_KEYS.AKTUELLE_GEWICHTE, {})
  const { trainingsplan, updateTag } = useTrainingsplan()
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

    navigate('/')
  }

  function updateExercise(tagId, exerciseId, field, value) {
    updateTag(tagId, (tag) => ({
      ...tag,
      uebungen: tag.uebungen.map((uebung) => (
        uebung.id === exerciseId
          ? { ...uebung, [field]: value }
          : uebung
      )),
    }))
  }

  function removeExercise(tagId, exerciseId) {
    updateTag(tagId, (tag) => ({
      ...tag,
      uebungen: tag.uebungen.filter((uebung) => uebung.id !== exerciseId),
    }))
  }

  function addExercise(tagId) {
    const eingabe = neueUebung[tagId] ?? NEUE_UEBUNG
    if (!eingabe.name?.trim()) return

    updateTag(tagId, (tag) => ({
      ...tag,
      uebungen: [
        ...tag.uebungen,
        {
          id: `${toId(eingabe.name)}-${Date.now().toString().slice(-5)}`,
          name: eingabe.name.trim(),
          sollgewicht: Number(eingabe.sollgewicht) || 0,
          saetze: Number(eingabe.saetze) || 3,
          wdhMin: Number(eingabe.wdhMin) || 8,
          wdhMax: Number(eingabe.wdhMax) || 12,
        },
      ],
    }))

    setNeueUebung((prev) => ({ ...prev, [tagId]: NEUE_UEBUNG }))
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Trainingsplan</h2>
        <p className="text-gray-400 text-sm mt-1">Bearbeitbar, lokal gespeichert, fokussiert.</p>
      </div>

      {trainingsplan.map((tag) => (
        <div key={tag.id} className="bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden">
          <button
            onClick={() => setOffenerTag(offenerTag === tag.id ? null : tag.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-zinc-800 transition-colors"
          >
            <div className="text-left">
              <div className="text-white font-semibold">{tag.tag}</div>
              <div className="text-gray-400 text-xs">{tag.uebungen.length} Übungen</div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${offenerTag === tag.id ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {offenerTag === tag.id && (
            <div className="border-t border-zinc-700">
              <div className="flex gap-2 p-3 border-b border-zinc-700">
                <button
                  onClick={() => setBearbeiteTag(bearbeiteTag === tag.id ? null : tag.id)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 font-medium py-2 rounded-lg text-sm transition-colors"
                >
                  {bearbeiteTag === tag.id ? 'Bearbeitung schließen' : 'Plan bearbeiten'}
                </button>
                <button
                  onClick={() => starteManuellesWorkout(tag)}
                  className="flex-1 bg-white hover:bg-zinc-200 text-black font-semibold py-2 rounded-lg text-sm transition-colors"
                >
                  {tag.tag}-Training starten
                </button>
              </div>

              <div className="divide-y divide-zinc-700/50">
                {tag.uebungen.map((uebung) => (
                  <div key={uebung.id} className="px-3 py-3">
                    {bearbeiteTag === tag.id ? (
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={uebung.name}
                          onChange={(e) => updateExercise(tag.id, uebung.id, 'name', e.target.value)}
                          className="col-span-2 bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-300"
                        />
                        <LabeledNumberInput
                          label="Sollgewicht"
                          value={uebung.sollgewicht}
                          onChange={(value) => updateExercise(tag.id, uebung.id, 'sollgewicht', value)}
                        />
                        <LabeledNumberInput
                          label="Sätze"
                          value={uebung.saetze}
                          onChange={(value) => updateExercise(tag.id, uebung.id, 'saetze', value)}
                        />
                        <LabeledNumberInput
                          label="Wdh min"
                          value={uebung.wdhMin}
                          onChange={(value) => updateExercise(tag.id, uebung.id, 'wdhMin', value)}
                        />
                        <LabeledNumberInput
                          label="Wdh max"
                          value={uebung.wdhMax}
                          onChange={(value) => updateExercise(tag.id, uebung.id, 'wdhMax', value)}
                        />
                        <button
                          onClick={() => removeExercise(tag.id, uebung.id)}
                          className="col-span-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-gray-200 text-sm py-2 rounded-lg transition-colors"
                        >
                          Übung entfernen
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-white text-sm font-medium">{uebung.name}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {uebung.saetze} Sätze · {uebung.wdhMin}–{uebung.wdhMax} Wdh · Soll: {uebung.sollgewicht === 0 ? 'KG' : `${uebung.sollgewicht} kg`}
                          </div>
                        </div>
                        {aktuelleGewichte[uebung.id] !== undefined &&
                          aktuelleGewichte[uebung.id] !== uebung.sollgewicht && (
                            <span className="text-xs text-gray-200 border border-zinc-600 rounded-full px-2 py-0.5">
                              Aktuell: {aktuelleGewichte[uebung.id]} kg
                            </span>
                          )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {bearbeiteTag === tag.id && (
                <div className="p-3 border-t border-zinc-700 space-y-2">
                  <input
                    type="text"
                    placeholder="Neue Übung"
                    value={(neueUebung[tag.id] ?? NEUE_UEBUNG).name}
                    onChange={(e) =>
                      setNeueUebung((prev) => ({
                        ...prev,
                        [tag.id]: { ...(prev[tag.id] ?? NEUE_UEBUNG), name: e.target.value },
                      }))
                    }
                    className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-300"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <LabeledNumberInput
                      label="Sollgewicht"
                      value={(neueUebung[tag.id] ?? NEUE_UEBUNG).sollgewicht}
                      onChange={(value) =>
                        setNeueUebung((prev) => ({
                          ...prev,
                          [tag.id]: { ...(prev[tag.id] ?? NEUE_UEBUNG), sollgewicht: value },
                        }))
                      }
                    />
                    <LabeledNumberInput
                      label="Sätze"
                      value={(neueUebung[tag.id] ?? NEUE_UEBUNG).saetze}
                      onChange={(value) =>
                        setNeueUebung((prev) => ({
                          ...prev,
                          [tag.id]: { ...(prev[tag.id] ?? NEUE_UEBUNG), saetze: value },
                        }))
                      }
                    />
                    <LabeledNumberInput
                      label="Wdh min"
                      value={(neueUebung[tag.id] ?? NEUE_UEBUNG).wdhMin}
                      onChange={(value) =>
                        setNeueUebung((prev) => ({
                          ...prev,
                          [tag.id]: { ...(prev[tag.id] ?? NEUE_UEBUNG), wdhMin: value },
                        }))
                      }
                    />
                    <LabeledNumberInput
                      label="Wdh max"
                      value={(neueUebung[tag.id] ?? NEUE_UEBUNG).wdhMax}
                      onChange={(value) =>
                        setNeueUebung((prev) => ({
                          ...prev,
                          [tag.id]: { ...(prev[tag.id] ?? NEUE_UEBUNG), wdhMax: value },
                        }))
                      }
                    />
                  </div>
                  <button
                    onClick={() => addExercise(tag.id)}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-semibold py-2 rounded-lg transition-colors"
                  >
                    Übung hinzufügen
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-200">Hinweis</h3>
        <p className="text-xs text-gray-400">
          Änderungen am Trainingsplan werden automatisch lokal gespeichert und in neuen Workouts verwendet.
        </p>
      </div>
    </div>
  )
}

function LabeledNumberInput({ label, value, onChange }) {
  return (
    <label className="text-xs text-gray-400">
      <span className="block mb-1">{label}</span>
      <input
        type="number"
        min="0"
        step="0.5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-zinc-300"
      />
    </label>
  )
}
