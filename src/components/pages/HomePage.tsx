// HPI 1.7-G
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  Shield, 
  Lock, 
  Activity, 
  Globe, 
  Calculator, 
  FileText, 
  Waves, 
  TreeDeciduous, 
  MapPin,
  Search,
  CheckCircle2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

// --- Canonical Data Sources ---

const IMPACT_CARDS = [
  {
    id: 'sea-level',
    title: 'Subida del nivel del mar',
    location: 'Guna Yala',
    description: 'Comunidades indígenas en relocalización por erosión y marejadas. Desde 2012, el ascenso del nivel del mar ha acelerado la erosión en islas como Cartí y Ukupseni.',
    stat: '1 de cada 4 niños en zonas vulnerables (UNICEF 2025)',
    icon: Waves
  },
  {
    id: 'drought',
    title: 'Sequía extrema',
    location: 'Canal de Panamá',
    description: 'Niveles bajos por El Niño recurrente (2012–2026). En 2015-2016, la sequía severa redujo los tránsitos en un 20%, generando pérdidas millonarias.',
    stat: 'Pérdidas >500M USD',
    icon: Thermometer
  },
  {
    id: 'biodiversity',
    title: 'Pérdida de biodiversidad',
    location: 'Arco Seco',
    description: 'Deforestación crítica y contaminación. Más de 102,000 toneladas de residuos al mar por año impactan cuencas y agricultura.',
    stat: '>200,000 ha de bosque perdidas desde 2012',
    icon: TreeDeciduous
  },
  {
    id: 'erosion',
    title: 'Erosión costera',
    location: 'Punta Chame',
    description: 'La erosión ha reducido playas drásticamente. Estudios de IH Cantabria (2021-2025) muestran riesgo alto de conversión en isla.',
    stat: 'Pérdida de 3-11m de playa por año',
    icon: Globe
  },
  {
    id: 'floods',
    title: 'Inundaciones Intensas',
    location: 'Chiriquí',
    description: 'Eventos históricos por desbordes de ríos como Chiriquí Viejo. Alta vulnerabilidad en Tierras Altas y Cerro Punta detectada en estudios recientes.',
    stat: 'Alta recurrencia de eventos extremos',
    icon: Droplets
  }
];

const ECONOMIC_IMPACTS = [
  { impact: 'Inundaciones', desc: 'Aumento en frecuencia extrema', data: 'Alta susceptibilidad en Bocas del Toro, Tonosí y Chiriquí; eventos en 2014 y 2020 causaron >20 muertes.', source: 'MiAmbiente / BID / IPCC' },
  { impact: 'Sequías', desc: 'Períodos más largos', data: '+6.6°C proyectado fin siglo; sequías 2015-2016 y 2019-2020 afectaron Canal y agricultura.', source: 'IMHPA / CEPAL / IPCC' },
  { impact: 'Vulnerabilidad Infantil', desc: 'Salud, educación afectadas', data: '1/4 niños en zonas altas riesgo; 10% hogares sin electricidad.', source: 'UNICEF' },
  { impact: 'Económico', desc: 'Crecimiento PIB afectado', data: 'Pérdidas >1B USD en sequías e inundaciones 2012-2026.', source: 'CEPAL / GIZ' },
  { impact: 'Erosión Costera', desc: 'Pérdida de costas y playas', data: '900km de costa pacífica erosionada 2012-2020; Punta Chame pierde 3-11m/año.', source: 'IH Cantabria' },
];

const ECOLOGICAL_ANALYSIS = [
  { cause: 'Aumento temp. 0.23°C/década', impact: 'Sequías, incendios forestales, erosión costera acelerada', actors: 'MiAmbiente, IMHPA, IH Cantabria' },
  { cause: 'Emisiones duplicadas 20 años', impact: 'Pérdida cobertura forestal >60%; 200k ha deforestadas', actors: 'UNICEF, Comunidades indígenas, GIZ' },
  { cause: 'Precipitaciones extremas', impact: 'Inundaciones, erosión costera, deslizamientos', actors: 'ACP (Canal), Sector privado' },
  { cause: 'Calentamiento global', impact: 'Residuos al mar 102k ton/año; ascenso nivel mar 3-5mm/año', actors: 'ONU, CEPAL, IPCC' },
];

const STRIDE_MODEL = [
  { letter: 'S', title: 'Spoofing', desc: 'Autenticación + verificación de ubicación para prevenir suplantación.' },
  { letter: 'T', title: 'Tampering', desc: 'Validación de inputs + hashing para evitar alteraciones de datos.' },
  { letter: 'R', title: 'Repudiation', desc: 'Logs inmutables para rastreo de acciones.' },
  { letter: 'I', title: 'Information Disclosure', desc: 'Encriptación AES para proteger datos sensibles.' },
  { letter: 'D', title: 'Denial of Service', desc: 'Rate limiting + CAPTCHA para mitigar DDoS.' },
  { letter: 'E', title: 'Elevation of Privilege', desc: 'RBAC + 2FA simulada para control de accesos.' },
];

// --- Components ---

const SectionDivider = () => (
  <div className="w-full flex justify-center py-12">
    <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-secondary to-transparent opacity-50" />
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background font-paragraph text-foreground selection:bg-secondary selection:text-white overflow-clip">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-10" />
          <Image
            src="https://static.wixstatic.com/media/1a7319_497d3531217246bab3da7bcbd47007b2~mv2.png?originWidth=1920&originHeight=768"
            alt="Panama Landscape Climate Change"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[100rem] mx-auto px-6 md:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm tracking-widest uppercase mb-6 backdrop-blur-sm">
              Informe 2012-2026
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold mb-6 leading-tight tracking-tight">
              Impactos del <br/>
              <span className="text-secondary italic">Cambio Climático</span>
            </h1>
            <p className="font-paragraph text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Monitoreo interactivo • Reportes ciudadanos seguros • Datos actualizados para acción ambiental
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link to="/impactos">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none rounded-none px-8 py-6 text-lg font-heading tracking-wide transition-all duration-300">
                  Explora los Impactos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/mapa">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-foreground rounded-none px-8 py-6 text-lg font-heading tracking-wide transition-all duration-300">
                  Ver Mapa Interactivo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- KEY STATISTICS STRIP --- */}
      <section className="relative z-30 -mt-24 w-full max-w-[100rem] mx-auto px-6 md:px-12">
        <div className="bg-white shadow-2xl shadow-black/5 border-t-4 border-secondary grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {[
            { icon: Thermometer, value: "+0.23°C", label: "Aumento por década desde 1971" },
            { icon: Droplets, value: "3,000mm", label: "Precipitación anual promedio" },
            { icon: AlertTriangle, value: "1 de 4", label: "Niños en zonas vulnerables" }
          ].map((stat, idx) => (
            <div key={idx} className="p-8 md:p-12 flex flex-col items-center text-center group hover:bg-gray-50 transition-colors duration-300">
              <stat.icon className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</span>
              <span className="font-paragraph text-sm text-muted-grey uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* --- IMPACTS NARRATIVE (Sticky Layout) --- */}
      <section id="impactos" className="w-full max-w-[120rem] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sticky Header */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <FadeIn>
                <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-8 leading-none">
                  Principales <br/>
                  <span className="text-secondary italic">Impactos</span>
                </h2>
                <p className="font-paragraph text-lg text-muted-grey mb-8 leading-relaxed">
                  Basado en informes recientes de MiAmbiente, UNICEF, CEPAL, IPCC, IH Cantabria y GIZ.
                  La temperatura ha aumentado significativamente, duplicando las emisiones en 20 años y proyectando escenarios críticos para fin de siglo.
                </p>
                <div className="hidden lg:block w-12 h-1 bg-secondary mb-8" />
                <p className="font-paragraph text-sm text-muted-grey/80 italic">
                  Datos consolidados 2012-2026
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Scrollable Cards */}
          <div className="lg:col-span-8 space-y-24">
            {IMPACT_CARDS.map((card, index) => (
              <FadeIn key={card.id} delay={index * 0.1} className="group">
                <div className="relative overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 md:h-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <Image
                        src="https://static.wixstatic.com/media/1a7319_692a324c588246549686553f7773f44f~mv2.png?originWidth=576&originHeight=384"
                        alt={card.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <card.icon className="w-5 h-5 text-secondary" />
                        <span className="text-xs font-bold tracking-widest uppercase text-muted-grey">{card.location}</span>
                      </div>
                      <h3 className="font-heading text-3xl text-foreground mb-4">{card.title}</h3>
                      <p className="font-paragraph text-muted-grey mb-6 leading-relaxed">
                        {card.description}
                      </p>
                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <p className="font-heading text-lg text-secondary italic">
                          "{card.stat}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- ECONOMIC IMPACT TABLE --- */}
      <section className="w-full bg-gray-50 py-24 border-y border-gray-200">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h3 className="font-heading text-3xl md:text-5xl text-foreground mb-6">Impacto Socioeconómico</h3>
              <p className="text-muted-grey">Un análisis detallado de las consecuencias económicas y sociales observadas.</p>
            </div>
          </FadeIn>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-foreground/10">
                  <th className="py-6 px-4 font-heading text-xl text-foreground w-1/6">Impacto</th>
                  <th className="py-6 px-4 font-paragraph text-sm font-semibold text-muted-grey uppercase tracking-wider w-1/5">Descripción</th>
                  <th className="py-6 px-4 font-paragraph text-sm font-semibold text-muted-grey uppercase tracking-wider w-2/5">Datos 2012-2026</th>
                  <th className="py-6 px-4 font-paragraph text-sm font-semibold text-muted-grey uppercase tracking-wider w-1/6">Fuente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {ECONOMIC_IMPACTS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-4 font-heading text-lg font-semibold text-foreground">{row.impact}</td>
                    <td className="py-6 px-4 text-muted-grey">{row.desc}</td>
                    <td className="py-6 px-4 text-foreground/80 leading-relaxed">{row.data}</td>
                    <td className="py-6 px-4 text-xs text-muted-grey font-medium">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- ECOLOGICAL ANALYSIS (Parallax Break) --- */}
      <section id="analisis" className="relative w-full py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image
            src="https://static.wixstatic.com/media/1a7319_48287ea151ce49a8b51264e4400ae2d0~mv2.png?originWidth=768&originHeight=576"
            alt="Ecological Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-8">
                Análisis <span className="text-secondary">Ecológico</span>
              </h2>
              <p className="font-paragraph text-lg text-muted-grey mb-12 leading-relaxed max-w-xl">
                Causas antropogénicas y naturales convergen. Desde emisiones globales hasta deforestación local, 
                los actores involucrados deben coordinar esfuerzos para mitigar la pérdida de biodiversidad y la contaminación hídrica.
              </p>
              <div className="grid grid-cols-1 gap-8">
                {ECOLOGICAL_ANALYSIS.map((item, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-sm p-8 border-l-4 border-secondary shadow-sm">
                    <h4 className="font-heading text-xl text-foreground mb-2">{item.cause}</h4>
                    <p className="text-muted-grey mb-4 text-sm">{item.impact}</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
                      <Activity className="w-3 h-3" />
                      {item.actors}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <div className="hidden lg:block relative h-full min-h-[600px]">
               <div className="sticky top-32 w-full h-[600px] bg-gray-200 overflow-hidden rounded-sm shadow-2xl">
                 <Image
                    src="https://static.wixstatic.com/media/1a7319_b02718c1b4d04d92a87b480264270154~mv2.png?originWidth=768&originHeight=576"
                    alt="Ecological Detail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-heading text-2xl">La Villa & Arco Seco</p>
                    <p className="text-sm opacity-80">Zonas críticas de intervención</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE TOOLS GRID --- */}
      <section className="w-full py-24 bg-foreground text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Map Card */}
            <Link to="/mapa" className="group relative h-[400px] overflow-hidden border border-white/10 hover:border-secondary/50 transition-colors">
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors z-10" />
              <Image
                src="https://static.wixstatic.com/media/1a7319_c7dff12eda454caab21e383d1ede492e~mv2.png?originWidth=576&originHeight=384"
                alt="Mapa Interactivo"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                <MapPin className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading text-3xl mb-2">Mapa Interactivo</h3>
                <p className="text-white/60 text-sm mb-6">Visualiza zonas de sequía, inundaciones y riesgo en tiempo real.</p>
                <span className="inline-flex items-center text-secondary text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Explorar Mapa <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Calculator Card */}
            <Link to="/calculadora" className="group relative h-[400px] overflow-hidden border border-white/10 hover:border-secondary/50 transition-colors">
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Calculator className="w-48 h-48 text-white" />
              </div>
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                <Calculator className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading text-3xl mb-2">Huella de Carbono</h3>
                <p className="text-white/60 text-sm mb-6">Calcula tu impacto personal y descubre cómo reducirlo hoy.</p>
                <span className="inline-flex items-center text-secondary text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Calcular Ahora <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Report Card */}
            <Link to="/reporta" className="group relative h-[400px] overflow-hidden border border-white/10 hover:border-secondary/50 transition-colors">
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <FileText className="w-48 h-48 text-white" />
              </div>
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
                <Shield className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading text-3xl mb-2">Reporte Ciudadano</h3>
                <p className="text-white/60 text-sm mb-6">Envía reportes seguros y encriptados sobre eventos climáticos.</p>
                <span className="inline-flex items-center text-secondary text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Crear Reporte <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* --- CYBERSECURITY (STRIDE) --- */}
      <section id="ciberseguridad" className="w-full py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-12">
            <div>
              <div className="flex items-center gap-3 mb-4 text-secondary">
                <Lock className="w-6 h-6" />
                <span className="text-sm font-bold tracking-widest uppercase">Infraestructura Segura</span>
              </div>
              <h2 className="font-heading text-4xl md:text-6xl mb-4">Modelo STRIDE</h2>
              <p className="text-white/60 max-w-xl">
                Aplicamos estándares rigurosos de ciberseguridad para proteger la integridad de los datos climáticos y la privacidad de los reportes ciudadanos.
              </p>
            </div>
            <Button variant="outline" className="mt-8 md:mt-0 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all">
              <Search className="w-4 h-4 mr-2" />
              Verificar Integridad del Sistema
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STRIDE_MODEL.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl font-heading font-bold text-secondary/40">{item.letter}</span>
                    <CheckCircle2 className="w-5 h-5 text-green-500/50" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed border-t border-white/10 pt-4">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}