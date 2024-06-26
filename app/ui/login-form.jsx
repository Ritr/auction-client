'use client';
import { authenticate } from '@/lib/actions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineMailOutline, MdPhoneIphone } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import codeList from "@/lib/code";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import { useForm } from 'react-hook-form';
export default function LoginForm() {

    const form = useForm({
    });
    const {
        register,
        handleSubmit
    } = form;
    const { t } = useTranslation();
    const pleaseInput = t("pleaseInput");
    const router = useRouter();
    const [type, setType] = useState("email");
    const [loginStatus, setLoginStatus] = useState({ success: false, error: null, loading: false });
    const onSubmit = async (data) => {
        console.log(data);
        data.type = type;
        setLoginStatus({ success: false, error: null, loading: true })
        const result = await authenticate(null, data);
        if (!result) {
            setLoginStatus({ success: true, error: null, loading: false });
        } else {
            setLoginStatus({ success: false, error: result, loading: false });
        }
    };
    useEffect(() => {
        localStorage.url = new URLSearchParams(location.search).get('redirect') || "/home";
    }, []);
    useEffect(() => {
        if (loginStatus.success) {
            location.href = localStorage.url;
        }
    }, [loginStatus, router]);
    const LoginForm = ({ type = "email" }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <div className="w-full">
                        {type === "email" ? (
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="email"
                                >
                                    {t("email")}
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder={pleaseInput + t("email")}
                                        required
                                        {...register("email")}
                                    />
                                    <MdOutlineMailOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="phone"
                                >
                                    {t("phone")}
                                </label>
                                <div className="flex items-start gap-4">
                                    <select {...register("code")} name="code" id="code" className="indent-2 rounded-md border py-[9px] w-36  text-sm" required>
                                        {
                                            codeList.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.code}>
                                                        {item.cn}{item.code}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className="relative">
                                        <input
                                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            id="phone"
                                            name="phone"
                                            placeholder={pleaseInput + t("phone")}
                                            required
                                            pattern="[0-9]*"
                                            title={t("onlyNumber")}
                                            {...register("phone")}
                                        />
                                        <MdPhoneIphone className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                    </div>
                                </div>

                            </div>
                        )}
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                {t("password")}
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder={pleaseInput + t("password")}
                                    required
                                    minLength={6}
                                    {...register("password")}
                                />
                                <RiLockPasswordLine className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Link href="/register" className="text-sm text-gray-500 mt-2">{t("goRegister")}</Link>
                        <Link href="/forget" className="text-sm text-gray-500 mt-2">{t("forgetPassword")}</Link>
                    </div>

                    <Button className="mt-4 w-full bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" disabled={loginStatus.loading}>
                        {t("startAuction")}
                        {/* <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
                    </Button>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {loginStatus.error && (
                            <>
                                <p className="text-sm text-red-500">{loginStatus.error}</p>
                            </>
                        )}
                    </div>
                </div >
            </form >
        )
    }
    return (
        <Tabs defaultValue="email" className="w-full md:w-[400px]" onValueChange={value => { setType(value) }}>
            <TabsList>
                <TabsTrigger value="email">{t("emailLogin")}</TabsTrigger>
                <TabsTrigger value="phone">{t("phoneLogin")}</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
                <LoginForm type="email"></LoginForm>
            </TabsContent>
            <TabsContent value="phone">
                <LoginForm type="phone"></LoginForm>
            </TabsContent>
        </Tabs>

    );
}
