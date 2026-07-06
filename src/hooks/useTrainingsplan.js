import { useMemo, useCallback } from 'react'
import { STANDARD_TRAININGSPLAN } from '../data/trainingsplan'
import { useLocalStorage, STORAGE_KEYS } from './useStorage'

function normalizePlan(plan) {
  if (!Array.isArray(plan) || plan.length === 0) return STANDARD_TRAININGSPLAN
  return plan.map((tag) => ({
    ...tag,
    uebungen: Array.isArray(tag.uebungen) ? tag.uebungen : [],
  }))
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
