import Image from 'next/image';
import Link from 'next/link';

interface InstitutionInfoProps {
  institution: string;
}

export function InstitutionInfo({ institution }: InstitutionInfoProps) {
  if (institution === 'The University of Western Australia') {
    return (
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 mr-3 relative flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
          <Image
            src="https://media.licdn.com/dms/image/v2/C560BAQGONb5202Ubeg/company-logo_100_100/company-logo_100_100/0/1630613105542/university_of_western_australia_logo?e=1749081600&v=beta&t=L8PV7DjySb_vptPju4VcHBIIr2FCK8xSyDo45PTAkOE"
            alt="UWA Logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <Link
          href="https://www.uwa.edu.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 font-medium"
        >
          {institution}
        </Link>
      </div>
    );
  }

  if (institution === 'Hunan University') {
    return (
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 mr-3 relative flex-shrink-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
          <Image
            src="https://media.licdn.com/dms/image/v2/C510BAQHo9p4G79briw/company-logo_100_100/company-logo_100_100/0/1630564627893/hunan_university_logo?e=1749081600&v=beta&t=phNRpnSfV7LGVoEoNlHy5xRXVq9nQQWVM2ZXaJJKe3s"
            alt="Hunan University Logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <Link
          href="https://www-en.hnu.edu.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 font-medium"
        >
          {institution}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center mb-4">
      <span className="text-gray-700 dark:text-gray-300 font-medium">{institution}</span>
    </div>
  );
}
