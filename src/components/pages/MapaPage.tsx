import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ImpactosClimticos } from '@/entities';
import { MapPin, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MapaPage() {
  const [impactos, setImpactos] = useState<ImpactosClimticos[]>([]);
  const [selectedImpacto, setSelectedImpacto] = useState<ImpactosClimticos | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImpactos();
  }, []);

  const loadImpactos = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<ImpactosClimticos>('impactosclimaticos');
      setImpactos(result.items.filter(item => item.latitude && item.longitude));
    } catch (error) {
      console.error('Error loading impactos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-8 text-center">
              Mapa Interactivo de Zonas Vulnerables
            </h1>
            <p className="font-heading text-xl md:text-2xl text-muted-grey mb-6 text-center">
              (2012-2026)
            </p>
            <p className="font-paragraph text-base md:text-lg text-muted-grey max-w-4xl mx-auto leading-relaxed text-center">
              Marcadores: Zonas de sequía e inundaciones. Círculos rojos: Áreas de alto riesgo (clic para detalles). Incluye erosión en Punta Chame y floods en Chiriquí.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-12 border border-light-border min-h-[600px] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <p className="font-heading text-2xl text-foreground mb-2">
                      Mapa de Panamá
                    </p>
                    <p className="font-paragraph text-base text-muted-grey">
                      Zonas vulnerables al cambio climático
                    </p>
                  </div>
                </div>

                {/* Simulated Map Markers */}
                <div className="min-h-[500px]">
                  {isLoading ? null : impactos.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="relative h-full"
                    >
                      {impactos.map((impacto, index) => (
                        <motion.button
                          key={impacto._id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          onClick={() => setSelectedImpacto(impacto)}
                          className="absolute bg-destructive rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                          style={{
                            left: `${20 + (index * 15)}%`,
                            top: `${30 + (index * 10)}%`,
                          }}
                        >
                          <AlertCircle className="w-6 h-6 text-destructive-foreground" />
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-8 border border-light-border sticky top-24">
                <h2 className="font-heading text-2xl text-foreground mb-6">
                  Detalles de Zona
                </h2>
                {selectedImpacto ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-heading text-xl text-foreground mb-4">
                      {selectedImpacto.title}
                    </h3>
                    {selectedImpacto.locationName && (
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <p className="font-paragraph text-sm text-secondary font-semibold">
                          {selectedImpacto.locationName}
                        </p>
                      </div>
                    )}
                    <p className="font-paragraph text-base text-muted-grey mb-4 leading-relaxed">
                      {selectedImpacto.description}
                    </p>
                    {selectedImpacto.keyStatistics && (
                      <div className="bg-background rounded p-4 mb-4">
                        <p className="font-paragraph text-sm text-muted-grey">
                          {selectedImpacto.keyStatistics}
                        </p>
                      </div>
                    )}
                    {(selectedImpacto.latitude && selectedImpacto.longitude) && (
                      <div className="text-xs text-muted-grey">
                        <p>Lat: {selectedImpacto.latitude}</p>
                        <p>Lng: {selectedImpacto.longitude}</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <p className="font-paragraph text-base text-muted-grey">
                    Haz clic en un marcador rojo para ver los detalles de la zona vulnerable.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-white rounded-lg p-8 border border-light-border"
          >
            <h3 className="font-heading text-2xl text-foreground mb-6">
              Leyenda
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive-foreground" />
                </div>
                <div>
                  <p className="font-paragraph text-base text-foreground font-semibold">
                    Zona de Alto Riesgo
                  </p>
                  <p className="font-paragraph text-sm text-muted-grey">
                    Áreas con impactos severos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-8 h-8 text-secondary" />
                <div>
                  <p className="font-paragraph text-base text-foreground font-semibold">
                    Ubicación Específica
                  </p>
                  <p className="font-paragraph text-sm text-muted-grey">
                    Coordenadas exactas
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="font-paragraph text-base text-foreground font-semibold">
                    Información Detallada
                  </p>
                  <p className="font-paragraph text-sm text-muted-grey">
                    Clic para más datos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
