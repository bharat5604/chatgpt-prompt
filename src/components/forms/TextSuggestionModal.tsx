import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
type ModalProps = {
  isOpen: boolean;
  suggetion: string;
  setField: (reply: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function TextSuggestion({
  isOpen,
  suggetion,
  setField,
  setOpen,
}: ModalProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [content, setContent] = useState(suggetion);
  console.log("suggetion", suggetion, content);

  useEffect(() => {
    setContent(suggetion ?? "");
    setIsDisabled(true);
  }, [suggetion]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>Text suggestion</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-64">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isDisabled}
            className={`${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white cursor-auto"
            }`}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild onClick={() => setOpen(false)}>
            <Button type="button" onClick={() => setField(content)}>
              Accept
            </Button>
          </DialogClose>
          <Button variant="outline" onClick={() => setIsDisabled(false)}>
            Edit
          </Button>
          <DialogClose asChild onClick={() => setOpen(false)}>
            <Button type="button" variant="outline">
              Discard
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
