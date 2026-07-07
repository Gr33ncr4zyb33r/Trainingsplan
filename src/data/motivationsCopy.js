/**
 * Motivations-Content & Microcopy
 *
 * Enthält alle motivierenden Texte, Bestätigungen, Streak-Texte,
 * Nicht-Erreicht-Unterstützung und Block-Abschluss-Content.
 */

// ── Positive Bestätigungstexte (Ziel erreicht) ────────────────────────────
// 5-8 Varianten je Kategorie, damit sich Wiederholungen vermeiden

export const MICROCOPY_KRAFT = [
  'Stark! Neuer Bankdrücken-Bestwert erreicht 💪',
  'Neue persönliche Bestleistung – das ist echter Fortschritt! 🏋️',
  'PR geknackt! Harte Arbeit zahlt sich aus 🔥',
  'Gewicht bewegt, Grenze verschoben. Weiter so! ⚡',
  'Das war kein Zufall – das ist Konsequenz! 💥',
  'Neuer 1RM – du bist stärker als letzte Woche. Wirklich. 🎯',
  'Bestleistung! Jedes Kilo dazugelernt. 🚀',
]

export const MICROCOPY_OPTIK = [
  'Sichtbarer Fortschritt – Maßband lügt nicht! 📏',
  'Armumfang wächst – die Arbeit zeigt Wirkung 💪',
  'Optisches Ziel erreicht! Foto-Vergleich sagt mehr als Worte 📸',
  'Der Körper reagiert auf konsequentes Training. Gut gemacht! ✨',
  'Sichtbare Veränderung. Das ist dein Ergebnis 🌟',
]

export const MICROCOPY_KONSISTENZ = [
  'Konstanz-Champion! Alle Wochen durchgezogen 🏆',
  'Woche für Woche – du erscheinst. Das ist die halbe Miete! ✅',
  'Alle geplanten Einheiten absolviert – Respekt! 🎖️',
  'Kein Handball-Muskelkater, kein Kompromiss. Meisterhaft! ⚽',
  'Serie am Laufen! Wer regelmäßig erscheint, gewinnt langfristig 📅',
  'Streak hält! Du beweist: Disziplin schlägt Motivation ⏱️',
]

export const MICROCOPY_DOPPEL_BLOCK = [
  'Konstanz-Champion 🏆 Zwei Blöcke in Folge – das ist Programm-Meisterschaft!',
  'Back-to-Back-Erfolg! Wer zwei Blöcke durchzieht, ist kein Anfänger mehr 🔑',
  'Doppelt stark! Block 1 + Block 2 abgehakt – du bist im System 💎',
]

// ── Nicht-Erreicht – unterstützende Texte ─────────────────────────────────

export const NICHT_ERREICHT_TEXTE = [
  'Kein Problem – nächste Woche gleiche Last. Fortschritt ist nicht immer linear.',
  'Manchmal braucht der Körper mehr Zeit. Gleiches Gewicht nächste Woche ist Strategie, kein Rückschritt.',
  'Nicht jeder Tag ist ein PR-Tag. Dranbleiben und die Last erneut angehen.',
  'Konsistenz schlägt Perfektionismus. Nächste Woche wieder versuchen!',
  'Das passiert den Besten. Gleiche Last, frischer Kopf – das wird klappen.',
]

export const GEWICHT_ZU_HOCH_HINWEIS =
  'Gewicht evtl. zu hoch angesetzt – reduziere um 5–10 % und baue wieder auf. Zwei Fehlversuche in Folge sind ein klares Signal, nicht eine Niederlage.'

// ── Streak-Texte ──────────────────────────────────────────────────────────

/** @param {number} streak Anzahl vollständig abgehakter Wochen */
export function getStreakText(streak) {
  if (streak === 0) return 'Starte deinen ersten Streak – erste Woche zählt!'
  if (streak === 1) return '1 Woche abgehakt – der Streak beginnt! 🔥'
  if (streak === 2) return '2 Wochen in Folge – der Rhythmus sitzt! 🔥🔥'
  if (streak === 3) return '3 Wochen Streak! Das wird zur Gewohnheit 💪'
  if (streak === 4) return '4 Wochen! Ein ganzer Monat Konstanz – top! 🏅'
  if (streak < 8)  return `${streak} Wochen Streak – starke Serie! ⚡`
  if (streak === 8) return '8 Wochen! Mesozyklus Block 1 komplett durchgezogen 🏆'
  if (streak < 16) return `${streak} Wochen Streak – du bist ein Konstanz-Maschine! 🤖`
  return `${streak} Wochen Streak – Legendenstatus 👑`
}

// ── Wochenrückblick-Texte ─────────────────────────────────────────────────

/**
 * Generiert den Wochenrückblick-Text basierend auf Fortschritt zum Bankdrücken-Ziel.
 * @param {number} aktuell Aktuelles Arbeitsgewicht Bankdrücken
 * @param {number} start Startgewicht Block-Beginn
 * @param {number} ziel Zielgewicht (1RM)
 * @returns {string}
 */
export function getWochenrueckblickText(aktuell, start, ziel) {
  const gesamtDelta = ziel - start
  const aktuellerFortschritt = aktuell - start
  const prozent = gesamtDelta > 0 ? Math.round((aktuellerFortschritt / gesamtDelta) * 100) : 0
  const klampedProzent = Math.min(100, Math.max(0, prozent))

  if (klampedProzent >= 100) return 'Bankdrücken-Ziel erreicht oder übertroffen! 🎯'
  if (klampedProzent >= 80)  return `Du bist bei ${klampedProzent} % deines Bankdrücken-Ziels – Endspurt! 🔥`
  if (klampedProzent >= 50)  return `Du bist bei ${klampedProzent} % deines Bankdrücken-Ziels – guter Fortschritt!`
  if (klampedProzent >= 25)  return `Du bist bei ${klampedProzent} % deines Bankdrücken-Ziels – Basis wird gelegt.`
  return `Du bist bei ${klampedProzent} % deines Bankdrücken-Ziels – der Block hat gerade begonnen!`
}

// ── Block-Abschluss-Screen Content ───────────────────────────────────────

export const BLOCK1_ABSCHLUSS = {
  titel: 'Block 1 abgeschlossen! 🎉',
  untertitel: 'Bankdrücken- & Arm-Fokus Block 1 · Woche 1–8',
  vergleichsUebungen: [
    { id: 'bankdruecken',        label: 'Bankdrücken 1RM',            startWert: '107,5 kg' },
    { id: 'kniebeuge',           label: 'Kniebeuge (3–5 Wdh.-Test)',   startWert: '85 kg × 6–8' },
    { id: 'sz-curl',             label: 'SZ-Curl',                     startWert: '40 kg × 8 Wdh.' },
    { id: 'overhead-trizeps-kh', label: 'Overhead Trizeps (je KH)',    startWert: '12 kg × 10 Wdh.' },
  ],
  abschlussText:
    'Acht Wochen harte Arbeit. Vergleiche deine Testwerte mit den Startwerten – das ist dein Fortschritt. Block 2 wartet.',
  cta: 'Block 2 starten →',
}

export const BLOCK2_ABSCHLUSS = {
  titel: 'Block 2 abgeschlossen! 🏆',
  untertitel: 'Bankdrücken- & Arm-Fokus Block 2 · Woche 9–16',
  vergleichsUebungen: [
    { id: 'bankdruecken',        label: 'Bankdrücken 1RM',            startWert: '107,5 kg (Block-1-Start)' },
    { id: 'kniebeuge',           label: 'Kniebeuge (3–5 Wdh.-Test)',   startWert: '85 kg × 6–8 (Block-1-Start)' },
    { id: 'sz-curl',             label: 'SZ-Curl',                     startWert: '40 kg × 8 (Block-1-Start)' },
    { id: 'overhead-trizeps-kh', label: 'Overhead Trizeps (je KH)',    startWert: '12 kg × 10 (Block-1-Start)' },
  ],
  gesamtVergleichHinweis:
    'Vergleich: Woche 1 (Block-1-Start) vs. Woche 16 (Block-2-Ende) – so weit bist du gekommen!',
  abschlussText:
    'Sechzehn Wochen kontinuierliches Training. Zwei vollständige Mesozyklen. Das ist programmierter Fortschritt – und du hast ihn umgesetzt.',
  cta: 'Ergebnisse speichern & feiern 🎉',
}

// ── Block-Rückblick bei Block-2-Start ────────────────────────────────────

export const BLOCK2_RUECKBLICK = {
  titel: 'So hast du dich seit Block 1 entwickelt',
  untertitel: 'Deine neuen Startwerte basieren auf deinen Block-1-Testwerten.',
  hinweis:
    'Wenn die Testwerte von Block 1 von den Planzahlen abweichen, wurden die Startgewichte proportional angepasst. Dein Streak aus Block 1 läuft weiter!',
}

// ── Deload-Hinweise ───────────────────────────────────────────────────────

export const DELOAD_TEXTE = {
  woche4:  'Deload-Woche (Woche 4) – Gewichte auf ~70 %. Qualität vor Quantität. Erhol dich aktiv.',
  woche12: 'Deload-Woche (Woche 12) – bewusst runterschalten. Dein Körper baut Kraft in der Ruhe auf.',
  allgemein: 'Diese Woche ist Absicht, kein Rückschritt. Leicht trainieren für mehr Kraft danach.',
}

// ── Phasen-Erklärungen ────────────────────────────────────────────────────

export const PHASEN_INFO = {
  Akkumulation:   'Basisarbeit – Volumen aufbauen, Technik festigen, Gewichte schrittweise erhöhen.',
  Deload:         'Aktive Erholung – Belastung reduzieren, Qualität halten, Körper regenerieren lassen.',
  Intensivierung: 'Schwere Woche – weniger Sätze, mehr Gewicht, maximale Spannung pro Satz.',
  Testwoche:      'Leistungstest – zeig, was du gelernt hast. Alle Hauptindikatoren auf den Prüfstand.',
}
