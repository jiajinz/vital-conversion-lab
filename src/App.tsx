import { Layers3 } from 'lucide-react'
import Comparison from './Comparison'
import PossibleImpact from './PossibleImpact'
import { StudyMeasurement } from './StudyMethod'
import { devices } from './catalog'

const tests = [
  {
    brand: 'Therabody',
    tone: 'lavender',
    source: 'https://www.jessicagoldmandesign.com/therabody-pdp',
    heading: 'Therabody',
    models: 'Theragun Elite and PRO',
    control: 'The existing Elite product page.',
    variant: 'An option on the Elite page opened a comparison with Theragun PRO.',
    metric: '+13%',
    metricLabel: 'Revenue per visitor',
    result: 'The designer also reported a 12% increase in product page conversion. Sample size and test duration were not published.',
    takeaway: 'Start with the lower priced model and show what the upgrade adds on that page.',
  },
  {
    brand: 'Convertibles',
    tone: 'rose',
    source: 'https://convertibles.dev/blogs/case-studies/help-me-choose-comparison-modal-case-study',
    heading: 'Sports equipment brand',
    models: 'Base and premium models',
    control: 'Two buttons showed the model names.',
    variant: 'Added a link to compare both models side by side. The test also hid a row with only one choice.',
    metric: '$11.14 to $11.43',
    metricLabel: 'Revenue per visitor · Inconclusive',
    result: 'Convertibles ran the test for 14 days. It reported a 62% chance of beating A and a flat mobile result. The retailer’s name was withheld.',
    takeaway: 'Show the key differences near the price. Keep the full comparison optional, especially on mobile.',
  },
] as const

const content = {
  brand: 'Vital Conversion Lab',
  skip: 'Skip to case study',
  nav: ['A/B tests', 'Page prototype', 'Revenue'],
  navLabel: 'Case study sections',
  kicker: 'Vital Red Light · Independent case study',
  deck: 'Shoppers on the $479 Vital Pro page can switch to the $599 Pro 2.0. Would showing what the upgrade adds help them choose?',
  action: 'Compare A and B',
  secondary: 'See the two A/B tests',
  imageAlt: 'Concept illustration of two tabletop panels with red LEDs',
  imageLabel: 'Concept illustration',
  twoModels: 'The two products',
  productSubtitle: 'Both have the same listed dimensions and targeted coverage.',
  products: [
    { device: devices.pro, spec: '4 wavelengths. Automatic shutoff after 10 minutes.' },
    { device: devices.pro2, spec: '9 wavelengths. Touchscreen with presets.' },
  ],
  productSource: 'Product details',
  context: 'The Vital Pro page already lets shoppers switch models and open a full device comparison. This test puts the differences between the two Pro models next to the price.',
  cases: 'How two stores tested model comparisons',
  caseIntro: 'Both tests gave shoppers a way to compare two models from the page they were already on.',
  control: 'Original',
  variant: 'What changed',
  takeaway: 'What I would take from it',
  caseLink: 'See the original case',
} as const

function App() {
  const t = content

  return (
    <>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a className="site-brand" href="#top">
            <span className="brand-mark"><Layers3 size={19} aria-hidden="true" /></span>
            <span>{t.brand}</span>
          </a>
          <div className="header-actions">
            <nav aria-label={t.navLabel}>
              <a href="#evidence">{t.nav[0]}</a>
              <a href="#prototype">{t.nav[1]}</a>
              <a href="#impact">{t.nav[2]}</a>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="container hero" aria-labelledby="case-title">
          <div className="hero-intro">
            <p className="eyebrow"><span className="eyebrow-line" />{t.kicker}</p>
            <h1 id="case-title">What does the <em>extra $120</em> buy?</h1>
            <p className="hero-deck">{t.deck}</p>
            <div className="hero-actions">
              <a className="primary-link" href="#prototype">{t.action}</a>
              <a className="subtle-link" href="#evidence">{t.secondary}</a>
            </div>
          </div>
          <figure className="hero-figure">
            <div className="hero-image-wrap">
              <img src={`${import.meta.env.BASE_URL}panel-study.jpg`} alt={t.imageAlt} width="1672" height="941" fetchPriority="high" />
            </div>
            <figcaption>{t.imageLabel}</figcaption>
          </figure>
        </section>

        <section className="container editorial-section product-overview" aria-labelledby="products-title">
          <div className="section-head">
            <h2 id="products-title">{t.twoModels}</h2>
            <p>{t.productSubtitle}</p>
          </div>
          <div className="product-pair">
            {t.products.map(({ device, spec }) => (
              <article className="product-overview-card" key={device.name}>
                <div><h3>{device.name}</h3><strong>${device.price}</strong></div>
                <p>{spec}</p>
                <a className="source-link" href={device.source} target="_blank" rel="noreferrer">{t.productSource}<span className="sr-only"> · {device.name}</span></a>
              </article>
            ))}
          </div>
          <p className="product-context">{t.context}</p>
        </section>

        <section className="evidence-section" id="evidence" aria-labelledby="evidence-title">
          <div className="container editorial-section">
            <div className="section-head">
              <h2 id="evidence-title">{t.cases}</h2>
              <p>{t.caseIntro}</p>
            </div>
            <div className="precedent-grid">
              {tests.map(test => {
                const item = test
                return (
                  <article className="precedent-card" key={test.brand}>
                    <div className={`precedent-metric ${test.tone}`}>
                      <h3>{item.heading}</h3>
                      <span>{item.models}</span>
                    </div>
                    <div className="precedent-copy">
                      <dl className="case-variants">
                        <div><dt><b>A</b>{t.control}</dt><dd>{item.control}</dd></div>
                        <div><dt><b>B</b>{t.variant}</dt><dd>{item.variant}</dd></div>
                      </dl>
                      <div className="case-result">
                        <strong>{item.metric}</strong>
                        <span>{item.metricLabel}</span>
                      </div>
                      <p className="small-note">{item.result}</p>
                      <div className="case-takeaway">
                        <h4>{t.takeaway}</h4>
                        <p>{item.takeaway}</p>
                      </div>
                      <a className="source-link" href={test.source} target="_blank" rel="noreferrer">{t.caseLink}<span className="sr-only"> · {test.brand}</span></a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <Comparison />
        <PossibleImpact />
        <StudyMeasurement />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <a className="site-brand" href="#top"><span className="brand-mark"><Layers3 size={19} aria-hidden="true" /></span>{t.brand}</a>
            <p>Independent portfolio case study.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
