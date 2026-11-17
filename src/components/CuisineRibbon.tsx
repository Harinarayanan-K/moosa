import { cuisines } from '../content';
import './cuisine-ribbon.css';

export default function CuisineRibbon({ reduced }: { reduced: boolean }) {
  const names = cuisines.slice(1);

  return <section className="cuisine-ribbon cuisine-ribbon-moving" aria-label="Five cuisines" data-reduced={reduced}>
    <ul className="sr-only" aria-label="Cuisine selection">{names.map(name => <li key={name}>{name}</li>)}</ul>
    <div className="cuisine-marquee-window" aria-hidden="true">
      <div className="cuisine-marquee-track">
        {[0, 1].map(copy => <div className="cuisine-marquee-group" key={copy}>{names.map(name => <span className="cuisine-badge" key={name}><span className="cuisine-badge-name">{name}</span></span>)}</div>)}
      </div>
    </div>
  </section>;
}
