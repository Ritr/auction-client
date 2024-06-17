"use client";
import { logOut } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function Page() {
  const router = useRouter();

  const [logoutStatus, setLogoutStatus] = useState({
    success: false,
    error: null,
    loading: false,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLogoutStatus({ success: false, error: null, loading: true });
    const result = await logOut();
    if (!result) {
      setLogoutStatus({ success: true, error: null, loading: false });
    } else {
      setLogoutStatus({ success: false, error: result, loading: false });
    }
  };
  useEffect(() => {
    if (logoutStatus.success) {
      // router.push("/home");
      location.href = "/home";
    }
  }, [logoutStatus]);
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <p>確認登出嗎？</p>
        <form onSubmit={handleSubmit}>

          <Button type="submit" className="mt-4 w-full  bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" disabled={logoutStatus.loading}>
            登出
          </Button>
          <Button className="mt-4 w-full" onClick={() => router.back()}>取消</Button>
        </form>
      </div>
    </main>
  );
}
