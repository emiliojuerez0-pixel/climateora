import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ImpactosClimticos, SocioeconomicStatistics } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImpactosPage() {
  const [impactos, setImpactos] = useState<ImpactosClimticos[]>([]);
  const [estadisticas, setEstadisticas] = useState<SocioeconomicStatistics[]>([]);
  const [isLoadingImpactos, setIsLoadingImpactos] = useState(true);
  const [isLoadingEstadisticas, setIsLoadingEstadisticas] = useState(true);

  useEffect(() => {
    loadImpactos();
    loadEstadisticas();
  }, []);

  const loadImpactos = async () => {
    setIsLoadingImpactos(true);
    try {
      const result = await BaseCrudService.getAll<ImpactosClimticos>('impactosclimaticos');
      setImpactos(result.items);
    } catch (error) {
      console.error('Error loading impactos:', error);
    } finally {
      setIsLoadingImpactos(false);
    }
  };

  const loadEstadisticas = async () => {
    setIsLoadingEstadisticas(true);
    try {
      const result = await BaseCrudService.getAll<SocioeconomicStatistics>('estadisticassocioeconomicas');
      setEstadisticas(result.items);
    } catch (error) {
      console.error('Error loading estadisticas:', error);
    } finally {
      setIsLoadingEstadisticas(false);
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
              Principales Impactos en Panamá
            </h1>
            <p className="font-heading text-xl md:text-2xl text-muted-grey mb-6 text-center">
              (Datos 2012-2026)
            </p>
            <p className="font-paragraph text-base md:text-lg text-muted-grey max-w-5xl mx-auto leading-relaxed text-center">
              Basado en informes recientes de MiAmbiente, UNICEF, CEPAL, IPCC, IH Cantabria y GIZ: Temperatura ha aumentado 0.23°C por década desde 1971, con incrementos de hasta 2°C en regiones específicas desde 2012. Emisiones se duplicaron en 20 años. Proyecciones: hasta +6.6°C para fin de siglo en escenarios críticos. Desde 2012, se han observado sequías prolongadas, inundaciones intensas y erosión costera acelerada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impactos Cards Section */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="min-h-[400px]">
            {isLoadingImpactos ? null : impactos.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {impactos.map((impacto, index) => (
                  <motion.div
                    key={impacto._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/impactos/${impacto._id}`}>
                      <div className="bg-white rounded-lg border border-light-border overflow-hidden hover:border-secondary transition-all h-full">
                        {impacto.impactImage && (
                          <div className="w-full h-64 overflow-hidden">
                            <Image
                              src={impacto.impactImage}
                              alt={impacto.title || 'Impacto climático'}
                              width={400}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-8">
                          <h3 className="font-heading text-2xl text-foreground mb-4">
                            {impacto.title}
                          </h3>
                          {impacto.locationName && (
                            <p className="font-paragraph text-sm text-secondary mb-4 font-semibold">
                              {impacto.locationName}
                            </p>
                          )}
                          <p className="font-paragraph text-base text-muted-grey leading-relaxed">
                            {impacto.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="font-paragraph text-lg text-muted-grey">
                  No hay impactos climáticos disponibles en este momento.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Estadisticas Table Section */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 text-center">
              Impactos Económicos y Sociales
            </h2>
            <div className="min-h-[300px]">
              {isLoadingEstadisticas ? null : estadisticas.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-light-border">
                        <th className="font-heading text-xl text-foreground text-left py-6 px-6">
                          Impacto
                        </th>
                        <th className="font-heading text-xl text-foreground text-left py-6 px-6">
                          Descripción
                        </th>
                        <th className="font-heading text-xl text-foreground text-left py-6 px-6">
                          Datos 2012-2026
                        </th>
                        <th className="font-heading text-xl text-foreground text-left py-6 px-6">
                          Fuente
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {estadisticas.map((stat, index) => (
                        <motion.tr
                          key={stat._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="border-b border-light-border hover:bg-background transition-colors"
                        >
                          <td className="font-paragraph text-base text-foreground py-6 px-6 font-semibold">
                            {stat.impactCategory}
                          </td>
                          <td className="font-paragraph text-base text-muted-grey py-6 px-6">
                            {stat.description}
                          </td>
                          <td className="font-paragraph text-base text-muted-grey py-6 px-6">
                            {stat.dataStats20122026}
                          </td>
                          <td className="font-paragraph text-sm text-muted-grey py-6 px-6">
                            {stat.source}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="font-paragraph text-lg text-muted-grey">
                    No hay estadísticas disponibles en este momento.
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
