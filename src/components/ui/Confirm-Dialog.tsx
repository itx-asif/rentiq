// components/ui/confirm-dialog.tsx
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
    open: boolean;
    onClose: (confirmed: boolean) => void;
    title?: string;
    message?: string;
};

const ConfirmDialog = ({ open, onClose, title, message }: ConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={() => onClose(false)}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>{title || "Are you sure?"}</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">{message || "This action cannot be undone."}</p>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onClose(false)}>
                        No
                    </Button>
                    <Button variant="destructive" onClick={() => onClose(true)}>
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
