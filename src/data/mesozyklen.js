/**
 * Mesozyklen – kombinierter Index
 *
 * Exportiert beide Blöcke und stellt Hilfsfunktionen bereit,
 * mit denen die bestehende App-Architektur die Mesozyklus-Daten
 * als wöchentliche Trainingspläne konsumieren kann.
 */

import { MESOZYKLUS_BLOCK1 } from './mesozyklus_block1'
import { MESOZYKLUS_BLOCK2 } from './mesozyklus_block2'

export { MESOZYKLUS_BLOCK1, MESOZYKLUS_BLOCK2 }

/** Alle Mesozyklen in Reihenfolge */
export const ALLE_MESOZYKLEN = [MESOZYKLUS_BLOCK1, MESOZYKLUS_BLOCK2]

// ── Lookup-Hilfsfunktionen ─────────────────────────────────────────────────

/**
 * Gibt den Mesozyklus für eine globale Wochennummer zurück.
 * @param {number} wochenNummer 1-basiert (1–8 = Block 1, 9–16 = Block 2)
 * @returns {object|null}
 */
export function getMesozyklus(wochenNummer) {
  return ALLE_MESOZYKLEN.find(
    (m) => wochenNummer >= m.startWoche && wochenNummer <= m.endWoche
  ) ?? null
}

/**
 * Gibt die Wochen-Daten für eine globale Wochennummer zurück.
 * @param {number} wochenNummer
 * @returns {object|null}
 */
export function getWoche(wochenNummer) {
  const mesozyklus = getMesozyklus(wochenNummer)
  return mesozyklus?.wochen.find((w) => w.wochenNummer === wochenNummer) ?? null
}

/**
 * Gibt den Trainingstag für eine globale Wochennummer und einen Tag zurück.
 * @param {number} wochenNummer
 * @param {'montag'|'donnerstag'|'freitag'} tagId
 * @returns {object|null}
 */
export function getTrainingsTag(wochenNummer, tagId) {
  const woche = getWoche(wochenNummer)
  return woche?.tage.find((t) => t.id === tagId) ?? null
}

/**
 * Gibt den aktuellen Phasen-Namen für eine Wochennummer zurück.
 * @param {number} wochenNummer
 * @returns {string|null}
 */
export function getPhase(wochenNummer) {
  return getWoche(wochenNummer)?.phase ?? null
}

/**
 * Konvertiert einen Mesozyklus-Trainingstag in das Format,
 * das von der bestehenden App-Architektur (useTrainingsplan) erwartet wird.
 * Damit kann eine bestehende Woche nahtlos als "aktueller Plan" genutzt werden.
 *
 * @param {number} wochenNummer
 * @param {'montag'|'donnerstag'|'freitag'} tagId
 * @returns {object|null} Tag-Objekt im trainingsplan.js-Format
 */
export function getMesozyklusTagAlsPlan(wochenNummer, tagId) {
  const tag = getTrainingsTag(wochenNummer, tagId)
  if (!tag) return null

  return {
    id:         tag.id,
    tag:        tag.tag,
    wochentag:  tag.wochentag,
    uebungen:   tag.uebungen.map((u) => ({
      id:          u.id,
      name:        u.name,
      sollgewicht: u.zielgewicht,
      saetze:      u.saetze,
      wdhMin:      u.wdhMin,
      wdhMax:      u.wdhMax,
      // Mesozyklus-spezifische Felder (werden von bestehender App ignoriert,
      // können von zukünftigen Komponenten genutzt werden)
      fortschrittsregel: u.fortschrittsregel,
    })),
  }
}

/**
 * Gibt alle Hauptindikatoren-Übungen für einen Mesozyklus zurück.
 * (Übungen mit ★ im Namen oder spezifische IDs)
 * @param {object} mesozyklus MESOZYKLUS_BLOCK1 oder MESOZYKLUS_BLOCK2
 * @returns {Array<{wochenNummer, tagId, uebung}>}
 */
export function getHauptindikatorenVerlauf(mesozyklus) {
  const hauptindikatorIds = ['bankdruecken', 'kniebeuge', 'sz-curl', 'overhead-trizeps-kh']
  const verlauf = []

  mesozyklus.wochen.forEach((woche) => {
    woche.tage.forEach((tag) => {
      tag.uebungen.forEach((uebung) => {
        if (hauptindikatorIds.includes(uebung.id)) {
          verlauf.push({
            wochenNummer: woche.wochenNummer,
            phase:        woche.phase,
            tagId:        tag.id,
            uebung,
          })
        }
      })
    })
  })

  return verlauf
}

/**
 * Berechnet den Fortschrittsprozentsatz eines Ziels.
 * Gilt für Kraft-Ziele (linearer Fortschritt Startgewicht → Zielgewicht).
 * @param {number} aktuellesGewicht
 * @param {number} startGewicht
 * @param {number} zielGewicht
 * @returns {number} 0–100
 */
export function berechneZielFortschritt(aktuellesGewicht, startGewicht, zielGewicht) {
  const delta = zielGewicht - startGewicht
  if (delta <= 0) return 100
  const fortschritt = aktuellesGewicht - startGewicht
  return Math.min(100, Math.max(0, Math.round((fortschritt / delta) * 100)))
}

/**
 * Prüft ob bei einer Übung 2x in Folge "nicht erreicht" eingetragen wurde.
 * Gibt den automatischen Hinweistext zurück oder null.
 * @param {Array<{ziel_erreicht: boolean|null}>} letzteZweiWochen  [vorletzteWoche, letzteWoche]
 * @returns {string|null}
 */
export function pruefeGewichtZuHoch(letzteZweiWochen) {
  if (letzteZweiWochen.length < 2) return null
  const [vorletzte, letzte] = letzteZweiWochen.slice(-2)
  if (vorletzte?.ziel_erreicht === false && letzte?.ziel_erreicht === false) {
    return 'Gewicht evtl. zu hoch angesetzt – reduziere um 5–10 % und baue wieder auf.'
  }
  return null
}
