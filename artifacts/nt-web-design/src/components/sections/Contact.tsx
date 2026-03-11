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
            <p className="font-serif text-lg text-white/50 mb-12">
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
                    <p className="font-serif text-sm text-white/40">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="font-bold text-sm text-white uppercase tracking-widest mb-2">Direct Contact</div>
              <a href="mailto:info@ntwebdesign.ca" className="block font-display text-3xl text-accent hover:text-white transition-colors mb-2">
                info@ntwebdesign.ca
              </a>
              <a href="tel:+14388067640" className="block font-display text-2xl text-white/60 hover:text-white transition-colors">
                (438) 806-7640
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
