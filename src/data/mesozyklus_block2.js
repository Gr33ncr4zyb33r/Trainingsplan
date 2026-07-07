/**
 * Mesozyklus Block 2 – "Bankdrücken- & Arm-Fokus Block 2"
 * Woche 9–16
 *
 * Aufbauend auf Block 1 – Startgewichte basieren auf Block-1-Testwerten.
 * Wenn Testwerte abweichen: proportionale Skalierung gemäß MESOZYKLUS_BLOCK1.skalierungsregel
 *
 * Basisannahmen (Block-1-Testwerte):
 *   Bankdrücken 1RM:   115 kg  → W9-Startgewicht: 115 × 0,78 ≈ 90 kg
 *   Kniebeuge Test:    105 kg  → W9-Startgewicht: 105 × 0,90 ≈ 95 kg
 *   SZ-Curl:           50 kg × 8–10 Wdh.  → W9: 50 kg, zurück auf 4×8
 *   OH Trizeps KH:     16 kg/Hand × 10    → W9: 16 kg, zurück auf 4×10
 *
 * Gleiche Fortschrittsregeln wie Block 1.
 * Gleiche Gewichts-Konvention: KH-Übungen = Gewicht je Hand.
 */

// ── Hilfsfunktionen ────────────────────────────────────────────────────────

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

function ms(beschreibung) {
  return { beschreibung, erreicht: null, datum_erreicht: null }
}

const mo  = (uebungen) => ({ id: 'montag',      tag: 'Montag',      wochentag: 1, uebungen })
const do_ = (uebungen) => ({ id: 'donnerstag',  tag: 'Donnerstag',  wochentag: 4, uebungen })
const fr  = (uebungen) => ({ id: 'freitag',     tag: 'Freitag',     wochentag: 5, uebungen })

// ── Wochen-Definitionen ────────────────────────────────────────────────────

const wochen = [

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 9 – Akkumulation
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 9,
    phase: 'Akkumulation',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   4, 5,  5,  90,   'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 72.5, 'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  80,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 22.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 65,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 18,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 30,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 6,  8,  95,   'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 87.5, 'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 55,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 45,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 70,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 77.5, 'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 25,   'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 50,   'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 16,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 28,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 67.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 14,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 10 – Akkumulation
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 10,
    phase: 'Akkumulation',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   4, 5,  5,  92.5, 'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 75,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  82.5, 'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 22.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 65,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 18,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 30,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 6,  8,  97.5, 'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 90,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 55,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 45,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 72.5, 'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 80,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 25,   'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 50,   'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 16,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 28,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 70,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 14,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 11 – Akkumulation (Meilenstein-Woche)
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 11,
    phase: 'Akkumulation',
    meilenstein: ms('Neue Bestleistung im Akkumulationsblock – alle 4 Sätze Bankdrücken bei 95 kg × 4 absolviert'),
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   4, 4,  4,  95,   'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 77.5, 'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  85,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 25,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 67.5, 'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 20,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 32.5, 'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 6,  8,  100,  'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 92.5, 'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 57.5, 'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 47.5, 'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 75,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 82.5, 'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 27.5, 'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 52.5, 'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 18,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 30,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 72.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 16,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 12 – Deload
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 12,
    phase: 'Deload',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   3, 5,  5,  70,   'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 8,  10, 57.5, 'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 8,  10, 65,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 20,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     2, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             2, 8,  10, 55,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     2, 10, 12, 14,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          2, 10, 15, 25,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     3, 8,  8,  70,   'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 70,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  2, 10, 12, 45,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    2, 10, 12, 37.5, 'double_progression'),
        ex('wadenheben',             'Wadenheben',                    3, 12, 15, 60,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 8,  10, 65,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 20,   'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    3, 8,  10, 42.5, 'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',3, 8,  10, 14,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 2, 10, 12, 24,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   2, 10, 12, 57.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               2, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             2, 15, 20, 12,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          2, 10, 12, 16,   'double_progression'),
        ex('dips',                   'Dips',                          2, 8,  10, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 13 – Intensivierung
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 13,
    phase: 'Intensivierung',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   3, 3,  3,  100,  'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           3, 5,  6,  82.5, 'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 5,  6,  87.5, 'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 25,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 67.5, 'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 20,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 32.5, 'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 5,  6,  102.5,'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 6,  8,  95,   'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 57.5, 'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 47.5, 'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 75,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 85,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 27.5, 'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 52.5, 'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 18,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 30,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 72.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 16,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 14 – Intensivierung
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 14,
    phase: 'Intensivierung',
    meilenstein: null,
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken',                   3, 3,  3,  102.5,'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           3, 5,  6,  85,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 5,  6,  90,   'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 25,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 70,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 20,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 35,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 5,  6,  105,  'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 6,  8,  97.5, 'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 60,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 50,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 77.5, 'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 87.5, 'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 27.5, 'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 55,   'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 20,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 32,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 75,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 16,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 15 – Intensivierung (Opener vor Testwoche)
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 15,
    phase: 'Intensivierung',
    meilenstein: ms('Opener-Woche: 105 kg × 2 Wdh. Bankdrücken – alles bereit für den Block-2-Test!'),
    tage: [
      mo([
        ex('bankdruecken',          'Bankdrücken (Opener)',           2, 2,  2,  105,  'linear'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff',           2, 4,  5,  85,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 5,  6,  92.5, 'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 27.5, 'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 70,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 20,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 35,   'double_progression'),
      ]),
      do_([
        ex('kniebeuge',              'Kniebeuge',                     4, 5,  6,  107.5,'linear'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 6,  8,  100,  'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 60,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 50,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 80,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 90,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 30,   'double_progression'),
      ]),
      fr([
        ex('sz-curl',                'SZ-Curl ★',                    4, 8,  12, 55,   'double_progression'),
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH (je KH) ★',4, 10, 12, 20,   'double_progression'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 34,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 77.5, 'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 18,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOCHE 16 – Testwoche
  // Gesamtvergleich: Woche 1 (Block-1-Start) vs. Woche 16 (Block-2-Ende)
  // ────────────────────────────────────────────────────────────────────────
  {
    wochenNummer: 16,
    phase: 'Testwoche',
    meilenstein: ms('Block-2-Testwoche: Bankdrücken 1RM-Ziel 120–122,5 kg · SZ-Curl-Ziel 55 kg × 8–10 · OH Trizeps 20 kg/Hand × 10 · Kniebeuge 115–117,5 kg'),
    tage: [
      mo([
        // 1RM-Versuch: Ziel 120 kg (ambitioniert: 122,5 kg)
        ex('bankdruecken',          'Bankdrücken – 1RM-Versuch ★',   1, 1,  1,  120,  'test'),
        ex('bankdruecken-backoff',   'Bankdrücken Backoff (leicht)',   2, 8,  10, 75,   'linear'),
        ex('langhantelrudern',       'Langhantelrudern',              3, 6,  8,  82.5, 'linear'),
        ex('schulter-kh',            'Schulterdrücken KH (je KH)',    3, 8,  12, 25,   'double_progression'),
        ex('klimmzuege',             'Klimmzüge',                     3, 5,  8,  0,    'linear'),
        ex('enges-bankdruecken',     'Enges Bankdrücken',             3, 8,  12, 65,   'double_progression'),
        ex('schraegbankcurl',        'Schrägbankcurl KH (je KH)',     3, 10, 12, 18,   'double_progression'),
        ex('kabel-trizeps',          'Kabel Trizepsdrücken',          3, 10, 15, 32.5, 'double_progression'),
      ]),
      do_([
        // Kniebeuge-Test: Ziel 115–117,5 kg
        ex('kniebeuge',              'Kniebeuge – Leistungstest ★',  2, 3,  5,  115,  'test'),
        ex('rum-kreuzheben',         'Rumänisches Kreuzheben',        3, 8,  10, 87.5, 'linear'),
        ex('beinstrecker',           'Beinstrecker',                  3, 10, 15, 55,   'double_progression'),
        ex('beinbeuger',             'Beinbeuger',                    3, 10, 15, 45,   'double_progression'),
        ex('wadenheben',             'Wadenheben',                    4, 12, 20, 75,   'double_progression'),
        ex('latzug',                 'Latzug / Klimmzüge',            3, 6,  10, 80,   'linear'),
        ex('face-pulls',             'Face Pulls',                    3, 15, 20, 27.5, 'double_progression'),
      ]),
      fr([
        // SZ-Curl-Ziel-Test: 55 kg × 8–10 Wdh.
        ex('sz-curl',                'SZ-Curl – Zieltest ★',         4, 8,  10, 55,   'test'),
        // OH Trizeps-Ziel-Test: 20 kg/Hand × 10 Wdh.
        ex('overhead-trizeps-kh',    'Overhead Trizeps KH – Zieltest ★',4,10,10, 20,  'test'),
        ex('schraegbank-kh',         'Schrägbankdrücken KH (je KH)', 3, 8,  12, 30,   'linear'),
        ex('kabelrudern',            'Kabelrudern',                   3, 8,  12, 70,   'linear'),
        ex('klimmzuege-breit',       'Klimmzüge breit',               3, 5,  8,  0,    'linear'),
        ex('seitheben',              'Seitheben (je KH)',             3, 12, 20, 16,   'double_progression'),
        ex('hammer-curls',           'Hammer Curls (je KH)',          3, 8,  12, 20,   'double_progression'),
        ex('dips',                   'Dips',                          3, 8,  12, 0,    'linear'),
      ]),
    ],
  },

]

// ── Ziel-Statements Block 2 ────────────────────────────────────────────────

const ziele = [
  {
    id: 'b2-bankdruecken-1rm',
    beschreibung: 'Bankdrücken 1RM von 115 kg auf 120–122,5 kg steigern (Testtag: Ende Woche 16)',
    kategorie: 'kraft',
    zieldatum: 'Ende Woche 16',
    fortschrittsHinweis: 'Fortschritt = (aktuelles Arbeitsgewicht − 90 kg) / (120 − 90) × 100 %',
    erreicht: null,
    datum_erreicht: null,
    positiver_text: 'Neuer 1RM! +5–7,5 kg gegenüber Block 1 – das ist echter Langzeitfortschritt! 🔥',
  },
  {
    id: 'b2-armumfang',
    beschreibung: 'Armumfang weitere 0,5 cm zulegen (kumulativ seit Block-1-Start: 1–1,5 cm)',
    kategorie: 'optik',
    zieldatum: 'Ende Woche 16',
    messpunkte: ['Woche 1 (Block-1-Start)', 'Woche 8 (Block-1-Ende)', 'Woche 16 (Block-2-Ende + Foto)'],
    messhinweis: 'Dreifach-Vergleich: Block-1-Startfoto vs. Block-1-Ende vs. Block-2-Ende. Armumfang entspannt messen.',
    erreicht: null,
    datum_erreicht: null,
    positiver_text: 'Sichtbarer kumulativer Aufbau – 16 Wochen im Ergebnis! 📸',
  },
  {
    id: 'b2-handball-konsistenz',
    beschreibung: '16 von 16 Trainingswochen (Block 1 + Block 2) ohne Beinmuskelkater vor Dienstags-Handball',
    kategorie: 'konsistenz',
    zieldatum: 'Ende Woche 16',
    zielWert: 16,
    hinweis: 'Streak aus Block 1 läuft weiter – nicht zurücksetzen. Kniebeuge Donnerstag, Handball Dienstag: mind. 5 Tage Abstand.',
    erreicht: null,
    datum_erreicht: null,
    positiver_text: 'Konstanz-Champion 🏆 Zwei Blöcke, 16 Wochen, kein Kompromiss beim Handball!',
  },
]

// ── Export ─────────────────────────────────────────────────────────────────

export const MESOZYKLUS_BLOCK2 = {
  id: 'block2',
  name: 'Bankdrücken- & Arm-Fokus Block 2',
  startWoche: 9,
  endWoche: 16,
  phasen: [
    { name: 'Akkumulation',   wocheVon: 9,  wocheBis: 11 },
    { name: 'Deload',         wocheVon: 12, wocheBis: 12 },
    { name: 'Intensivierung', wocheVon: 13, wocheBis: 15 },
    { name: 'Testwoche',      wocheVon: 16, wocheBis: 16 },
  ],
  // Gesamtvergleich für Abschluss-Screen (Woche 1 vs. Woche 16)
  gesamtvergleich: {
    indikatoren: [
      { id: 'bankdruecken',        label: 'Bankdrücken 1RM',         startBlock1: '107,5 kg',  zielBlock2: '120–122,5 kg' },
      { id: 'kniebeuge',           label: 'Kniebeuge (Leistungstest)',startBlock1: '85 kg × 6–8',zielBlock2: '115–117,5 kg × 3–5' },
      { id: 'sz-curl',             label: 'SZ-Curl',                  startBlock1: '40 kg × 8', zielBlock2: '55 kg × 8–10' },
      { id: 'overhead-trizeps-kh', label: 'Overhead Trizeps (je KH)',startBlock1: '12 kg × 10',zielBlock2: '20 kg × 10' },
    ],
  },
  wochen,
  ziele,
}
