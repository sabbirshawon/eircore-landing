import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col overflow-hidden md:overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <section className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Hero />
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
