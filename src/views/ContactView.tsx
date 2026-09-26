import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Clock, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Shipping Inquiry');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const faqs = [
    {
      q: 'Are all Velvetique formulas safe for sensitive and acne-prone skin?',
      a: 'Yes. Every formula is non-comedogenic, fragrance-free or scented exclusively with low-allergenic cold steam distillates, and evaluated by independent board-certified dermatologists.'
    },
    {
      q: 'How quickly will my order ship?',
      a: 'Orders placed before 2:00 PM PST are packaged and dispatched the same business day from our California atelier. Standard shipping takes 2–4 business days, while Priority Overnight takes 1 business day.'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a 30-day, risk-free satisfaction guarantee. If any product does not agree with your skin, email care@velvetiquebeauty.com for an instant complimentary return label and full refund.'
    },
    {
      q: 'Do you offer international shipping?',
      a: 'Yes, Velvetique ships to over 65 countries worldwide with climate-neutral DHL Express delivery.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8B3A57]">
            Concierge Assistance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#261E20] tracking-tight">
            Connect With Velvetique
          </h1>
          <p className="text-sm text-[#736361] font-light leading-relaxed">
            Our licensed estheticians and customer care team are dedicated to helping you craft your ideal skincare ritual.
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-[#E8DFD7] shadow-2xs space-y-6">
              <h3 className="font-serif text-2xl font-normal text-[#291F21]">
                Atelier Headquarters
              </h3>

              <div className="space-y-4 text-xs text-[#524544]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE9] text-[#8B3A57] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#291F21] text-xs">Flagship Boutique & Lab</strong>
                    <span>450 Beverly Hills Blvd<br />Los Angeles, CA 90210</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE9] text-[#8B3A57] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#291F21] text-xs">Email Concierge</strong>
                    <span>care@velvetiquebeauty.com<br />Response in &lt; 4 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE9] text-[#8B3A57] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#291F21] text-xs">Phone Concierge</strong>
                    <span>+1 (800) 835-8384<br />Toll-free customer care</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE9] text-[#8B3A57] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#291F21] text-xs">Hours of Care</strong>
                    <span>Monday – Friday: 8:00 AM – 6:00 PM PST<br />Saturday: 9:00 AM – 4:00 PM PST</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF4F0] rounded-2xl border border-[#EADBD5] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#8B3A57] shrink-0" />
                <p className="text-[11px] text-[#6E5D5B]">
                  Complimentary virtual 15-minute consultations with our master estheticians are available for all Club members.
                </p>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8DFD7] shadow-sm">
            {formSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#291F21]">
                  Message Dispatched
                </h3>
                <p className="text-xs text-[#7A6B69] max-w-sm mx-auto">
                  Thank you, {name || 'valued customer'}. Our beauty advisor team has received your inquiry and will reply to <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="px-6 py-2.5 bg-[#8B3A57] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-normal text-[#291F21] mb-2">
                  Send Us a Direct Note
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  >
                    <option value="Order & Shipping Inquiry">Order & Shipping Status</option>
                    <option value="Personalized Routine Consultation">Personalized Routine Advice</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Press & Partnership">Press & Partnership</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us how we can assist you..."
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#8B3A57] hover:bg-[#722A42] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs Section */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8DFD7] shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B3A57]">
              Common Inquiries
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#291F21]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="divide-y divide-[#F0E6DE]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(prev => (prev === idx ? null : idx))}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-[#291F21] hover:text-[#8B3A57] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-[#8B3A57]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="pt-2 text-xs text-[#635351] leading-relaxed font-light">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
