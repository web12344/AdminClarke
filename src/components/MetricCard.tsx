import { CountUp } from "use-count-up";

const parseMetricValue = (value: string | number) => {
  if (typeof value === "number") {
    return { number: value, prefix: "", suffix: "", decimals: 0 };
  }

  const match = value.match(/^([^0-9.-]*)([0-9.,]+)([^0-9]*)$/);
  if (!match) return { number: 0, prefix: "", suffix: "", decimals: 0 };

  const prefix = match[1];
  const numStr = match[2].replace(/,/g, "");
  const suffix = match[3];
  const number = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return { number, prefix, suffix, decimals };
};

const MetricCard = ({
  label,
  value,
  change,
  isPositive,
}: {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}) => {
  const { number, prefix, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="relative overflow-hidden bg-[#12101e]/75 backdrop-blur-[16px] border border-[#a855f7]/[0.12] rounded-[20px] py-5 px-[22px] transition-all duration-300 group hover:border-[#a855f7]/25 hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:-translate-y-[2px]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="text-[12px]  text-left font-medium uppercase tracking-[1.2px] text-[#64748b] mb-1">
        {label}
      </div>

      <div className="text-[32px]  text-left  font-black tracking-[-1px] text-[#e8e6f0] leading-[1.2]">
        {prefix}
        <CountUp
          isCounting
          end={number}
          duration={1.5}
          decimalPlaces={decimals}
          thousandsSeparator=","
        />
        {suffix}
      </div>

      <div
        className={`text-[12px] text-left font-semibold mt-1.5 flex items-center gap-1 ${
          isPositive ? "text-[#34d399]" : "text-[#f87171]"
        }`}
      >
        {change}
      </div>
    </div>
  );
};

export default MetricCard;