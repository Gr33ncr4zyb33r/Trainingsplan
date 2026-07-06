/**
 * Custom Hooks für localStorage Datenpersistenz
 */
import { useState, useCallback } from 'react'

/**
 * Wie useState, aber der Wert wird in localStorage gespeichert.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('localStorage error:', error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error('localStorage removeItem error:', error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Key-Präfixe für localStorage
 */
export const STORAGE_KEYS = {
  // Benutzerdefinierter Trainingsplan
  TRAININGSPLAN_CUSTOM: 'tp_trainingsplan_custom',
  // Aktuelles Workout: { [tagId]: { datum, uebungen: [...], abgeschlossen } }
  WORKOUT_SESSIONS: 'tp_workout_sessions',
  // Trainingshistorie: Array von abgeschlossenen Workouts
  TRAINING_HISTORY: 'tp_training_history',
  // Persönliche Rekorde: { [uebungId]: { gewicht, wdh, datum } }
  PERSONAL_RECORDS: 'tp_personal_records',
  // Körpergewicht: Array von { datum, gewicht }
  KOERPERGEWICHT: 'tp_koerpergewicht',
  // Einstellungen
  EINSTELLUNGEN: 'tp_einstellungen',
  // Aktuelle Sollgewichte (werden durch Progression angepasst)
  AKTUELLE_GEWICHTE: 'tp_aktuelle_gewichte',
  // Trainingswoche-Zähler (für Deload-Hinweis)
  TRAININGSWOCHE: 'tp_trainingswoche',
}
