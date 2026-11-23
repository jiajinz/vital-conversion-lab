import { devices } from './catalog'

type ProductImpactInputs = {
  visitors: number
  purchaseRate: number
  pro2Share: number
  purchaseRateChangePercent: number
  pro2ShareChangePoints: number
}

const isPercentage = (value: number) => value >= 0 && value <= 100

function averageOrderValue(pro2Share: number) {
  const priceGap = devices.pro2.price - devices.pro.price
  return devices.pro.price + priceGap * pro2Share / 100
}

export function calculateProductImpact(input: ProductImpactInputs) {
  const { visitors, purchaseRate, pro2Share, purchaseRateChangePercent, pro2ShareChangePoints } = input
  const scenarioRate = purchaseRate * (1 + purchaseRateChangePercent / 100)
  if (!Number.isInteger(visitors) || visitors < 0 || ![purchaseRate, pro2Share, scenarioRate].every(isPercentage) || !Number.isFinite(pro2ShareChangePoints)) {
    return null
  }

  const scenarioShare = Math.min(100, Math.max(0, pro2Share + pro2ShareChangePoints))
  const baselineOrders = visitors * purchaseRate / 100
  const scenarioOrders = visitors * scenarioRate / 100
  const baselineAov = averageOrderValue(pro2Share)
  const scenarioAov = averageOrderValue(scenarioShare)
  const baselineRevenue = baselineOrders * baselineAov
  const scenarioRevenue = scenarioOrders * scenarioAov

  return {
    purchaseRate: scenarioRate,
    pro2Share: scenarioShare,
    baselineOrders,
    scenarioOrders,
    baselineAov,
    scenarioAov,
    baselineRevenue,
    scenarioRevenue,
    revenueChange: scenarioRevenue - baselineRevenue,
  }
}
