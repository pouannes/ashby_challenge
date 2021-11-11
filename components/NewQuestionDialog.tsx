import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import TextField from "./TextField";

type NewQuestionDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  createNewQuestion: (title: string, description: string) => void;
};

export default function NewQuestionDialog({
  open,
  setOpen,
  createNewQuestion,
}: NewQuestionDialogProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("submitting");

    await createNewQuestion(title, description);

    setTitle("");
    setDescription("");

    setOpen(false);
  };

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          console.log("onclose");
        }}
      >
        <div className="min-h-screen px-4 text-center">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="z-20 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
              <Dialog.Title
                as="h3"
                className="mb-10 text-lg font-medium leading-6 text-gray-500 dark:text-gray-200"
              >
                Create new question
              </Dialog.Title>
              <form onSubmit={onSubmit}>
                <TextField
                  required
                  value={title}
                  handleChange={(e) => setTitle(e.target.value)}
                  name="Title"
                />
                <TextField
                  required
                  value={description}
                  handleChange={(e) => setDescription(e.target.value)}
                  name="Description"
                />

                <div className="flex items-center justify-end w-full mt-4">
                  <Button
                    type="button"
                    className="mr-4"
                    onClick={() => {
                      setTitle("");
                      setDescription("");
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
