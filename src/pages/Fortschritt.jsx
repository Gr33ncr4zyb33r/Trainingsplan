/**
 * Fortschritt – Trainingshistorie, persönliche Rekorde, Körpergewicht
 */
import { useState } from 'react'
import { useLocalStorage, STORAGE_KEYS } from '../hooks/useStorage'
import { formatDatum, heuteDatum } from '../utils/progression'
import { useTrainingsplan } from '../hooks/useTrainingsplan'

export default function Fortschritt() {
  const [history] = useLocalStorage(STORAGE_KEYS.TRAINING_HISTORY, [])
  const [koerpergewicht, setKoerpergewicht] = useLocalStorage(STORAGE_KEYS.KOERPERGEWICHT, [])
  const [neuesGewicht, setNeuesGewicht] = useState('')
  const [aktiverTab, setAktivTab] = useState('historie')
  const { trainingsplan } = useTrainingsplan()
  const alleUebungen = trainingsplan.flatMap((t) => t.uebungen)

  // Persönliche Rekorde aus der Historie berechnen
  const personalRecords = berechnePersonalRecords(history)

  function addKoerpergewicht() {
    const wert = parseFloat(neuesGewicht)
    if (!wert || wert <= 0) return
    const neuerEintrag = { datum: heuteDatum(), gewicht: wert }
    setKoerpergewicht((prev) => [neuerEintrag, ...prev.filter((k) => k.datum !== heuteDatum())])
    setNeuesGewicht('')
  }

  const aktuellesKg = koerpergewicht[0]?.gewicht ?? null

  const tabs = [
    { id: 'historie', label: 'Historie' },
    { id: 'prliste', label: 'PR-Liste' },
    { id: 'koerper', label: 'Körpergewicht' },
  ]

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white">Fortschritt</h2>
        {history.length > 0 && (
          <p className="text-gray-400 text-sm mt-1">{history.length} Trainingseinheiten absolviert</p>
        )}
      </div>

      {/* Zusammenfassung */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Trainings"
          value={history.length}
        />
        <StatCard
          label="Ø Abschluss"
          value={history.length > 0
            ? `${Math.round(history.reduce((s, h) => s + (h.abschlussProz ?? 0), 0) / history.length)}%`
            : '–'}
        />
        <StatCard
          label="Körpergewicht"
          value={aktuellesKg ? `${aktuellesKg} kg` : '–'}
        />
      </div>

      {/* Tabs */}
      <div className="flex bg-zinc-900 rounded-lg p-1 gap-1 border border-zinc-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAktivTab(tab.id)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              aktiverTab === tab.id
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab-Inhalte */}
      {aktiverTab === 'historie' && (
        <HistorieTab history={history} alleUebungen={alleUebungen} />
      )}
      {aktiverTab === 'prliste' && (
        <RekordTab records={personalRecords} alleUebungen={alleUebungen} />
      )}
      {aktiverTab === 'koerper' && (
        <KoerperTab
          koerpergewicht={koerpergewicht}
          neuesGewicht={neuesGewicht}
          setNeuesGewicht={setNeuesGewicht}
          onAdd={addKoerpergewicht}
        />
      )}
    </div>
  )
}

// ── Hilfsfunktionen ───────────────────────────────────────

function berechnePersonalRecords(history) {
  const records = {}
  history.forEach((session) => {
    session.uebungen?.forEach((u) => {
      u.saetze?.forEach((s) => {
        const gewicht = Number(s.gewicht)
        const wdh = Number(s.wdh)
        if (!gewicht || !wdh || !s.checked) return
        // 1RM-Schätzung nach Epley-Formel
        const rm1 = gewicht * (1 + wdh / 30)
        if (!records[u.id] || rm1 > records[u.id].rm1) {
          records[u.id] = {
            gewicht,
            wdh,
            rm1: Math.round(rm1 * 10) / 10,
            datum: session.datum,
          }
        }
      })
    })
  })
  return records
}

// ── Sub-Komponenten ───────────────────────────────────────

function StatCard({ label, value }) {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-3 text-center">
      <div className="text-white font-bold text-lg leading-tight">{value}</div>
      <div className="text-gray-500 text-xs">{label}</div>
    </div>
  )
}

function HistorieTab({ history, alleUebungen }) {
  if (!history.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Noch keine Trainingseinheiten.</p>
        <p className="text-sm mt-1">Starte dein erstes Workout!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {history.map((session) => (
        <div key={session.id} className="bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <div>
              <div className="text-white font-semibold text-sm">{session.tagName}</div>
              <div className="text-gray-400 text-xs">{formatDatum(session.datum)}</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{session.abschlussProz ?? 0}%</div>
              <div className="text-gray-500 text-xs">abgeschlossen</div>
            </div>
          </div>

          {/* Übungsliste */}
          <div className="border-t border-zinc-700 divide-y divide-zinc-700/50">
            {session.uebungen?.map((u) => {
              const uDaten = alleUebungen.find((e) => e.id === u.id)
              const erledigteSaetze = u.saetze?.filter((s) => s.checked).length ?? 0
              const gesamtSaetze = u.saetze?.length ?? 0
              const maxGewicht = u.saetze
                ?.filter((s) => s.checked)
                .reduce((max, s) => Math.max(max, Number(s.gewicht)), 0)

              return (
                <div key={u.id} className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${u.abgeschlossen ? 'bg-white' : 'bg-gray-600'}`} />
                    <span className="text-sm text-gray-300">{uDaten?.name ?? u.id}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {erledigteSaetze}/{gesamtSaetze} Sätze
                    {maxGewicht > 0 && ` · ${maxGewicht} kg`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function RekordTab({ records, alleUebungen }) {
  const hatRekorde = Object.keys(records).length > 0

  if (!hatRekorde) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Noch keine Rekorde.</p>
        <p className="text-sm mt-1">Schließe Sätze ab um Rekorde zu setzen!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {alleUebungen.filter((u) => records[u.id]).map((uebung) => {
        const rec = records[uebung.id]
        return (
          <div key={uebung.id} className="bg-zinc-900 rounded-xl border border-zinc-700 p-3 flex items-center justify-between">
            <div>
              <div className="text-white text-sm font-medium">{uebung.name}</div>
              <div className="text-gray-400 text-xs mt-0.5">
                {rec.gewicht} kg × {rec.wdh} Wdh · {formatDatum(rec.datum)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">{rec.rm1} kg</div>
              <div className="text-gray-500 text-xs">geschätzter 1RM</div>
            </div>
          </div>
        )
      })}
      <p className="text-gray-500 text-xs text-center pt-2">
        1RM berechnet nach Epley-Formel: Gewicht × (1 + Wdh/30)
      </p>
    </div>
  )
}

function KoerperTab({ koerpergewicht, neuesGewicht, setNeuesGewicht, onAdd }) {
  return (
    <div className="space-y-4">
      {/* Eingabe */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Körpergewicht eintragen</h3>
        <div className="flex gap-2">
          <input
            type="number"
            min="30"
            max="300"
            step="0.1"
            value={neuesGewicht}
            onChange={(e) => setNeuesGewicht(e.target.value)}
            placeholder="kg"
            className="flex-1 bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-300"
            onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          />
          <button
            onClick={onAdd}
            className="bg-white hover:bg-zinc-200 text-black font-semibold px-4 rounded-lg transition-colors"
          >
            Speichern
          </button>
        </div>
      </div>

      {/* Verlauf */}
      {koerpergewicht.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Noch keine Einträge.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Einfaches Liniendiagramm */}
          {koerpergewicht.length >= 2 && (
            <SimpleChart data={koerpergewicht} />
          )}

          {/* Liste */}
          {koerpergewicht.slice(0, 20).map((eintrag, i) => (
            <div key={eintrag.datum + i} className="bg-zinc-900 rounded-xl border border-zinc-700 p-3 flex justify-between items-center">
              <span className="text-gray-400 text-sm">{formatDatum(eintrag.datum)}</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{eintrag.gewicht} kg</span>
                {i < koerpergewicht.length - 1 && (
                  <span className={`text-xs ${eintrag.gewicht < koerpergewicht[i + 1].gewicht ? 'text-gray-200' : eintrag.gewicht > koerpergewicht[i + 1].gewicht ? 'text-gray-200' : 'text-gray-500'}`}>
                    {eintrag.gewicht < koerpergewicht[i + 1].gewicht ? '↓' : eintrag.gewicht > koerpergewicht[i + 1].gewicht ? '↑' : '→'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Einfaches SVG-Liniendiagramm für Körpergewicht
function SimpleChart({ data }) {
  const reversed = [...data].reverse() // älteste zuerst
  const values = reversed.map((d) => d.gewicht)
  const min = Math.min(...values) - 2
  const max = Math.max(...values) + 2
  const range = max - min || 1

  const width = 300
  const height = 80
  const pad = 10

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (width - 2 * pad)
    const y = height - pad - ((v - min) / range) * (height - 2 * pad)
    return `${x},${y}`
  })

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 80 }}>
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {values.map((v, i) => {
          const [x, y] = points[i].split(',')
          return (
            <circle key={i} cx={x} cy={y} r="3" fill="#ffffff" />
          )
        })}
      </svg>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{reversed[0]?.datum && formatDatum(reversed[0].datum)}</span>
        <span>{reversed[reversed.length - 1]?.datum && formatDatum(reversed[reversed.length - 1].datum)}</span>
      </div>
    </div>
  )
}
