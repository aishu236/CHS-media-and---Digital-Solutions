import { motion } from 'framer-motion';

const works = [
  {
    title: '🎵 Songs Production',
    description: 'From concept to completion, our team handled the entire production of a rap music video — including pre-production planning, shooting, editing, and VFX. We crafted dynamic visuals and seamless post-production effects to complement the rhythm and energy of the track.',
  },
  {
    title: 'Wellversed ICN 3 Days Production',
    description: 'We managed the complete production of the national-level ICN Fitness Competition, covering three days of high-intensity events. Our team handled everything from multi-camera coverage to on-ground coordination, live editing to video submissions within 5 hours and post-production.',
  },
  {
    title: 'ConflktMagazine Fashion Shows',
    description: 'From concept to curtain call, we executed the entire "Nothing Can Save This" fashion show and Creative Marketing Epoxide\'s "HotMess Express" — handling creative direction, stage design, visual storytelling, full production and post-editing.',
  },
];

export default function WorksSection() {
  return (
    <section id="works" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-primary font-display tracking-[0.2em] uppercase text-xs mb-3">Our Work</p>
          <h2 className="font-display font-800 text-4xl md:text-5xl text-foreground">Featured Works</h2>
          <div className="glow-line w-24 mt-6" />
        </motion.div>

        <div className="space-y-8">
          {works.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass-card-hover p-8 md:p-12 group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
                  <span className="font-display font-bold text-primary text-xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-500">
                    {work.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{work.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
