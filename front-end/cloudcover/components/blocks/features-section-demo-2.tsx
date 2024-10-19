import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconChartBar,
  IconCloud,
  IconCreditCard,
  IconCurrencyDollar,
  IconEaseInOut,
  IconGlobe,
  IconHeart,
  IconHelp,
  IconLock,
  IconPlane,
  IconRadar,
  IconRouteAltLeft,
  IconSmartHome,
  IconTerminal2,
  IconUsers,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Peer-to-Peer Flight Insurance",
      description:
        "Connect directly with investors to secure your flight, cutting out traditional insurance middlemen.",
      icon: <IconPlane />,
    },
    {
      title: "Smart Contract-Powered",
      description:
        "Enjoy automated, instant payouts without delays, powered by blockchain technology.",
      icon: <IconSmartHome />,
    },
    {
      title: "Real-Time Flight Tracking",
      description:
        "Our decentralized oracles monitor your flight status in real-time, ensuring timely and accurate payouts.",
      icon: <IconRadar />,
    },
    {
      title: "Gamified Investment",
      description:
        "Investors can 'bet' on flight outcomes, earning premiums by backing flight insurance policies.",
      icon: <IconChartBar />,
    },
    {
      title: "Blockchain Transparency",
      description:
        "All policy data and transactions are visible and secure on the Ethereum blockchain.",
      icon: <IconLock />,
    },
    {
      title: "No Credit Card Required",
      description:
        "Use cryptocurrency for seamless, borderless transactions without traditional banking constraints.",
      icon: <IconCreditCard />,
    },
    {
      title: "Global Coverage",
      description:
        "Insure flights worldwide with our decentralized platform that knows no borders.",
      icon: <IconGlobe />,
    },
    {
      title: "Community-Driven",
      description:
        "Join a network of travelers and investors revolutionizing the flight insurance industry together.",
      icon: <IconUsers />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
