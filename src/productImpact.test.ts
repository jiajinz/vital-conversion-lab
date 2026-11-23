import { describe, expect, it } from 'vitest'
import { calculateProductImpact } from './productImpact'

const baseline = { visitors: 10_000, purchaseRate: 2, pro2Share: 20 }

describe('product revenue estimates', () => {
  it('projects more revenue when more buyers choose the Pro 2.0 and order count stays flat', () => {
    const result = calculateProductImpact({ ...baseline, purchaseRateChangePercent: 0, pro2ShareChangePoints: 10 })
    expect(result?.baselineAov).toBe(503)
    expect(result?.baselineRevenue).toBe(100_600)
    expect(result?.scenarioOrders).toBeCloseTo(200)
    expect(result?.pro2Share).toBe(30)
    expect(result?.revenueChange).toBeCloseTo(2_400)
  })

  it('can project lower revenue even when more visitors purchase', () => {
    const result = calculateProductImpact({ ...baseline, purchaseRateChangePercent: 3, pro2ShareChangePoints: -15 })
    expect(result?.purchaseRate).toBeCloseTo(2.06)
    expect(result?.pro2Share).toBe(5)
    expect(result?.scenarioOrders).toBeCloseTo(206)
    expect(result?.scenarioAov).toBe(485)
    expect(result?.revenueChange).toBeCloseTo(-690)
  })

  it('caps a shift toward the Pro at the available Pro 2.0 share', () => {
    const result = calculateProductImpact({ ...baseline, pro2Share: 5, purchaseRateChangePercent: 3, pro2ShareChangePoints: -20 })
    expect(result?.pro2Share).toBe(0)
    expect(result?.scenarioAov).toBe(479)
  })

  it('rejects a scenario that would make purchase rate exceed one hundred percent', () => {
    expect(calculateProductImpact({ ...baseline, purchaseRate: 100, purchaseRateChangePercent: 5, pro2ShareChangePoints: 0 })).toBeNull()
  })
})
