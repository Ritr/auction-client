"use client"
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ToastContainer, toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";

// import Viewer from "react-viewer";
function ImageViewer({ src }) {
    return (
        <div>
            <Dialog className="max-w-[80vw] md:max-w-[80vw] ">
                <DialogTrigger asChild>
                    <img className="h-12 w-24 object-contain cursor-pointer" src={src} alt="" />
                </DialogTrigger>
                <DialogContent className="max-w-[80vw] w-[80vw]">
                    <div className="w-full  max-h-[60vh]  p-8">
                        <img className="w-full h-full object-contain cursor-pointer" src={src} alt="" />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );

}
export default function Page({ params }) {
    const { t } = useTranslation(params.lng);
    const { data: session } = useSession();
    const [list, setList] = useState([]);
    const mutation = useMutation({
        mutationFn: async () => {
            let res = await fetch("/api/profile/bid");
            return await res.json();
        },
    });
    const getMyMaxPrice = (id, bids) => {
        let max = 0;
        for (let i = 0; i < bids.length; i++) {
            if (bids[i].userId === id) {
                if (bids[i].bidPrice > max) {
                    max = bids[i].bidPrice;
                }
            }
        }
        return max;
    }
    useEffect(() => {
        mutation.mutate();
    }, []);
    useEffect(() => {
        if (mutation.data) {
            if (mutation.data.error) {
                toast.error(mutation.data.error);
            } else {
                setList(mutation.data.bids);
            }
        }
    }, [mutation.data]);
    return (
        <div className="w-full max-w-[1000px] mx-auto">
            <ToastContainer position="top-center" />
            <Table className="w-full my-4">
                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap">{t("title")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("address")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("img")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("bid")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("currentPrice")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("bidStatus")}</TableHead>
                        <TableHead className="whitespace-nowrap">{t("status")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-[100px] overflow-auto" >
                    {list.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-left">

                                {
                                    item.targetType === "0" ?
                                        <Link className="underline" href={"/property/" + item.property._id}>{item.property?.traditionalChineseTitle}</Link> :
                                        <Link className="underline" href={"/carpark/" + item.carPark._id}>{item.carPark?.traditionalChineseTitle}</Link>
                                }
                            </TableCell>
                            <TableCell className="text-left">
                                {
                                    item.targetType === "0" ? item.property?.address : item.carPark?.address
                                }
                            </TableCell>
                            <TableCell className="text-left">
                                {
                                    item.targetType === "0" ? <ImageViewer src={item.property?.coverImage?.url}></ImageViewer> : <ImageViewer src={item.carPark?.coverImage?.url} />
                                }
                            </TableCell>
                            <TableCell className="text-left">
                                <Popover>
                                    <PopoverTrigger >
                                        <span className="cursor-pointe underline">{getMyMaxPrice(session.user?._id, item.allBids).toLocaleString()}</span>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="max-h-[30vh] overflow-auto" >
                                            {item.allBids.map(item => {
                                                return (
                                                    <div className="py-2 flex border-b w-full justify-between" key={item.bidPrice}>
                                                        <span>{item.bidPrice.toLocaleString()}</span>
                                                        {
                                                            item.userId === session.user?._id ?
                                                                <div>
                                                                    <span>
                                                                        {t("myBid")}
                                                                    </span>
                                                                    <span className="p-1 ml-2 bg-primary rounded-full"></span>
                                                                </div> : null
                                                        }

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell className="text-left">
                                {item.maxBidPrice}
                            </TableCell>
                            <TableCell className="text-left">
                                {(item.userId === session.user?._id) ? t("youTop") : t("overYou")}
                            </TableCell>
                            <TableCell className="text-left">
                                {
                                    item.targetType === "0" ? item.property?.status : item.carPark?.status
                                }
                            </TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
        </div >
    );
}