import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubmitContactForm } from '@workspace/api-client-react';

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const { t } = useLanguage();
  const [successMsg, setSuccessMsg] = useState('');
  
  const perks = t('contact.perks') as { title: string, desc: string }[];
  const formT = t('contact.form');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const { mutate: submitForm, isPending } = useSubmitContactForm({
    mutation: {
      onSuccess: (data) => {
        setSuccessMsg(data.message || "Message sent successfully!");
        reset();
        setTimeout(() => setSuccessMsg(''), 5000);
      },
      onError: () => {
        alert("Failed to send message. Please try again later.");
      }
    }
  });

  const onSubmit = (data: FormData) => {
    submitForm({ data });
  };

  return (
    <section id="contact" className="py-32 bg-[#030608] relative z-10 scroll-m-20 border-b border-border/50">
      <div className="px-5 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Info Side */}
          <div>
            <h2 className="text-5xl lg:text-6xl font-display text-white leading-none mb-6">
              {t('contact.title')}
            </h2>
            <p className="font-serif text-lg text-white/75 mb-12">
              {t('contact.desc')}
            </p>

            <div className="flex flex-col gap-6 mb-12">
              {perks.map((perk, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_10px_rgba(0,170,221,0.8)]" />
                  <div>
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-1">
                      {perk.title}
                    </h4>
                    <p className="font-serif text-sm text-white/70">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-5">
              <a href="tel:+14388067640" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Phone</div>
                  <div className="text-base font-bold text-white group-hover:text-accent transition-colors">(438) 806-7640</div>
                </div>
              </a>
              <a href="mailto:nicktech@computer4u.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00AADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Email</div>
                  <div className="text-base font-bold text-white group-hover:text-accent transition-colors">nicktech@computer4u.com</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-card rounded-xl p-8 lg:p-10 border border-border shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {successMsg ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <CheckCircle2 size={64} className="text-green-400 mb-6" />
                <h3 className="font-display text-3xl text-white mb-2">Success!</h3>
                <p className="font-serif text-muted">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{formT.fn}</label>
                    <input 
                      {...register("firstName")}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{formT.ln}</label>
                    <input 
                      {...register("lastName")}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{formT.email} *</label>
                  <input 
                    {...register("email")}
                    type="email"
                    className={`w-full bg-background border rounded px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'}`}
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{formT.phone}</label>
                  <input 
                    {...register("phone")}
                    type="tel"
                    className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{formT.service}</label>
                  <div className="relative">
                    <select 
                      {...register("service")}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="">-- Select --</option>
                      {(formT.serviceOptions as string[]).map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-t-4 border-l-4 border-r-4 border-t-white/40 border-l-transparent border-r-transparent"></div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{formT.msg} *</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className={`w-full bg-background border rounded px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'}`}
                  />
                  {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-accent text-white rounded font-bold uppercase tracking-wider text-sm py-4 hover:bg-accent/80 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,170,221,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isPending ? formT.submitting : formT.submit}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
