/**
 * ExerciseCard – Karte für eine einzelne Übung im aktiven Workout
 *
 * Zeigt:
 *  - Übungsname & Sollgewicht
 *  - Sätze mit je: Checkbox, Wdh-Eingabe, Gewicht-Eingabe
 *  - RIR-Eingabe
 *  - Notizfeld
 *  - Checkbox "Übung abgeschlossen"
 *  - Progressions-Badge
 */
import { getProgressionsFeedback } from '../utils/progression'

export default function ExerciseCard({ uebung, state, onChange }) {
  const { id, name, sollgewicht, saetze: anzahlSaetze, wdhMin, wdhMax } = uebung

  // Initialisiert Satzzustände falls noch nicht vorhanden
  const saetze = state?.saetze ?? Array.from({ length: anzahlSaetze }, () => ({
    wdh: wdhMax,
    gewicht: sollgewicht,
    checked: false,
  }))

  const progressionsFeedback = getProgressionsFeedback(
    { saetze, wdhMax },
    id
  )

  // ── Handler ──────────────────────────────────────────────
  function updateSatz(index, field, value) {
    const neueSaetze = saetze.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    )
    onChange({ ...state, saetze: neueSaetze })
  }

  function toggleSatz(index) {
    updateSatz(index, 'checked', !saetze[index].checked)
  }

  function setAbgeschlossen(checked) {
    // Alle Sätze als abgeschlossen markieren wenn Übung fertig
    const neueSaetze = checked
      ? saetze.map((s) => ({ ...s, checked: true }))
      : saetze
    onChange({ ...state, saetze: neueSaetze, abgeschlossen: checked })
  }

  const abgeschlossen = state?.abgeschlossen ?? false
  const rir = state?.rir ?? ''
  const notiz = state?.notiz ?? ''
  const erledigt = saetze.filter((s) => s.checked).length

  return (
    <div
      className={`rounded-xl border transition-colors ${
        abgeschlossen
          ? 'bg-zinc-900/50 border-zinc-500/50'
          : 'bg-zinc-900 border-zinc-700'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex-1">
          <h3 className={`font-semibold text-base leading-tight ${abgeschlossen ? 'text-gray-400 line-through' : 'text-white'}`}>
            {name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {anzahlSaetze} Sätze · {wdhMin}–{wdhMax} Wdh · Soll: {sollgewicht === 0 ? 'KG' : `${sollgewicht} kg`}
          </p>
        </div>

        {/* Fortschritt */}
        <div className="flex items-center gap-2 ml-2">
          <span className="text-xs text-gray-400">{erledigt}/{anzahlSaetze}</span>
          {progressionsFeedback.typ === 'erhoehung' && (
            <span className="text-xs bg-zinc-800 text-white border border-zinc-600 rounded-full px-2 py-0.5 font-medium">
              ↑ Gewicht
            </span>
          )}
        </div>
      </div>

      {/* Progressions-Banner */}
      {progressionsFeedback.typ === 'erhoehung' && (
        <div className="mx-4 mb-2 px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg">
          <p className="text-xs text-gray-100">{progressionsFeedback.nachricht}</p>
        </div>
      )}

      {/* Sätze-Tabelle */}
      <div className="px-4 pb-2">
        {/* Kopfzeile */}
        <div className="grid grid-cols-[2rem_1fr_1fr_2rem] gap-2 mb-1">
          <span className="text-xs text-gray-500 text-center">#</span>
          <span className="text-xs text-gray-500 text-center">Gewicht (kg)</span>
          <span className="text-xs text-gray-500 text-center">Wdh</span>
          <span className="text-xs text-gray-500 text-center">✓</span>
        </div>

        {saetze.map((satz, i) => (
          <div
            key={i}
            className={`grid grid-cols-[2rem_1fr_1fr_2rem] gap-2 mb-2 items-center`}
          >
            {/* Satz-Nummer */}
            <span className={`text-sm font-bold text-center ${satz.checked ? 'text-white' : 'text-gray-500'}`}>
              {i + 1}
            </span>

            {/* Gewicht */}
            <input
              type="number"
              min="0"
              step="0.5"
              value={satz.gewicht}
              onChange={(e) => updateSatz(i, 'gewicht', e.target.value)}
              className="bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1.5 text-sm text-center text-white focus:outline-none focus:border-zinc-300 w-full"
              placeholder="kg"
            />

            {/* Wiederholungen */}
            <input
              type="number"
              min="0"
              max="99"
              value={satz.wdh}
              onChange={(e) => updateSatz(i, 'wdh', e.target.value)}
              className="bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1.5 text-sm text-center text-white focus:outline-none focus:border-zinc-300 w-full"
              placeholder="Wdh"
            />

            {/* Checkbox */}
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={satz.checked}
                onChange={() => toggleSatz(i)}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      {/* RIR + Notizen + Abgeschlossen */}
      <div className="px-4 pb-4 space-y-2">
        {/* RIR */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-400 w-24 shrink-0">RIR (Reps in Reserve)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={rir}
            onChange={(e) => onChange({ ...state, saetze, rir: e.target.value })}
            className="bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-zinc-300 w-16 text-center"
            placeholder="0-5"
          />
        </div>

        {/* Notizen */}
        <textarea
          value={notiz}
          onChange={(e) => onChange({ ...state, saetze, notiz: e.target.value })}
          placeholder="Notizen..."
          rows={2}
          className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-zinc-300 resize-none"
        />

        {/* Übung abgeschlossen */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={abgeschlossen}
            onChange={(e) => setAbgeschlossen(e.target.checked)}
            className="w-5 h-5 rounded"
          />
          <span className={`text-sm font-medium ${abgeschlossen ? 'text-white' : 'text-gray-300'}`}>
            Übung abgeschlossen
          </span>
          {abgeschlossen && <span className="text-white">✓</span>}
        </label>
      </div>
    </div>
  )
}
