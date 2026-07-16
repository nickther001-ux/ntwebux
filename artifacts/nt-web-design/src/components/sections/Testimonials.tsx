import React from 'react';

export const Testimonials = () => {
  return (
    <section className="testimonials-wrapper">
      <div className="fade-overlay top-fade"></div>
      <div className="fade-overlay bottom-fade"></div>

      <div className="testimonials-grid">

        {/* COLUMN 1: Scrolls Down */}
        <div className="testimonial-col scroll-down">
          {/* Card 1 */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🏗️ Construction</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">~2x leads</span> <span className="stat-sub">first 30 days</span>
            </h3>
            <p className="quote">"They revamped our entire digital presence. Lead form submissions nearly doubled in the first month and the site went live in under 72 hours. Genuinely surprised by the pace."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">JT</div>
                <div className="author-text">
                  <div className="name">Jean-Michel Tremblay</div>
                  <div className="title">Owner, Tremblay Excavation Inc.</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.8</span></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">⚕️ Healthcare</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">87% capacity</span> <span className="stat-sub">avg since launch</span>
            </h3>
            <p className="quote">"Our booking system went from phone-only to mostly online. We went from scrambling for appointments to running closer to 87% capacity most weeks. Big shift for us."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">DA</div>
                <div className="author-text">
                  <div className="name">Dr. Aline Côté</div>
                  <div className="title">Founder, Physio Optimal</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.9</span></div>
            </div>
          </div>

          {/* DUPLICATES FOR INFINITE SCROLL */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🏗️ Construction</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">~2x leads</span> <span className="stat-sub">first 30 days</span>
            </h3>
            <p className="quote">"They revamped our entire digital presence. Lead form submissions nearly doubled in the first month and the site went live in under 72 hours. Genuinely surprised by the pace."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">JT</div>
                <div className="author-text">
                  <div className="name">Jean-Michel Tremblay</div>
                  <div className="title">Owner, Tremblay Excavation Inc.</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.8</span></div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">⚕️ Healthcare</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">87% capacity</span> <span className="stat-sub">avg since launch</span>
            </h3>
            <p className="quote">"Our booking system went from phone-only to mostly online. We went from scrambling for appointments to running closer to 87% capacity most weeks. Big shift for us."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">DA</div>
                <div className="author-text">
                  <div className="name">Dr. Aline Côté</div>
                  <div className="title">Founder, Physio Optimal</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.9</span></div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Scrolls Up */}
        <div className="testimonial-col scroll-up">
          {/* Card 3 */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🍽️ Restaurant</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">+38% revenue</span> <span className="stat-sub">since launch</span>
            </h3>
            <p className="quote">"NT Web UX built our online presence from scratch. We're taking reservations and takeout orders around the clock now — revenue is up roughly 38% since we launched."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">MJ</div>
                <div className="author-text">
                  <div className="name">Marie-Claire Joseph</div>
                  <div className="title">Owner, Saveurs D'Haïti MTL</div>
                </div>
              </div>
              <div className="rating">★★★★☆ <span className="rating-num">4.0</span></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🌿 Wellness</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">7 weeks</span> <span className="stat-sub">to fully booked</span>
            </h3>
            <p className="quote">"We went from zero online presence to consistently fully booked in about 7 weeks. There were some growing pains early on, but the ROI has been real. Would recommend."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">KB</div>
                <div className="author-text">
                  <div className="name">Karine Beaumont</div>
                  <div className="title">CEO, Beaumont Wellness Clinic</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.5</span></div>
            </div>
          </div>

          {/* DUPLICATES FOR INFINITE SCROLL */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🍽️ Restaurant</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">+38% revenue</span> <span className="stat-sub">since launch</span>
            </h3>
            <p className="quote">"NT Web UX built our online presence from scratch. We're taking reservations and takeout orders around the clock now — revenue is up roughly 38% since we launched."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">MJ</div>
                <div className="author-text">
                  <div className="name">Marie-Claire Joseph</div>
                  <div className="title">Owner, Saveurs D'Haïti MTL</div>
                </div>
              </div>
              <div className="rating">★★★★☆ <span className="rating-num">4.0</span></div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🌿 Wellness</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">7 weeks</span> <span className="stat-sub">to fully booked</span>
            </h3>
            <p className="quote">"We went from zero online presence to consistently fully booked in about 7 weeks. There were some growing pains early on, but the ROI has been real. Would recommend."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">KB</div>
                <div className="author-text">
                  <div className="name">Karine Beaumont</div>
                  <div className="title">CEO, Beaumont Wellness Clinic</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.5</span></div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Scrolls Down */}
        <div className="testimonial-col scroll-down">
          {/* Card 5 */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">☁️ SAAS</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">4.9★</span> <span className="stat-sub">avg client rating</span>
            </h3>
            <p className="quote">"They built our SaaS dashboard from scratch and it looks polished. Clients notice the design quality. A few revision rounds but they got it right in the end."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">AF</div>
                <div className="author-text">
                  <div className="name">Alexis Fontaine</div>
                  <div className="title">Co-Founder, Flux Analytics</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">5.0</span></div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🏗️ Construction</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">+61% traffic</span> <span className="stat-sub">organic, 3 months</span>
            </h3>
            <p className="quote">"The bilingual site they built helped us reach both markets properly. Organic traffic climbed around 61% over three months — better than I expected."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">MO</div>
                <div className="author-text">
                  <div className="name">Marc-André Ouellet</div>
                  <div className="title">Owner, Bâtisseurs Nordiques Inc.</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.7</span></div>
            </div>
          </div>

          {/* DUPLICATES FOR INFINITE SCROLL */}
           <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">☁️ SAAS</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">4.9★</span> <span className="stat-sub">avg client rating</span>
            </h3>
            <p className="quote">"They built our SaaS dashboard from scratch and it looks polished. Clients notice the design quality. A few revision rounds but they got it right in the end."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">AF</div>
                <div className="author-text">
                  <div className="name">Alexis Fontaine</div>
                  <div className="title">Co-Founder, Flux Analytics</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">5.0</span></div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="card-top-bar">
              <span className="industry-badge">🏗️ Construction</span>
            </div>
            <h3 className="stat-highlight">
              <span className="stat-main">+61% traffic</span> <span className="stat-sub">organic, 3 months</span>
            </h3>
            <p className="quote">"The bilingual site they built helped us reach both markets properly. Organic traffic climbed around 61% over three months — better than I expected."</p>
            <div className="card-footer">
              <div className="author-info">
                <div className="initials-avatar">MO</div>
                <div className="author-text">
                  <div className="name">Marc-André Ouellet</div>
                  <div className="title">Owner, Bâtisseurs Nordiques Inc.</div>
                </div>
              </div>
              <div className="rating">★★★★★ <span className="rating-num">4.7</span></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};