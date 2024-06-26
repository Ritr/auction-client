
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import codeList from "@/lib/code";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "@/app/i18n/client";

export default function Page({ user, lng }) {
    const { t } = useTranslation(lng);
    const onSubmit = (data) => {
        data.promotion = data.promotion === "1" ? true : false;
        mutation.mutate(data);
    }
    const mutation = useMutation({
        mutationFn: async (data) => {
            let result = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await result.json();
        }
    })
    const form = useForm({
        defaultValues: user
    });
    const {
        register,
        handleSubmit,
        reset,
        watch
    } = form;
    useEffect(() => {
        if (mutation.data) {
            if (mutation.data.error) {
                toast.error(mutation.data.error);
            } else {
                toast.success(mutation.data.msg);
            }
        }
    }, [mutation.data]);
    return (
        <div className="w-full max-w-[800px] mx-auto">
            <ToastContainer position="top-center" />
            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col rounded-lg bg-gray-50 px-6 gap-4">
                <div className="flex gap-4 w-full items-end justify-between">
                    <div className="w-full">
                        <Label htmlFor="email">{t("email")}</Label>
                        <Input type="email" id="email" name="email" placeholder="Email" required {...register("email")} readOnly />
                    </div>
                    <div>
                        <Link href="edit/email">
                            <Button color="primary">{t("changeEmail")}</Button>
                        </Link>
                    </div>
                </div>
                <div >
                    <Label htmlFor="englishName">{t("englishName")}</Label>
                    <Input id="englishName" name="englishName" placeholder="English name" required {...register("englishName")} />
                </div>
                <div >
                    <Label htmlFor="englishSurname">{t("englishSurname")}</Label>
                    <Input id="englishSurname" name="englishSurname" placeholder="English surname" required {...register("englishSurname")} />
                </div>
                <div >
                    <Label htmlFor="chineseName">{t("chineseName")}</Label>
                    <Input id="chineseName" name="chineseName" placeholder="Chinese name" required {...register("chineseName")} />
                </div>
                <div >
                    <Label htmlFor="chineseSurname">{t("chineseSurname")}</Label>
                    <Input id="chineseSurname" name="chineseSurname" placeholder="Chinese surname" required {...register("chineseSurname")} />
                </div>
                <div >
                    <Label htmlFor="address">{t("address")}</Label>
                    <Textarea id="address" name="address" placeholder="address"  {...register("address")} />
                </div>
                <div >
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <div className="flex gap-4">
                        <select className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm " name="" id="" {...register("countryAndRegion")}>
                            {
                                codeList.map((item, index) => {
                                    return (
                                        <option key={index} value={item.en}>
                                            {item.cn}{item.code}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder=""
                            required
                            pattern="[0-9]*"
                            {...register("phone")}
                        /> </div>
                </div>
                <div >
                    <Label htmlFor="promotion">{t("receivePromotional")}</Label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" {...register("promotion")}>
                        <option value="1" className="h-9">Yes</option>
                        <option value="0" className="h-9">No</option>
                    </select>
                </div>
                <div>
                    <Button disabled={mutation.isPending} className="w-full bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" type="submit"  >{t("submit")}</Button>
                </div>
            </form>
        </div >
    );
}