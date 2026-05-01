import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, Trophy, Clock, Users } from 'lucide-react'
import { getConsultations, getConsultationDetail, getMyHistory } from '../services/salesforceApi'
import ConsultationsList from '../components/ConsultationsList'
import KpiGrid from '../components/KpiGrid'
import RankingTable from '../components/RankingTable'
import BidForm from '../components/BidForm'
import HistoryTimeline from '../components/HistoryTimeline'
import PriceChart from '../components/PriceChart'
import LoadingState from '../components/LoadingState'

export default function HotelDashboard() {
  const [consultations, setConsultations] = useState([])
  const [activeConsultation, setActiveConsultation] = useState(null)
  const [detail, setDetail] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  // Chargement initial
  useEffect(() => {
    async function loadData() {
      const consults = await getConsultations()
      setConsultations(consults)
      const active = consults.find((c) => c.status === 'active') || consults[0]
      setActiveConsultation(active)
      setLoading(false)
    }
    loadData()
  }, [])

  // Quand la consultation active change
  useEffect(() => {
    if (!activeConsultation) return
    async function loadDetail() {
      const [d, h] = await Promise.all([
        getConsultationDetail(activeConsultation.id),
        getMyHistory(activeConsultation.id),
      ])
      setDetail(d)
      setHistory(h)
    }
    loadDetail()
  }, [activeConsultation])

  if (loading || !detail) {
    return <LoadingState />
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
      {/* Header de page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-ram-gold" />
          <span className="text-ram-gold text-[10px] uppercase tracking-[0.3em] font-medium">
            Espace Hôtel
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="heading-display text-3xl md:text-4xl text-ram-secondary mb-2">
              Hôtel Atlas Sky Airport
            </h1>
            <p className="text-ink-muted text-sm">
              Bienvenue Karim Bennani · Casablanca
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
            <span className="text-xs font-medium text-green-700">
              Bidding actif · maj temps réel
            </span>
          </div>
        </div>
      </motion.div>

      {/* Liste des consultations */}
      <ConsultationsList
        consultations={consultations}
        active={activeConsultation}
        onSelect={setActiveConsultation}
      />

      {/* KPIs */}
      <div className="mt-10">
        <KpiGrid kpis={detail.kpis} />
      </div>

      {/* Grid principal — Ranking + Form */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RankingTable ranking={detail.ranking} />
        </div>
        <div>
          <BidForm
            consultationId={activeConsultation.id}
            currentBid={detail.kpis.myCurrentBid}
            bestPrice={detail.kpis.bestMarketPrice}
          />
        </div>
      </div>

      {/* Chart évolution */}
      <div className="mt-8">
        <PriceChart data={detail.priceEvolution} />
      </div>

      {/* Historique */}
      <div className="mt-8">
        <HistoryTimeline history={history} />
      </div>
    </div>
  )
}
