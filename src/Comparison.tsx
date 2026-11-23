import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { devices, listedDimensions, priceDifference } from './catalog'

const copy = {
  kicker: 'Vital page prototype',
  title: 'Show the upgrade on the Vital Pro page',
  intro: `Both versions start on the $${devices.pro.price} Vital Pro page. B explains what the extra $${priceDifference} buys while shoppers are still deciding.`,
  groupLabel: 'Choose a page version',
  current: 'Current page',
  proposed: 'Proposed page',
  imageLabel: 'Concept image of a tabletop red light panel',
  imageNote: 'Concept image',
  productType: 'Tabletop red light panel',
  wavelengths: `${devices.pro.wavelengths} wavelengths`,
  timer: 'Automatic shutoff after 10 minutes',
  stand: 'Tabletop stand included',
  addToCart: 'Add to cart',
  added: 'Vital Pro added to the demo cart',
  compare: 'Compare with Vital Pro 2.0',
  summary: `For $${priceDifference} more, get touchscreen presets and ${devices.pro2.wavelengths} wavelengths. Same panel size.`,
  compareLabel: 'Vital Pro and Vital Pro 2.0 comparison',
  rowPrice: 'Price',
  rowControls: 'Controls',
  rowWavelengths: 'Wavelengths',
  proControls: devices.pro.controls,
  pro2Controls: devices.pro2.controls,
  common: `Both panels measure ${listedDimensions} and offer targeted coverage.`,
  viewPro2: 'View Vital Pro 2.0',
  caption: 'This demo recreates the Vital Pro purchase area. The original model links and full device comparison are available in both versions.',
  source: 'View the live Vital Pro page',
} as const

const fullComparison = 'https://cdn.shopify.com/s/files/1/0637/6973/9375/files/find_you_device.png?v=1766570965'

export default function Comparison() {
  const content = copy
  const [variant, setVariant] = useState<'a' | 'b'>('a')
  const [added, setAdded] = useState(false)
  const isProposed = variant === 'b'

  function chooseVariant(value: 'a' | 'b') {
    if (value === variant) return
    setVariant(value)
    setAdded(false)
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
            <div className="prototype-image-crop">
              <img src={`${import.meta.env.BASE_URL}panel-study.jpg`} alt={content.imageLabel} width={1672} height={941} loading="lazy" />
            </div>
            <figcaption>{content.imageNote}</figcaption>
          </figure>
          <div className="prototype-product">
            <div className="comparison-mock-head">
              <div>
                <p>{content.productType}</p>
                <h3>{devices.pro.name}</h3>
              </div>
              <strong className="prototype-price">${devices.pro.price}</strong>
            </div>
            <div className="prototype-models" role="group" aria-label="Models">
              <span aria-current="page">Pro 1.0</span>
              <a href={devices.pro2.source} target="_blank" rel="noreferrer">Pro 2.0</a>
              <a className="prototype-full-comparison" href={fullComparison} target="_blank" rel="noreferrer">Compare devices</a>
            </div>
            {isProposed && (
              <details className="prototype-compare">
                <summary>
                  <span>{content.compare}</span>
                  <span className="prototype-compare-price">${devices.pro2.price}</span>
                  <ChevronDown size={17} aria-hidden="true" />
                  <small>{content.summary}</small>
                </summary>
                <div className="prototype-compare-content">
                  <table className="comparison-table" aria-label={content.compareLabel}>
                    <thead>
                      <tr><td></td><th scope="col">Pro</th><th scope="col">Pro 2.0</th></tr>
                    </thead>
                    <tbody>
                      <tr><th scope="row">{content.rowPrice}</th><td>${devices.pro.price}</td><td>${devices.pro2.price}</td></tr>
                      <tr><th scope="row">{content.rowControls}</th><td>{content.proControls}</td><td>{content.pro2Controls}</td></tr>
                      <tr><th scope="row">{content.rowWavelengths}</th><td>{devices.pro.wavelengths}</td><td>{devices.pro2.wavelengths}</td></tr>
                    </tbody>
                  </table>
                  <p>{content.common}</p>
                  <div className="comparison-product-links">
                    <a href={devices.pro2.source} target="_blank" rel="noreferrer">{content.viewPro2}</a>
                  </div>
                </div>
              </details>
            )}
            <ul className="comparison-feature-list">
              <li>{content.wavelengths}</li>
              <li>{content.timer}</li>
              <li>{content.stand}</li>
            </ul>
            <button className="primary-link prototype-cart-button" type="button" onClick={() => setAdded(true)}>
              {content.addToCart}
            </button>
            <p className="prototype-cart-feedback" role="status">{added ? content.added : ''}</p>
          </div>
        </div>
      </div>
      <p className="comparison-caption">
        {content.caption} <a href={devices.pro.source} target="_blank" rel="noreferrer">{content.source}</a>
      </p>
    </section>
  )
}
