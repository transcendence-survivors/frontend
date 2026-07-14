'use client'

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/modules/i18n/utils/navigation";

export default function PostDetailHeader() {
  
  const router = useRouter();

  return (
    <div className='max-w-xl mx-auto flex items-center gap-4 p-4'>
      <Button
      variant='ghost'
      onClick={() => router.back()}>
        <ArrowLeft />
        Post
      </Button>
    </div>
        
  )
}
