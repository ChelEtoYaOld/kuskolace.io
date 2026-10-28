"use client";

import React from "react";
import { PastryItem } from "@/backend/types/AdminPastryShowcase";
import { AlertTriangle, Trash2 } from "lucide-react";
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  item: PastryItem | null;
  onClose: () => void;
  onConfirm: () => void;
}
export default function DeleteConfirmDialog({
  isOpen,
  item,
  onClose,
  onConfirm
}: DeleteConfirmDialogProps) {
  if (!isOpen || !item) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" data-api-unique-id='deleteconfirmdialog-rec41c534b6c8c7e8-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground shadow-xl transition-all" role="alertdialog" aria-modal="true" data-api-unique-id='deleteconfirmdialog-rad90cbbf548b6f15-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
        <div className="flex items-center gap-3" data-api-unique-id='deleteconfirmdialog-r9023932444f0cad1-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive" data-api-unique-id='deleteconfirmdialog-r875e2d0fdd77b8c4-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
            <AlertTriangle className="h-5 w-5" data-api-unique-id='deleteconfirmdialog-r3dfeaf21e765b5b4-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog' />
          </div>
          <div className="min-w-0" data-api-unique-id='deleteconfirmdialog-rd716114821d89750-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
            <h3 className="text-base font-bold text-foreground" data-api-unique-id='deleteconfirmdialog-r23467879c0d0fc9a-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>Smazat pečivo z vitríny?</h3>
            <p className="text-xs text-muted-foreground mt-0.5" data-api-unique-id='deleteconfirmdialog-r53aef9102727b6a5-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
              Tato akce trvale odstraní položku z denní nabídky.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-border bg-muted/40 p-3 text-xs" data-api-unique-id='deleteconfirmdialog-ra087e7f9ed3730cd-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
          <div className="font-semibold text-foreground" data-api-unique-id='deleteconfirmdialog-r5ebac89580884b39-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>{item.name}</div>
          <div className="mt-1 flex items-center gap-2 text-muted-foreground" data-api-unique-id='deleteconfirmdialog-rfaec565b2e332fdb-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
            {item.itemCode && <span className="font-mono" data-api-unique-id='deleteconfirmdialog-r715ba96b75b5690e-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>{item.itemCode}</span>}
            {item.itemCode && <span data-api-unique-id='deleteconfirmdialog-r6eca2699c64faf3d-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>•</span>}
            <span className="font-mono font-medium text-foreground" data-api-unique-id='deleteconfirmdialog-r9db02608cbb47e03-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>{item.priceCzk} CZK</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3" data-api-unique-id='deleteconfirmdialog-r210a78dba5af501a-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
          <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" data-api-unique-id='deleteconfirmdialog-r74b8f47c8bbb89de-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
            Zrušit
          </button>
          <button type="button" onClick={onConfirm} className="inline-flex items-center gap-1.5 rounded-md bg-destructive px-4 py-2 text-xs font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive transition-colors" data-api-unique-id='deleteconfirmdialog-r33aff2f7b43e2eb0-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>
            <Trash2 className="h-3.5 w-3.5" data-api-unique-id='deleteconfirmdialog-reacdd43f719409bb-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog' />
            <span data-api-unique-id='deleteconfirmdialog-rad222912476a637c-s3951557336' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/DeleteConfirmDialog'>Smazat položku</span>
          </button>
        </div>
      </div>
    </div>;
}