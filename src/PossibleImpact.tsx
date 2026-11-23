import { useState } from 'react'
import { calculateProductImpact } from './productImpact'

const scenarios = {
  moreUpgrades: { purchaseRateChangePercent: 0, pro2ShareChangePoints: 10 },
  morePro: { purchaseRateChangePercent: 3, pro2ShareChangePoints: -15 },
  fewerBuyers: { purchaseRateChangePercent: -5, pro2ShareChangePoints: 10 },
} as const

const scenarioKeys = ['moreUpgrades', 'morePro', 'fewerBuyers'] as const
type ScenarioKey = (typeof scenarioKeys)[number]

const copy = {
  eyebrow: 'Revenue estimate',
  title: 'More orders can still mean less revenue.',
  intro: 'See what could happen to monthly revenue from shoppers who start on the Vital Pro page.',
  chooseScenario: 'Choose a scenario',
  scenarios: {
    moreUpgrades: ['More upgrades', 'The same number of shoppers buy. Up to 10 percentage points of orders shift to the Pro 2.0.'],
    morePro: ['More Pro sales', 'The purchase rate rises 3% relative to baseline. Up to 15 percentage points of orders shift to the Pro.'],
    fewerBuyers: ['Fewer buyers', 'The purchase rate falls 5% relative to baseline, even as more buyers choose the Pro 2.0.'],
  },
  baseline: 'Starting assumptions',
  visitors: 'Monthly Vital Pro page visitors',
  purchaseRate: 'Purchase rate',
  pro2Share: 'Pro 2.0 share of orders',
  result: 'Estimated change in monthly revenue',
  perMonth: ' per month',
  baselineRevenue: 'Baseline revenue',
  scenarioRevenue: 'Revenue in this scenario',
  orders: 'Monthly orders',
  averageOrderValue: 'Average order value',
  invalid: 'Enter a whole visitor count and percentages between 0 and 100. The scenario purchase rate must also stay in that range.',
  note: 'Assumes one device per order at list price. Traffic, purchase rates, and sales mix are hypothetical.',
} as const

const defaults = { visitors: '10000', purchaseRate: '2', pro2Share: '20' }
const fields = [
  { key: 'visitors', max: 100_000_000 },
  { key: 'purchaseRate', max: 100 },
  { key: 'pro2Share', max: 100 },
] as const

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
const percent = (value: number) => `${number.format(value)}%`
const change = (from: number, to: number, format: (value: number) => string) => `${format(from)} → ${format(to)}`

function formatRevenueChange(value: number) {
  const rounded = Math.round(Math.abs(value))
  const sign = rounded === 0 ? '' : value < 0 ? '−' : '+'
  return `${sign}${currency.format(rounded)}`
}

export default function PossibleImpact() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('moreUpgrades')
  const [inputs, setInputs] = useState(defaults)
  const estimation = fields.every(({ key, max }) => inputs[key].trim() !== '' && Number(inputs[key]) <= max)
    ? calculateProductImpact({
      visitors: Number(inputs.visitors),
      purchaseRate: Number(inputs.purchaseRate),
      pro2Share: Number(inputs.pro2Share),
      ...scenarios[scenarioKey],
    })
    : null

  return (
    <section className="impact-section" id="impact" aria-labelledby="impact-title">
      <div className="container editorial-section">
        <div className="section-head">
          <div><p className="eyebrow">{copy.eyebrow}</p><h2 id="impact-title">{copy.title}</h2></div>
          <p>{copy.intro}</p>
        </div>

        <div className="impact-board">
          <div className="impact-controls">
            <fieldset className="outcome-choices">
              <legend className="sr-only">{copy.chooseScenario}</legend>
              <div className="outcome-options">
                {scenarioKeys.map(key => (
                  <label className="outcome-option" key={key}>
                    <input type="radio" name="impact-scenario" value={key} checked={scenarioKey === key} onChange={() => setScenarioKey(key)} />
                    <span>{copy.scenarios[key][0]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="outcome-description">{copy.scenarios[scenarioKey][1]}</p>
            <fieldset className="impact-fields">
              <legend>{copy.baseline}</legend>
              {fields.map(({ key, max }) => (
                <label key={key}>
                  <span>{copy[key]}{key === 'visitors' ? '' : ' (%)'}</span>
                  <input name={key} type="number" min="0" max={max} step={key === 'visitors' ? 1 : 'any'} value={inputs[key]}
                    onChange={event => setInputs(previous => ({ ...previous, [key]: event.target.value }))} />
                </label>
              ))}
            </fieldset>
          </div>

          <div className="impact-result" aria-live="polite" aria-atomic="true">
            <p className="eyebrow">{copy.result}</p>
            {estimation ? (
              <>
                <div className="impact-adjustments">
                  <span>{copy.purchaseRate} <strong>{change(Number(inputs.purchaseRate), estimation.purchaseRate, percent)}</strong></span>
                  <span>{copy.pro2Share} <strong>{change(Number(inputs.pro2Share), estimation.pro2Share, percent)}</strong></span>
                </div>
                <p className="impact-number">{formatRevenueChange(estimation.revenueChange)}<span>{copy.perMonth}</span></p>
                <dl className="impact-result-list">
                  <div><dt>{copy.baselineRevenue}</dt><dd>{currency.format(estimation.baselineRevenue)}</dd></div>
                  <div><dt>{copy.scenarioRevenue}</dt><dd>{currency.format(estimation.scenarioRevenue)}</dd></div>
                  <div><dt>{copy.orders}</dt><dd>{change(estimation.baselineOrders, estimation.scenarioOrders, value => number.format(value))}</dd></div>
                  <div><dt>{copy.averageOrderValue}</dt><dd>{change(estimation.baselineAov, estimation.scenarioAov, value => currency.format(value))}</dd></div>
                </dl>
              </>
            ) : (
              <p className="impact-validation">{copy.invalid}</p>
            )}
            <p className="small-note">{copy.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
