import { motion } from 'framer-motion';

const brands = [
  { name: 'Namaste Grocery', type: 'Social Media & Content', link: 'https://www.instagram.com/reel/C7k6ZjzM3Am/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { name: 'Ananthabhyas', type: 'Brand Production', link: 'https://www.instagram.com/ananthabhyas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  { name: 'Nonucare', type: 'Digital Marketing', link: 'https://www.instagram.com/nonucare?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  { name: 'Wellversed', type: 'Event Production', link: '#works' },
  { name: 'ConflktMagazine', type: 'Fashion Show Production', link: '#works' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function BrandWorkSection() {
  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-primary font-display tracking-[0.2em] uppercase text-xs mb-3">Portfolio</p>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-foreground">Brand Work</h2>
          <div className="glow-line w-24 mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {brands.map((brand) => (
            <motion.a
              key={brand.name}
              href={brand.link}
              target={brand.link.startsWith('http') ? '_blank' : undefined}
              rel={brand.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              variants={cardVariants}
              className="glass-card-hover group p-8 flex flex-col justify-between min-h-[220px] cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <span className="font-display font-bold text-primary text-lg">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-500">
                  {brand.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mt-4">{brand.type}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
