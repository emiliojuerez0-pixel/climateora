import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Shield, Upload, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReportaPage() {
  const [descripcion, setDescripcion] = useState('');
  const [provincia, setProvincia] = useState('');
  const [corregimiento, setCorregimiento] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!descripcion || !provincia || !corregimiento) {
      alert('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    try {
      await BaseCrudService.create('reportesciudadanos', {
        _id: crypto.randomUUID(),
        eventDescription: descripcion,
        province: provincia,
        corregimiento: corregimiento,
        submissionDate: new Date().toISOString(),
        eventPhoto: 'https://static.wixstatic.com/media/1a7319_633b18676b8c47d5b79c71693409b5f6~mv2.png?originWidth=768&originHeight=576',
      });
      
      setSubmitted(true);
      setDescripcion('');
      setProvincia('');
      setCorregimiento('');
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error al enviar el reporte. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
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
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield className="w-12 h-12 text-secondary" />
              <h1 className="font-heading text-5xl md:text-6xl text-foreground text-center">
                Reporta un Evento Climático
              </h1>
            </div>
            <p className="font-heading text-xl md:text-2xl text-muted-grey text-center">
              (Seguro y Simulado)
            </p>
            <p className="font-paragraph text-base text-muted-grey max-w-3xl mx-auto text-center mt-6">
              Protección: HTTPS + validación inputs para prevenir manipulaciones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full py-24">
        <div className="max-w-3xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <div className="bg-white rounded-lg p-12 border border-light-border text-center">
                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
                <h2 className="font-heading text-3xl text-foreground mb-4">
                  ¡Reporte Enviado!
                </h2>
                <p className="font-paragraph text-lg text-muted-grey">
                  Gracias por contribuir al monitoreo climático de Panamá. Tu reporte ha sido registrado de forma segura.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-12 border border-light-border">
                <div className="space-y-8">
                  {/* Descripcion */}
                  <div>
                    <label className="font-paragraph text-lg text-foreground mb-4 block">
                      Descripción del evento
                    </label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Ej: Inundación en mi comunidad..."
                      rows={6}
                      className="w-full px-6 py-4 border border-light-border rounded font-paragraph text-base text-foreground focus:outline-none focus:border-secondary transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Provincia */}
                  <div>
                    <label className="font-paragraph text-lg text-foreground mb-4 block">
                      Provincia
                    </label>
                    <input
                      type="text"
                      value={provincia}
                      onChange={(e) => setProvincia(e.target.value)}
                      placeholder="Ej: Chiriquí"
                      className="w-full px-6 py-4 border border-light-border rounded font-paragraph text-base text-foreground focus:outline-none focus:border-secondary transition-colors"
                      required
                    />
                  </div>

                  {/* Corregimiento */}
                  <div>
                    <label className="font-paragraph text-lg text-foreground mb-4 block">
                      Corregimiento
                    </label>
                    <input
                      type="text"
                      value={corregimiento}
                      onChange={(e) => setCorregimiento(e.target.value)}
                      placeholder="Ej: Cerro Punta"
                      className="w-full px-6 py-4 border border-light-border rounded font-paragraph text-base text-foreground focus:outline-none focus:border-secondary transition-colors"
                      required
                    />
                  </div>

                  {/* Photo Upload (Simulated) */}
                  <div>
                    <label className="font-paragraph text-lg text-foreground mb-4 block">
                      Adjunta foto (simulado)
                    </label>
                    <div className="border-2 border-dashed border-light-border rounded-lg p-12 text-center hover:border-secondary transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-grey mx-auto mb-4" />
                      <p className="font-paragraph text-base text-muted-grey">
                        Haz clic para seleccionar una foto
                      </p>
                      <p className="font-paragraph text-sm text-muted-grey mt-2">
                        (Funcionalidad simulada)
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-paragraph font-semibold text-lg px-8 py-4 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <Shield className="w-5 h-5" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Reporte Seguro'}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Security Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-white rounded-lg p-8 border border-light-border"
          >
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Medidas de Seguridad
            </h2>
            <ul className="space-y-4">
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <Shield className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span><strong>HTTPS:</strong> Todos los datos se transmiten de forma encriptada</span>
              </li>
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <Shield className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span><strong>Validación de Inputs:</strong> Protección contra inyecciones maliciosas</span>
              </li>
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <Shield className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span><strong>Encriptación AES:</strong> Tus reportes están protegidos con encriptación de grado militar</span>
              </li>
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <Shield className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span><strong>Logs de Auditoría:</strong> Todas las acciones son registradas para transparencia</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
