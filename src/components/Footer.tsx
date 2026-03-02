export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-light-border">
      <div className="max-w-[100rem] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-paragraph text-base text-foreground mb-2">
              © 2026 ClimaGuard Panamá. Todos los derechos reservados.
            </p>
          </div>
          <div>
            <p className="font-paragraph text-sm text-muted-grey">
              <span className="font-semibold text-foreground">Fuentes:</span> MiAmbiente, UNICEF, CEPAL, IPCC, IH Cantabria, GIZ, IMHPA, BID.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
