'use client'

import { useRouter } from 'next/navigation'
import { useAdminSession } from '@/tools/BackendSession'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { create } from 'zustand'

// Přihlašovací route administrace
const LOGIN_ROUTE = '/adminlogin'

// Správa stavu modálního okna
interface AuthDialogState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useAuthDialog = create<AuthDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))

// Získání autorizačního tokenu
export function getToken(): string | null {
  const session = useAdminSession.getState()
  return session.token || null
}

// Vymazání přihlašovacích údajů
export function clearAuth(): void {
  useAdminSession.getState().reset()
}

/**
 * Zpracování chyby 401 (Neautorizováno)
 * Logika: Vymaže lokální session a otevře globální dialog.
 * Pokud je uživatel již na přihlašovací stránce, dialog se neotevírá.
 */
export function handleUnauthorized(): void {
  clearAuth()

  // Pokud je již na přihlašovací stránce, nezobrazovat dialog
  if (typeof window !== 'undefined' && window.location.pathname.includes(LOGIN_ROUTE)) {
    return
  }

  useAuthDialog.getState().open()
}

// Komponenta dialogu pro vypršení relace (napojena v layoutu backendu)
export function AuthExpiredDialog() {
  const router = useRouter()
  const { isOpen, close } = useAuthDialog()

  const handleLogin = () => {
    close()
    router.push(LOGIN_ROUTE)
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {/* Pevné umístění vpravo dole dle specifikace */}
      <DialogContent className="fixed bottom-4 right-4 left-auto top-auto translate-x-0 translate-y-0 bg-card text-card-foreground border border-border shadow-warm rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Platnost relace vypršela</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Vaše přihlášení do administrace vypršelo nebo je vyžadováno ověření. Pro pokračování se prosím přihlaste pomocí administrátorského účtu.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={close}
            className="border-border text-foreground hover:bg-muted active:bg-muted/80"
          >
            Později
          </Button>
          <Button
            type="button"
            onClick={handleLogin}
            className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
          >
            Přejít k přihlášení
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
