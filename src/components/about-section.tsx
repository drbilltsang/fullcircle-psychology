export default function AboutSection() {
  const clientTypes = [
    {
      title: "Children",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Happy child in therapy session"
    },
    {
      title: "Individual",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Individual therapy session"
    },
    {
      title: "Couples",
      image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Couple in therapy session"
    },
    {
      title: "Family",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      alt: "Family therapy session"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Cognitive and mental health starts with a thorough assessment.
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            We confidently connect clients to the best treatment services, whether through our team or with vetted recommended providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clientTypes.map((type, index) => (
            <div key={index} className="text-center" tabIndex={0} role="article">
              <img 
                src={type.image}
                alt={type.alt}
                className="rounded-xl shadow-lg w-full h-64 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-muted-foreground">{type.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
