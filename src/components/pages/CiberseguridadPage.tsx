import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { STRIDEThreatModel } from '@/entities';
import { Shield, Lock, AlertTriangle, Eye, Server, Key } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const strideIcons = {
  S: Lock,
  T: AlertTriangle,
  R: Eye,
  I: Shield,
  D: Server,
  E: Key,
};

export default function CiberseguridadPage() {
  const [threats, setThreats] = useState<STRIDEThreatModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAttackSimulation, setShowAttackSimulation] = useState(false);

  useEffect(() => {
    loadThreats();
  }, []);

  const loadThreats = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<STRIDEThreatModel>('amenazasstride');
      setThreats(result.items);
    } catch (error) {
      console.error('Error loading threats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttackSimulation = () => {
    setShowAttackSimulation(true);
    setTimeout(() => setShowAttackSimulation(false), 3000);
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
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield className="w-12 h-12 text-secondary" />
              <h1 className="font-heading text-5xl md:text-6xl text-foreground text-center">
                Componente de Ciberseguridad
              </h1>
            </div>
            <p className="font-heading text-xl md:text-2xl text-muted-grey text-center mb-6">
              (Diferenciador del Proyecto)
            </p>
            <p className="font-paragraph text-base md:text-lg text-muted-grey max-w-5xl mx-auto leading-relaxed text-center">
              Modelo de amenazas: STRIDE aplicado a la plataforma ambiental. Riesgos: Robo de datos de reportes ciudadanos, manipulación de datos climáticos, DDoS al servidor del Canal.
            </p>
            <p className="font-paragraph text-base md:text-lg text-muted-grey max-w-5xl mx-auto leading-relaxed text-center mt-4">
              Medidas: HTTPS, autenticación 2FA simulada, validación de inputs, encriptación AES de reportes, firewall, logs de auditoría.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STRIDE Model Section */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 text-center">
              Modelo STRIDE Aplicado
            </h2>
            <div className="min-h-[400px]">
              {isLoading ? null : threats.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {threats.map((threat, index) => {
                    const IconComponent = strideIcons[threat.acronymLetter as keyof typeof strideIcons] || Shield;
                    return (
                      <motion.div
                        key={threat._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white rounded-lg p-8 border border-light-border hover:border-secondary transition-all"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-secondary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-heading text-3xl text-foreground">
                              {threat.acronymLetter}
                            </h3>
                          </div>
                        </div>
                        <h4 className="font-heading text-xl text-foreground mb-4">
                          {threat.threatName}
                        </h4>
                        <p className="font-paragraph text-base text-muted-grey mb-4 leading-relaxed">
                          {threat.riskDescription}
                        </p>
                        <div className="bg-background rounded p-4 mb-4">
                          <p className="font-paragraph text-sm text-muted-grey">
                            <strong className="text-foreground">Mitigación:</strong> {threat.mitigationMeasure}
                          </p>
                        </div>
                        {threat.impactLevel && (
                          <div className="flex items-center gap-2">
                            <span className="font-paragraph text-sm text-muted-grey">
                              Nivel de Impacto:
                            </span>
                            <span className={`font-paragraph text-sm font-semibold ${
                              threat.impactLevel.toLowerCase().includes('alto') || threat.impactLevel.toLowerCase().includes('high')
                                ? 'text-destructive'
                                : threat.impactLevel.toLowerCase().includes('medio') || threat.impactLevel.toLowerCase().includes('medium')
                                ? 'text-secondary'
                                : 'text-primary'
                            }`}>
                              {threat.impactLevel}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="font-paragraph text-lg text-muted-grey">
                    No hay amenazas STRIDE disponibles en este momento.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Measures Section */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 text-center">
              Medidas de Seguridad Implementadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-8 h-8 text-secondary" />
                  <h3 className="font-heading text-2xl text-foreground">
                    HTTPS & Encriptación
                  </h3>
                </div>
                <p className="font-paragraph text-base text-muted-grey leading-relaxed">
                  Todas las comunicaciones están protegidas con HTTPS. Los reportes ciudadanos se encriptan con AES-256 antes de almacenarse.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="w-8 h-8 text-secondary" />
                  <h3 className="font-heading text-2xl text-foreground">
                    Autenticación 2FA
                  </h3>
                </div>
                <p className="font-paragraph text-base text-muted-grey leading-relaxed">
                  Sistema de autenticación de dos factores simulado para acceso administrativo, previniendo accesos no autorizados.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-secondary" />
                  <h3 className="font-heading text-2xl text-foreground">
                    Validación de Inputs
                  </h3>
                </div>
                <p className="font-paragraph text-base text-muted-grey leading-relaxed">
                  Todos los formularios implementan validación estricta para prevenir inyecciones SQL, XSS y otros ataques comunes.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-8 h-8 text-secondary" />
                  <h3 className="font-heading text-2xl text-foreground">
                    Protección DDoS
                  </h3>
                </div>
                <p className="font-paragraph text-base text-muted-grey leading-relaxed">
                  Rate limiting y CAPTCHA implementados para mitigar ataques de denegación de servicio distribuido.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-secondary" />
                  <h3 className="font-heading text-2xl text-foreground">
                    Logs de Auditoría
                  </h3>
                </div>
                <p className="font-paragraph text-base text-muted-grey leading-relaxed">
                  Sistema de logs inmutables que registra todas las acciones críticas para rastreo y análisis forense.
                </p>
              </div>

              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-secondary" />
                  <h3 className="font-heading text-2xl text-foreground">
                    Control de Accesos (RBAC)
                  </h3>
                </div>
                <p className="font-paragraph text-base text-muted-grey leading-relaxed">
                  Sistema de control de acceso basado en roles para prevenir elevación de privilegios no autorizada.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Attack Simulation Section */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg p-12 border border-light-border text-center"
          >
            <h2 className="font-heading text-3xl text-foreground mb-6">
              Simulación de Ataque
            </h2>
            <p className="font-paragraph text-base text-muted-grey mb-8">
              Prueba cómo nuestro sistema detecta y mitiga intentos de ataque
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAttackSimulation}
              className="bg-destructive text-destructive-foreground font-paragraph font-semibold text-lg px-8 py-4 rounded transition-all"
            >
              Simula un Ataque
            </motion.button>

            {showAttackSimulation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 bg-background rounded-lg p-8"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-secondary" />
                  <h3 className="font-heading text-2xl text-foreground">
                    ¡Ataque Detectado y Bloqueado!
                  </h3>
                </div>
                <p className="font-paragraph text-base text-muted-grey">
                  El sistema ha identificado el intento de ataque y ha activado las medidas de protección automáticamente.
                </p>
                <div className="mt-6 text-left bg-white rounded p-4 font-mono text-sm text-muted-grey">
                  <p>[FIREWALL] Intento de acceso no autorizado detectado</p>
                  <p>[RATE LIMITER] IP bloqueada temporalmente</p>
                  <p>[AUDIT LOG] Evento registrado con timestamp</p>
                  <p className="text-secondary font-semibold">[SYSTEM] Protección activa - Sistema seguro</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Diagrams Section */}
      <section className="w-full bg-white py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-12 text-center">
              Diagramas STRIDE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-lg p-12 border border-light-border text-center min-h-[400px] flex flex-col items-center justify-center">
                <Shield className="w-24 h-24 text-secondary mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Diagrama STRIDE
                </h3>
                <p className="font-paragraph text-base text-muted-grey">
                  Representación visual del modelo de amenazas STRIDE aplicado a la plataforma
                </p>
              </div>
              <div className="bg-background rounded-lg p-12 border border-light-border text-center min-h-[400px] flex flex-col items-center justify-center">
                <Server className="w-24 h-24 text-secondary mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Flujo de Datos STRIDE
                </h3>
                <p className="font-paragraph text-base text-muted-grey">
                  Diagrama de flujo mostrando cómo los datos se protegen en cada etapa del proceso
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
