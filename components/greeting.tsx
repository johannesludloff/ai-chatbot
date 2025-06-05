import { motion } from 'framer-motion';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center"
    >
      <div className="flex flex-col gap-2">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          className="mb-2 text-2xl font-semibold"
        >
          Trauerreden Generator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.6 }}
          className="mb-2 leading-normal text-muted-foreground"
        >
          Ein Tool, das dir hilft, deine Rede zu schreiben.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.7 }}
          className="mb-2 leading-normal text-muted-foreground"
        >
          Hierfür ist es ratsam sich mit Freunden, Familienmitgliedern, aber
          auch Kollegen, Mannschaftsmitgliedern oder anderen nahstehenden
          Personen zu unterhalten. Diese eröffnen weitere Blickwinkel und helfen
          alle wichtigen Facetten zu beleuchten.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.8 }}
          className="leading-normal text-muted-foreground"
        >
          Du kannst mit den folgenden Beispielen beginnen oder ein Dokument
          hochladen.
        </motion.p>
      </div>
    </div>
  );
};
