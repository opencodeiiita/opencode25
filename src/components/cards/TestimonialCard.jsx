'use client';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#9B87FE]">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h6 className="text-xl font-semibold text-white">
              {testimonial.name}
            </h6>
            <p className="text-sm text-[#9B87FE]">{testimonial.role}</p>
            <p className="text-sm text-gray-400">{testimonial.company}</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed mb-4">
          {testimonial.quote}
        </p>
      </div>
      {testimonial.blogUrl && (
        <a
          href={testimonial.blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#9B87FE] hover:text-[#8A76ED] transition-colors mt-4"
        >
          Read the full blog
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
