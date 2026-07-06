import { useMemo, useCallback } from 'react'
import { STANDARD_TRAININGSPLAN } from '../data/trainingsplan'
import { useLocalStorage, STORAGE_KEYS } from './useStorage'
import { DEFAULT_EXERCISE_VALUES } from '../data/planDefaults'
import { numberOrDefault } from '../utils/number'

function normalizePlan(plan) {
  if (!Array.isArray(plan) || plan.length === 0) return STANDARD_TRAININGSPLAN
  const normalized = plan
    .filter((tag) => tag && typeof tag.id === 'string' && typeof tag.tag === 'string')
    .map((tag) => ({
      ...tag,
      uebungen: Array.isArray(tag.uebungen)
        ? tag.uebungen
          .filter((uebung) => uebung && typeof uebung.id === 'string' && typeof uebung.name === 'string')
          .map((uebung) => ({
            ...uebung,
            sollgewicht: numberOrDefault(uebung.sollgewicht, DEFAULT_EXERCISE_VALUES.sollgewicht),
            saetze: numberOrDefault(uebung.saetze, DEFAULT_EXERCISE_VALUES.saetze),
            wdhMin: numberOrDefault(uebung.wdhMin, DEFAULT_EXERCISE_VALUES.wdhMin),
            wdhMax: numberOrDefault(uebung.wdhMax, DEFAULT_EXERCISE_VALUES.wdhMax),
          }))
        : [],
    }))

  return normalized.length > 0 ? normalized : STANDARD_TRAININGSPLAN
}

export function useTrainingsplan() {
  const [customPlan, setCustomPlan, removeCustomPlan] = useLocalStorage(
    STORAGE_KEYS.TRAININGSPLAN_CUSTOM,
    null
  )

  const trainingsplan = useMemo(
    () => normalizePlan(customPlan ?? STANDARD_TRAININGSPLAN),
    [customPlan]
  )

  const updateTag = useCallback((tagId, updater) => {
    setCustomPlan((prev) => {
      const basis = normalizePlan(prev ?? STANDARD_TRAININGSPLAN)
      return basis.map((tag) => (
        tag.id === tagId
          ? updater(tag)
          : tag
      ))
    })
  }, [setCustomPlan])

  return {
    trainingsplan,
    updateTag,
    resetPlan: removeCustomPlan,
  }
}
