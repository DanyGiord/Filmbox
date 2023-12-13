import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import * as Icons from "@/public/assets/icons/Icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";

interface CreateSessionModalProps {
    children: React.ReactNode
}

const CreateSessionModal = ({ children }: CreateSessionModalProps) => {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="p-0">
                <DialogHeader className="p-6">
                    <DialogTitle className="text-white_text text-center text-2xl">Create a Session</DialogTitle>
                    <DialogDescription className="text-center text-base text-gray">Check participants</DialogDescription>
                    <Input 
                        placeholder="Search your friendlist..."
                        iconSrc={Icons.Search}
                    />
                </DialogHeader>
                <Separator className="bg-gray" />
                <DialogFooter className="p-6">
                    <Button variant="skew" className="mt-0 group">
                        Continue <ChevronRight className="h-5 w-5 pt-0.5 group-hover:translate-x-2 transition" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}

export default CreateSessionModal;