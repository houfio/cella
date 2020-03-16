export const fieldLabels = {
  name: {
    label: 'Naam',
    type: 'text'
  },
  description: {
    label: 'Beschrijving',
    type: 'text'
  },
  purchasePrice: {
    label: 'Inkoopprijs (ex. BTW)',
    type: 'number'
  },
  price: {
    label: 'Verkoopprijs (ex. BTW)',
    type: 'number'
  },
  stock: {
    label: 'Voorraad',
    type: 'number'
  },
  minimumStock: {
    label: 'Minimum voorraad',
    type: 'number'
  },
  color: {
    label: 'Kleur',
    type: 'text'
  },
  size: {
    label: 'Grootte (cm)',
    type: 'number'
  },
  weight: {
    label: 'Gewicht (gram)',
    type: 'number'
  },
  packageAmount: {
    label: 'Aantal',
    type: 'number'
  }
};

export const categoryLabels = {
  clothing: 'Kleding',
  lighting: 'Tierlantijn',
  decoration: 'Decoratie'
};

export const extraFields = {
  clothing: ['color', 'size'],
  lighting: ['weight'],
  decoration: ['size', 'color', 'packageAmount']
};
