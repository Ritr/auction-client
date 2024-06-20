"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Bid from "@/app/ui/bid";
import dayjs from "dayjs";
import ConcatCard from "@/app/ui/concatCard";
import FileCard from "@/app/ui/fileCard";
import PriceCard from "@/app/ui/priceCard";
import { useTranslation } from "@/app/i18n/client";
export default function Client({ carPark, defaultMaxPrice, defaultIsOwner, lng }) {
    const { t } = useTranslation(lng);
    return (
        <div className="w-full max-w-[1000px] mx-auto pb-12 px-4 md:px-0">
            {/* {JSON.stringify(bid)} */}
            <div className="md:flex gap-12 justify-between">
                <div className="w-full md:w-[600px]">
                    <Carousel
                        showThumbs={true}
                        showIndicators={false}
                        showArrows={false}
                        autoPlay={false}
                    >
                        {
                            carPark.otherImages.map((item, index) => {
                                return <img key={index} src={item.url} alt={item.traditionalChineseTitle} />;
                            })
                        }
                    </Carousel>
                    <div className="md:hidden mb-4">
                        <h1 className="text-2xl font-semibold text-[#253D59]">{carPark.title}</h1>
                        <h3 className="text-sm text-[#253D59]">{carPark.address}</h3>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">{t("desInfo")}</h1>
                        <div>
                            {/* <div>起拍價：{carPark.startingPrice.toLocaleString()} </div>
                            <div>每口價：{carPark.bidIncrement.toLocaleString()}</div> */}
                            <div>
                                {carPark.traditionalChineseContent.split("\n").map((item, index) => {
                                    return <div key={index}>{item}</div>;
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between border-t mt-4 pt-4">
                            <div>{t("codeNumber")}：CIA762</div>
                            <div>{t("postDate")}：{dayjs(carPark.postDate).format("YYYY-MM-DD")}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <Bid lng={lng} target={carPark} defaultIsOwner={defaultIsOwner} defaultMaxPrice={defaultMaxPrice} targetType={1}></Bid>
                    {/* monthlyPayment, downPayment, mortgageAmount, interestRate, years */}
                    <PriceCard lng={lng} target={carPark} monthlyPayment={"1,795"} downPayment={26} mortgageAmount={70} interestRate={3} years={15}></PriceCard>
                    <ConcatCard lng={lng} target={carPark}></ConcatCard>
                    <FileCard lng={lng} target={carPark}></FileCard>
                </div>
            </div>
        </div>
    );
}