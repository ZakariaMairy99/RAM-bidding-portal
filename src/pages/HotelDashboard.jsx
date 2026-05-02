import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getOffers } from '../services/salesforceApi'
import { ranking, priceEvolution, myHistory } from '../data/mockData'
import ConsultationsList from '../components/ConsultationsList'
import OfferKpiGrid from '../components/OfferKpiGrid'
import RankingTable from '../components/RankingTable'
import PriceChart from '../components/PriceChart'
import HistoryTimeline from '../components/HistoryTimeline'
import OfferDetails from '../components/OfferDetails'
import LoadingState from '../components/LoadingState'

export default function HotelDashboard() {
  const [offers, setOffers] = useState([])
  const [activeOffer, setActiveOffer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    async function loadOffers() {
      const list = await getOffers()
      setOffers(list)
      const active = list.find((o) => o.status === 'active') || list[0] || null
      setActiveOffer(active)
      setLoading(false)
    }

    loadOffers()
  }, [])

  if (loading) {
    return <LoadingState />
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-ram-gold" />
          <span className="text-ram-gold text-[10px] uppercase tracking-[0.3em] font-medium">
            Espace Hotel
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="heading-display text-3xl md:text-4xl text-ram-secondary mb-2">
              Hotel Atlas Sky Airport
            </h1>
            <p className="text-ink-muted text-sm">Bienvenue Karim Bennani · Casablanca</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
            <span className="text-xs font-medium text-green-700">Bidding actif · maj temps reel</span>
          </div>
        </div>
      </motion.div>

      <ConsultationsList consultations={offers} active={activeOffer} onSelect={setActiveOffer} />

      <OfferKpiGrid
        offers={offers}
        activeOffer={activeOffer}
        showDetails={showDetails}
        onToggleDetails={() => setShowDetails((value) => !value)}
        ranking={ranking}
      />

      {showDetails ? (
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <OfferDetails offer={activeOffer} />
          </div>
          <StaticSubmissionPanel activeOffer={activeOffer} />
        </div>
      ) : null}

      <div className="mt-8">
        <RankingTable ranking={ranking} />
      </div>

      <div className="mt-8">
        <PriceChart data={priceEvolution} />
      </div>

      <div className="mt-8">
        <HistoryTimeline history={myHistory} />
      </div>
    </div>
  )
}

function StaticSubmissionPanel({ activeOffer }) {
  const floor = activeOffer?.priceFloor ?? 450
  const ceiling = activeOffer?.priceCeiling ?? 1200
  const proposedPrice = Math.max(floor, Math.min(ceiling, floor + 165))

  return (
    <div className="card-premium overflow-hidden">
      <div className="px-6 py-4 bg-gradient-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern-dark opacity-30" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-px bg-ram-gold" />
            <span className="text-ram-gold text-[10px] uppercase tracking-[0.24em] font-medium">
              Soumission
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg">Nouvelle proposition tarifaire</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
            Tarif propose
          </div>
          <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-display font-bold text-lg text-ram-secondary flex items-center justify-between">
            <span>{proposedPrice}</span>
            <span className="text-ink-muted text-sm">MAD</span>
          </div>
          <p className="text-[11px] text-ink-muted mt-1.5 leading-relaxed">
            Plage autorisee : {floor} - {ceiling} MAD · Best marche actuel :{' '}
            <strong>{ranking[0]?.price || '-'}</strong> MAD
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50">
          <div className="font-semibold text-blue-900 text-sm">Position projetee : #3</div>
          <div className="text-[13px] text-blue-800 mt-1">Vous gardez votre place actuelle.</div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
            Note interne (optionnel)
          </div>
          <div className="w-full px-4 py-3 border border-gray-200 rounded-lg text-ink-subtle text-sm leading-relaxed">
            Justification ou contexte de cette soumission...
          </div>
        </div>

        <button className="w-full btn-premium-primary justify-center text-sm">
          Soumettre le tarif
        </button>

        <div className="pt-3 border-t border-gray-100 text-[11px] text-ink-muted leading-relaxed">
          Soumission <strong>horodatee et notifiee</strong> a la Direction Achats RAM.
        </div>
      </div>
    </div>
  )
}
