import { stats } from '../../data/home.js';
import { Counter } from '../ui/Counter.jsx';
import { Photo } from '../ui/Photo.jsx';
import { ProgressBar } from '../ui/ProgressBar.jsx';

/** Indicadores y cifras de la firma sobre fotografía de las instalaciones. */
export function Stats() {
  const hasMetrics = stats.metrics?.length > 0;

  return (
    <section aria-label="La firma en cifras" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Photo
          base={stats.background.src}
          alt=""
          aria-hidden="true"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-base/[0.92]" aria-hidden="true" />
      </div>

      <div className="container-site relative py-20 md:py-24">
        {hasMetrics && (
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {stats.metrics.map((metric) => (
              <ProgressBar
                key={metric.id}
                value={metric.value}
                label={metric.label}
                description={metric.description}
              />
            ))}
          </div>
        )}

        {/* La línea de separación solo aparece si arriba hay indicadores. */}
        <div
          className={[
            'grid gap-10 sm:grid-cols-2 lg:grid-cols-4',
            hasMetrics ? 'mt-16 border-t border-border pt-14' : '',
          ].join(' ')}
        >
          {stats.items.map((item) => (
            <Counter
              key={item.id}
              value={item.value}
              suffix={item.suffix}
              max={item.max}
              won={item.won}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
