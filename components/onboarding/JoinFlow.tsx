"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Heart, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface JoinFlowProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { id: 1, title: 'Welcome', icon: Sparkles },
  { id: 2, title: 'About You', icon: User },
  { id: 3, title: 'Interests', icon: Heart },
  { id: 4, title: 'Finish', icon: Check },
]

const interests = [
  '🍷 Wine Tastings',
  '♠️ Spades Tournaments',
  '💃 Dancing & Line Stepping',
  '😂 Comedy Shows',
  '🧘 Wellness & Fitness',
  '🎵 Live Music',
  '🍽️ Fine Dining',
  '🎨 Art & Culture',
  '🏌️ Golf & Sports',
  '✈️ Travel Events',
]

export function JoinFlow({ isOpen, onClose }: JoinFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    interests: [] as string[],
    hearAbout: '',
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // TODO: Implement actual submission
    console.log('Form submitted:', formData)
    alert('Welcome to The Grown & Sexy Movement! 🎉')
    onClose()
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="glass-crimson rounded-3xl overflow-hidden h-full md:h-auto max-h-[90vh] flex flex-col glow-crimson">
              {/* Header */}
              <div className="p-6 border-b border-[#DC143C]/20 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-display font-bold text-gradient-crimson">
                    Join the Movement
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-crimson transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-black/50 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#DC143C] to-[#DAA520]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Steps */}
                <div className="flex justify-between mt-4">
                  {steps.map((step) => {
                    const StepIcon = step.icon
                    const isActive = currentStep === step.id
                    const isCompleted = currentStep > step.id

                    return (
                      <div
                        key={step.id}
                        className={cn(
                          'flex flex-col items-center gap-2 transition-all',
                          isActive || isCompleted ? 'opacity-100' : 'opacity-40'
                        )}
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                            isCompleted
                              ? 'bg-gold-gradient text-black'
                              : isActive
                              ? 'bg-crimson-gradient text-white glow-crimson'
                              : 'bg-black/50 text-cream/50'
                          )}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-cream/60 hidden sm:block">{step.title}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Welcome */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center py-8">
                        <div className="text-6xl mb-6">✨</div>
                        <h3 className="text-3xl font-display font-bold text-gradient-gold mb-4">
                          Welcome to Something Special
                        </h3>
                        <p className="text-lg text-cream/80 leading-relaxed max-w-md mx-auto">
                          The Grown & Sexy Movement is an exclusive community for individuals ages 30+ who are living their best lives.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        <div className="glass rounded-xl p-4 flex gap-4">
                          <div className="text-3xl">🎉</div>
                          <div>
                            <h4 className="font-semibold text-[#DAA520] mb-1">Exclusive Events</h4>
                            <p className="text-sm text-cream/70">Monthly spades tournaments, wine tastings, and more</p>
                          </div>
                        </div>

                        <div className="glass rounded-xl p-4 flex gap-4">
                          <div className="text-3xl">🤝</div>
                          <div>
                            <h4 className="font-semibold text-[#DAA520] mb-1">Authentic Connections</h4>
                            <p className="text-sm text-cream/70">Meet like-minded individuals who value growth</p>
                          </div>
                        </div>

                        <div className="glass rounded-xl p-4 flex gap-4">
                          <div className="text-3xl">💎</div>
                          <div>
                            <h4 className="font-semibold text-[#DAA520] mb-1">Member Benefits</h4>
                            <p className="text-sm text-cream/70">Early access, special pricing, and VIP experiences</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: About You */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-display font-bold text-gradient-gold mb-6">
                        Tell Us About Yourself
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-cream/80 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3 bg-black/50 border border-[#DC143C]/30 rounded-lg focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] outline-none transition-all text-cream"
                            placeholder="First name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-cream/80 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-3 bg-black/50 border border-[#DC143C]/30 rounded-lg focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] outline-none transition-all text-cream"
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cream/80 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-[#DC143C]/30 rounded-lg focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] outline-none transition-all text-cream"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cream/80 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-[#DC143C]/30 rounded-lg focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] outline-none transition-all text-cream"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-cream/80 mb-2">
                            Age Range *
                          </label>
                          <select
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            className="w-full px-4 py-3 bg-black/50 border border-[#DC143C]/30 rounded-lg focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] outline-none transition-all text-cream"
                          >
                            <option value="">Select...</option>
                            <option value="30-39">30-39</option>
                            <option value="40-49">40-49</option>
                            <option value="50-59">50-59</option>
                            <option value="60+">60+</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-cream/80 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-3 bg-black/50 border border-[#DC143C]/30 rounded-lg focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] outline-none transition-all text-cream"
                            placeholder="Your city"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Interests */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-display font-bold text-gradient-gold mb-2">
                          What Interests You?
                        </h3>
                        <p className="text-cream/70">Select all that apply</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {interests.map((interest) => {
                          const isSelected = formData.interests.includes(interest)

                          return (
                            <button
                              key={interest}
                              onClick={() => toggleInterest(interest)}
                              className={cn(
                                'px-4 py-3 rounded-xl border-2 transition-all text-left',
                                isSelected
                                  ? 'bg-crimson-gradient border-[#DC143C] text-white glow-crimson'
                                  : 'bg-black/50 border-[#DC143C]/30 hover:border-[#DC143C]/60 text-cream/80'
                              )}
                            >
                              <span className="text-sm font-medium">{interest}</span>
                            </button>
                          )
                        })}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cream/80 mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          value={formData.hearAbout}
                          onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
                          className="w-full px-4 py-3 bg-black/50 border border-[#DC143C]/30 rounded-lg focus:border-[#DC143C] focus:ring-1 focus:ring-[#DC143C] outline-none transition-all text-cream"
                        >
                          <option value="">Select...</option>
                          <option value="friend">Friend or Family</option>
                          <option value="social">Social Media</option>
                          <option value="event">At an Event</option>
                          <option value="search">Online Search</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Finish */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center py-8">
                        <div className="text-6xl mb-6">🎊</div>
                        <h3 className="text-3xl font-display font-bold text-gradient-gold mb-4">
                          Almost There!
                        </h3>
                        <p className="text-lg text-cream/80 leading-relaxed max-w-md mx-auto">
                          Review your information and join The Grown & Sexy Movement
                        </p>
                      </div>

                      <div className="glass rounded-xl p-6 space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-cream/60">Name:</span>
                          <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-cream/60">Email:</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-cream/60">Age Range:</span>
                          <span className="font-medium">{formData.age}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-cream/60">City:</span>
                          <span className="font-medium">{formData.city}</span>
                        </div>
                        <div className="border-t border-cream/10 pt-4">
                          <span className="text-cream/60 text-sm block mb-2">Interests:</span>
                          <div className="flex flex-wrap gap-2">
                            {formData.interests.map((interest) => (
                              <span
                                key={interest}
                                className="px-3 py-1 bg-crimson-gradient rounded-full text-xs text-white"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="glass rounded-xl p-4 flex gap-3">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 w-4 h-4 rounded border-[#DC143C]/30 bg-black/50 text-[#DC143C] focus:ring-[#DC143C]"
                        />
                        <label htmlFor="terms" className="text-sm text-cream/70">
                          I agree to the Terms of Service and Privacy Policy. I understand that membership is for individuals ages 30+.
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-[#DC143C]/20 flex justify-between gap-4 flex-shrink-0">
                {currentStep > 1 && (
                  <MagneticButton
                    variant="outline"
                    onClick={handleBack}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </MagneticButton>
                )}

                <div className="flex-1" />

                {currentStep < steps.length ? (
                  <MagneticButton
                    variant="primary"
                    onClick={handleNext}
                    className="flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                ) : (
                  <MagneticButton
                    variant="secondary"
                    onClick={handleSubmit}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Join the Movement
                  </MagneticButton>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
