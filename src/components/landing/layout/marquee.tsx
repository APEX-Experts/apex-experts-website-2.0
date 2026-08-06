import { Marquee } from "@/components/ui/marquee";
import React from "react";
import Image from "next/image";

type Props = {
  marqueeIconUrls: string[];
  marqueeIconAlts: string[];
};

const MarqueeSection = ({ marqueeIconUrls, marqueeIconAlts }: Props) => {
  return (
    <Marquee
      className="[--duration:20s] [--gap:24px] lg:[--gap:72px] px-4 lg:px-14"
      repeat={4}
      dir="ltr"
    >
      {marqueeIconUrls?.map((src, index) => (
        <Image
          key={index}
          src={src ?? ""}
          alt={marqueeIconAlts?.[index] ?? "Icon"}
          width={56}
          height={56}
          className="w-8 h-8 lg:w-14 lg:h-14"
        />
      ))}
    </Marquee>
  );
};

export default MarqueeSection;
