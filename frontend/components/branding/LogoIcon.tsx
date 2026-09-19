interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({
  className = "",
}: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="loopGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      <path
        d="M18 32C18 22 25 16 33 16C40 16 46 22 46 32C46 42 40 48 33 48C25 48 18 42 18 32ZM33 32C33 22 39 16 47 16C54 16 60 22 60 32C60 42 54 48 47 48C39 48 33 42 33 32Z"
        fill="url(#loopGradient)"
      />
    </svg>
  );
}