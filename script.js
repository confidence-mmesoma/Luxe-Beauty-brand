/* ==========================================================================
   LUSHÉ Beauty Studio: script.js
   Data → helpers → renderers → interactions → booking flow → init
   No backend: everything runs in the browser, bookings live in localStorage.
   ========================================================================== */
(() => {
  "use strict";

  document.documentElement.classList.add("js");

  /* ------------------------------------------------------------------ *
   *  Config & data
   * ------------------------------------------------------------------ */
  const WHATSAPP_NUMBER = "2348000000000"; // demo number
  const KEYS = {
    bookings: "lushe.bookings",
    profile: "lushe.profile",
    newsletter: "lushe.newsletter",
  };

  const img = (id, w = 900) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

  const CATEGORIES = [
    {
      id: "hair",
      label: "Hair",
      image:
        "https://i.pinimg.com/736x/8b/1c/83/8b1c83f47ae61e7ee5a1a93472d19c66.jpg",
      alt: "Stylist finishing a client’s braided hairstyle",
      blurb:
        "Knotless braids, stitch braids, silk presses and natural styles that look sharp for weeks.",
      note: "Bring a reference photo and we’ll plan the size, length and finish with you.",
      items: [
        {
          name: "Knotless Braids",
          price: 25000,
          duration: "5–7 hrs",
          tag: "Most booked",
          desc: "Feather-light, scalp-friendly braids with a seamless, natural-looking root.",
        },
        {
          name: "Stitch Braids",
          price: 20000,
          duration: "3–5 hrs",
          desc: "Crisp, clean lines and a polished finish that photographs beautifully.",
        },
        {
          name: "Silk Press",
          price: 18000,
          duration: "2–3 hrs",
          desc: "Smooth, bouncy, heat-conscious straightening with a healthy shine.",
        },
        {
          name: "Natural Hair Styling",
          price: 15000,
          duration: "2–4 hrs",
          desc: "Wash, definition and styling that celebrates your natural texture.",
        },
      ],
    },
    {
      id: "wigs",
      label: "Wigs",
      image:
        "https://i.pinimg.com/736x/a8/15/7e/a8157ee42ebbece73c27c869a9329097.jpg",
      alt: "Woman with a freshly installed, natural-looking wig",
      blurb:
        "Installs and custom finishing so your wig looks like it grows from your own scalp.",
      note: "Bring your own wig, or tell us what you want and we’ll advise on what to buy.",
      items: [
        {
          name: "Wig Installation",
          price: 15000,
          duration: "1.5–2 hrs",
          tag: "Popular choice",
          desc: "A snug, secure install with a natural parting and a blended hairline.",
        },
        {
          name: "Wig Customization",
          price: 25000,
          duration: "3–4 hrs",
          desc: "Bleached knots, plucking, cut and colour, tailored to your face shape.",
        },
        {
          name: "Frontal Installation",
          price: 20000,
          duration: "2–3 hrs",
          desc: "A seamless lace melt and a hairline that looks like it’s yours.",
        },
        {
          name: "Wig Revamping",
          price: 15000,
          duration: "1-2 days",
          desc: "Transforming your old, tangled wig back into a flawless, factory-fresh masterpiece.",
        },
      ],
    },
    {
      id: "nails",
      label: "Nails",
      image:
        "https://i.pinimg.com/736x/8c/97/4e/8c974e61d861ae2d04193e65014e1aba.jpg",
      alt: "Hands with a fresh luxury nail set",
      blurb:
        "Gel, acrylic and hand-finished sets, shaped and polished with care.",
      note: "Add nail art or a chrome finish at your appointment. We’ll quote on the day.",
      items: [
        {
          name: "Gel Manicure",
          price: 12000,
          duration: "1–1.5 hrs",
          tag: "Popular choice",
          desc: "Glossy, chip-resistant colour on a neatly prepped nail.",
        },
        {
          name: "Acrylic Set",
          price: 18000,
          duration: "2 hrs",
          desc: "Strong, well-balanced acrylics in your preferred length and shape.",
        },
        {
          name: "Luxury Nail Set",
          price: 25000,
          duration: "2.5–3 hrs",
          desc: "Custom shapes with hand-painted detail, for when you want them noticed.",
        },
        {
          name: "Luxury Pedicure",
          price: 15000,
          duration: "1–1.5 hrs",
          desc: "A soak, scrub and polish that leaves your feet soft and neatly finished.",
        },
      ],
    },
    {
      id: "lashes",
      label: "Lashes",
      image:
        "https://i.pinimg.com/1200x/4b/c2/60/4bc26066ca67afc438eece223141ea74.jpg",
      alt: "Close-up of full, fluttery lash extensions",
      blurb:
        "Mapped to your eye shape for a look that’s soft, full and easy to wake up to.",
      note: "Come with clean, makeup-free lashes for the best hold.",
      items: [
        {
          name: "Classic Lashes",
          price: 12000,
          duration: "1.5 hrs",
          desc: "One extension per natural lash for a neat, natural enhancement.",
        },
        {
          name: "Hybrid Lashes",
          price: 15000,
          duration: "2 hrs",
          tag: "Most booked",
          desc: "A blend of classic and volume fans for texture without heaviness.",
        },
        {
          name: "Volume Lashes",
          price: 18000,
          duration: "2–2.5 hrs",
          desc: "Handmade fans for full, dramatic definition.",
        },
        {
          name: "Lash Lift & Tint",
          price: 15000,
          duration: "1 hr",
          desc: "Your natural lashes curled and darkened for a lifted, mascara-free look.",
        },
      ],
    },
    {
      id: "makeup",
      label: "Makeup",
      image:
        "https://i.pinimg.com/736x/27/4a/48/274a48b939330152008ad47e81abbcb2.jpg",
      alt: "Woman with a soft, glowing glam makeup look",
      blurb:
        "From soft glow to full glam, blended to last through the photos and the party.",
      note: "Arrive with a clean, moisturised face. Tell us about your outfit and we’ll match the mood.",
      items: [
        {
          name: "Soft Glam",
          price: 20000,
          duration: "1–1.5 hrs",
          tag: "Popular choice",
          desc: "Skin-first makeup with a polished, event-ready finish.",
        },
        {
          name: "Full Glam",
          price: 30000,
          duration: "1.5–2 hrs",
          desc: "Sculpted, defined and camera-ready, with lashes included.",
        },
        {
          name: "Bridal Makeup",
          price: 50000,
          duration: "2–3 hrs",
          desc: "Long-wear, tear-proof makeup planned around your day and your dress.",
        },
        {
          name: "Makeup Lesson",
          price: 25000,
          duration: "1.5–2 hrs",
          desc: "Learn the techniques and products that suit your face, one step at a time.",
        },
      ],
    },
    {
      id: "facials",
      label: "Facials",
      image: img("1570172619644-dfd03ed5d881"),
      alt: "Woman relaxing during a facial treatment",
      blurb:
        "Deep-cleansing, glow-boosting facials chosen for your skin, not a script.",
      note: "We start with a short skin check so the treatment suits your skin today.",
      items: [
        {
          name: "Glow Facial",
          price: 18000,
          duration: "60 min",
          tag: "Popular choice",
          desc: "Cleanse, exfoliate and hydrate for an instant, healthy-looking glow.",
        },
        {
          name: "Deep Cleansing Facial",
          price: 22000,
          duration: "75 min",
          desc: "Extractions, steam and a calming mask to clear congested skin.",
        },
        {
          name: "Luxury Facial",
          price: 30000,
          duration: "90 min",
          desc: "Our full treatment with massage, targeted serums and a finishing mask.",
        },
        {
          name: "Acne-Clearing Facial",
          price: 25000,
          duration: "75 min",
          desc: "A deep clean with calming treatment to help clear congestion and breakouts.",
        },
      ],
    },
  ];

  /* Three editorial cards that group the six categories */
  const SERVICE_GROUPS = [
    {
      label: "Hair & Wigs",
      tab: "hair",
      cats: ["hair", "wigs"],
      image:
        "https://i.pinimg.com/736x/58/00/64/580064f00ba2e16e53b761e25d57fa05.jpg",
      alt: "Stylist finishing a client’s braided hairstyle",
      blurb:
        "Braids, silk presses, wig installs and custom finishing that looks like your own hair.",
      chips: ["Knotless braids", "Silk press", "Wig installs", "Customization"],
    },
    {
      label: "Nails & Lashes",
      tab: "nails",
      cats: ["nails", "lashes"],
      image:
        "https://i.pinimg.com/1200x/e0/75/6f/e0756f8f9f6913c9058e277fe48b2209.jpg",
      alt: "Hands with a fresh luxury nail set",
      blurb:
        "Gel, acrylic and hand-finished sets, plus lash maps shaped to your eyes.",
      chips: ["Gel & acrylic", "Nail art", "Classic to volume lashes"],
    },
    {
      label: "Makeup & Facials",
      tab: "makeup",
      cats: ["makeup", "facials"],
      image:
        "https://i.pinimg.com/736x/12/2d/07/122d0740c6675abbbdab553673a1eafa.jpg",
      alt: "Woman with a soft, glowing glam makeup look",
      blurb:
        "From a quiet glow to full glam, on skin we’ve prepped properly first.",
      chips: ["Soft & full glam", "Bridal", "Glow facials"],
    },
  ];

  const PACKAGES = [
    {
      id: "soft-glam",
      name: "The Soft Glam",
      price: 65000,
      save: 15000,
      tagline: "A polished, event-ready look without going overboard.",
      includes: ["Hair styling", "Soft glam makeup", "Hybrid lashes"],
    },
    {
      id: "full-luxe",
      name: "The Full Luxe",
      price: 95000,
      save: 25000,
      popular: true,
      tagline: "Everything done, from your hair to your fingertips.",
      includes: [
        "Hair styling",
        "Luxury nail set",
        "Volume lashes",
        "Full glam makeup",
      ],
    },
    {
      id: "bridal",
      name: "Bridal Beauty",
      price: 150000,
      save: 30000,
      tagline: "Every detail of your bridal look on one calm schedule.",
      includes: [
        "Bridal makeup",
        "Bridal hair styling",
        "Lashes",
        "Touch-up kit and refresh",
      ],
    },
  ];

  const BEFORE_AFTER = {
    hair: {
      label: "Hair",
      image: "https://i.pinimg.com/736x/80/5c/05/805c0519b2204cfc5b9f81fcce803633.jpg",
      alt: "Braided hairstyle",
      title: "Knotless braids, redone from scratch",
      text: "Sectioned neatly, braided feather-light and finished with a clean, natural root.",
      points: [
        "Neat sections and even tension",
        "Edges laid softly",
        "Finished with a light shine mist",
      ],
      service: "Knotless Braids",
    },
    wig: {
      label: "Wig",
      image: "https://i.pinimg.com/1200x/67/4f/0b/674f0bdc4fe9d4bd97ba2928acaac784.jpg",
      alt: "Installed wig",
      title: "A wig that looks like your own hair",
      text: "We plucked, customised and blended the hairline until the lace disappeared.",
      points: [
        "Bleached knots and pre-plucked hairline",
        "Cut and styled to suit the face",
        "Secure but comfortable fit",
      ],
      service: "Wig Customization",
    },
    nails: {
      label: "Nails",
      image: "https://i.pinimg.com/1200x/96/9c/4b/969c4b92a54ff46493ec2d11af09d37d.jpg",
      alt: "Finished nail set",
      title: "From bare nails to a full set",
      text: "Cuticles prepped, shape balanced and colour applied with even, glossy coverage.",
      points: [
        "Careful cuticle prep",
        "Balanced shape and length",
        "Chip-resistant top coat",
      ],
      service: "Luxury Nail Set",
    },
    makeup: {
      label: "Makeup",
      image: "https://i.pinimg.com/1200x/5c/87/e7/5c87e71d77881304fa8f982b394dac73.jpg",
      alt: "Finished makeup look",
      title: "Skin that looks like skin, only better",
      text: "Colour-matched base, sculpted contour and lashes for a soft, photo-ready glow.",
      points: [
        "Colour-matched base",
        "Blended, long-wear finish",
        "Lashes and lips to complete it",
      ],
      service: "Soft Glam",
    },
  };

  const GALLERY = [
    {
      id: 1,
      cat: "hair",
      ratio: "tall",
      title: "Knotless Braids",
      desc: "Medium knotless braids, mid-back length, finished with curled ends.",
      service: "Knotless Braids",
      img: "https://i.pinimg.com/736x/a7/6a/02/a76a0225daf03f0e7728a916f700294f.jpg",
    },
    {
      id: 2,
      cat: "nails",
      ratio: "sq",
      title: "Luxury Nail Set",
      desc: "Almond shape with a soft pink base and hand-painted detail.",
      service: "Luxury Nail Set",
      img: "https://i.pinimg.com/736x/f4/bf/56/f4bf56a86d81866151e7db1790fcdaaa.jpg"
    },
    {
      id: 3,
      cat: "wigs",
      ratio: "tall",
      title: "Frontal Installation",
      desc: "Body-wave frontal with a melted, natural hairline.",
      service: "Frontal Installation",
      img: "https://i.pinimg.com/1200x/ed/ff/90/edff90d99fc08f81e06bc1c53eb614ab.jpg",
    },
    {
      id: 4,
      cat: "makeup",
      ratio: "wide",
      title: "Soft Glam",
      desc: "Glowing skin, warm rose tones and soft-defined eyes.",
      service: "Soft Glam",
      img: "https://i.pinimg.com/736x/4b/4d/c8/4b4dc8e1b0241e30968cbd7e17592b1b.jpg",
    },
    {
      id: 5,
      cat: "lashes",
      ratio: "sq",
      title: "Hybrid Lashes",
      desc: "Wispy hybrid set mapped for a lifted, open eye.",
      service: "Hybrid Lashes",
      img: "https://i.pinimg.com/1200x/d3/fe/57/d3fe5730033faa01076d3d9f926e8273.jpg",
    },
    {
      id: 6,
      cat: "hair",
      ratio: "wide",
      title: "Silk Press",
      desc: "Bouncy, heat-conscious silk press with a healthy shine.",
      service: "Silk Press",
      img: "https://i.pinimg.com/1200x/38/46/06/384606a8f8d59ec96a1c9f1160ac9021.jpg",
    },
    {
      id: 7,
      cat: "makeup",
      ratio: "tall",
      title: "Full Glam",
      desc: "Sculpted, camera-ready glam for a birthday shoot.",
      service: "Full Glam",
      img: "https://i.pinimg.com/736x/2d/f3/0c/2df30c683558e17f9b617272279aa7f2.jpg",
    },
    {
      id: 8,
      cat: "nails",
      ratio: "wide",
      title: "Gel Manicure",
      desc: "Sheer nude gel with a glossy finish. Clean and classic.",
      service: "Gel Manicure",
      img: "https://i.pinimg.com/736x/3c/e4/4b/3ce44b3f45891065e44a2fe4ebdccc3d.jpg",
    },
    {
      id: 12,
      cat: "facials",
      ratio: "sq",
      title: "Glow Facial",
      desc: "Fresh, hydrated skin after a Glow Facial.",
      service: "Glow Facial",
      img: "https://i.pinimg.com/1200x/06/69/cd/0669cd371422c35a395756d6acc83154.jpg",
    },
  ];
  const GALLERY_FILTERS = [
    ["all", "All"],
    ["hair", "Hair"],
    ["wigs", "Wigs"],
    ["nails", "Nails"],
    ["lashes", "Lashes"],
    ["makeup", "Makeup"],
  ];

  const TESTIMONIALS = [
    {
      name: "Amaka O.",
      service: "Knotless Braids",
      rating: 5,
      text: "From the moment I walked in, everything felt intentional. My hair came out exactly how I wanted it, and it stayed neat for weeks.",
    },
    {
      name: "Chidinma E.",
      service: "Wig Installation",
      rating: 5,
      text: "Finally, a wig install that doesn’t look like a wig. My hairline is so natural that people keep asking if it’s mine.",
    },
    {
      name: "Tomiwa A.",
      service: "The Full Luxe package",
      rating: 5,
      text: "I booked the Full Luxe for my birthday and it was the most relaxed I’ve felt before an event. Everything matched perfectly.",
    },
    {
      name: "Fatima B.",
      service: "Hybrid Lashes",
      rating: 5,
      text: "My lashes look full but not heavy, and the mapping actually suits my eyes. Booking online took me two minutes.",
    },
  ];

  const FAQS = [
    [
      "Do I need an appointment?",
      "We recommend booking ahead, especially for braids, wig work and Saturdays. That way your station and stylist are ready when you arrive.",
    ],
    [
      "How do I book?",
      "Tap “Book Appointment”, choose your service, pick a day and time, and share your details. We’ll confirm by WhatsApp or phone.",
    ],
    [
      "Do you accept walk-ins?",
      "Sometimes, for quick services like a manicure or lash refill, depending on the day. Booking is the only way to guarantee your time.",
    ],
    [
      "What payment methods do you accept?",
      "Bank transfer, card (POS) and cash. Deposits are paid by bank transfer.",
    ],
    [
      "Can I bring my own hair?",
      "Yes. Bring your braiding hair or wig and mention it in your special request so we plan the right amount of time. If you’d like us to advise on what to buy, just ask.",
    ],
    [
      "How long does an appointment take?",
      "It depends on the service. Lashes take about 1.5 to 2.5 hours, nails 1 to 3 hours and knotless braids 5 to 7 hours. Every service on this page shows an estimate.",
    ],
    [
      "Can I reschedule?",
      "Yes. Message us at least 24 hours before your appointment and we’ll move you to the next available time at no charge.",
    ],
    [
      "Do you offer bridal packages?",
      "We do. Bridal Beauty covers bridal makeup, hair, lashes and a touch-up refresh. We suggest booking a trial session first so your day-of look is already decided.",
    ],
    [
      "Is there a deposit?",
      "A 30% deposit secures Saturdays, bridal bookings and long braiding sessions. The balance is paid on the day.",
    ],
    [
      "Where are you located?",
      "We’re at 14 Rosewood Avenue, Abuja. We’ll send a map and directions when you book.",
    ],
  ];

  const QUIZ = [
    {
      key: "occasion",
      q: "What are you getting ready for?",
      options: [
        ["everyday", "Everyday glow"],
        ["date", "Date night"],
        ["birthday", "Birthday"],
        ["wedding", "Wedding"],
        ["photoshoot", "Photoshoot"],
        ["event", "Special event"],
      ],
    },
    {
      key: "focus",
      q: "What do you want to focus on?",
      options: [
        ["hair", "Hair"],
        ["face", "Face"],
        ["nails", "Nails"],
        ["full", "Full look"],
      ],
    },
    {
      key: "budget",
      q: "What’s your preferred budget?",
      options: [
        ["u20", "Under ₦20k"],
        ["20-50", "₦20k–₦50k"],
        ["50-100", "₦50k–₦100k"],
        ["100+", "₦100k+"],
      ],
    },
  ];
  const BUDGETS = {
    u20: { min: 0, max: 19999 },
    "20-50": { min: 20000, max: 50000 },
    "50-100": { min: 50001, max: 100000 },
    "100+": { min: 100000, max: Infinity },
  };

  const REC_POOL = [
    {
      name: "Gel Manicure",
      price: 12000,
      focus: ["nails"],
      occ: ["everyday", "date"],
      why: "Clean, glossy nails that go with everything and last for weeks.",
    },
    {
      name: "Luxury Nail Set",
      price: 25000,
      focus: ["nails"],
      occ: ["birthday", "event", "photoshoot", "wedding"],
      why: "Custom shape and hand-painted detail, made to be noticed in photos.",
    },
    {
      name: "Wig Installation",
      price: 15000,
      focus: ["hair"],
      occ: ["everyday", "date", "event"],
      why: "A snug, natural install so your hair is sorted in under two hours.",
    },
    {
      name: "Silk Press",
      price: 18000,
      focus: ["hair"],
      occ: ["date", "event", "photoshoot", "everyday"],
      why: "Smooth, bouncy hair with movement, perfect for a night out.",
    },
    {
      name: "Knotless Braids",
      price: 25000,
      focus: ["hair"],
      occ: ["everyday", "birthday"],
      why: "Lightweight braids you can forget about for weeks.",
    },
    {
      name: "Glow Facial",
      price: 18000,
      focus: ["face"],
      occ: ["everyday", "date", "photoshoot"],
      why: "A fresh, healthy glow before anything else goes on your face.",
    },
    {
      name: "Soft Glam",
      price: 20000,
      focus: ["face"],
      occ: ["date", "birthday", "event", "everyday"],
      why: "A polished, event-ready face without going overboard.",
    },
    {
      name: "Full Glam",
      price: 30000,
      focus: ["face"],
      occ: ["birthday", "photoshoot", "event", "date"],
      why: "Sculpted, defined makeup that holds up under flash and dance floors.",
    },
    {
      name: "Bridal Makeup",
      price: 50000,
      focus: ["face"],
      occ: ["wedding"],
      why: "Long-wear, tear-proof makeup planned around your dress and your day.",
    },
    {
      name: "The Soft Glam",
      price: 65000,
      focus: ["full"],
      occ: ["date", "birthday", "event", "photoshoot", "everyday"],
      why: "Hair, makeup and lashes together for a polished look that still feels like you.",
    },
    {
      name: "The Full Luxe",
      price: 95000,
      focus: ["full"],
      occ: ["birthday", "photoshoot", "event", "date"],
      why: "Hair, nails, lashes and makeup, so every detail matches from head to fingertips.",
    },
    {
      name: "Bridal Beauty",
      price: 150000,
      focus: ["full"],
      occ: ["wedding"],
      why: "Bridal makeup, hair, lashes and a touch-up, all on one calm schedule.",
    },
  ];

  /* Flat lookup used by booking & lightbox */
  const ALL_SERVICES = [
    ...CATEGORIES.flatMap((c) =>
      c.items.map((i) => ({ ...i, category: c.label, fixed: false })),
    ),
    ...PACKAGES.map((p) => ({
      name: p.name,
      price: p.price,
      duration: "Full look",
      category: "Packages",
      fixed: true,
    })),
  ];
  const findService = (name) =>
    ALL_SERVICES.find((s) => s.name === name) || null;

  const SLOTS = [
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM",
  ];

  /* ------------------------------------------------------------------ *
   *  Helpers
   * ------------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const naira = (n) => "₦" + Number(n).toLocaleString("en-US");
  const icon = (id, cls = "") =>
    `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const escapeHTML = (str) =>
    String(str).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const minPrice = (cat) => Math.min(...cat.items.map((i) => i.price));
  const stars = (n) =>
    Array.from({ length: 5 }, (_, i) => icon("star", "icon--fill"))
      .slice(0, n)
      .join("");

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
  };

  const toISO = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fromISO = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const fmtLong = (iso) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(fromISO(iso));
  const fmtShort = (iso) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(fromISO(iso));
  const priceLabel = (s) => (s.fixed ? "" : "From ") + naira(s.price);

  /* Fallback for any image that fails to load, so the layout never breaks */
  const fallbackSrc = () =>
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#FDE8EF'/><stop offset='1' stop-color='#E5789F'/></linearGradient></defs><rect width='800' height='1000' fill='url(#g)'/><text x='400' y='520' text-anchor='middle' font-family='Georgia,serif' font-size='84' fill='#8A1E4B' opacity='.65'>LUSHÉ</text></svg>",
    );
  const applyFallback = (el) => {
    if (el.dataset.fallback) return;
    el.dataset.fallback = "1";
    el.src = fallbackSrc();
  };
  document.addEventListener(
    "error",
    (e) => {
      if (e.target instanceof HTMLImageElement) applyFallback(e.target);
    },
    true,
  );
  window.addEventListener("load", () =>
    $$("img").forEach((i) => {
      if (i.complete && i.naturalWidth === 0 && i.getAttribute("src"))
        applyFallback(i);
    }),
  );

  /* Toast */
  let toastTimer;
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3600);
  }

  /* Overlay manager: scroll lock, focus return, focus trap, Escape */
  let openOverlay = null;
  let lastFocused = null;
  function showOverlay(el) {
    if (openOverlay && openOverlay !== el) hideOverlay(openOverlay, false);
    lastFocused = document.activeElement;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    openOverlay = el;
  }
  function hideOverlay(el, restoreFocus = true) {
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    if (openOverlay === el) openOverlay = null;
    if (!openOverlay && !$("#mobileMenu").classList.contains("is-open"))
      document.body.classList.remove("is-locked");
    if (restoreFocus && lastFocused && document.contains(lastFocused))
      lastFocused.focus({ preventScroll: true });
  }
  document.addEventListener("keydown", (e) => {
    if (!openOverlay) return;
    if (e.key === "Escape") {
      hideOverlay(openOverlay);
      return;
    }
    if (e.key !== "Tab") return;
    const focusables = $$(
      'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
      openOverlay,
    ).filter((el) => el.getClientRects().length && !el.closest("[hidden]"));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  document.addEventListener("click", (e) => {
    const closer = e.target.closest("[data-close]");
    if (closer && openOverlay && openOverlay.contains(closer))
      hideOverlay(openOverlay);
  });

  /* ------------------------------------------------------------------ *
   *  Header, menu, scroll effects
   * ------------------------------------------------------------------ */
  function initHeader() {
    const header = $("#siteHeader");
    const toTop = $("#scrollTop");
    let ticking = false;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      toTop.classList.toggle("is-visible", window.scrollY > 900);
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(onScroll);
          ticking = true;
        }
      },
      { passive: true },
    );
    onScroll();
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }),
    );

    // Mobile menu
    const toggle = $("#menuToggle");
    const menu = $("#mobileMenu");
    const setMenu = (open) => {
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-locked", open);
    };
    toggle.addEventListener("click", () =>
      setMenu(!menu.classList.contains("is-open")),
    );
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a") || e.target.closest(".js-book")) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });

    // Scroll spy
    const links = $$(".primary-nav a[data-spy]");
    const spyIds = links.map((a) => a.dataset.spy);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const match =
            id === "explorer"
              ? "services"
              : ["why", "transformations", "finder", "gram", "visit"].includes(
                    id,
                  )
                ? null
                : id;
          if (!match || !spyIds.includes(match)) return;
          links.forEach((a) =>
            a.classList.toggle("is-active", a.dataset.spy === match),
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    $$("main section[id]").forEach((s) => spy.observe(s));
  }

  function initReveal() {
    const items = $$(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach((i) => io.observe(i));
  }

  function initCounters() {
    const els = $$("[data-count]");
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || "";
      if (reducedMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) return;
    els.forEach((el) => {
      el.textContent =
        (0).toFixed(Number(el.dataset.decimals || 0)) +
        (el.dataset.suffix || "");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    els.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------ *
   *  Services: cards + explorer
   * ------------------------------------------------------------------ */
  function renderServiceCards() {
    $("#serviceCards").innerHTML = SERVICE_GROUPS.map((g) => {
      const from = Math.min(
        ...g.cats.map((id) => minPrice(CATEGORIES.find((c) => c.id === id))),
      );
      return `
      <article class="svc-card reveal">
        <img src="${g.image}" alt="${escapeHTML(g.alt)}" loading="lazy" width="600" height="800">
        <div class="svc-card__body">
          <div class="svc-card__top"><h3>${g.label}</h3><span class="svc-card__from">From ${naira(from)}</span></div>
          <div class="svc-card__more">
            <p>${g.blurb}</p>
            <ul class="svc-card__chips">${g.chips.map((c) => `<li>${c}</li>`).join("")}</ul>
            <a class="svc-link" href="#explorer" data-tab="${g.tab}" aria-label="Explore ${g.label}">Explore service ${icon("arrow-right")}</a>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  function renderExplorerTabs() {
    $("#explorerTabs").innerHTML = CATEGORIES.map(
      (c) =>
        `<button type="button" role="tab" id="tab-${c.id}" data-tab="${c.id}" aria-selected="false" aria-controls="explorerPanel" tabindex="-1">${c.label}</button>`,
    ).join("");
  }

  function showExplorer(id, animate = true) {
    const cat = CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
    $$('#explorerTabs [role="tab"]').forEach((t) => {
      const active = t.dataset.tab === cat.id;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    const panel = $("#explorerPanel");
    panel.setAttribute("aria-labelledby", `tab-${cat.id}`);
    panel.innerHTML = `
      <figure class="explorer__media">
        <img src="${cat.image}" alt="${escapeHTML(cat.alt)}" loading="lazy" width="700" height="875">
        <figcaption>${cat.note}</figcaption>
      </figure>
      <ul class="svc-list">
        ${cat.items
          .map(
            (item) => `
          <li class="svc-row">
            <div>
              <h4>${item.name}${item.tag ? `<span class="badge">${item.tag}</span>` : ""}</h4>
              <p>${item.desc}</p>
              <span class="svc-row__meta">${icon("clock")} ${item.duration}</span>
            </div>
            <div class="svc-row__end">
              <span class="price">From ${naira(item.price)}</span>
              <button type="button" class="btn btn--ghost-dark btn--sm" data-book-service="${escapeHTML(item.name)}">Reserve</button>
            </div>
          </li>`,
          )
          .join("")}
      </ul>`;
    if (animate && !reducedMotion) {
      panel.classList.remove("is-switching");
      void panel.offsetWidth;
      panel.classList.add("is-switching");
    }
  }

  function initExplorer() {
    renderServiceCards();
    renderExplorerTabs();
    showExplorer("hair", false);
    const tabs = $("#explorerTabs");
    tabs.addEventListener("click", (e) => {
      const t = e.target.closest('[role="tab"]');
      if (t) showExplorer(t.dataset.tab);
    });
    tabs.addEventListener("keydown", (e) => {
      const list = $$('[role="tab"]', tabs);
      const i = list.findIndex(
        (t) => t.getAttribute("aria-selected") === "true",
      );
      let n = null;
      if (e.key === "ArrowRight") n = (i + 1) % list.length;
      if (e.key === "ArrowLeft") n = (i - 1 + list.length) % list.length;
      if (e.key === "Home") n = 0;
      if (e.key === "End") n = list.length - 1;
      if (n !== null) {
        e.preventDefault();
        list[n].focus();
        showExplorer(list[n].dataset.tab);
      }
    });
    // Cards and footer links jump to the right tab
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-tab]");
      if (!link) return;
      showExplorer(link.dataset.tab);
      const target = $("#explorer");
      if (link.getAttribute("href") === "#services") {
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
    });
  }

  /* ------------------------------------------------------------------ *
   *  Before / after slider
   * ------------------------------------------------------------------ */
  function renderBA(key) {
    const d = BEFORE_AFTER[key];
    $$('#baTabs [role="tab"]').forEach((t) => {
      const on = t.dataset.ba === key;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $("#baStage").innerHTML = `
      <div class="ba" id="baSlider" data-pos="50">
        <img class="ba__after" src="${d.image}" alt="After: ${escapeHTML(d.alt)} finished at LUSHÉ" loading="lazy" width="1100" height="930">
        <img class="ba__before" src="${d.before || d.image}" alt="Before: the same look before styling, shown in a plainer finish" loading="lazy" width="1100" height="930">
        <span class="ba__tag ba__tag--before">Before</span>
        <span class="ba__tag ba__tag--after">After</span>
        <div class="ba__handle" aria-hidden="true"><span class="ba__knob">${icon("arrow-left")}${icon("arrow-right")}</span></div>
        <input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after: ${escapeHTML(d.label)}">
      </div>`;
    $("#baInfo").innerHTML = `
      <h3>${d.title}</h3>
      <p>${d.text}</p>
      <ul>${d.points.map((p) => `<li>${icon("check")}<span>${p}</span></li>`).join("")}</ul>
      <button type="button" class="btn btn--light" data-book-service="${escapeHTML(d.service)}">Book This Look</button>`;
    bindSlider($("#baSlider"));
  }

  function bindSlider(box) {
    const range = $(".ba__range", box);
    const setPos = (v) => {
      const pos = Math.max(0, Math.min(100, v));
      box.style.setProperty("--pos", pos + "%");
      range.value = pos;
    };
    const fromPointer = (e) => {
      const rect = box.getBoundingClientRect();
      setPos(((e.clientX - rect.left) / rect.width) * 100);
    };
    let dragging = false;
    box.addEventListener("pointerdown", (e) => {
      dragging = true;
      box.setPointerCapture(e.pointerId);
      fromPointer(e);
    });
    box.addEventListener("pointermove", (e) => {
      if (dragging) fromPointer(e);
    });
    ["pointerup", "pointercancel"].forEach((ev) =>
      box.addEventListener(ev, () => {
        dragging = false;
      }),
    );
    range.addEventListener("input", () => setPos(Number(range.value)));
    setPos(50);
  }

  function initBeforeAfter() {
    $("#baTabs").innerHTML = Object.entries(BEFORE_AFTER)
      .map(
        ([k, v]) =>
          `<button type="button" role="tab" data-ba="${k}" aria-selected="false" tabindex="-1">${v.label}</button>`,
      )
      .join("");
    $("#baTabs").addEventListener("click", (e) => {
      const t = e.target.closest('[role="tab"]');
      if (t) renderBA(t.dataset.ba);
    });
    $("#baTabs").addEventListener("keydown", (e) => {
      const list = $$('[role="tab"]', e.currentTarget);
      const i = list.findIndex(
        (t) => t.getAttribute("aria-selected") === "true",
      );
      const n =
        e.key === "ArrowRight"
          ? (i + 1) % list.length
          : e.key === "ArrowLeft"
            ? (i - 1 + list.length) % list.length
            : null;
      if (n !== null) {
        e.preventDefault();
        list[n].focus();
        renderBA(list[n].dataset.ba);
      }
    });
    renderBA("hair");
  }

  /* ------------------------------------------------------------------ *
   *  Gallery + lightbox
   * ------------------------------------------------------------------ */
  let galleryFilter = "all";
  let visibleGallery = GALLERY;
  let lightboxIndex = 0;

  function renderGallery(animate = false) {
    visibleGallery = GALLERY.filter(
      (g) => galleryFilter === "all" || g.cat === galleryFilter,
    );
    const grid = $("#galleryGrid");
    grid.innerHTML = visibleGallery
      .map(
        (g, i) => `
      <button type="button" class="g-item g-item--${g.ratio}" data-index="${i}" aria-label="Open photo: ${escapeHTML(g.title)}">
        <img src="${g.img}" alt="${escapeHTML(g.title)}: ${escapeHTML(g.desc)}" loading="lazy" width="600" height="750">
        <span class="g-item__label"><strong>${g.title}</strong><small>${g.cat[0].toUpperCase() + g.cat.slice(1)}</small></span>
      </button>`,
      )
      .join("");
    if (animate && !reducedMotion) {
      grid.classList.remove("is-filtering");
      void grid.offsetWidth;
      grid.classList.add("is-filtering");
    }
  }

  function openLightbox(index) {
    lightboxIndex = (index + visibleGallery.length) % visibleGallery.length;
    const g = visibleGallery[lightboxIndex];
    const service = findService(g.service);
    const lb = $("#lightbox");
    const image = $("#lbImage");
    delete image.dataset.fallback;
    image.src = g.img;
    image.alt = `${g.title}: ${g.desc}`;
    $("#lbCat").textContent = g.cat[0].toUpperCase() + g.cat.slice(1);
    $("#lbTitle").textContent = g.title;
    $("#lbDesc").textContent = g.desc;
    $("#lbPrice").textContent = service
      ? `Starting at ${naira(service.price)}`
      : "";
    $("#lbBook").dataset.bookService = g.service;
    if (!lb.classList.contains("is-open")) {
      showOverlay(lb);
      $("#lbBook").focus({ preventScroll: true });
    }
  }

  function initGallery() {
    $("#galleryFilters").innerHTML = GALLERY_FILTERS.map(
      ([id, label]) =>
        `<button type="button" data-filter="${id}" aria-pressed="${id === "all"}">${label}</button>`,
    ).join("");
    renderGallery();
    $("#galleryFilters").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-filter]");
      if (!b) return;
      galleryFilter = b.dataset.filter;
      $$("#galleryFilters button").forEach((x) =>
        x.setAttribute("aria-pressed", String(x === b)),
      );
      renderGallery(true);
    });
    $("#galleryGrid").addEventListener("click", (e) => {
      const item = e.target.closest(".g-item");
      if (item) openLightbox(Number(item.dataset.index));
    });
    $("#lbPrev").addEventListener("click", () =>
      openLightbox(lightboxIndex - 1),
    );
    $("#lbNext").addEventListener("click", () =>
      openLightbox(lightboxIndex + 1),
    );
    document.addEventListener("keydown", (e) => {
      if (!$("#lightbox").classList.contains("is-open")) return;
      if (e.key === "ArrowLeft") openLightbox(lightboxIndex - 1);
      if (e.key === "ArrowRight") openLightbox(lightboxIndex + 1);
    });
    // Swipe on touch
    let startX = null;
    const media = $(".lightbox__media");
    media.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true },
    );
    media.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) openLightbox(lightboxIndex + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ------------------------------------------------------------------ *
   *  Packages, reviews, instagram, faq
   * ------------------------------------------------------------------ */
  function renderPackages() {
    $("#packageGrid").innerHTML = PACKAGES.map(
      (p) => `
      <article class="pkg reveal ${p.popular ? "pkg--popular" : ""}">
        ${p.popular ? '<span class="pkg__flag">Most Popular</span>' : ""}
        <h3>${p.name}</h3>
        <p class="pkg__tagline">${p.tagline}</p>
        <p class="pkg__price">${naira(p.price)}</p>
        <span class="pkg__save">Save up to ${naira(p.save)} when booked as a package</span>
        <ul>${p.includes.map((i) => `<li>${icon("check")}<span>${i}</span></li>`).join("")}</ul>
        <button type="button" class="btn btn--primary" data-book-service="${escapeHTML(p.name)}">Choose This Package</button>
      </article>`,
    ).join("");
  }

  function initReviews() {
    const track = $("#reviewTrack");
    track.innerHTML = TESTIMONIALS.map((t) => {
      const initials = t.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .replace(".", "");
      return `
        <figure class="review" aria-label="Review by ${escapeHTML(t.name)}, ${t.rating} out of 5 stars">
          <span class="stars" aria-hidden="true">${stars(t.rating)}</span>
          <blockquote>“${t.text}”</blockquote>
          <footer><span class="avatar" aria-hidden="true">${initials}</span><div><strong>${t.name}</strong><span>${t.service}</span></div></footer>
        </figure>`;
    }).join("");
    const bar = $("#reviewBar");
    const step = () => {
      const card = $(".review", track);
      return card ? card.getBoundingClientRect().width + 20 : 300;
    };
    $("#reviewPrev").addEventListener("click", () =>
      track.scrollBy({ left: -step(), behavior: "smooth" }),
    );
    $("#reviewNext").addEventListener("click", () =>
      track.scrollBy({ left: step(), behavior: "smooth" }),
    );
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = max > 0 ? track.scrollLeft / max : 0;
      const barWidth = Math.min(
        100,
        (track.clientWidth / track.scrollWidth) * 100,
      );
      bar.style.width = barWidth + "%";
      bar.style.transform = `translateX(${ratio * ((100 / barWidth) * 100 - 100)}%)`;
    };
    track.addEventListener("scroll", () => requestAnimationFrame(update), {
      passive: true,
    });
    window.addEventListener("resize", update);
    update();
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight")
        track.scrollBy({ left: step(), behavior: "smooth" });
      if (e.key === "ArrowLeft")
        track.scrollBy({ left: -step(), behavior: "smooth" });
    });
  }

  function renderInstagram() {
    const picks = [
      GALLERY[1],
      GALLERY[3],
      GALLERY[0],
      GALLERY[4],
      GALLERY[7],
      GALLERY[2],
    ];
    $("#instaGrid").innerHTML = picks
      .map(
        (g) => `
      <a class="insta" href="https://www.instagram.com/lushebeautystudio" target="_blank" rel="noopener" aria-label="View ${escapeHTML(g.title)} on Instagram">
        <img src="${g.img}" alt="${escapeHTML(g.title)}: ${escapeHTML(g.desc)}" loading="lazy" width="400" height="400">
        <span class="insta__over">${icon("instagram")}</span>
      </a>`,
      )
      .join("");
  }

  function initFAQ() {
    const list = $("#faqList");
    list.innerHTML = FAQS.map(
      ([q, a], i) => `
      <div class="faq-item">
        <h3><button type="button" class="faq-q" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}"><span>${q}</span>${icon("chevron")}</button></h3>
        <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${a}</p></div></div>
      </div>`,
    ).join("");
    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-q");
      if (!btn) return;
      const open = btn.getAttribute("aria-expanded") === "true";
      $$(".faq-q", list).forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        $("#" + b.getAttribute("aria-controls")).classList.remove("is-open");
      });
      if (!open) {
        btn.setAttribute("aria-expanded", "true");
        $("#" + btn.getAttribute("aria-controls")).classList.add("is-open");
      }
    });
    // Open the first answer by default
    $(".faq-q", list).click();
  }

  /* ------------------------------------------------------------------ *
   *  Finder quiz
   * ------------------------------------------------------------------ */
  const quiz = { step: 0, answers: {} };

  function recommend({ occasion, focus, budget }) {
    const band = BUDGETS[budget];
    const cap = Number.isFinite(band.max) ? band.max : 150000;
    const scored = REC_POOL.filter((r) => r.price <= band.max)
      .map((r) => {
        let score = 0;
        if (r.focus.includes(focus)) score += 4;
        if (r.occ.includes(occasion)) score += 3;
        if (r.price >= band.min) score += 2;
        score += r.price / cap;
        return { ...r, score };
      })
      .sort((a, b) => b.score - a.score);
    const [best, second] = scored;
    return { best, second, focusMatched: best && best.focus.includes(focus) };
  }

  function renderFinder() {
    const box = $("#finder");
    if (quiz.step >= QUIZ.length) {
      const { best, second, focusMatched } = recommend(quiz.answers);
      const svc = findService(best.name);
      const budgetNote = focusMatched
        ? ""
        : '<p class="result__alt">Your budget is a little tight for that focus, so this is our closest match. We can also tailor something smaller once you message us.</p>';
      box.innerHTML = `
        <div class="result">
          <p class="result__label">Your LUSHÉ recommendation</p>
          <h3>“${best.name}”</h3>
          <p class="result__price">${svc && svc.fixed ? naira(best.price) : "From " + naira(best.price)}</p>
          <p class="result__why">${best.why}</p>
          ${budgetNote}
          ${second ? `<p class="result__alt"><strong>Also worth a look:</strong> ${second.name} (${svc && findService(second.name).fixed ? "" : "from "}${naira(second.price)})</p>` : ""}
          <div class="result__actions">
            <button type="button" class="btn btn--primary" data-book-service="${escapeHTML(best.name)}">Book This Look</button>
            <button type="button" class="btn btn--outline" id="finderReset">Start Over</button>
          </div>
        </div>`;
      return;
    }
    const q = QUIZ[quiz.step];
    const picked = quiz.answers[q.key];
    box.innerHTML = `
      <div class="finder-step">
        <div class="finder__progress"><span>Question ${quiz.step + 1} of ${QUIZ.length}</span><div class="finder__bar"><span style="width:${((quiz.step + 1) / QUIZ.length) * 100}%"></span></div></div>
        <h3 class="finder__q">${q.q}</h3>
        <div class="finder__opts">
          ${q.options.map(([val, label]) => `<button type="button" class="finder__opt ${picked === val ? "is-picked" : ""}" data-val="${val}">${label}</button>`).join("")}
        </div>
        ${quiz.step > 0 ? '<button type="button" class="btn btn--text finder__back" id="finderBack">Back</button>' : ""}
      </div>`;
  }

  function initFinder() {
    renderFinder();
    $("#finder").addEventListener("click", (e) => {
      const opt = e.target.closest(".finder__opt");
      if (opt) {
        quiz.answers[QUIZ[quiz.step].key] = opt.dataset.val;
        $$(".finder__opt", $("#finder")).forEach((b) =>
          b.classList.toggle("is-picked", b === opt),
        );
        setTimeout(
          () => {
            quiz.step++;
            renderFinder();
          },
          reducedMotion ? 0 : 220,
        );
        return;
      }
      if (e.target.closest("#finderBack")) {
        quiz.step = Math.max(0, quiz.step - 1);
        renderFinder();
      }
      if (e.target.closest("#finderReset")) {
        quiz.step = 0;
        quiz.answers = {};
        renderFinder();
      }
    });
  }

  /* ------------------------------------------------------------------ *
   *  Booking flow
   * ------------------------------------------------------------------ */
  const booking = { step: 1, service: null, date: null, time: null };
  const STEP_ORDER = [1, 2, 3, 4, 5];

  const hash = (str) => {
    let h = 2166136261;
    for (const c of str) {
      h ^= c.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  const slotMinutes = (label) => {
    const [time, meridiem] = label.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  /* Demo availability: deterministic per date so it stays stable between visits */
  function getSlots(iso) {
    const date = fromISO(iso);
    const now = new Date();
    const blockRate = date.getDay() === 6 ? 0.6 : 0.3; // Saturdays fill faster
    const slots = SLOTS.map((time) => ({
      time,
      available: (hash(iso + time) % 100) / 100 >= blockRate,
      reason: "Booked",
    }));
    let free = slots.filter((s) => s.available).length;
    for (const s of slots) {
      if (free >= 2) break;
      if (!s.available) {
        s.available = true;
        free++;
      }
    }
    if (iso === toISO(now)) {
      const nowMins = now.getHours() * 60 + now.getMinutes();
      slots.forEach((s) => {
        if (slotMinutes(s.time) <= nowMins + 60) {
          s.available = false;
          s.reason = "Passed";
        }
      });
    }
    return slots;
  }

  function bookableDays(count = 21) {
    const days = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    for (let i = 0; i < count; i++) {
      days.push(toISO(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  }

  const isSunday = (iso) => fromISO(iso).getDay() === 0;

  function nextAvailable() {
    for (const iso of bookableDays(30)) {
      if (isSunday(iso)) continue;
      const slot = getSlots(iso).find((s) => s.available);
      if (slot) return { iso, time: slot.time };
    }
    return null;
  }

  function renderServiceOptions() {
    const groups = [
      ...CATEGORIES.map((c) => ({ label: c.label, items: c.items })),
      {
        label: "Packages",
        items: PACKAGES.map((p) => ({
          name: p.name,
          price: p.price,
          duration: "Full look",
          fixed: true,
        })),
      },
    ];
    $("#serviceOptions").innerHTML = groups
      .map(
        (g) => `
      <fieldset class="svc-group">
        <legend class="sr-only">${g.label}</legend>
        <h4 aria-hidden="true">${g.label}</h4>
        ${g.items
          .map(
            (i) => `
          <label class="svc-choice">
            <input type="radio" name="service" value="${escapeHTML(i.name)}">
            <span><strong>${i.name}</strong><small>${i.duration}</small></span>
            <span class="price">${g.label === "Packages" ? "" : "From "}${naira(i.price)}</span>
          </label>`,
          )
          .join("")}
      </fieldset>`,
      )
      .join("");
  }

  function renderDates() {
    $("#dateStrip").innerHTML = bookableDays()
      .map((iso) => {
        const d = fromISO(iso);
        const sunday = isSunday(iso);
        const wk = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
        }).format(d);
        const mo = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
          d,
        );
        return `<button type="button" class="date-chip" data-date="${iso}" aria-pressed="${booking.date === iso}" ${sunday ? 'disabled aria-label="' + fmtLong(iso) + ', by appointment only"' : `aria-label="${fmtLong(iso)}"`}>
        <span>${wk}</span><strong>${d.getDate()}</strong><span>${mo}</span>${sunday ? "<em>By appt</em>" : ""}
      </button>`;
      })
      .join("");
    if (booking.date) {
      const selected = $(`.date-chip[data-date="${booking.date}"]`);
      if (selected)
        selected.scrollIntoView({ inline: "center", block: "nearest" });
    }
  }

  function renderSlots() {
    if (!booking.date) return;
    const slots = getSlots(booking.date);
    const isSat = fromISO(booking.date).getDay() === 6;
    $("#timeHint").textContent =
      `${fmtLong(booking.date)}. ${isSat ? "Limited Saturday appointments available, so grab a slot while you can." : "Pick the start time that suits you."}`;
    $("#timeGrid").innerHTML = slots
      .map(
        (s) => `
      <button type="button" class="time-slot" data-time="${s.time}" aria-pressed="${booking.time === s.time}" ${s.available ? "" : "disabled"}>
        ${s.time}${s.available ? "" : `<small>${s.reason}</small>`}
      </button>`,
      )
      .join("");
    if (!slots.some((s) => s.available))
      $("#err-time").textContent =
        "No times left on this day. Please pick another date.";
  }

  const errors = {
    service: "Choose a service to continue.",
    date: "Pick a day that works for you.",
    time: "Choose a time so we can hold your spot.",
    name: "Please tell us your full name so we can reserve your spot.",
    phone:
      "That number doesn’t look right. Try a Nigerian number like 0803 123 4567.",
    email: "Add a valid email address so we can send your confirmation.",
  };
  const isValidPhone = (v) =>
    /^(?:\+?234|0)[789][01]\d{8}$/.test(v.replace(/[\s()-]/g, ""));
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  function setFieldError(id, message) {
    const input = $("#f" + id[0].toUpperCase() + id.slice(1));
    const out = $("#err-" + id);
    if (out) out.textContent = message || "";
    if (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  function validateStep(step) {
    if (step === 1) {
      const ok = !!booking.service;
      $("#err-service").textContent = ok ? "" : errors.service;
      return ok;
    }
    if (step === 2) {
      const ok = !!booking.date;
      $("#err-date").textContent = ok ? "" : errors.date;
      return ok;
    }
    if (step === 3) {
      const ok = !!booking.time;
      $("#err-time").textContent = ok ? "" : errors.time;
      return ok;
    }
    if (step === 4) {
      const name = $("#fName").value.trim();
      const phone = $("#fPhone").value.trim();
      const email = $("#fEmail").value.trim();
      const checks = {
        name: name.length >= 2,
        phone: isValidPhone(phone),
        email: isValidEmail(email),
      };
      Object.entries(checks).forEach(([k, ok]) =>
        setFieldError(k, ok ? "" : errors[k]),
      );
      const firstBad = Object.entries(checks).find(([, ok]) => !ok);
      if (firstBad)
        $("#f" + firstBad[0][0].toUpperCase() + firstBad[0].slice(1)).focus();
      return !firstBad;
    }
    return true;
  }

  function summaryRows(data) {
    const svc = data.service;
    return `
      <div><dt>Service</dt><dd>${escapeHTML(svc.name)}</dd></div>
      <div><dt>Date</dt><dd>${fmtLong(data.date)}</dd></div>
      <div><dt>Time</dt><dd>${data.time}</dd></div>
      ${data.name ? `<div><dt>Name</dt><dd>${escapeHTML(data.name)}</dd></div><div><dt>Phone</dt><dd>${escapeHTML(data.phone)}</dd></div>` : ""}
      ${data.notes ? `<div><dt>Request</dt><dd>${escapeHTML(data.notes)}</dd></div>` : ""}
      <div class="summary__total"><dt>Estimated price</dt><dd>${priceLabel(svc)}</dd></div>`;
  }

  function currentDetails() {
    return {
      name: $("#fName").value.trim(),
      phone: $("#fPhone").value.trim(),
      email: $("#fEmail").value.trim(),
      notes: $("#fNotes").value.trim(),
    };
  }

  function updateFooter() {
    const foot = $("#bookingFoot");
    const s = booking.step;
    foot.classList.toggle("is-hidden", s === "done");
    if (s === "done") return;
    $("#btnBack").style.visibility = s === 1 ? "hidden" : "visible";
    $("#btnNext").textContent =
      s === 4 ? "Review Booking" : s === 5 ? "Confirm Appointment" : "Continue";
    $("#footPrice").innerHTML = booking.service
      ? `${escapeHTML(booking.service.name)} · <strong>${priceLabel(booking.service)}</strong>`
      : "";
  }

  function goToStep(step, focusHeading = true) {
    booking.step = step;
    $$(".step", $("#bookingForm")).forEach((sec) => {
      sec.hidden = String(sec.dataset.step) !== String(step);
    });
    $$("#stepper li").forEach((li) => {
      const n = Number(li.dataset.step);
      li.classList.toggle("is-active", n === step);
      li.classList.toggle(
        "is-done",
        typeof step === "number" ? n < step : true,
      );
      if (n === step) li.setAttribute("aria-current", "step");
      else li.removeAttribute("aria-current");
    });
    if (step === 2) renderDates();
    if (step === 3) {
      $("#err-time").textContent = "";
      renderSlots();
    }
    if (step === 5)
      $("#summary").innerHTML = summaryRows({
        service: booking.service,
        date: booking.date,
        time: booking.time,
        ...currentDetails(),
      });
    updateFooter();
    $("#bookingScroll").scrollTop = 0;
    if (focusHeading) {
      const active = $(`.step[data-step="${step}"] h3`);
      if (active) active.focus({ preventScroll: true });
    }
  }

  function openBooking(preset = {}) {
    // Reset transient state, keep any preset choices
    booking.service = preset.service ? findService(preset.service) : null;
    booking.date = preset.date || null;
    booking.time = preset.time || null;
    $$(".step__error, .field__error", $("#bookingForm")).forEach((el) => {
      el.textContent = "";
    });
    $$("[aria-invalid]", $("#bookingForm")).forEach((el) =>
      el.removeAttribute("aria-invalid"),
    );

    const profile = store.get(KEYS.profile, {});
    $("#fName").value = profile.name || "";
    $("#fPhone").value = profile.phone || "";
    $("#fEmail").value = profile.email || "";
    $("#fNotes").value = "";

    $$('input[name="service"]').forEach((r) => {
      r.checked = booking.service && r.value === booking.service.name;
    });
    showOverlay($("#bookingModal"));
    goToStep(1, false);
    const checked = $('input[name="service"]:checked');
    if (checked) {
      checked.closest(".svc-choice").scrollIntoView({ block: "center" });
      checked.focus({ preventScroll: true });
    } else $("#s1t").focus({ preventScroll: true });
  }

  function buildWhatsAppMessage(b) {
    const lines = [
      "Hello LUSHÉ Beauty Studio! I’d like to confirm my appointment request.",
      "",
      `Service: ${b.service}`,
      `Date: ${fmtLong(b.date)}`,
      `Time: ${b.time}`,
      `Estimated price: ${b.priceLabel}`,
      `Name: ${b.name}`,
      `Phone: ${b.phone}`,
      b.notes ? `Special request: ${b.notes}` : null,
      `Reference: ${b.ref}`,
    ].filter((line) => line !== null);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function confirmBooking() {
    const details = currentDetails();
    const ref =
      "LSH-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      String(Date.now()).slice(-3);
    const record = {
      ref,
      service: booking.service.name,
      priceLabel: priceLabel(booking.service),
      price: booking.service.price,
      date: booking.date,
      time: booking.time,
      ...details,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const saved = store.set(KEYS.bookings, [
      ...store.get(KEYS.bookings, []),
      record,
    ]);
    store.set(KEYS.profile, {
      name: details.name,
      phone: details.phone,
      email: details.email,
    });

    $("#successRef").textContent = ref;
    $("#successSummary").innerHTML = summaryRows({
      service: booking.service,
      date: booking.date,
      time: booking.time,
      ...details,
    });
    $("#waLink").href = buildWhatsAppMessage(record);
    goToStep("done");
    if (!saved)
      toast("Your browser blocked saving. Use WhatsApp to send your request.");
  }

  function initBooking() {
    renderServiceOptions();

    // Any element can open the booking flow
    document.addEventListener("click", (e) => {
      const withService = e.target.closest("[data-book-service]");
      const generic = e.target.closest(".js-book");
      if (!withService && !generic) return;
      e.preventDefault();
      const preset = withService
        ? { service: withService.dataset.bookService }
        : {};
      if (openOverlay && openOverlay.id === "lightbox")
        hideOverlay(openOverlay, false);
      openBooking(preset);
    });

    $("#serviceOptions").addEventListener("change", (e) => {
      if (e.target.name !== "service") return;
      booking.service = findService(e.target.value);
      $("#err-service").textContent = "";
      updateFooter();
    });

    $("#dateStrip").addEventListener("click", (e) => {
      const chip = e.target.closest(".date-chip");
      if (!chip || chip.disabled) return;
      booking.date = chip.dataset.date;
      booking.time = null; // times differ per day
      $$(".date-chip").forEach((c) =>
        c.setAttribute("aria-pressed", String(c === chip)),
      );
      $("#err-date").textContent = "";
    });

    $("#timeGrid").addEventListener("click", (e) => {
      const slot = e.target.closest(".time-slot");
      if (!slot || slot.disabled) return;
      booking.time = slot.dataset.time;
      $$(".time-slot").forEach((s) =>
        s.setAttribute("aria-pressed", String(s === slot)),
      );
      $("#err-time").textContent = "";
    });

    // Live-clear field errors as the user fixes them
    [
      ["name", (v) => v.trim().length >= 2],
      ["phone", isValidPhone],
      ["email", isValidEmail],
    ].forEach(([key, test]) => {
      const input = $("#f" + key[0].toUpperCase() + key.slice(1));
      input.addEventListener("input", () => {
        if (input.hasAttribute("aria-invalid") && test(input.value))
          setFieldError(key, "");
      });
    });

    $("#btnBack").addEventListener("click", () => {
      if (typeof booking.step === "number" && booking.step > 1)
        goToStep(booking.step - 1);
    });

    $("#bookingForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const s = booking.step;
      if (s === "done") return;
      if (!validateStep(s)) return;
      if (s === 5) confirmBooking();
      else goToStep(STEP_ORDER[STEP_ORDER.indexOf(s) + 1]);
    });
  }

  /* ------------------------------------------------------------------ *
   *  Newsletter
   * ------------------------------------------------------------------ */
  function initNewsletter() {
    const form = $("#newsletterForm");
    const input = $("#newsletterEmail");
    const msg = $("#newsletterMsg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = input.value.trim();
      msg.classList.remove("is-error");
      if (!isValidEmail(email)) {
        input.setAttribute("aria-invalid", "true");
        msg.classList.add("is-error");
        msg.textContent =
          "Add a valid email like you@example.com so we can reach you.";
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");
      const list = store.get(KEYS.newsletter, []);
      if (!list.includes(email)) store.set(KEYS.newsletter, [...list, email]);
      msg.textContent =
        "You’re on the list. Watch your inbox for first pick of Saturday slots.";
      form.reset();
      toast("Welcome to the LUSHÉ list.");
    });
  }

  /* ------------------------------------------------------------------ *
   *  Hero: next available slot
   * ------------------------------------------------------------------ */
  function initHeroSlot() {
    const slot = nextAvailable();
    const label = $("#nextSlot");
    const btn = label.parentElement.querySelector(".link-btn");
    if (!slot) {
      label.textContent = "Message us for availability";
      return;
    }
    label.textContent = `${fmtShort(slot.iso)} at ${slot.time}`;
    btn.dataset.date = slot.iso;
    btn.dataset.time = slot.time;
    // Prefill that slot when reserved from the hero card
    btn.addEventListener(
      "click",
      (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        openBooking({ date: btn.dataset.date, time: btn.dataset.time });
      },
      true,
    );
  }

  /* ------------------------------------------------------------------ *
   *  Init
   * ------------------------------------------------------------------ */
  function init() {
    $("#year").textContent = new Date().getFullYear();
    initHeader();
    initExplorer();
    initBeforeAfter();
    initGallery();
    renderPackages();
    initFinder();
    initReviews();
    renderInstagram();
    initFAQ();
    initBooking();
    initNewsletter();
    initHeroSlot();
    initReveal();
    initCounters();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
