import React from 'react';
import { useLanguage } from '@/lib/i18n';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  metric: string;
  metricLabel: string;
  industry: string;
  stars: number;
}

function getInitials(name: string) {
  const parts = name.split(' ').filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const filled = Math.min(5, Math.max(0, Math.round(item.stars)));
  return (
    <div className="testimonial-card">
      <div className="card-top-bar">
        <span className="industry-badge">{item.industry}</span>
      </div>
      <h3 className="stat-highlight">
        <span className="stat-main">{item.metric}</span> <span className="stat-sub">{item.metricLabel}</span>
      </h3>
      <p className="quote">"{item.quote}"</p>
      <div className="card-footer">
        <div className="author-info">
          <div className="initials-avatar">{getInitials(item.name)}</div>
          <div className="author-text">
            <div className="name">{item.name}</div>
            <div className="title">{item.role}</div>
          </div>
        </div>
        <div className="rating">
          {'★'.repeat(filled)}{'☆'.repeat(5 - filled)} <span className="rating-num">{item.stars.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

function Column({ items, direction }: { items: TestimonialItem[]; direction: 'scroll-down' | 'scroll-up' }) {
  const track = [...items, ...items];
  return (
    <div className={`testimonial-col ${direction}`}>
      {track.map((item, i) => (
        <TestimonialCard key={i} item={item} />
      ))}
    </div>
  );
}

export const Testimonials = () => {
  const { t } = useLanguage();
  const items: TestimonialItem[] = t('testimonials.items');

  const columns: { items: TestimonialItem[]; direction: 'scroll-down' | 'scroll-up' }[] = [
    { items: items.slice(0, 2), direction: 'scroll-down' },
    { items: items.slice(2, 4), direction: 'scroll-up' },
    { items: items.slice(4, 6), direction: 'scroll-down' },
  ];

  return (
    <section className="testimonials-wrapper">
      <div className="fade-overlay top-fade"></div>
      <div className="fade-overlay bottom-fade"></div>

      <div className="testimonials-grid">
        {columns.map((col, i) => (
          <Column key={i} items={col.items} direction={col.direction} />
        ))}
      </div>
    </section>
  );
};