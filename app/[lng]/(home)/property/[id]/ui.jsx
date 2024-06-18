"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Bid from "@/app/ui/bid";
import ConcatCard from "@/app/ui/concatCard";
import FileCard from "@/app/ui/fileCard";
import PriceCard from "@/app/ui/priceCard";
import AreaCard from "@/app/ui/areaCard";
import dayjs from "dayjs";
import { useTranslation } from "@/app/i18n/client";

export default function Client({ property, defaultMaxPrice, defaultIsOwner, lng }) {
    const { t } = useTranslation(lng);
    return (
        <div className="w-full max-w-[1000px] mx-auto pb-12 px-4 md:px-0">
            {/* {JSON.stringify(property)} */}
            <div className="md:flex gap-12 justify-between">
                <div className="w-full md:w-[600px]">
                    <Carousel
                        showThumbs={true}
                        showIndicators={false}
                        showArrows={false}
                        autoPlay={false}
                    >
                        {
                            property.otherImages.map((item, index) => {
                                return <img key={index} src={item.url} alt={item.traditionalChineseTitle} />;
                            })
                        }
                    </Carousel>
                    <div className="md:hidden mb-4">
                        <h1 className="text-2xl font-semibold text-[#253D59]">{property.traditionalChineseTitle}</h1>
                        <h3 className="text-sm text-[#253D59]">{property.traditionalChineseAddress}</h3>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">{t("propertyDes")}</h1>
                        <div>
                            <div>
                                {property.traditionalChineseContent.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between border-t mt-4 pt-4">
                            <div>{t("codeNumber")}：CIA762</div>
                            <div>{t("postDate")}：{dayjs(property.postDate).format("YYYY-MM-DD")}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <Bid lng={lng} target={property} defaultIsOwner={defaultIsOwner} defaultMaxPrice={defaultMaxPrice}></Bid>
                    <PriceCard lng={lng} target={property}></PriceCard>
                    <AreaCard lng={lng} property={property}></AreaCard>
                    <ConcatCard target={property}></ConcatCard>
                    <FileCard lng={lng} target={property}></FileCard>
                </div>
            </div>
        </div>
    );
}
