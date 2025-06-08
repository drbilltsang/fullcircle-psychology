import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    title: "What is a Psychological Evaluation?",
    excerpt: "Psychological evaluations may be recommended by a primary-care physician, social worker, teacher, principal, therapist, or court, or...",
    date: "Jan 9",
    readTime: "1 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
    alt: "Psychology assessment materials and textbooks"
  },
  {
    title: "Understanding Pediatric Neuropsychological Assessments",
    excerpt: "When it comes to evaluating developmental progress and concerns in children, there are various types of assessments, each with its own...",
    date: "Dec 6, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
    alt: "Child developmental assessment materials"
  },
  {
    title: "In-person Care in the COVID-19 Era",
    excerpt: "In today's world, concerns about contracting illnesses like COVID-19 are especially pressing for individuals with compromised immune...",
    date: "Sep 20, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
    alt: "Healthcare professional with protective equipment"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Blog Posts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              tabIndex={0}
              role="article"
              aria-labelledby={`blog-${index}-title`}
            >
              <img 
                src={post.image}
                alt={post.alt}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 id={`blog-${index}-title`} className="text-xl font-semibold text-foreground mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span aria-label={`Published on ${post.date}`}>{post.date}</span>
                  <span aria-label={`Reading time ${post.readTime}`}>{post.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
