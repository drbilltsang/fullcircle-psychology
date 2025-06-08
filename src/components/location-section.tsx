import { MapPin } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Full Circle Psychology PLLC</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Our practice offers convenient telehealth services to clients in 42 states, bringing expert care directly to you. 
              For those in the NYC area, our office outside of Borough Hall in Brooklyn provides easy access to in-person services.
            </p>
            <div className="flex items-start space-x-4">
              <MapPin className="text-primary w-6 h-6 mt-1" />
              <div>
                <p className="text-lg font-semibold text-foreground">26 Court Street, Ste 409</p>
                <p className="text-lg text-muted-foreground">Brooklyn, NY 11242</p>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500"
              alt="Brooklyn courthouse area professional building"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
