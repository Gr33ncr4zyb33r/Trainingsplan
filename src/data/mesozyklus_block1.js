/**
 * Mesozyklus Block 1 – "Bankdrücken- & Arm-Fokus Block 1"
 * Woche 1–8
 *
 * Datenmodell:
 *   Mesozyklus > Phasen > Wochen > Trainingstage > Übungen
 *
 * Fortschrittsregeln:
 *   'linear'            – Gewicht erhöhen wenn ALLE Sätze der Vorwoche wdhMax-Wiederholungen erreicht
 *                         UND als „erreicht" markiert wurden. Kein automatisches Reduzieren bei
 *                         Nicht-Erreichen: gleiches Gewicht nächste Woche wiederholen.
 *   'double_progression'– Wdh. steigern bis wdhMax, dann +2,5 kg und zurück auf wdhMin
 *   'test'              – Maximaltest, kein automatisches Regeln
 *
 * Gewichte KH-Übungen = Gewicht JE HAND (je KH).
 * Bankdrücken, Kniebeuge, SZ-Curl = Langhantelgewicht gesamt.
 */

// ── Hilfsfunktionen ────────────────────────────────────────────────────────

/**
 * Erstellt ein vollständiges Übungs-Objekt.
 * @param {string} id
 * @param {string} name
 * @param {number} saetze
 * @param {number} wdhMin
 * @param {number} wdhMax
 * @param {number} zielgewicht  kg (LH gesamt oder KH je Hand)
 * @param {'linear'|'double_progression'|'test'} regel
 * @returns {object}
 */
function ex(id, name, saetze, wdhMin, wdhMax, zielgewicht, regel) {
  return {
    id,
    name,
    saetze,
    wdhMin,
    wdhMax,
    zielgewicht,
    fortschrittsregel: regel,
    ist_wert: null,
    ziel_erreicht: null,
    notiz_bei_nicht_erreicht: '',
  }
}

/** Erstellt einen Meilenstein-Eintrag. */
function ms(beschreibung) {
  return { beschreibung, erreicht: null, datum_erreicht: null }
}

/** Trainingstag-Wrapper-Helfer */
const mo  = (uebungen) => ({ id: 'montag',      tag: 'Montag',      wochentag: 1, uebungen })
const do_ = (uebungen) => ({ id: 'donnerstag',  tag: 'Donnerstag',  wochentag: 4, uebungen })
const fr  = (uebungen) => ({ id: 'freitag',     tag: 'Freitag',     wochentag: 5, uebungen })

// ── Wochen-Definitionen ────────────────────────────────────────────────────

const wochen = [

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 1 – Akkumulation
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 1,
    phase: 'Akkumulation',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   4, 5,  5,  85,   'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 67.5, 'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  70,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 20,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 60,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 14,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 25,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 6,  8,  85,   'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 80,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 50,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 40,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 60,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 65,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 20,   'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 40,   'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 12,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 24,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 60,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 12,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 16,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 2 – Akkumulation
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 2,
    phase: 'Akkumulation',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   4, 5,  5,  87.5, 'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 70,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  72.5, 'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 20,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 60,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 14,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 25,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 6,  8,  87.5, 'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 82.5, 'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 50,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 40,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 62.5, 'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 67.5, 'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 20,   'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 40,   'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 12,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 24,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 62.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 12,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 16,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 3 – Akkumulation (Meilenstein-Woche)
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 3,
    phase: 'Akkumulation',
    meilenstein: ms('3 Wochen konstante Steigerung Bankdrücken geschafft – alle 4 Sätze bei 90 kg × 4 Wdh. absolviert'),
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   4, 4,  4,  90,   'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 72.5, 'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  75,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 22.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 62.5, 'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 16,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 27.5, 'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 6,  8,  90,   'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 85,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 52.5, 'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 42.5, 'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 65,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 70,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 22.5, 'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 42.5, 'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 14,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 26,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 65,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 14,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 18,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 4 – Deload (~70 % Akkumulations-Gewichte, weniger Sätze)
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 4,
    phase: 'Deload',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   3, 5,  5,  65,   'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 55,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 8,  10, 60,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 17.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     2, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             2, 8,  10, 50,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     2, 10, 12, 12,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          2, 10, 15, 22.5, 'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     3, 8,  8,  60,   'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 65,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  2, 10, 12, 40,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    2, 10, 12, 32.5, 'double_progression'),
        ex('wadenheben',             'Wadenheben',                    3, 12, 15, 50,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 8,  10, 55,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 17.5, 'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    3, 8,  10, 32.5, 'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',3, 8,  10, 10,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 2, 10, 12, 20,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   2, 10, 12, 50,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               2, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             2, 15, 20, 10,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          2, 10, 12, 14,   'double_progression'),
        ex('dips',                   'Dips',                          2, 8,  10, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 5 – Intensivierung
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 5,
    phase: 'Intensivierung',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   3, 3,  3,  95,   'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           3, 5,  6,  77.5, 'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 5,  6,  77.5, 'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 22.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 62.5, 'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 16,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 27.5, 'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 5,  6,  92.5, 'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 6,  8,  87.5, 'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 52.5, 'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 42.5, 'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 65,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 72.5, 'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 22.5, 'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 42.5, 'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 14,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 26,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 65,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 14,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 18,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 6 – Intensivierung
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 6,
    phase: 'Intensivierung',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   3, 3,  3,  97.5, 'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           3, 5,  6,  80,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 5,  6,  80,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 22.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 65,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 16,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 30,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 5,  6,  95,   'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 6,  8,  90,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 55,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 45,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 67.5, 'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 75,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 22.5, 'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 45,   'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 14,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 28,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 67.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 14,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 18,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 7 – Intensivierung (Opener vor Testwoche)
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 7,
    phase: 'Intensivierung',
    meilenstein: ms('Opener-Woche: 100 kg × 2 Wdh. Bankdrücken – bereit für den Test!'),
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken (Opener)',           2, 2,  2,  100,  'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 4,  5,  80,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 5,  6,  82.5, 'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 25,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 65,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 18,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 30,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 5,  6,  97.5, 'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 6,  8,  92.5, 'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 55,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 45,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 70,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 77.5, 'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 25,   'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 47.5, 'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 16,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 30,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 70,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 14,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 8 – Testwoche
  // Hauptindikatoren: 1RM-Versuche / Leistungstest
  // Accessories: leicht/erhaltend
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 8,
    phase: 'Testwoche',
    meilenstein: ms('Testwoche Block 1: Bankdrücken 1RM-Ziel 112,5–115 kg · SZ-Curl-Ziel 50 kg × 8–10 · OH Trizeps 16 kg/Hand × 10'),
    tage: [
      mo([
        // 1RM-Versuch Bankdrücken: Ziel 112,5 kg (ambitioniert: 115 kg)
        ex('bankdruecken',          'Bankdrücken – 1RM-Versuch ★',   1, 1,  1,  112.5,'test'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff (leicht)',   2, 8,  10, 70,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  75,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 22.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 60,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 16,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 27.5, 'double_progression'),
      ]),
      do_([
        // Kniebeuge-Test: Ziel 105 kg × 3–5 Wdh.
        ex('kniebeuge',              'Kniebeuge – Leistungstest ★',  2, 3,  5,  105,  'test'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 80,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 50,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 40,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 65,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 70,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 22.5, 'double_progression'),
      ]),
      fr([
        // SZ-Curl-Ziel-Test: 50 kg × 8–10 Wdh.
        ex('sz-curl',                'SZ-Curl – Zieltest ★',         4, 8,  10, 50,   'test'),
        // OH Trizeps-Ziel-Test: 16 kg/Hand × 10 Wdh.
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH – Zieltest ★',4,10,10, 16,  'test'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 26,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 62.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 14,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 18,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

]

// ── Ziel-Statements Block 1 ────────────────────────────────────────────────

const ziele = [
  {
    id: 'b1-bankdruecken-1rm',
    beschreibung: 'Bankdrücken 1RM von 107,5 kg auf 112,5–115 kg steigern (Testtag: Ende Woche 8)',
    kategorie: 'kraft',
    zieldatum: 'Ende Woche 8',
    fortschrittsHinweis: 'Fortschritt = (aktuelles Arbeitsgewicht − 85 kg) / (112,5 − 85) × 100 %',
    erreicht: null,
    datum_erreicht: null,
    positiver_text: 'Stark! Neuer Bankdrücken-Bestwert erreicht 💪',
  },
  {
    id: 'b1-armumfang',
    beschreibung: 'Armumfang um 0,5–1 cm sichtbar vergrößern',
    kategorie: 'optik',
    zieldatum: 'Ende Woche 8',
    messpunkte: ['Woche 1 (Startmessung)', 'Woche 8 (Endmessung + Foto-Vergleich)'],
    messhinweis: 'Arm entspannt messen, immer dieselbe Stelle (Bizepsmitte). Foto von Woche 1 und Woche 8 vergleichen.',
    erreicht: null,
    datum_erreicht: null,
    positiver_text: 'Sichtbarer Fortschritt – Maßband lügt nicht! 📏',
  },
  {
    id: 'b1-handball-konsistenz',
    beschreibung: '8 von 8 Trainingswochen ohne Beinmuskelkater vor Dienstags-Handball abschließen',
    kategorie: 'konsistenz',
    zieldatum: 'Ende Woche 8',
    zielWert: 8,
    hinweis: 'Kniebeuge ist am Donnerstag – mindestens 4 Tage vor dem Dienstags-Handball. Bei Muskelkater: Gewicht reduzieren oder Übung anpassen.',
    erreicht: null,
    datum_erreicht: null,
    positiver_text: 'Konstanz-Champion! Alle 8 Wochen ohne Kompromiss beim Handball 🤾',
  },
]

// ── Export ─────────────────────────────────────────────────────────────────

export const MESOZYKLUS_BLOCK1 = {
  id: 'block1',
  name: 'Bankdrücken- & Arm-Fokus Block 1',
  startWoche: 1,
  endWoche: 8,
  phasen: [
    { name: 'Akkumulation',   wocheVon: 1, wocheBis: 3 },
    { name: 'Deload',         wocheVon: 4, wocheBis: 4 },
    { name: 'Intensivierung', wocheVon: 5, wocheBis: 7 },
    { name: 'Testwoche',      wocheVon: 8, wocheBis: 8 },
  ],
  // WICHTIG: Wenn Testwerte von Woche 8 vorliegen, Block-2-Startgewichte
  // proportional berechnen: BD W9 = neuer_1RM * 0,78 / Kniebeuge * 0,90
  skalierungsregel: {
    bankdruecken: { faktor: 0.78, basisAnnahme: 115 },
    kniebeuge:    { faktor: 0.90, basisAnnahme: 105 },
    hinweis: 'Runde Langhantel auf 2,5 kg, Kurzhantel auf nächste verfügbare Stufe',
  },
  wochen,
  ziele,
}
