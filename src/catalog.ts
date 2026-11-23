export const devices = {
  pro: {
    name: 'Vital Pro',
    price: 479,
    wavelengths: 4,
    controls: '10 minute auto shutoff',
    source: 'https://vitalredlight.com/products/vital-pro',
  },
  pro2: {
    name: 'Vital Pro 2.0',
    price: 599,
    wavelengths: 9,
    controls: 'Touchscreen with presets',
    source: 'https://vitalredlight.com/products/vital-pro-2-0',
  },
} as const

export const listedDimensions = '12.5 × 8.5 × 2.3 in'
export const priceDifference = devices.pro2.price - devices.pro.price
