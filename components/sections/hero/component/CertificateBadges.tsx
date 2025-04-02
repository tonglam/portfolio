'use client';

import certificates from '@/data/certificates.data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function CertificateBadges() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {certificates.map((certificate, index) => (
        <motion.div
          key={certificate.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
          className="flex items-center bg-white dark:bg-[#1E293B] rounded-full pl-1 pr-3 py-1 shadow-md"
        >
          <Link
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Verify ${certificate.name} Certification`}
            className="flex items-center"
          >
            <div className="w-8 h-8 mr-2">
              <Image
                src={certificate.imageUrl}
                alt={certificate.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <span className="text-xs font-medium">{certificate.shortName}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
