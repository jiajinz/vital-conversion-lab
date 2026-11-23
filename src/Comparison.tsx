import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { comparisonRows, devices, priceDifference } from './catalog'

const models = ['pro', 'pro2'] as const
type Model = (typeof models)[number]

const copy = {
  kicker: 'Vital page prototype',
  title: 'Show the upgrade on the Vital Pro page',
  intro: `Both versions start on the $${devices.pro.price} Vital Pro page. B explains what the extra $${priceDifference} buys while shoppers are still deciding.`,
  groupLabel: 'Choose a page version',
  current: 'Current page',
  proposed: 'Proposed page',
  imageNote: 'Concept image',
  productType: 'Tabletop red light panel',
  stand: 'Tabletop stand included',
  addToCart: 'Add to cart',
  upgrade: `For $${priceDifference} more, Pro 2.0 adds blue and yellow light and touchscreen presets. Same panel size.`,
  baseModel: `Save $${priceDifference} with Pro if you want red and near infrared light with a simple timer. Same panel size.`,
  compareLabel: 'Vital Pro and Vital Pro 2.0 comparison',
  caption: 'This prototype starts on the Vital Pro purchase area. Use the model buttons to preview either product.',
  source: 'View the live Vital Pro page',
} as const

const fullComparison = 'https://cdn.shopify.com/s/files/1/0637/6973/9375/files/find_you_device.png?v=1766570965'

export default function Comparison() {
  const content = copy
  const [variant, setVariant] = useState<'a' | 'b'>('a')
  const [model, setModel] = useState<Model>('pro')
  const [added, setAdded] = useState(false)
  const [comparisonOpen, setComparisonOpen] = useState(false)
  const modelSwitcher = useRef<HTMLDivElement>(null)
  const isProposed = variant === 'b'
  const device = devices[model]
  const otherModel = model === 'pro' ? 'pro2' : 'pro'
  const otherDevice = devices[otherModel]

  function chooseVariant(value: 'a' | 'b') {
    if (value === variant) return
    setVariant(value)
    setAdded(false)
    setComparisonOpen(false)
  }

  function chooseModel(value: Model) {
    if (value === model) return
    setModel(value)
    setAdded(false)
    setComparisonOpen(false)
  }

  function viewOtherModel() {
    chooseModel(otherModel)
    modelSwitcher.current?.querySelector<HTMLButtonElement>(`button[value="${otherModel}"]`)?.focus()
  }

  return (
    <section id="prototype" className="comparison-section" aria-labelledby="comparison-title">
      <div className="comparison-heading">
        <p className="comparison-kicker">{content.kicker}</p>
        <h2 id="comparison-title">{content.title}</h2>
        <p>{content.intro}</p>
      </div>
      <div className="prototype-switcher" role="group" aria-label={content.groupLabel}>
        <button type="button" aria-pressed={variant === 'a'} aria-controls="prototype-panel" onClick={() => chooseVariant('a')}>
          <span>A</span> {content.current}
        </button>
        <button type="button" aria-pressed={isProposed} aria-controls="prototype-panel" onClick={() => chooseVariant('b')}>
          <span>B</span> {content.proposed}
        </button>
      </div>
      <div id="prototype-panel" className="comparison-frame">
        <div className="comparison-mock prototype-buybox">
          <figure className="prototype-image">
            <div className="prototype-image-crop" data-model={model}>
              <img src={`${import.meta.env.BASE_URL}panel-study.jpg`} alt={`Concept illustration for ${device.name}`} width={1672} height={941} loading="lazy" />
            </div>
            <figcaption>{content.imageNote}</figcaption>
          </figure>
          <div className="prototype-product">
            <div className="comparison-mock-head" aria-live="polite" aria-atomic="true">
              <div>
                <p>{content.productType}</p>
                <h3>{device.name}</h3>
              </div>
              <strong className="prototype-price">${device.price}</strong>
            </div>
            <div ref={modelSwitcher} className="prototype-models" role="group" aria-label="Models">
              {models.map(key => (
                <button key={key} type="button" value={key} aria-pressed={model === key} onClick={() => chooseModel(key)}>
                  {devices[key].model}
                </button>
              ))}
              {isProposed ? (
                <button
                  className="prototype-compare-trigger"
                  type="button"
                  aria-expanded={comparisonOpen}
                  aria-controls="model-comparison"
                  onClick={() => setComparisonOpen(open => !open)}
                >
                  Compare devices <ChevronDown size={15} aria-hidden="true" />
                </button>
              ) : (
                <a className="prototype-compare-trigger" href={fullComparison} target="_blank" rel="noreferrer">Compare devices</a>
              )}
            </div>
            {isProposed && (
              <>
                <p className="prototype-upgrade">{model === 'pro' ? content.upgrade : content.baseModel}</p>
                <div id="model-comparison" className="prototype-compare-content" hidden={!comparisonOpen}>
                  <table className="comparison-table" aria-label={content.compareLabel}>
                    <thead>
                      <tr><th scope="col">Feature</th><th scope="col">{devices.pro.model}</th><th scope="col">{devices.pro2.model}</th></tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map(([label, pro, pro2]) => (
                        <tr key={label}><th scope="row">{label}</th><td>{pro}</td><td>{pro2}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="comparison-product-link" type="button" onClick={viewOtherModel}>View {otherDevice.name}</button>
                </div>
              </>
            )}
            <ul className="comparison-feature-list">
              <li>{device.wavelengths} wavelengths</li>
              {model === 'pro2' && <li>Touchscreen with preset programs</li>}
              <li>Automatic shutoff after {device.timerMinutes} minutes</li>
              <li>{content.stand}</li>
            </ul>
            <button className="primary-link prototype-cart-button" type="button" onClick={() => setAdded(true)}>
              {content.addToCart}
            </button>
            <p className="prototype-cart-feedback" role="status">{added ? `${device.name} added to the demo cart` : ''}</p>
          </div>
        </div>
      </div>
      <p className="comparison-caption">
        {content.caption} <a href={devices.pro.source} target="_blank" rel="noreferrer">{content.source}</a>
      </p>
    </section>
  )
}
