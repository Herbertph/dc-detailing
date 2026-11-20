import { Star } from 'lucide-react'
import { GOOGLE_REVIEWS_URL, REVIEWS, REVIEWS_INTRO } from '../data/detailingData'
import { Reveal } from './Reveal'

function FiveStars() {
  return (
    <span role="img" aria-label="5 out of 5 stars" className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className="h-4 w-4 fill-brand-gold text-brand-gold" />
      ))}
    </span>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-brand-topbar py-20">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="mx-auto w-fit rounded-full border border-brand-border bg-brand-card px-4 py-2 text-sm font-semibold text-brand-text">
            {REVIEWS_INTRO.badge}
          </p>
          <h2 id="reviews-title" className="section-title mt-5">
            {REVIEWS_INTRO.title}
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <li key={review.author}>
              <figure className="flex h-full flex-col rounded-md border border-brand-border bg-brand-card p-6">
                <FiveStars />
                <blockquote className="mt-4 flex-1 leading-relaxed text-brand-text">“{review.text}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-brand-text">{review.author}</span>
                  {review.note && <span className="text-brand-muted"> ({review.note})</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-500 underline-offset-4 hover:underline"
          >
            {REVIEWS_INTRO.linkText}
          </a>
        </p>
      </div>
    </section>
  )
}
