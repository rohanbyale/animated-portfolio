'use client'
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function MetricSection() {
  const metrics = [
    // { label: "Lines of Code", value: 150, suffix: "K+" },
    { label: "Projects Delivered", value: 22, suffix: "" },
    // { label: "Coffee Consumed", value: 1.2, suffix: "K" },
    { label: "experience", value: 100, suffix: "%" },
    { label: "Happy Clients", value: 100, suffix: "%" },
  ];

  return (
    <section className="py-32 bg-[#080808] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col space-y-4">
              <span className="text-purple-500 font-mono text-xs tracking-widest uppercase">
                {m.label}
              </span>
              <div className="flex items-baseline text-[#F0ECD9] gap-1">
                <Counter value={m.value} />
                <span className="text-4xl font-black text-[#F0ECD9]">{m.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-6xl md:text-8xl font-black tracking-tighter text-[#F0ECD9]">
      {count % 1 === 0 ? count : count.toFixed(1)}
    </span>
  );
}