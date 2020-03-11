export const fieldLabels = {
  name: 'Naam',
  description: 'Beschrijving',
  purchasePrice: 'Inkoopprijs',
  price: 'Verkoopprijs',
  stock: 'Voorraad',
  minimumStock: 'Minimum voorraad',
  color: 'Kleur',
  size: 'Grootte',
  weight: 'gewicht',
  packageAmount: 'Aantal'
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
