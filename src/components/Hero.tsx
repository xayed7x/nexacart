export default function Hero() {
  return (
    <section className="bg-soft-grey dark:bg-gray-800">
      {" "}
      {/* Added dark mode background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-montserrat text-5xl md:text-6xl font-extrabold text-charcoal dark:text-off-white leading-tight mb-4">
          {" "}
          {/* Added dark mode text */}
          Design for Every Story
        </h1>
        <p className="font-merriweather text-lg md:text-xl text-charcoal dark:text-soft-grey max-w-3xl mx-auto mb-8">
          {" "}
          {/* Added dark mode text */}
          Explore our curated collections of clothing, electronics, and
          accessories, each selected to complement your unique lifestyle.
          Premium quality meets timeless design.
        </p>
        <a
          href="#categories"
          className="inline-block bg-mocha-mousse text-off-white font-montserrat font-bold py-3 px-8 rounded-sm uppercase tracking-wider hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300" /* Added dark mode hover effects */
        >
          Explore Collections
        </a>
      </div>
    </section>
  );
}
