/**
 * Automatische Progressionslogik
 *
 * Wenn alle Sätze am oberen Wiederholungsbereich:
 *   → Empfehlung: Gewicht beim nächsten Training erhöhen
 *
 * Nach Woche 6:
 *   → Hinweis auf Deload
 */

/**
 * Prüft ob alle Sätze einer Übung die maximalen Wiederholungen erreicht haben.
 * @param {Object} uebungState - { saetze: [{wdh, checked}], wdhMax }
 * @returns {boolean}
 */
export function allesSaetzeMaxWdh(uebungState) {
  if (!uebungState?.saetze?.length) return false
  const { saetze, wdhMax } = uebungState
  return saetze.every((s) => s.checked && Number(s.wdh) >= wdhMax)
}

/**
 * Berechnet die empfohlene Gewichtserhöhung.
 * Standard: +2.5 kg, für untere Körper: +5 kg
 */
export function empfohleneErhoehung(uebungId) {
  const untereKoerperUebungen = ['kniebeuge', 'rum-kreuzheben', 'beinstrecker', 'beinbeuger', 'wadenheben']
  return untereKoerperUebungen.includes(uebungId) ? 5 : 2.5
}

/**
 * Gibt Progressions-Feedback für eine Übung zurück.
 * @returns {{ typ: 'erhoehung'|'halten'|null, nachricht: string|null }}
 */
export function getProgressionsFeedback(uebungState, uebungId) {
  if (allesSaetzeMaxWdh(uebungState)) {
    const erhoehung = empfohleneErhoehung(uebungId)
    return {
      typ: 'erhoehung',
      nachricht: `Alle Sätze mit max. Wdh. ✓ – Beim nächsten Training +${erhoehung} kg empfohlen!`,
    }
  }
  return { typ: null, nachricht: null }
}

/**
 * Prüft ob ein Deload empfohlen wird (nach Woche 6).
 * @param {number} woche - Aktuelle Trainingswoche (1-basiert)
 * @returns {boolean}
 */
export function istDeloadEmpfohlen(woche) {
  return woche > 0 && woche % 6 === 0
}

/**
 * Berechnet den Prozentsatz erledigter Übungen für ein Workout.
 * @param {Object[]} uebungen - Array von Übungszuständen
 * @returns {number} 0-100
 */
export function berechneAbschlussProz(uebungen) {
  if (!uebungen?.length) return 0
  const erledigt = uebungen.filter((u) => u.abgeschlossen).length
  return Math.round((erledigt / uebungen.length) * 100)
}

/**
 * Formatiert ein Datum als deutsches Datumsstring.
 */
export function formatDatum(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

/**
 * Gibt das heutige Datum als ISO-String (YYYY-MM-DD) zurück.
 */
export function heuteDatum() {
  return new Date().toISOString().split('T')[0]
}
