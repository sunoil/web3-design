import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ_SECTIONS = [
  {
    id: 'general',
    title: 'General',
    items: [
      { q: 'What is TwoPiR?', a: 'Content will be added here.' },
      { q: 'How do I interact with TwoPiR?', a: 'Content will be added here.' },
      { q: 'Do I need a wallet to interact with TwoPiR?', a: 'Content will be added here.' },
      { q: 'What is the cost of interacting with TwoPiR?', a: 'Content will be added here.' },
      { q: 'How can I access TwoPiR?', a: 'Content will be added here.' },
      { q: 'How can I try out TwoPiR without using actual funds?', a: 'Content will be added here.' },
      { q: 'Can funds be frozen?', a: 'Content will be added here.' },
    ],
  },
  {
    id: 'risk',
    title: 'Risk',
    items: [
      { q: 'What are the risks of staking?', a: 'Content will be added here.' },
      { q: 'How is my deposit protected?', a: 'Content will be added here.' },
    ],
  },
  {
    id: 'supplying-earning',
    title: 'Supplying & Earning',
    items: [
      { q: 'How do I supply assets?', a: 'Content will be added here.' },
      { q: 'How are rewards calculated?', a: 'Content will be added here.' },
      { q: 'When can I withdraw?', a: 'Content will be added here.' },
    ],
  },
  {
    id: 'borrowing',
    title: 'Borrowing',
    items: [
      { q: 'How does borrowing work?', a: 'Content will be added here.' },
      { q: 'What is the interest rate?', a: 'Content will be added here.' },
    ],
  },
  {
    id: 'governance',
    title: 'Governance',
    items: [
      { q: 'What is PIR token used for?', a: 'Content will be added here.' },
      { q: 'How can I participate in governance?', a: 'Content will be added here.' },
    ],
  },
  {
    id: 'developers',
    title: 'Developers',
    items: [
      { q: 'Where is the API documentation?', a: 'Content will be added here.' },
      { q: 'How do I integrate TwoPiR?', a: 'Content will be added here.' },
    ],
  },
  {
    id: 'brand',
    title: 'Brand',
    items: [
      { q: 'Can I use the TwoPiR logo?', a: 'Content will be added here.' },
      { q: 'Where are brand guidelines?', a: 'Content will be added here.' },
    ],
  },
];

function FaqItem({ item, isOpen, onToggle, questionId, answerId }) {
  return (
    <div className={`faq-page-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="faq-page-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        id={questionId}
      >
        <span className="faq-page-question-text">{item.q}</span>
        <span className="faq-page-icon" aria-hidden="true">
          <span className="faq-page-icon-plus" />
        </span>
      </button>
      <div
        id={answerId}
        className="faq-page-answer"
        role="region"
        aria-labelledby={questionId}
      >
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openKeys, setOpenKeys] = useState({});
  const [activeSection, setActiveSection] = useState('');

  /* При відкритті сторінки показувати зверху — щоб було видно заголовок і навігацію */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo(0, 0);
  }, []);

  const toggleItem = (sectionId, index) => {
    const key = `${sectionId}-${index}`;
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const sectionIds = FAQ_SECTIONS.map((s) => s.id);

    const updateActiveSection = () => {
      const headerEl = document.querySelector('.site-header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 48;
      const topOffset = headerHeight + 120;

      let current = '';
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= topOffset) {
          current = sectionIds[i];
        }
      }
      /* Остання секція (Brand) — активна тільки коли дійсно прокрутили до низу */
      const lastId = sectionIds[sectionIds.length - 1];
      const lastEl = document.getElementById(lastId);
      if (lastEl) {
        const rect = lastEl.getBoundingClientRect();
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
        if (atBottom && rect.top < window.innerHeight && rect.bottom > headerHeight) {
          current = lastId;
        }
      }
      if (current) setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerEl = document.querySelector('.site-header');
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 48;
    const gap = 20;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - gap;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>FAQ — TwoPiR</title>
        <meta name="description" content="Frequently asked questions about TwoPiR" />
      </Head>
      <Header />
      <main className="faq-page">
        <div className="faq-page-inner">
          <div className="faq-page-content">
            <h1 className="faq-page-title">FAQ</h1>
            {FAQ_SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="faq-page-section"
              >
                <h2 className="faq-page-section-title">{section.title}</h2>
                <div className="faq-page-list">
                  {section.items.map((item, i) => {
                    const key = `${section.id}-${i}`;
                    return (
                      <FaqItem
                        key={key}
                        item={item}
                        isOpen={!!openKeys[key]}
                        onToggle={() => toggleItem(section.id, i)}
                        questionId={`faq-q-${section.id}-${i}`}
                        answerId={`faq-a-${section.id}-${i}`}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
          <aside className="faq-page-nav" aria-label="FAQ navigation">
            <h3 className="faq-page-nav-title">Sections</h3>
            <nav className="faq-page-nav-list">
              {FAQ_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`faq-page-nav-link ${activeSection === s.id ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(e, s.id)}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
