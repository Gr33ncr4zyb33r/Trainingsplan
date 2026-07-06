/**
 * Statischer Trainingsplan
 * Montag, Donnerstag, Freitag
 * Jede Übung hat: Name, Sollgewicht, Sätze, Wiederholungsbereich (min/max)
 */

export const STANDARD_TRAININGSPLAN = [
  {
    id: 'montag',
    tag: 'Montag',
    // Wochentag-Index: 1 = Montag
    wochentag: 1,
    uebungen: [
      {
        id: 'bankdruecken',
        name: 'Bankdrücken',
        sollgewicht: 80,
        saetze: 3,
        wdhMin: 6,
        wdhMax: 8,
      },
      {
        id: 'bankdruecken-backoff',
        name: 'Bankdrücken Backoff',
        sollgewicht: 70,
        saetze: 2,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'langhantelrudern',
        name: 'Langhantelrudern',
        sollgewicht: 70,
        saetze: 3,
        wdhMin: 6,
        wdhMax: 8,
      },
      {
        id: 'schulter-kh',
        name: 'Schulterdrücken Kurzhanteln',
        sollgewicht: 20,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'klimmzuege',
        name: 'Klimmzüge',
        sollgewicht: 0,
        saetze: 3,
        wdhMin: 5,
        wdhMax: 10,
      },
      {
        id: 'enges-bankdruecken',
        name: 'Enges Bankdrücken',
        sollgewicht: 60,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'schraegbank-curl',
        name: 'Schrägbankcurl',
        sollgewicht: 14,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'kabel-trizeps',
        name: 'Kabel Trizepsdrücken',
        sollgewicht: 25,
        saetze: 3,
        wdhMin: 10,
        wdhMax: 15,
      },
    ],
  },
  {
    id: 'donnerstag',
    tag: 'Donnerstag',
    // Wochentag-Index: 4 = Donnerstag
    wochentag: 4,
    uebungen: [
      {
        id: 'kniebeuge',
        name: 'Kniebeuge',
        sollgewicht: 100,
        saetze: 3,
        wdhMin: 5,
        wdhMax: 8,
      },
      {
        id: 'rum-kreuzheben',
        name: 'Rumänisches Kreuzheben',
        sollgewicht: 80,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'beinstrecker',
        name: 'Beinstrecker',
        sollgewicht: 50,
        saetze: 3,
        wdhMin: 10,
        wdhMax: 15,
      },
      {
        id: 'beinbeuger',
        name: 'Beinbeuger',
        sollgewicht: 40,
        saetze: 3,
        wdhMin: 10,
        wdhMax: 15,
      },
      {
        id: 'wadenheben',
        name: 'Wadenheben',
        sollgewicht: 60,
        saetze: 4,
        wdhMin: 12,
        wdhMax: 20,
      },
      {
        id: 'latzug',
        name: 'Latzug / Klimmzüge',
        sollgewicht: 70,
        saetze: 3,
        wdhMin: 6,
        wdhMax: 10,
      },
      {
        id: 'face-pulls',
        name: 'Face Pulls',
        sollgewicht: 20,
        saetze: 3,
        wdhMin: 12,
        wdhMax: 20,
      },
    ],
  },
  {
    id: 'freitag',
    tag: 'Freitag',
    // Wochentag-Index: 5 = Freitag
    wochentag: 5,
    uebungen: [
      {
        id: 'schraegbank-kh',
        name: 'Schrägbankdrücken Kurzhanteln',
        sollgewicht: 24,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'kabelrudern',
        name: 'Kabelrudern',
        sollgewicht: 60,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'klimmzuege-breit',
        name: 'Klimmzüge breit',
        sollgewicht: 0,
        saetze: 3,
        wdhMin: 5,
        wdhMax: 10,
      },
      {
        id: 'seitheben',
        name: 'Seitheben',
        sollgewicht: 12,
        saetze: 3,
        wdhMin: 12,
        wdhMax: 20,
      },
      {
        id: 'sz-curls',
        name: 'SZ-Curls',
        sollgewicht: 30,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'hammer-curls',
        name: 'Hammer Curls',
        sollgewicht: 16,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 12,
      },
      {
        id: 'overhead-trizeps',
        name: 'Overhead Trizeps',
        sollgewicht: 20,
        saetze: 3,
        wdhMin: 10,
        wdhMax: 15,
      },
      {
        id: 'dips',
        name: 'Dips',
        sollgewicht: 0,
        saetze: 3,
        wdhMin: 8,
        wdhMax: 15,
      },
    ],
  },
]

/**
 * Gibt den Trainingstag für den aktuellen Wochentag zurück.
 * null wenn kein Training heute.
 */
export function getHeutigerTrainingTag(plan = STANDARD_TRAININGSPLAN) {
  const heute = new Date().getDay() // 0=So, 1=Mo, ... 6=Sa
  return plan.find((t) => t.wochentag === heute) ?? null
}

/**
 * Gibt einen Trainingstag nach ID zurück.
 */
export function getTrainingTagById(id, plan = STANDARD_TRAININGSPLAN) {
  return plan.find((t) => t.id === id) ?? null
}
