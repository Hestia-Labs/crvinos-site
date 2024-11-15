"use client"


import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { DrawerProvider } from "@/contexts/DrawerContext"
import { CartProvider } from "@/contexts/CartContext"
import { ColorProvider } from "@/contexts/ColorContext"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/AuthContext"



export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 4 * 1000,
            refetchInterval: 4 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
        <DrawerProvider>
            <ColorProvider>
                <CartProvider>
                  <AuthProvider>
                    <Toaster
                        toastOptions={{
                            classNames: {
                                toast: 'bg-back',
                                title: 'text-crred',
                                icon: 'text-crred',
                            },
                        }}
                    />
                    {children}
                    </AuthProvider>
                </CartProvider>
            </ColorProvider>
        </DrawerProvider>
    </QueryClientProvider>
  )
}