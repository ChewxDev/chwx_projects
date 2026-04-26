import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { checkContactRateLimit, contactFieldLimits, sanitizeContactForm, validateContactForm } from './security.js';

const roles = ['Project Manager', 'Full-Stack Developer', 'UI/UX Designer', 'Content Writer', 'Social Media Strategist', 'Executive Assistant'];

const marqueeItems = [
  'Project Management',
  'Node.js',
  'AI/ML Implementation',
  'UI/UX Design',
  'Agile / Scrum',
  'React',
  'Executive Assistance',
  'MongoDB',
  'Digital Transformation',
  'Social Media Strategy',
  'Business Development',
  'Asana Certified',
  'Content Writing',
  'Mobile Apps',
  'Stakeholder Management'
];

const services = [
  {
    icon: '📊',
    color: 'rgba(58,134,255,.1)',
    border: 'rgba(58,134,255,.2)',
    title: 'Project Management & Ops',
    desc: 'Agile/Scrum delivery, AI/ML projects, digital transformations. 92% on-budget across all engagements.',
    tags: ['Agile/Scrum', 'Risk Management', 'Stakeholder Mgmt']
  },
  {
    icon: '💻',
    color: 'rgba(200,150,30,.1)',
    border: 'rgba(200,150,30,.2)',
    title: 'Software Development',
    desc: 'Web apps, mobile apps, APIs. Node.js, React, MongoDB. From concept to production-ready deployment.',
    tags: ['Node.js / React', 'Mobile Apps', 'REST APIs']
  },
  {
    icon: '🎨',
    color: 'rgba(255,90,150,.1)',
    border: 'rgba(255,90,150,.2)',
    title: 'Design',
    desc: 'Brand identity, UI/UX, graphic design, pitch decks, print. Every visual touchpoint crafted with intention.',
    tags: ['UI/UX Design', 'Brand Identity', 'Pitch Decks']
  },
  {
    icon: '✍️',
    color: 'rgba(60,220,130,.1)',
    border: 'rgba(60,220,130,.2)',
    title: 'Writing & Content',
    desc: 'Technical docs, copywriting, business proposals, ghostwriting. 60% win rate on proposals drafted.',
    tags: ['Copywriting', 'Tech Writing', 'Proposals']
  },
  {
    icon: '📣',
    color: 'rgba(150,100,255,.1)',
    border: 'rgba(150,100,255,.2)',
    title: 'Social Media & Marketing',
    desc: 'Platform strategy, content calendars, analytics-driven growth. 25% follower growth in 6 months.',
    tags: ['Content Strategy', 'Analytics', 'A/B Testing']
  },
  {
    icon: '📋',
    color: 'rgba(255,180,30,.1)',
    border: 'rgba(255,180,30,.2)',
    title: 'Virtual & Executive Assistance',
    desc: 'C-suite support, calendar management, CRM, stakeholder liaison. 85% reduction in scheduling conflicts.',
    tags: ['EA Support', 'CRM (Salesforce)', 'Operations']
  }
];

const portfolio = [
  { cat: 'pm dev', gradient: 'card-gradient-1', decor: '🤖', category: 'AI / Project Management', title: 'AI Customer Support Chatbot', link: 'https://www.notion.so/AI-Chatbot-Project-Lean-Geeks-258b3df263db804fb5eef083a9468b42?source=copy_link', metrics: [['60%', 'Ticket Reduction'], ['25%', 'Under Budget'], ['85%', 'Accuracy Rate']] },
  { cat: 'dev pm', gradient: 'card-gradient-2', decor: '🛒', category: 'E-Commerce / Development', title: 'Platform Migration', link: 'https://www.notion.so/E-commerce-Platform-Migration-Convertain-Limited-258b3df263db807dae26f534b013f3d0?source=copy_link', metrics: [['29%', 'Under Budget'], ['40%', 'Performance Gain']] },
  { cat: 'pm', gradient: 'card-gradient-3', decor: '🏪', category: 'Operations / Executive', title: 'BeePawn Multi-Location Ops Overhaul', metrics: [['30%', 'Faster Delivery'], ['98%', 'Inventory Accuracy']] },
  { cat: 'pm dev', gradient: 'card-gradient-4', decor: '🔗', category: 'Automation / Slack Integration', title: 'Slack Bot Workspace Integration', link: 'https://github.com/ChewxDev/lannisterPay', metrics: [['35%', 'Efficiency Gain'], ['15hrs', 'Saved / Week']] },
  { cat: 'marketing', gradient: 'card-gradient-5', decor: '📺', category: 'Social Media / Content', title: 'Gaming Creator Network Growth', metrics: [['20%', 'Sub Growth'], ['30%', 'More Views']] }
];

const socialLinks = [
  { label: 'LinkedIn', title: 'LinkedIn', text: 'in', href: 'https://www.linkedin.com/in/nicholas-njoku-897054223/' },
  { label: 'GitHub', title: 'GitHub', text: 'gh', href: 'https://github.com/ChewxDev' },
  { label: 'Twitter', title: 'Twitter', text: 'tw', href: 'https://twitter.com/cxxzy_zeus' },
  { label: 'Telegram', title: 'Telegram', text: 'tg', href: 'https://t.me/Chewx001' },
  { label: 'Discord', title: 'Discord', text: 'dc', href: 'https://discord.gg/nzBWrFPz' }
];

const tools = [
  ['⚡', 'Asana'], ['🎯', 'Jira'], ['📋', 'Trello'], ['💡', 'Notion'],
  ['🟢', 'Node.js'], ['⚛️', 'React'], ['🍃', 'MongoDB'], ['☁️', 'Salesforce'],
  ['🧡', 'HubSpot'], ['🎧', 'Zendesk'], ['💬', 'Slack'], ['📹', 'Zoom'],
  ['🔷', 'Miro'], ['🐙', 'GitHub'], ['▲', 'Vercel'], ['🔑', 'Google Workspace']
];

const testimonials = [
  {
    quote: "Nicholas delivered our AI chatbot project 25% under budget and reduced our support tickets by 60%. The level of organisation, communication, and technical insight he brought was extraordinary. He's not just a PM — he's a genuine strategic partner.",
    initials: 'JM',
    name: 'James M.',
    role: 'CEO · Lean Geeks (Xagency)'
  },
  {
    quote: "Our e-commerce migration was one of the most complex projects we'd taken on. Nicholas managed the entire thing with a distributed team across three time zones and delivered 29% under budget with a 40% performance improvement. Absolutely remarkable.",
    initials: 'SC',
    name: 'Sarah C.',
    role: 'Operations Director · Convertain Limited'
  },
  {
    quote: 'Nicholas transformed how our executive team operates. He reduced scheduling conflicts by 85% and cut our report preparation time almost in half. Incredibly professional, discreet, and proactive. He anticipates what you need before you ask.',
    initials: 'AO',
    name: 'Adaeze O.',
    role: 'COO · BeePawn Florida'
  }
];

const questionnaireSteps = [
  {
    id: 'profile',
    title: 'Who needs help?',
    subtitle: 'This changes the recommendation mix.',
    type: 'single',
    options: [
      { label: 'Individual / founder', scores: { 'Business Development & Strategy': 2, Design: 1, 'Software Development': 1 } },
      { label: 'Small business', scores: { 'Project Management & Ops': 2, 'Social Media & Marketing': 2, 'Business Development & Strategy': 1 } },
      { label: 'Growing team', scores: { 'Project Management & Ops': 3, 'Virtual & Executive Assistance': 2, 'Software Development': 1 } },
      { label: 'Enterprise / executive office', scores: { 'Virtual & Executive Assistance': 3, 'Project Management & Ops': 2, 'Writing & Content': 1 } }
    ]
  },
  {
    id: 'goal',
    title: 'What outcome matters most right now?',
    subtitle: 'Choose the main win you want from the engagement.',
    type: 'single',
    options: [
      { label: 'Launch or fix a digital product', scores: { 'Software Development': 3, 'Project Management & Ops': 2, Design: 1 } },
      { label: 'Make operations less chaotic', scores: { 'Project Management & Ops': 3, 'Virtual & Executive Assistance': 2 } },
      { label: 'Improve brand, visuals, or conversion', scores: { Design: 3, 'Social Media & Marketing': 2, 'Writing & Content': 1 } },
      { label: 'Grow leads, audience, or revenue', scores: { 'Business Development & Strategy': 3, 'Social Media & Marketing': 2, 'Writing & Content': 1 } }
    ]
  },
  {
    id: 'friction',
    title: 'Where is the pressure coming from?',
    subtitle: 'Pick every pain point that applies.',
    type: 'multi',
    options: [
      { label: 'Missed deadlines or unclear ownership', scores: { 'Project Management & Ops': 3 } },
      { label: 'Manual tasks and slow response times', scores: { 'Software Development': 2, 'Project Management & Ops': 1 } },
      { label: 'Weak online presence or content consistency', scores: { 'Social Media & Marketing': 3, 'Writing & Content': 1 } },
      { label: 'Too much admin work for leaders', scores: { 'Virtual & Executive Assistance': 3 } },
      { label: 'Unclear offer, pitch, or market strategy', scores: { 'Business Development & Strategy': 3, 'Writing & Content': 2 } },
      { label: 'Product or brand does not look premium enough', scores: { Design: 3 } }
    ]
  },
  {
    id: 'timeline',
    title: 'How soon do you need movement?',
    subtitle: 'This shapes the recommended engagement style.',
    type: 'single',
    options: [
      { label: 'Immediately: this week', scores: { 'Project Management & Ops': 2, 'Virtual & Executive Assistance': 2 } },
      { label: 'Within 30 days', scores: { 'Software Development': 1, Design: 1, 'Social Media & Marketing': 1 } },
      { label: 'This quarter', scores: { 'Business Development & Strategy': 2, 'Project Management & Ops': 1 } },
      { label: 'I need clarity first', scores: { 'Business Development & Strategy': 2, 'Writing & Content': 1 } }
    ]
  }
];

const serviceCopy = {
  'Project Management & Ops': 'Best when work is moving but ownership, timelines, risk, or delivery rhythm need control.',
  'Software Development': 'Best when you need a web app, mobile app, API, automation, or technical build taken from idea to usable product.',
  Design: 'Best when the visual experience, UI, deck, brand system, or product presentation needs to feel premium and trustworthy.',
  'Writing & Content': 'Best when proposals, documentation, copy, reports, or thought leadership need sharper structure and execution.',
  'Social Media & Marketing': 'Best when audience growth, content consistency, platform strategy, or campaign analytics need a system.',
  'Virtual & Executive Assistance': 'Best when leaders are overloaded with scheduling, reporting, CRM, coordination, or recurring admin work.',
  'Business Development & Strategy': 'Best when the offer, market, pitch, growth plan, or revenue direction needs clear thinking and execution.'
};

function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frame = 0;

    const move = (event) => {
      mx = event.clientX;
      my = event.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx - 6}px`;
        cursorRef.current.style.top = `${my - 6}px`;
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx - 18}px`;
        ringRef.current.style.top = `${ry - 18}px`;
      }
      frame = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', move);
    frame = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W = 0;
    let H = 0;
    let frame = 0;
    const mouse = { x: null, y: null };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -Math.random() * 0.5 - 0.2;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.baseAlpha = this.alpha;
      }

      update() {
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && dist < 120) {
            const force = (120 - dist) / 120;
            this.vx += (dx / dist) * force * 0.5;
            this.vy += (dy / dist) * force * 0.5;
          }
        }
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset(false);
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,150,30,${this.alpha})`;
        ctx.fill();
      }
    }

    const seed = () => {
      particles = [];
      for (let index = 0; index < 120; index += 1) particles.push(new Particle());
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200,150,30,${(1 - dist / 100) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      frame = requestAnimationFrame(animate);
    };

    const mouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    resize();
    seed();
    animate();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo"><span className="nav-logo-dot" />chwx projects</a>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#tools" className="nav-link">Tools</a>
          <a href="#finder" className="nav-link">Finder</a>
          <a href="#cta" className="nav-cta">Book a Call ↗</a>
        </div>
        <div className="hamburger" id="hamburger" onClick={() => setOpen(true)} role="button" tabIndex={0}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`} id="mobile-menu">
        <a href="#about" className="nav-link" onClick={() => setOpen(false)}>About</a>
        <a href="#services" className="nav-link" onClick={() => setOpen(false)}>Services</a>
        <a href="#portfolio" className="nav-link" onClick={() => setOpen(false)}>Portfolio</a>
        <a href="#tools" className="nav-link" onClick={() => setOpen(false)}>Tools</a>
        <a href="#finder" className="nav-link" onClick={() => setOpen(false)}>Finder</a>
        <a href="#cta" className="nav-cta" onClick={() => setOpen(false)}>Book a Call ↗</a>
      </div>
    </>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timer = setTimeout(() => {
      if (!deleting) {
        setCharIndex((value) => value + 1);
        if (charIndex + 1 === current.length) {
          setDeleting(true);
        }
      } else {
        setCharIndex((value) => value - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setRoleIndex((value) => (value + 1) % roles.length);
        }
      }
    }, !deleting && charIndex === current.length ? 1800 : deleting ? 60 : 90);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section id="hero" className="grid-bg">
      <ParticleCanvas />
      <div className="hero-tag"><span>Available for Projects Worldwide</span></div>
      <h1 className="hero-headline">
        <span className="hero-name-line">chwx<br />projects</span>
        <span className="hero-role-line">
          <span className="typing-wrapper">
            <span className="typing-text" id="typing-text">{roles[roleIndex].slice(0, charIndex)}</span>
            <span className="typing-cursor" />
          </span>
        </span>
      </h1>
      <p className="hero-sub">
        Results-driven digital work by <strong>Njoku Nicholas C.</strong>, delivering <strong>AI/ML projects</strong>, <strong>software products</strong>, <strong>premium design</strong> and <strong>operational excellence</strong> all from one trusted source.
      </p>
      <div className="hero-actions">
        <a href="#portfolio" className="btn-primary magnetic">View My Work <span className="btn-arrow">→</span></a>
        <a href="#cta" className="btn-secondary magnetic">Book a Discovery Call</a>
      </div>
      <div className="hero-stats">
        <div className="stat-card reveal-right"><div className="stat-num">92%</div><div className="stat-label">On-Budget Delivery</div></div>
        <div className="stat-card reveal-right delay-1"><div className="stat-num">60%</div><div className="stat-label">Efficiency Gains</div></div>
        <div className="stat-card reveal-right delay-2"><div className="stat-num">5+</div><div className="stat-label">Years Experience</div></div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track" id="marquee">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>{item} <span className="marquee-dot" /></span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-visual reveal-left">
          <div className="about-img-wrap">
            <div className="about-img-placeholder">chwx</div>
            <div className="about-img-overlay">
              <div className="about-badge">🌍 Open to Remote — Worldwide</div>
              <div className="about-location">Nigeria · US · UK · EU Markets</div>
            </div>
          </div>
          <div className="float-card float-card-1"><div className="float-metric" id="count-projects">20+</div><div className="float-metric-label">Projects Delivered</div></div>
          <div className="float-card float-card-2"><div className="float-metric">4+</div><div className="float-metric-label">Countries Served</div></div>
        </div>
        <div className="about-content">
          <div className="section-tag reveal delay-1">About Nicholas</div>
          <h2 className="section-title reveal delay-2">One Pro.<br /><span>Every Capability.</span></h2>
          <p className="reveal delay-2">I'm <strong>Njoku Nicholas C.</strong>, the professional behind <strong>chwx projects</strong>. I build, manage, design, and deliver all under one roof. With a <strong>B.Sc. in Computer Science</strong> and 5+ years leading high-stakes projects for clients in the US, UK, Hong Kong, and Ukraine.</p>
          <p className="reveal delay-3">From <strong>AI chatbots</strong> that slashed response times from 24 hours to under 5 minutes, to <strong>e-commerce migrations</strong> delivered 29% under budget I bring measurable outcomes to every engagement.</p>
          <div className="skills-grid reveal delay-4">
            <div className="skill-item"><span className="skill-icon">⚙️</span> Agile Project Management</div>
            <div className="skill-item"><span className="skill-icon">💻</span> Full-Stack Development</div>
            <div className="skill-item"><span className="skill-icon">🎨</span> UI/UX & Brand Design</div>
            <div className="skill-item"><span className="skill-icon">✍️</span> Technical & Business Writing</div>
            <div className="skill-item"><span className="skill-icon">📣</span> Social Media Strategy</div>
            <div className="skill-item"><span className="skill-icon">📋</span> Executive Assistance</div>
            <div className="skill-item"><span className="skill-icon">🤖</span> AI/ML Implementation</div>
            <div className="skill-item"><span className="skill-icon">📈</span> Business Development</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="stats" style={{ padding: 0 }}>
      <div className="stats-inner">
        {[
          ['92', '%', 'On-Budget Rate', 'Across all client engagements'],
          ['60', '%', 'Efficiency Gains', 'Via AI/ML automation'],
          ['29', '%', 'Under Budget', 'Best project delivery'],
          ['95', '%', 'Client Satisfaction', 'Post-project surveys']
        ].map(([value, suffix, title, line]) => (
          <div className="stat-block" key={title}>
            <div className="stat-big"><span className="counter">{value}</span><span className="stat-suffix">{suffix}</span></div>
            <div className="stat-desc">{title}</div>
            <div className="stat-line">{line}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="services-header">
          <div>
            <div className="section-tag reveal">What I Do</div>
            <h2 className="section-title reveal delay-1">7 Verticals.<br /><span>Zero Gaps.</span></h2>
          </div>
          <p className="section-sub reveal-right" style={{ textAlign: 'right' }}>Every service backed by real delivery, measurable outcomes, and deep domain expertise.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className={`service-card reveal delay-${Math.min(index + 1, 4)}`} data-tilt key={service.title}>
              <div className="service-icon" style={{ background: service.color, border: `1px solid ${service.border}` }}>{service.icon}</div>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.desc}</div>
              <div className="service-tags">{service.tags.map((tag) => <span className="service-tag" key={tag}>{tag}</span>)}</div>
              <div className="service-arrow">→</div>
            </div>
          ))}
          <div className="service-card reveal delay-3" data-tilt style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div className="service-icon" style={{ background: 'rgba(30,200,200,.1)', border: '1px solid rgba(30,200,200,.2)' }}>📈</div>
                <div className="service-title">Business Development & Strategy</div>
                <div className="service-desc">Market research, competitive analysis, go-to-market strategy, sales proposals. 20% revenue growth for clients in 3 months.</div>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', flex: 1 }}>
                <div className="inline-metric"><div>60%</div><span>Proposal Win Rate</span></div>
                <div className="inline-metric"><div>15+</div><span>Proposals Developed</span></div>
              </div>
            </div>
            <div className="service-arrow">→</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => portfolio.map((item) => ({ ...item, visible: filter === 'all' || item.cat.includes(filter) })), [filter]);

  return (
    <section id="portfolio">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-tag reveal">Work</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <h2 className="section-title reveal delay-1" style={{ marginBottom: 0 }}>Real Projects.<br /><span>Real Outcomes.</span></h2>
          <div className="portfolio-tabs reveal delay-2">
            {['all', 'pm', 'dev', 'marketing'].map((tab) => (
              <div className={`ptab ${filter === tab ? 'active' : ''}`} onClick={() => setFilter(tab)} key={tab}>{tab === 'all' ? 'All' : tab === 'pm' ? 'PM' : tab === 'dev' ? 'Dev' : 'Marketing'}</div>
            ))}
          </div>
        </div>
        <div className="portfolio-grid" id="portfolio-grid">
          {filtered.map((item) => (
            <div
              className="portfolio-card reveal delay-1"
              data-cat={item.cat}
              key={item.title}
              style={{ opacity: item.visible ? 1 : 0.15, transform: item.visible ? 'scale(1)' : 'scale(0.95)', pointerEvents: item.visible ? 'all' : 'none' }}
            >
              <div className={`card-bg ${item.gradient}`} />
              <div className="card-glow" />
              <div className="card-decor">{item.decor}</div>
              <div className="card-overlay">
                <div className="card-category">{item.category}</div>
                <div className="card-title">{item.title}</div>
                <div className="card-metrics">
                  {item.metrics.map(([value, label]) => <div className="card-metric" key={label}><strong>{value}</strong>{label}</div>)}
                </div>
                {item.link && <a className="card-link" href={item.link} target="_blank" rel="noreferrer">View case study ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools">
      <div className="tools-inner">
        <div className="section-tag reveal">Tech Stack</div>
        <h2 className="section-title reveal delay-1">Tools &amp; <span>Platforms</span></h2>
        <div className="tools-grid">
          {tools.map(([icon, name], index) => (
            <div className={`tool-chip reveal delay-${(index % 3) + 1}`} key={name}><span className="tool-icon">{icon}</span><div className="tool-name">{name}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((value) => (value + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials">
      <div className="testimonials-inner">
        <div className="section-tag reveal">Social Proof</div>
        <h2 className="section-title reveal delay-1">What Clients <span>Say</span></h2>
        <div className="testi-track">
          {testimonials.map((testimonial, index) => (
            <div className={`testi-card ${current === index ? 'active' : ''}`} data-index={index} key={testimonial.name}>
              <div className="testi-quote">{testimonial.quote}</div>
              <div className="testi-author">
                <div className="testi-avatar">{testimonial.initials}</div>
                <div><div className="testi-name">{testimonial.name}</div><div className="testi-role">{testimonial.role}</div></div>
              </div>
            </div>
          ))}
        </div>
        <div className="testi-controls">
          {testimonials.map((testimonial, index) => <div className={`testi-dot ${current === index ? 'active' : ''}`} onClick={() => setCurrent(index)} key={testimonial.name} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceFinder() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const activeStep = questionnaireSteps[stepIndex];
  const progress = ((stepIndex + 1) / questionnaireSteps.length) * 100;

  const recommendations = useMemo(() => {
    const totals = {};
    questionnaireSteps.forEach((step) => {
      const selected = answers[step.id] || [];
      selected.forEach((label) => {
        const option = step.options.find((item) => item.label === label);
        if (!option) return;
        Object.entries(option.scores).forEach(([service, score]) => {
          totals[service] = (totals[service] || 0) + score;
        });
      });
    });

    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([service, score], index) => ({ service, score, rank: index + 1 }));
  }, [answers]);

  const selectedForStep = answers[activeStep.id] || [];
  const canAdvance = selectedForStep.length > 0;

  const toggleAnswer = (option) => {
    setAnswers((current) => {
      const existing = current[activeStep.id] || [];
      if (activeStep.type === 'single') {
        return { ...current, [activeStep.id]: [option.label] };
      }
      const next = existing.includes(option.label)
        ? existing.filter((item) => item !== option.label)
        : [...existing, option.label];
      return { ...current, [activeStep.id]: next };
    });
  };

  const reset = () => {
    setAnswers({});
    setStepIndex(0);
  };

  return (
    <section id="finder" className="finder-section">
      <div className="finder-inner">
        <div className="finder-copy">
          <div className="section-tag reveal">Service Finder</div>
          <h2 className="section-title reveal delay-1">Answer Fast.<br /><span>Get Matched.</span></h2>
          <p className="section-sub reveal delay-2">A focused questionnaire that maps your situation to the most useful chwx projects services for individuals, founders, teams, and businesses.</p>
          <div className="finder-pulse reveal delay-3">
            <span>{Math.round(progress)}%</span>
            <div><i style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="finder-panel reveal-right">
          <div className="finder-step">
            <span>Step {stepIndex + 1} / {questionnaireSteps.length}</span>
            <h3>{activeStep.title}</h3>
            <p>{activeStep.subtitle}</p>
          </div>
          <div className="answer-grid">
            {activeStep.options.map((option) => {
              const selected = selectedForStep.includes(option.label);
              return (
                <button
                  className={`answer-card ${selected ? 'selected' : ''}`}
                  key={option.label}
                  type="button"
                  onClick={() => toggleAnswer(option)}
                >
                  <span>{selected ? '✓' : activeStep.type === 'multi' ? '+' : '○'}</span>
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="finder-controls">
            <button className="finder-btn ghost" type="button" onClick={() => setStepIndex((value) => Math.max(value - 1, 0))} disabled={stepIndex === 0}>Back</button>
            {stepIndex < questionnaireSteps.length - 1 ? (
              <button className="finder-btn" type="button" onClick={() => setStepIndex((value) => value + 1)} disabled={!canAdvance}>Next</button>
            ) : (
              <a className="finder-btn" href="#recommendations">See Recommendations</a>
            )}
          </div>
        </div>
      </div>

      <div className="recommendation-board reveal" id="recommendations">
        <div className="recommendation-head">
          <div>
            <div className="section-tag">Recommended Mix</div>
            <h3>Your likely service stack</h3>
          </div>
          <button className="finder-btn ghost" type="button" onClick={reset}>Reset</button>
        </div>
        {recommendations.length ? (
          <div className="recommendation-grid">
            {recommendations.map((item) => (
              <div className="recommendation-card" key={item.service}>
                <div className="recommendation-rank">0{item.rank}</div>
                <h4>{item.service}</h4>
                <p>{serviceCopy[item.service]}</p>
                <div className="match-meter"><span style={{ width: `${Math.min(item.score * 12, 100)}%` }} /></div>
                <small>{item.score} match signals</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-recommendation">Start the questionnaire to generate your recommendations.</div>
        )}
      </div>
    </section>
  );
}

function CTA() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    clientType: 'Individual / founder',
    service: 'Not sure yet',
    budget: '',
    timeline: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const update = (event) => {
    const { name, value } = event.target;
    const limit = contactFieldLimits[name] || 120;
    setForm((current) => ({ ...current, [name]: value.slice(0, limit + 1) }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus('');
  };

  const sanitizedForm = sanitizeContactForm(form);
  const mailSubject = encodeURIComponent(`Project inquiry from ${sanitizedForm.name || 'website visitor'}`);
  const mailBody = encodeURIComponent(
    `Name: ${sanitizedForm.name}\nEmail: ${sanitizedForm.email}\nClient type: ${sanitizedForm.clientType}\nService interest: ${sanitizedForm.service}\nBudget: ${sanitizedForm.budget}\nTimeline: ${sanitizedForm.timeline}\n\nProject details:\n${sanitizedForm.message}`
  );
  const mailtoHref = `mailto:nicholascents77@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  const submitForm = (event) => {
    event.preventDefault();
    const validation = validateContactForm(form);
    setErrors(validation.errors);

    if (Object.keys(validation.errors).length) {
      setStatus('Please fix the highlighted fields before sending.');
      return;
    }

    const rateLimit = checkContactRateLimit();
    if (!rateLimit.allowed) {
      setStatus(`Too many attempts. Try again in about ${rateLimit.retryAfterMinutes} minute(s).`);
      return;
    }

    setForm(validation.sanitized);
    setStatus('Opening your email app with a sanitized project brief.');
    window.location.href = mailtoHref;
  };

  return (
    <section id="cta">
      <div className="cta-bg" />
      <div className="cta-inner">
        <div className="section-tag reveal" style={{ justifyContent: 'center', margin: '0 auto 24px' }}>Let's Work Together</div>
        <h2 className="cta-title reveal delay-1">Ready to<br /><span>Get Results?</span></h2>
        <p className="cta-sub reveal delay-2">Whether you know exactly what you need or want help choosing the right service mix, send the details and I’ll respond with the best next step.</p>
        <form className="contact-form reveal delay-3" onSubmit={submitForm} noValidate>
          <div className="form-row">
            <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your name" maxLength={contactFieldLimits.name} required />{errors.name && <span className="form-error">{errors.name}</span>}</label>
            <label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" maxLength={contactFieldLimits.email} required />{errors.email && <span className="form-error">{errors.email}</span>}</label>
          </div>
          <div className="form-row">
            <label>Client type
              <select name="clientType" value={form.clientType} onChange={update}>
                <option>Individual / founder</option>
                <option>Small business</option>
                <option>Growing team</option>
                <option>Enterprise / executive office</option>
              </select>
            </label>
            <label>Service interest
              <select name="service" value={form.service} onChange={update}>
                <option>Not sure yet</option>
                <option>Project Management & Ops</option>
                <option>Software Development</option>
                <option>Design</option>
                <option>Writing & Content</option>
                <option>Social Media & Marketing</option>
                <option>Virtual & Executive Assistance</option>
                <option>Business Development & Strategy</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>Budget range<input name="budget" value={form.budget} onChange={update} placeholder="$500 - $5,000 / flexible" maxLength={contactFieldLimits.budget} />{errors.budget && <span className="form-error">{errors.budget}</span>}</label>
            <label>Timeline<input name="timeline" value={form.timeline} onChange={update} placeholder="This week, 30 days, this quarter" maxLength={contactFieldLimits.timeline} />{errors.timeline && <span className="form-error">{errors.timeline}</span>}</label>
          </div>
          <label>What are you trying to achieve?
            <textarea name="message" value={form.message} onChange={update} placeholder="Tell me the goal, current problem, deadline, and what success should look like." rows="5" maxLength={contactFieldLimits.message} required />
            <span className="form-count">{form.message.length}/{contactFieldLimits.message}</span>
            {errors.message && <span className="form-error">{errors.message}</span>}
          </label>
          {status && <div className="form-status">{status}</div>}
          <div className="cta-actions">
            <button className="btn-primary magnetic" type="submit">Send Project Brief <span className="btn-arrow">→</span></button>
            <a href="tel:+17867448853" className="btn-secondary magnetic">+1 (786) 744-8853</a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-left">chwx projects<span style={{ color: 'var(--gold)' }}>.</span></div>
        <div className="footer-center">© 2026 chwx projects · Njoku Nicholas C. · nicholascents77@gmail.com · Available Worldwide</div>
        <div className="footer-right">
          {socialLinks.map((link) => (
            <a href={link.href} className="footer-social" title={link.title} aria-label={link.label} target="_blank" rel="noreferrer" key={link.label}>{link.text}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Effects() {
  useEffect(() => {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    const cleanups = [];

    tiltCards.forEach((card) => {
      const move = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
      };
      const leave = () => {
        card.style.transform = '';
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
    });

    const magneticButtons = document.querySelectorAll('.magnetic');
    magneticButtons.forEach((button) => {
      const move = (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.35;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.35;
        button.style.transform = `translate(${x}px,${y}px) translateY(-3px)`;
      };
      const leave = () => {
        button.style.transform = '';
      };
      button.addEventListener('mousemove', move);
      button.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        button.removeEventListener('mousemove', move);
        button.removeEventListener('mouseleave', leave);
      });
    });

    const parallax = () => {
      const scrolled = window.scrollY;
      const hero = document.getElementById('hero');
      if (hero && scrolled < window.innerHeight) {
        const hTitle = hero.querySelector('.hero-headline');
        const hSub = hero.querySelector('.hero-sub');
        if (hTitle) hTitle.style.transform = `translateY(${scrolled * 0.25}px)`;
        if (hSub) hSub.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', parallax, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', parallax));

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}

function App() {
  const [progress, setProgress] = useState(0);
  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Cursor />
      <div id="progress" style={{ width: `${progress}%` }} />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Services />
      <Portfolio />
      <Tools />
      <Testimonials />
      <ServiceFinder />
      <CTA />
      <Footer />
      <Effects />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
