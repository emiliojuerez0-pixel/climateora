import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AnlisisEcolgico } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AnalisisPage() {
  const [analisis, setAnalisis] = useState<AnlisisEcolgico[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalisis();
  }, []);

  const loadAnalisis = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<AnlisisEcolgico>('analisisecologico');
      setAnalisis(result.items);
    } catch (error) {
      console.error('Error loading analisis:', error);
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
              Análisis Ecológico
            </h1>
            <p className="font-paragraph text-base md:text-lg text-muted-grey max-w-5xl mx-auto leading-relaxed text-center">
              Causas: Emisiones globales, deforestación local, El Niño. Actores: Gobierno (MiAmbiente, ACP), ONGs (UNICEF, WWF, GIZ), comunidades. Impactos en ecosistemas: Pérdida biodiversidad, contaminación hídrica. Desde 2012, IPCC reporta aumentos en temperatura y cambios en precipitación; IH Cantabria y proyectos holandeses destacan riesgos en cuencas como La Villa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Analisis Table Section */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 text-center">
              Tabla de Análisis Ecológico
            </h2>
            <div className="min-h-[400px]">
              {isLoading ? null : analisis.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                    <thead>
                      <tr className="border-b-2 border-light-border bg-background">
                        <th className="font-heading text-xl text-foreground text-left py-6 px-6">
                          Causas
                        </th>
                        <th className="font-heading text-xl text-foreground text-left py-6 px-6">
                          Impactos Ecológicos
                        </th>
                        <th className="font-heading text-xl text-foreground text-left py-6 px-6">
                          Actores Involucrados
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {analisis.map((item, index) => (
                        <motion.tr
                          key={item._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="border-b border-light-border hover:bg-background transition-colors"
                        >
                          <td className="font-paragraph text-base text-muted-grey py-6 px-6 align-top">
                            {item.generalCause && (
                              <div className="mb-2">
                                <span className="font-semibold text-foreground">
                                  {item.generalCause}
                                </span>
                              </div>
                            )}
                            {item.causeDetails && (
                              <div className="text-sm">
                                {item.causeDetails}
                              </div>
                            )}
                          </td>
                          <td className="font-paragraph text-base text-muted-grey py-6 px-6 align-top">
                            {item.ecologicalImpactType && (
                              <div className="mb-2">
                                <span className="font-semibold text-foreground">
                                  {item.ecologicalImpactType}
                                </span>
                              </div>
                            )}
                            {item.ecologicalImpactDetails && (
                              <div className="text-sm">
                                {item.ecologicalImpactDetails}
                              </div>
                            )}
                          </td>
                          <td className="font-paragraph text-base text-muted-grey py-6 px-6 align-top">
                            {item.involvedActors}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="font-paragraph text-lg text-muted-grey">
                    No hay análisis ecológico disponible en este momento.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
