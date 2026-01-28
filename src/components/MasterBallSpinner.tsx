import Image from "next/image";
import masterBall from "@/img/image.png";

export function MasterBallSpinner({ size = "h-8 w-8" }: { size?: string }) {
  return (
    <div className={`${size} relative animate-spin`}>
      <Image
        src={masterBall}
        alt="Master Ball"
        width={32}
        height={32}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
