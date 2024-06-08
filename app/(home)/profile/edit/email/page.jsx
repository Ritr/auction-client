
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
    const onSubmit = (data) => {
        mutation.mutate(data);
        return;
    }
    const [codeId, setCodeId] = useState(null);
    const [seconds, setSeconds] = useState(61);
    const [timer, setTimer] = useState(null);
    const mutation = useMutation({
        mutationFn: async (data) => {
            let result = await fetch("/api/profile/email", {
                method: "POST",
                body: JSON.stringify({ ...data, codeId: codeId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await result.json();
        }
    })
    const form = useForm({
        defaultValues: {}
    });
    const {
        register,
        handleSubmit,
        reset,
        formState,
        watch
    } = form;
    const email = watch("email");
    // 获取验证码
    const codeMutation = useMutation({
        mutationFn: async (email) => {
            const result = await fetch("/api/validate?email=" + email);
            return await result.json();
        },
    });
    const count = () => {
        let timer1 = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        setTimer(timer1);
    };
    const getCode = () => {
        if (!email) {
            toast.error("請輸入電郵");
            return;
        }
        codeMutation.mutate(email);
        setSeconds(60);
        count();
    }
    const back = () => {
        window.history.back();
    }
    useEffect(() => {
        if (codeMutation.data) {
            if (codeMutation.data.error) {
                toast.error("發送失敗");
            } else {

                setCodeId(codeMutation.data.codeId);
                toast.success("驗證碼已發送");
            }
        }
    }, [codeMutation.data]);

    useEffect(() => {
        if (mutation.data) {
            if (mutation.data.error) {
                toast.error(mutation.data.error);
            } else {
                toast.success(mutation.data.msg);
            }
        }
    }, [mutation.data]);
    useEffect(() => {
        if (seconds < 0) {
            clearInterval(timer);
            setSeconds(61);
        }
    }, [seconds]);
    return (
        <div className="w-full max-w-[800px] mx-auto">
            <ToastContainer position="top-center" />
            <Button className="mb-4" variant="outline" onClick={back}>返回</Button>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-gray-50 px-6 gap-4">
                <div>
                    <Label htmlFor="email">電郵</Label>
                    {/* <Label htmlFor="email">Email</Label> */}
                    <Input type="email" id="email" name="email" placeholder="Email" required {...register("email")} />
                </div>
                <div className="flex gap-4  mb-12">
                    <div className="w-full">
                        <Label>驗證碼</Label>
                        {/* <Label>Verification Code</Label> */}
                        <Input className="" {...register("code")} placeholder="Please input verification code" required>
                        </Input>
                    </div>
                    <div className="mt-6">
                        {
                            seconds <= 60 ? (
                                <Button color="primary" disabled>{seconds} 秒</Button>

                            ) : (
                                // Get verification code
                                <Button color="primary" type="button" onClick={getCode}>獲取驗證碼</Button>
                            )
                        }
                    </div>
                </div>
                <div>
                    <Button disabled={mutation.isPending} className="w-full bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" type="submit"  >Submit</Button>
                </div>
            </form>

        </div >
    );
}