import Image from 'next/image';
import React from 'react';


export const Footer = () => {
  return (
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          </nav>
          <div className="text-center">
            <Image
              src="/images/ebit-certificate.png"
              alt="ebit-certificate"
              width={120}
              height={60}
              style={{ display: "inline-block", marginRight: "10px" }}
            />
            <Image
              src="/images/google-certificate.png"
              alt="google-certificate"
              width={120}
              height={60}
              style={{ display: "inline-block", marginRight: "10px" }}
            />
            <Image
              src="/images/reclameaqui-certificate.png"
              alt="reclameaqui-certificate"
              width={120}
              height={60}
              style={{ display: "inline-block", marginRight: "10px" }}
            />
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            © 2023 Compass UOL Commerce. All rights reserved.
          </p>
        </div>
      </footer>
  );
}
