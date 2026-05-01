// Données mockées simulant les futures réponses de l'API Salesforce
// Une fois la Connected App configurée par tes collègues, on remplace ces fonctions
// par des appels Apex REST dans services/salesforceApi.js

export const currentHotel = {
  id: 'HTL-ATL-001',
  name: 'Hôtel Atlas Sky Airport',
  contact: 'Karim Bennani',
  email: 'k.bennani@atlassky.ma',
  city: 'Casablanca',
}

export const consultations = [
  {
    id: 'CONS-CMN-2026-04',
    title: 'Escale CMN · Chambre double BB',
    perimeter: 'Casablanca · Chambre double · Bed & Breakfast',
    period: '26 avr. → 31 mai 2026',
    status: 'active',
    launched: '22/04/2026',
    deadline: 'Clôture J+30',
    invitedHotels: 7,
    submissions: 7,
    bestPrice: 615,
    myRank: 3,
    myBid: 695,
    icon: '✈',
    urgent: false,
  },
  {
    id: 'CONS-CMN-2026-05',
    title: 'Escale CMN · Suite équipage Long-Courrier',
    perimeter: 'Casablanca · Suite · BB',
    period: '01 juin → 31 juil. 2026',
    status: 'pending',
    launched: '25/04/2026',
    deadline: 'À soumettre avant 30/04',
    invitedHotels: 5,
    submissions: 0,
    bestPrice: null,
    myRank: null,
    myBid: null,
    icon: '★',
    urgent: true,
  },
  {
    id: 'CONS-RAK-2026-03',
    title: 'Escale RAK · Chambre double BB',
    perimeter: 'Marrakech · Chambre double · BB',
    period: '01 mai → 30 juin 2026',
    status: 'closed',
    launched: '18/04/2026',
    deadline: 'Clôturée',
    invitedHotels: 9,
    submissions: 6,
    bestPrice: 540,
    myRank: 4,
    myBid: 590,
    icon: '◆',
    urgent: false,
  },
]

export const ranking = [
  { rank: 1, hotel: 'Hôtel Onomo Casablanca Aéroport', price: 615, delta: -25, lastUpdate: '11:38', status: 'active', me: false },
  { rank: 2, hotel: 'Hôtel Relax Airport CMN', price: 660, delta: 0, lastUpdate: '10:12', status: 'active', me: false },
  { rank: 3, hotel: 'Hôtel Atlas Sky Airport', price: 695, delta: -25, lastUpdate: '09:14', status: 'active', me: true },
  { rank: 4, hotel: 'Sheraton Casablanca Hotel & Towers', price: 720, delta: 15, lastUpdate: '08:47', status: 'active', me: false },
  { rank: 5, hotel: 'Hôtel Suisse Casablanca', price: 755, delta: 0, lastUpdate: 'Hier', status: 'stable', me: false },
  { rank: 6, hotel: 'Mövenpick Hôtel Casablanca', price: 820, delta: 20, lastUpdate: 'Hier', status: 'active', me: false },
  { rank: 7, hotel: 'Idou Anfa Hôtel', price: 895, delta: 0, lastUpdate: 'il y a 2j', status: 'outdated', me: false },
]

// Historique des soumissions de l'hôtel courant (Atlas Sky)
export const myHistory = [
  { ver: 'v.12', price: 695, rank: 3, total: 7, ts: '26/04/2026 09:14', note: 'Alignement après baisse Onomo', author: 'K. Bennani' },
  { ver: 'v.11', price: 720, rank: 4, total: 7, ts: '25/04/2026 18:42', note: 'Réponse promo concurrente', author: 'K. Bennani' },
  { ver: 'v.10', price: 735, rank: 4, total: 7, ts: '24/04/2026 14:28', note: '—', author: 'K. Bennani' },
  { ver: 'v.9', price: 740, rank: 5, total: 7, ts: '23/04/2026 11:05', note: 'Ajustement saisonnier', author: 'Y. Alami' },
  { ver: 'v.8', price: 755, rank: 5, total: 6, ts: '22/04/2026 09:33', note: '—', author: 'K. Bennani' },
  { ver: 'v.7', price: 765, rank: 5, total: 6, ts: '21/04/2026 16:18', note: 'Première offre weekend', author: 'K. Bennani' },
  { ver: 'v.6', price: 780, rank: 6, total: 6, ts: '20/04/2026 10:00', note: 'Tarif initial soumis', author: 'Direction' },
]

// Évolution prix sur 14 jours pour 5 concurrents principaux
export const priceEvolution = {
  labels: ['J-13', 'J-12', 'J-11', 'J-10', 'J-9', 'J-8', 'J-7', 'J-6', 'J-5', 'J-4', 'J-3', 'J-2', 'J-1', 'Auj.'],
  datasets: [
    { hotel: 'Onomo Aéroport', color: '#C20831', data: [690, 680, 670, 665, 660, 655, 650, 645, 640, 640, 635, 630, 625, 615] },
    { hotel: 'Relax Airport', color: '#4A1E2C', data: [710, 710, 700, 700, 690, 690, 680, 680, 675, 670, 670, 665, 660, 660] },
    { hotel: 'Atlas Sky (vous)', color: '#C9A86A', data: [780, 775, 765, 760, 755, 750, 745, 740, 735, 720, 720, 710, 710, 695] },
    { hotel: 'Sheraton', color: '#6B7280', data: [725, 720, 715, 715, 710, 710, 710, 705, 705, 705, 710, 720, 720, 720] },
    { hotel: 'Mövenpick', color: '#A88A4F', data: [840, 830, 830, 825, 820, 815, 810, 810, 805, 800, 800, 810, 820, 820] },
  ],
}

// Règles de validation tarifaire
export const pricingRules = {
  min: 450,
  max: 1200,
  currency: 'MAD',
  product: 'Chambre double BB',
}

// KPIs consolidés (côté hôtel)
export const hotelKpis = {
  bestMarketPrice: 615,
  myCurrentRank: 3,
  totalCompetitors: 7,
  myCurrentBid: 695,
  gapVsBest: 80,
  gapPercentage: 13.0,
  trend7d: -3.2,
  submissionsToday: 14,
}
