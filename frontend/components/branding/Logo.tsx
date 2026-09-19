import LogoIcon from "./LogoIcon";
import BrandName from "./BrandName";

interface Props {
  small?: boolean;
}

export default function Logo({
  small,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-slate-200"
        style={{
          width: small ? 48 : 60,
          height: small ? 48 : 60,
        }}
      >
        <LogoIcon
          className={
            small
              ? "h-8 w-8"
              : "h-10 w-10"
          }
        />
      </div>

      <BrandName small={small} />
    </div>
  );
}