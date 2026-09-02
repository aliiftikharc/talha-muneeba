import { Clock, MapPin, Navigation } from "lucide-react";

const mapUrl = "https://maps.app.goo.gl/qX7mzFPHnXSJXwaR8";

export default function Home() {
  return (
    <main className="invite-page">
      <header className="site-header">
        <p>Walima Invitation</p>
      </header>

      <section className="invite-shell" aria-label="Walima invitation">
        <div className="ornament top" aria-hidden="true" />

        <p className="bismillah" lang="ar">
          {
            "\u0628\u0650\u0633\u0652\u0645\u0650 \u0671\u0644\u0644\u064e\u0651\u0670\u0647\u0650 \u0671\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0640\u0670\u0646\u0650 \u0671\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650"
          }
        </p>
        <p className="kicker">With the blessings of Allah Almighty</p>

        <div className="title-group">
          <p className="occasion">Walima Ceremony</p>
          <h1>Talha Shahid</h1>
          <p className="parentage">S/O Dr. Shahid Mehmood</p>
          <span className="divider" aria-hidden="true" />
          <h2>Muneeba Gulzar</h2>
          <p className="parentage">D/O Late Gulzar Ali</p>
        </div>

        <p className="invitation-copy">
          Cordially invite you to grace the blessed occasion with your presence
          and prayers.
        </p>

        <div className="event-panel" aria-label="Event details">
          <article className="date-card" aria-label="Event date">
            <span className="calendar-ring" aria-hidden="true">
              <span />
              <span />
            </span>
            <p>November</p>
            <strong>16</strong>
            <small>Monday, 2026</small>
          </article>

          <div className="detail-stack">
            <article className="detail-card">
              <Clock aria-hidden="true" size={22} strokeWidth={1.8} />
              <div>
                <p>Arrival</p>
                <strong>7:00 PM</strong>
              </div>
            </article>

            <article className="detail-card venue-card">
              <MapPin aria-hidden="true" size={22} strokeWidth={1.8} />
              <div>
                <p>Venue</p>
                <strong>Dehleez Marquee, Paris Tower Road, H-13</strong>
              </div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open venue location in Google Maps"
              >
                <Navigation aria-hidden="true" size={18} strokeWidth={2} />
                View Map
              </a>
            </article>
          </div>
        </div>

        <p className="closing">Your presence will be an honor for us.</p>
        <div className="ornament bottom" aria-hidden="true" />
      </section>
    </main>
  );
}
