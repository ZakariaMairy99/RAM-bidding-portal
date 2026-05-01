import axios from 'axios'
import {
  consultations,
  ranking,
  myHistory,
  priceEvolution,
  hotelKpis,
  currentHotel,
} from '../data/mockData'

/**
 * Service API — Couche d'abstraction vers Salesforce
 *
 * MODE ACTUEL : MOCK (en attendant la Connected App de tes collègues)
 *
 * Quand Salesforce sera prêt, il suffira de :
 * 1. Ajouter VITE_SF_INSTANCE_URL et VITE_SF_ACCESS_TOKEN dans .env
 * 2. Passer USE_MOCK à false
 * 3. Les composants React n'ont pas besoin d'être modifiés
 */

const USE_MOCK = true

// Configuration future Salesforce
const sfApi = axios.create({
  baseURL: import.meta.env.VITE_SF_INSTANCE_URL || 'https://your-instance.my.salesforce.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_SF_ACCESS_TOKEN || ''}`,
  },
})

// Latence réseau simulée pour réalisme
const fakeDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

// ============================================================
//   GET — Liste des consultations pour l'hôtel courant
// ============================================================
export async function getConsultations() {
  if (USE_MOCK) {
    await fakeDelay()
    return consultations
  }
  // Endpoint Apex : /services/apexrest/bidding/consultations
  const { data } = await sfApi.get('/services/apexrest/bidding/consultations')
  return data
}

// ============================================================
//   GET — Détail d'une consultation (ranking + KPIs)
// ============================================================
export async function getConsultationDetail(consultationId) {
  if (USE_MOCK) {
    await fakeDelay()
    return {
      ranking,
      kpis: hotelKpis,
      priceEvolution,
    }
  }
  const { data } = await sfApi.get(`/services/apexrest/bidding/consultation/${consultationId}`)
  return data
}

// ============================================================
//   GET — Historique des soumissions de l'hôtel courant
// ============================================================
export async function getMyHistory(consultationId) {
  if (USE_MOCK) {
    await fakeDelay()
    return myHistory
  }
  const { data } = await sfApi.get(`/services/apexrest/bidding/history/${consultationId}`)
  return data
}

// ============================================================
//   POST — Soumettre un nouveau tarif
// ============================================================
export async function submitBid({ consultationId, price, note }) {
  if (USE_MOCK) {
    await fakeDelay(800)
    if (price < 450 || price > 1200) {
      throw new Error('Tarif hors fourchette autorisée (450-1200 MAD)')
    }
    return {
      success: true,
      version: 'v.13',
      timestamp: new Date().toLocaleString('fr-FR'),
      newRank: price <= 614 ? 1 : price <= 659 ? 2 : price <= 694 ? 3 : 4,
    }
  }
  const { data } = await sfApi.post('/services/apexrest/bidding/submit', {
    consultationId,
    price,
    note,
    hotelId: currentHotel.id,
  })
  return data
}

// ============================================================
//   GET — Profil de l'hôtel connecté
// ============================================================
export async function getCurrentHotel() {
  if (USE_MOCK) {
    await fakeDelay(150)
    return currentHotel
  }
  const { data } = await sfApi.get('/services/apexrest/bidding/me')
  return data
}
