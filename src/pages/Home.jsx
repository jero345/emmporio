import { Seo } from '../components/Seo.jsx';
import { Hero } from '../components/sections/Hero.jsx';
import { About } from '../components/sections/About.jsx';
import { PracticeAreas } from '../components/sections/PracticeAreas.jsx';
import { WhyChooseUs } from '../components/sections/WhyChooseUs.jsx';
import { Stats } from '../components/sections/Stats.jsx';
import { Process } from '../components/sections/Process.jsx';
import { Marquee } from '../components/sections/Marquee.jsx';
import { Prensa } from '../components/sections/Prensa.jsx';
import { Testimonials } from '../components/sections/Testimonials.jsx';
import { CaseResults } from '../components/sections/CaseResults.jsx';
import { CasosNotables } from '../components/sections/CasosNotables.jsx';
import { Attorneys } from '../components/sections/Attorneys.jsx';
import { ContactCTA } from '../components/sections/ContactCTA.jsx';
import { FAQ } from '../components/sections/FAQ.jsx';
import { BlogPreview } from '../components/sections/BlogPreview.jsx';

import { practiceAreas } from '../data/practiceAreas.js';
import { faqs } from '../data/faqs.js';
import { siteConfig } from '../data/siteConfig.js';
import { faqSchema, legalServiceSchema } from '../lib/seo.js';

export default function Home() {
  return (
    <>
      <Seo
        title={`${siteConfig.name} — ${siteConfig.tagline}`}
        description={siteConfig.description}
        path="/"
        withSuffix={false}
        schemas={[legalServiceSchema(practiceAreas), faqSchema(faqs)]}
      />

      <Hero />
      <About />
      <PracticeAreas />
      <WhyChooseUs />
      <Stats />
      <Process />
      <Marquee />
      <Prensa />
      <Testimonials />
      <CaseResults />
      <CasosNotables />
      <Attorneys />
      <ContactCTA />
      <FAQ />
      <BlogPreview />
    </>
  );
}
