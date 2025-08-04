"use client";

import React from "react";
import {
  BarChart,
  Users,
  Target,
  Globe,
  FileText,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Youtube,
  CheckCircle,
  Lightbulb,
  Shield,
  TrendingUp,
  BookOpen,
  Newspaper,
  Download,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export const CompanyPage = () => {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter antialiased">
      <header className="bg-white shadow-sm fixed top-14 w-full z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <nav className="hidden md:flex space-x-6">
            {[
              "home",
              "about",
              "services",
              "case-studies",
              "resources",
              "contact",
            ].map((section) => (
              <a
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-gray-600 hover:text-indigo-700 font-medium cursor-pointer px-3 py-2"
              >
                {section
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </a>
            ))}
          </nav>
   </div>
      </header>
      <section
        id="home"
        className="py-20 md:py-28 bg-gradient-to-r from-green-700 to-indigo-700 text-white rounded-b-lg shadow-lg"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Decoding Africa’s Pulse: Data-Driven Insights for Political &
            Socio-Economic Strategy
          </h1>
          {/* Subheading */}
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Politrack Africa empowers leaders with cutting-edge opinion polling,
            research, and strategic advisory services tailored to Africa’s
            complex political and socio‑economic landscape.
          </p>
          {/* Key Value Proposition */}
          <blockquote className="relative p-6 bg-white/10 rounded-xl border border-white/20 mb-12 italic text-lg md:text-xl max-w-4xl mx-auto shadow-inner animate-fade-in-up delay-200">
            <span className="absolute -top-4 -left-2 text-6xl opacity-30 select-none">
              “
            </span>
            In a continent of diverse voices and rapid change, we turn nuanced
            public sentiment into actionable intelligence. Trusted by
            governments, NGOs, and enterprises to navigate Africa’s future with
            confidence.
            <span className="absolute -bottom-4 -right-2 text-6xl opacity-30 select-none">
              ”
            </span>
          </blockquote>

          {/* Services Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: (
                  <Users size={40} className="mx-auto mb-3 text-yellow-400" />
                ),
                title: "Political Polling",
                desc: "Election forecasting, voter behavior & policy approval ratings.",
                delay: "delay-300",
              },
              {
                icon: (
                  <BarChart
                    size={40}
                    className="mx-auto mb-3 text-yellow-400"
                  />
                ),
                title: "Socio-Economic Research",
                desc: "Public perception on poverty, governance, climate, and inclusion.",
                delay: "delay-400",
              },
              {
                icon: (
                  <Target size={40} className="mx-auto mb-3 text-yellow-400" />
                ),
                title: "Strategic Advisory",
                desc: "Evidence-based campaigns, policy design, and risk mitigation.",
                delay: "delay-500",
              },
              {
                icon: (
                  <Globe size={40} className="mx-auto mb-3 text-yellow-400" />
                ),
                title: "Pan‑African Coverage",
                desc: "Fieldwork across 25+ countries, local-language capabilities.",
                delay: "delay-600",
              },
            ].map(({ icon, title, desc, delay }) => (
              <div
                key={title}
                className={`bg-white/15 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 animate-fade-in-up ${delay}`}
              >
                {icon}
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm opacity-80">{desc}</p>
              </div>
            ))}
          </div>

          {/* Featured Insight */}
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in-up delay-700">
            <p className="text-lg font-semibold text-center md:text-left">
              "78% of urban youth in 5 African nations prioritize economic
              opportunity over ideological loyalty in 2024 elections."
            </p>
            <a
              href="#"
              className="flex items-center gap-2 whitespace-nowrap bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-800 transition"
            >
              Download our free report: "The Next African Vote"
              <Download size={20} />
            </a>
          </div>
        </div>
      </section>
      <section id="about" className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-indigo-800 animate-fade-in-up">
            African Insights, By Africans, For Africa
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8 animate-fade-in-left">
              <p className="text-lg leading-relaxed text-gray-700">
                <span className="text-2xl font-bold text-green-700">
                  Our Mission:
                </span>
                To amplify Africa’s voices through rigorous, ethical research
                that informs transformative decisions.
              </p>
              <h3 className="text-3xl font-bold text-indigo-700 mb-6">
                Why Politrack?
              </h3>
              <ul className="space-y-4 text-gray-700">
                {[
                  {
                    text: "Local Expertise: 90% of our researchers are Africa-based, with deep contextual understanding.",
                  },
                  {
                    text: "Methodological Rigor: Mixed‑method approaches (CATI, face‑to‑face, mobile surveys) adapted to local realities.",
                  },
                  {
                    text: "Non‑Partisan Integrity: ISO 20252 certified. Independent. Truth above all.",
                  },
                  {
                    text: "Innovation Hub: AI‑driven sentiment analysis, geospatial polling, and real‑time dashboards.",
                  },
                ].map(({ text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <CheckCircle
                      className="flex-shrink-0 mt-1 text-green-600"
                      size={20}
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text.replace(
                          /(.*?):/,
                          '<strong class="text-indigo-600">$1:</strong>'
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column */}
            <div className="relative p-8 bg-white rounded-xl shadow-2xl animate-fade-in-right">
              <img
                src="https://placehold.co/600x400/388E3C/ffffff?text=Diverse+African+Faces"
                alt="Diverse African Faces"
                className="w-full h-auto rounded-lg mb-6 object-cover shadow-md"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/600x400/388E3C/ffffff?text=Image+Not+Found";
                }}
              />
              <blockquote className="italic text-lg text-gray-700 border-l-4 border-green-600 pl-4">
                Guided 3 national governments in designing post‑COVID recovery
                policies with 92% public approval. Predicted 7/7 major electoral
                outcomes in 2023.
              </blockquote>
              <p className="mt-4 text-sm text-gray-500">
                <span className="font-semibold">Impact Spotlight:</span> Our
                commitment to actionable intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="services"
        className="py-20 md:py-28 bg-indigo-700 text-white rounded-t-lg shadow-lg"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 animate-fade-in-up">
            Our Services
          </h2>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Users size={32} className="text-indigo-700 mr-3" />,
                title: "1. Political Intelligence",
                list: [
                  "Election Polling: Exit polls, candidate favorability, coalition modeling.",
                  "Policy Tracker: Public trust in institutions, constitutional reforms, security perceptions.",
                ],
                useCase:
                  "Reduced campaign costs by 40% for a presidential candidate using our swing‑voter targeting model.",
                delay: "delay-100",
              },
              {
                icon: <BarChart size={32} className="text-indigo-700 mr-3" />,
                title: "2. Socio‑Economic Research",
                list: [
                  "Development Indicators: SDG progress, gender equity, service delivery satisfaction.",
                  "Crisis Response: Conflict analysis, displacement trends, humanitarian needs.",
                ],
                useCase:
                  "Helped an NGO redirect $2M to high‑impact youth unemployment programs in Sahel.",
                delay: "delay-200",
              },
              {
                icon: <Lightbulb size={32} className="text-indigo-700 mr-3" />,
                title: "3. Strategic Advisory",
                list: [
                  "Campaign Optimization: Message testing, voter segmentation, digital outreach.",
                  "Risk Forecasting: Political stability assessments, regulatory change impact.",
                  "Custom Solutions: Bespoke projects from climate migration to informal economy studies.",
                ],
                useCase:
                  "Providing tailored strategies for complex challenges across the continent.",
                delay: "delay-300",
              },
            ].map(({ icon, title, list, useCase, delay }) => (
              <div
                key={title}
                className={`bg-white text-gray-800 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 animate-fade-in-up ${delay}`}
              >
                <div className="flex items-center mb-4">
                  {icon}
                  <h3 className="text-2xl font-bold text-indigo-700">
                    {title}
                  </h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  {list.map((item) => (
                    <li
                      key={item}
                      dangerouslySetInnerHTML={{
                        __html: item.replace(/^(.*?):/, "<strong>$1:</strong>"),
                      }}
                    />
                  ))}
                </ul>
                <p className="italic text-sm text-gray-600 border-l-4 border-green-600 pl-3">
                  <strong className="text-green-700">Client Use Case:</strong>{" "}
                  {useCase}
                </p>
              </div>
            ))}
          </div>

          {/* Methodology Highlights */}
          <div className="mt-20 text-center animate-fade-in-up delay-400">
            <h3 className="text-3xl font-bold mb-8 text-yellow-400">
              Methodology Highlights
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-lg">
              {[
                {
                  icon: <TrendingUp size={28} className="text-yellow-400" />,
                  label: `Sample sizes:1,200 – 5,000 respondents per national study`,
                },
                {
                  icon: <Shield size={28} className="text-yellow-400" />,
                  label: "Margin of error: ±2 – 3% at 95% confidence level",
                },
                {
                  icon: <Globe size={28} className="text-yellow-400" />,
                  label: "Languages: 30+ African languages supported",
                },
              ].map(({ icon, label }, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/15 rounded-xl shadow-lg flex items-center gap-3"
                >
                  {icon}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="case-studies" className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-indigo-800 animate-fade-in-up">
            Our Impact: Case Studies
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Nigeria */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-green-600 transform hover:scale-105 transition duration-300 animate-fade-in-left">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                1. Electoral Turnaround in Nigeria (2023)
              </h3>
              <p className="mb-4 text-gray-700">
                <strong className="text-green-700">Challenge:</strong> Client
                trailed by 15 points 6 months pre‑election.
              </p>
              <p className="mb-4 text-gray-700">
                <strong className="text-green-700">Our Role:</strong> Identified
                unaddressed grievances in 3 swing states via granular sentiment
                mapping.
              </p>
              <p className="mb-4 text-gray-700">
                <strong className="text-green-700">Outcome:</strong> Data‑driven
                grassroots strategy led to 8‑point swing and victory.
              </p>
              <img
                src="https://placehold.co/600x300/4B0082/ffffff?text=Data+Viz+Map+Nigeria"
                alt="Data Visualization Map of Nigeria"
                className="w-full h-auto rounded-lg mt-6 object-cover shadow-md"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/600x300/4B0082/ffffff?text=Image+Not+Found";
                }}
              />
            </div>

            {/* Rwanda */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-600 transform hover:scale-105 transition duration-300 animate-fade-in-right">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                2. Gender Policy Reform in Rwanda
              </h3>
              <p className="mb-4 text-gray-700">
                <strong className="text-green-700">Challenge:</strong>{" "}
                Government sought evidence to strengthen women’s land rights.
              </p>
              <p className="mb-4 text-gray-700">
                <strong className="text-green-700">Our Role:</strong> Nationwide
                perception study + traditional leader engagement analysis.
              </p>
              <p className="mb-4 text-gray-700">
                <strong className="text-green-700">Outcome:</strong> Informed
                legislation passed with 76% public support.
              </p>
              <img
                src="https://placehold.co/600x300/388E3C/ffffff?text=Researchers+in+Fieldwork"
                alt="Researchers in Fieldwork"
                className="w-full h-auto rounded-lg mt-6 object-cover shadow-md"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/600x300/388E3C/ffffff?text=Image+Not+Found";
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ————————————————— RESOURCES ————————————————— */}
      <section
        id="resources"
        className="py-20 md:py-28 bg-gradient-to-r from-indigo-700 to-green-700 text-white rounded-b-lg shadow-lg"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 animate-fade-in-up">
            Resources & Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Reports */}
            <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 animate-fade-in-left">
              <div className="flex items-center mb-6">
                <BookOpen className="text-indigo-700 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-indigo-700">
                  Latest Reports
                </h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                {[
                  '"Urbanization vs. Tradition: Africa’s Governance Dilemma" (2024)',
                  '"Youth Unemployment: Time Bomb or Economic Catalyst?"',
                  "Quarterly Africa Political Risk Index",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <FileText size={20} className="text-green-600" />
                    <a href="#" className="hover:text-indigo-700 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog */}
            <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 animate-fade-in-right">
              <div className="flex items-center mb-6">
                <Newspaper className="text-indigo-700 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-indigo-700">
                  Blog Headlines
                </h3>
              </div>
              <ul className="space-y-4 text-gray-700">
                {[
                  "Why East Africa’s Carbon Tax Divide Matters",
                  "Mozambique Elections: Social Media’s Double‑Edged Sword",
                  "African Data Privacy Laws: What Pollsters Must Know",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <ArrowRight size={20} className="text-green-600" />
                    <a href="#" className="hover:text-indigo-700 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* ————————————————— CONTACT ————————————————— */}
      <section id="contact" className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-8 animate-fade-in-up">
            Partner With Us
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Ready to make data your compass in Africa’s dynamic landscape?
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-10 mb-16">
            {/* Offices */}
            <div className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 animate-fade-in-left">
              <MapPin className="text-green-700 mb-4 mx-auto" size={40} />
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                Our Offices
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>Headquarters:</strong> Nairobi, Kenya
                </li>
                <li>
                  <strong>Regional Hubs:</strong>
                </li>
                <li>Accra, Ghana</li>
                <li>Johannesburg, South Africa</li>
                <li>Dakar, Senegal</li>
              </ul>
            </div>

            {/* Get in touch */}
            <div className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 animate-fade-in-right">
              <Mail className="text-green-700 mb-4 mx-auto" size={40} />
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                Get In Touch
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <Phone size={20} className="text-indigo-600" />
                  <a
                    href="tel:+254700123456"
                    className="hover:text-indigo-700 transition"
                  >
                    +254 700 123 456
                  </a>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Mail size={20} className="text-indigo-600" />
                  <a
                    href="mailto:insights@politrack.africa"
                    className="hover:text-indigo-700 transition"
                  >
                    insights@politrack.africa
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-indigo-900 text-white py-12 rounded-t-lg shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl font-semibold mb-6">
            Politrack Africa: Where Numbers Meet Narrative.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-yellow-400 transition"
            >
              <Twitter size={28} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-yellow-400 transition"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-yellow-400 transition"
            >
              <Youtube size={28} />
            </a>
          </div>
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Politrack Africa. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
