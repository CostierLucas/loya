import Image from "next/image";
import { useRouter } from "next/router";
import LoyaPoint from "public/icons/loya-point";

export const LoyaltyCard = () => {
  const router = useRouter();
  const requiredPoints = 10;
  const userPoints = 3;
  const lifetimePoints = 100;

  const Points = () => {
    const points = [];
    let renderedPoints;
    if (userPoints > requiredPoints) {
      renderedPoints = Math.floor(userPoints % requiredPoints);
    } else {
      renderedPoints = userPoints;
    }
    for (let i = 0; i < requiredPoints; i++) {
      points.push(
        i < renderedPoints ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-black bg-brand-black">
            <LoyaPoint />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full border border-brand-black" />
        )
      );
    }
    return points;
  };
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-4">
          <span className="text-[112px] leading-none">1</span>
          <span className="pb-2">Loyalty Card</span>
        </div>
      </div>

      <div
        className="mt-4 flex aspect-video w-full flex-col items-center justify-center rounded-3xl bg-[#FFEDE6] px-4 py-4"
        onClick={() => router.push("/user/card")}
      >
        <div className="flex w-full items-center justify-between">
          <Image
            src="/business-logo.png"
            alt="Business"
            width={90}
            height={70}
          />
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-lg font-bold">
              {requiredPoints - userPoints} visits away from reward!{" "}
            </span>
            <span className="text-sm">
              You accumulated {lifetimePoints} visits since Sept 2023
            </span>
          </div>
        </div>
        <div
          className="mt-8 grid w-full grid-rows-2 justify-items-center gap-4"
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(
              requiredPoints / 2
            )}, minmax(0, 1fr))`,
          }}
        >
          {Points()}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
