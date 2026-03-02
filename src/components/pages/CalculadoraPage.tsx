import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Car, Plane, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CalculadoraPage() {
  const [kmAuto, setKmAuto] = useState(100);
  const [vuelos, setVuelos] = useState(2);
  const [electricidad, setElectricidad] = useState(200);
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularHuella = () => {
    // Factores de emisión aproximados
    const emisionAuto = kmAuto * 52 * 0.12; // kg CO2 por año (52 semanas)
    const emisionVuelos = vuelos * 250; // kg CO2 por vuelo promedio
    const emisionElectricidad = electricidad * 12 * 0.5; // kg CO2 por año
    
    const total = emisionAuto + emisionVuelos + emisionElectricidad;
    setResultado(total);
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
              <Calculator className="w-12 h-12 text-secondary" />
              <h1 className="font-heading text-5xl md:text-6xl text-foreground text-center">
                Calcula tu Huella de Carbono
              </h1>
            </div>
            <p className="font-heading text-xl md:text-2xl text-muted-grey text-center">
              (Actualizada 2026)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg p-12 border border-light-border"
          >
            <div className="space-y-8">
              {/* Kilometros en Auto */}
              <div>
                <label className="flex items-center gap-3 font-paragraph text-lg text-foreground mb-4">
                  <Car className="w-6 h-6 text-secondary" />
                  ¿Cuántos km recorres en auto por semana?
                </label>
                <input
                  type="number"
                  value={kmAuto}
                  onChange={(e) => setKmAuto(Number(e.target.value))}
                  className="w-full px-6 py-4 border border-light-border rounded font-paragraph text-base text-foreground focus:outline-none focus:border-secondary transition-colors"
                  min="0"
                />
                <p className="font-paragraph text-sm text-muted-grey mt-2">
                  Valor por defecto: 100 km
                </p>
              </div>

              {/* Vuelos */}
              <div>
                <label className="flex items-center gap-3 font-paragraph text-lg text-foreground mb-4">
                  <Plane className="w-6 h-6 text-secondary" />
                  ¿Cuántos vuelos al año?
                </label>
                <input
                  type="number"
                  value={vuelos}
                  onChange={(e) => setVuelos(Number(e.target.value))}
                  className="w-full px-6 py-4 border border-light-border rounded font-paragraph text-base text-foreground focus:outline-none focus:border-secondary transition-colors"
                  min="0"
                />
                <p className="font-paragraph text-sm text-muted-grey mt-2">
                  Valor por defecto: 2 vuelos
                </p>
              </div>

              {/* Electricidad */}
              <div>
                <label className="flex items-center gap-3 font-paragraph text-lg text-foreground mb-4">
                  <Zap className="w-6 h-6 text-secondary" />
                  Consumo electricidad mensual (kWh)?
                </label>
                <input
                  type="number"
                  value={electricidad}
                  onChange={(e) => setElectricidad(Number(e.target.value))}
                  className="w-full px-6 py-4 border border-light-border rounded font-paragraph text-base text-foreground focus:outline-none focus:border-secondary transition-colors"
                  min="0"
                />
                <p className="font-paragraph text-sm text-muted-grey mt-2">
                  Valor por defecto: 200 kWh
                </p>
              </div>

              {/* Calculate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calcularHuella}
                className="w-full bg-primary text-primary-foreground font-paragraph font-semibold text-lg px-8 py-4 rounded transition-all"
              >
                Calcular
              </motion.button>

              {/* Result */}
              {resultado !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-background rounded-lg p-8 text-center"
                >
                  <p className="font-paragraph text-base text-muted-grey mb-2">
                    Tu huella de carbono anual estimada es:
                  </p>
                  <p className="font-heading text-5xl text-foreground mb-4">
                    {resultado.toFixed(2)} kg CO₂
                  </p>
                  <p className="font-paragraph text-base text-muted-grey">
                    Equivalente a {(resultado / 1000).toFixed(2)} toneladas de CO₂ por año
                  </p>
                  <div className="mt-6 pt-6 border-t border-light-border">
                    <p className="font-paragraph text-sm text-muted-grey">
                      {resultado < 2000 && "¡Excelente! Tu huella es baja. Sigue así."}
                      {resultado >= 2000 && resultado < 5000 && "Tu huella es moderada. Considera reducir el uso del auto o vuelos."}
                      {resultado >= 5000 && "Tu huella es alta. Te recomendamos tomar medidas para reducir tus emisiones."}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-white rounded-lg p-8 border border-light-border"
          >
            <h2 className="font-heading text-2xl text-foreground mb-6">
              ¿Cómo reducir tu huella de carbono?
            </h2>
            <ul className="space-y-4">
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <span className="text-secondary font-bold">•</span>
                <span>Usa transporte público, bicicleta o camina cuando sea posible</span>
              </li>
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <span className="text-secondary font-bold">•</span>
                <span>Reduce el consumo de electricidad usando electrodomésticos eficientes</span>
              </li>
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <span className="text-secondary font-bold">•</span>
                <span>Considera vuelos directos y reduce viajes aéreos innecesarios</span>
              </li>
              <li className="font-paragraph text-base text-muted-grey flex items-start gap-3">
                <span className="text-secondary font-bold">•</span>
                <span>Apoya energías renovables y proyectos de reforestación</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
