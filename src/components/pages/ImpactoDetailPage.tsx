import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ImpactosClimticos } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowLeft, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImpactoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [impacto, setImpacto] = useState<ImpactosClimticos | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImpacto();
  }, [id]);

  const loadImpacto = async () => {
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<ImpactosClimticos>('impactosclimaticos', id!);
      setImpacto(data);
    } catch (error) {
      console.error('Error loading impacto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-8">
          <Link
            to="/impactos"
            className="inline-flex items-center gap-2 font-paragraph text-base text-muted-grey hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Impactos
          </Link>

          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <LoadingSpinner />
              </div>
            ) : !impacto ? (
              <div className="text-center py-32">
                <h2 className="font-heading text-3xl text-foreground mb-4">
                  Impacto no encontrado
                </h2>
                <p className="font-paragraph text-base text-muted-grey">
                  El impacto que buscas no existe o ha sido eliminado.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {impacto.impactImage && (
                  <div className="w-full max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden">
                    <Image
                      src={impacto.impactImage}
                      alt={impacto.title || 'Impacto climático'}
                      width={1200}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="max-w-4xl mx-auto">
                  <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
                    {impacto.title}
                  </h1>

                  {impacto.locationName && (
                    <div className="flex items-center gap-2 mb-8">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <p className="font-paragraph text-lg text-secondary font-semibold">
                        {impacto.locationName}
                      </p>
                    </div>
                  )}

                  <div className="bg-white rounded-lg p-8 mb-8">
                    <h2 className="font-heading text-2xl text-foreground mb-4">
                      Descripción
                    </h2>
                    <p className="font-paragraph text-lg text-muted-grey leading-relaxed">
                      {impacto.description}
                    </p>
                  </div>

                  {impacto.keyStatistics && (
                    <div className="bg-white rounded-lg p-8 mb-8">
                      <h2 className="font-heading text-2xl text-foreground mb-4">
                        Estadísticas Clave
                      </h2>
                      <p className="font-paragraph text-lg text-muted-grey leading-relaxed">
                        {impacto.keyStatistics}
                      </p>
                    </div>
                  )}

                  {(impacto.latitude && impacto.longitude) && (
                    <div className="bg-white rounded-lg p-8 mb-8">
                      <h2 className="font-heading text-2xl text-foreground mb-4">
                        Coordenadas
                      </h2>
                      <p className="font-paragraph text-base text-muted-grey">
                        Latitud: {impacto.latitude}
                      </p>
                      <p className="font-paragraph text-base text-muted-grey">
                        Longitud: {impacto.longitude}
                      </p>
                    </div>
                  )}

                  {impacto.source && (
                    <div className="bg-background rounded-lg p-8">
                      <h2 className="font-heading text-xl text-foreground mb-2">
                        Fuente
                      </h2>
                      <p className="font-paragraph text-sm text-muted-grey">
                        {impacto.source}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
