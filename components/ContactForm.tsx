'use client'

import { useState, FormEvent, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Debug logging to check environment variables
    console.log('EmailJS Environment Variables:', {
      service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    })

    // Initialize EmailJS once on component mount
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      try {
        emailjs.init(publicKey)
        setIsInitialized(true)
        console.log('EmailJS initialized successfully')
      } catch (error) {
        console.error('Failed to initialize EmailJS:', error)
      }
    } else {
      console.error('EmailJS public key not found in environment variables')
    }
  }, [])

  const validateField = (name: string, value: string): string | null => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    if (name === 'message' && value.trim().length < 10) {
      return 'Message must be at least 10 characters long'
    }

    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Check if EmailJS is initialized
      if (!isInitialized) {
        throw new Error('Email service is not initialized. Please check configuration.')
      }

      // Check if all required environment variables are present
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      
      if (!serviceId || !templateId) {
        throw new Error('Email service configuration is incomplete.')
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'ahwurm1@gmail.com'
        }
      )

      if (response.status !== 200) {
        throw new Error('Failed to send message')
      }

      // Success
      setIsSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setIsSubmitted(false)
      }, 5000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Show error message
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      })
      
      // Fall back to mailto on error
      if (confirm('Failed to send message through the form. Would you like to send via email instead?')) {
        const mailtoLink = `mailto:ahwurm1@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`
        window.location.href = mailtoLink
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border-4 border-accent/50 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
        <p className="text-white/80">Thank you for reaching out. I&apos;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-white mb-2 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-lg text-white placeholder-white/50 transition-all
            ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-accent hover:border-white/30'}
            focus:outline-none focus:bg-white/15`}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-2 text-red-400 text-sm">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-white mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-lg text-white placeholder-white/50 transition-all
            ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-accent hover:border-white/30'}
            focus:outline-none focus:bg-white/15`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-red-400 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-white mb-2 font-medium">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-lg text-white placeholder-white/50 transition-all
            ${errors.subject ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-accent hover:border-white/30'}
            focus:outline-none focus:bg-white/15`}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="mt-2 text-red-400 text-sm">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-white mb-2 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-lg text-white placeholder-white/50 transition-all resize-none
            ${errors.message ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-accent hover:border-white/30'}
            focus:outline-none focus:bg-white/15`}
          placeholder="Tell me more about your project or inquiry..."
        />
        {errors.message && (
          <p className="mt-2 text-red-400 text-sm">{errors.message}</p>
        )}
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-500/20 border-2 border-red-400 rounded-lg">
          <p className="text-red-400 text-sm">{errors.submit}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all transform
          ${isSubmitting 
            ? 'bg-white/20 text-white/50 cursor-not-allowed' 
            : 'bg-accent hover:bg-accent/90 text-primary hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}