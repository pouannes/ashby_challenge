import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import TextField from "./TextField";

type NewFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function NewFormDialog({ open, setOpen }: NewFormDialogProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const body = {
      title,
      description,
    };
    fetch(`/api/v1/forms`, {
      method: "post",
      body: JSON.stringify(body),
    })
      .catch((e) => console.log(e))
      .finally(() => setOpen(false));
  };

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-500 mb-10"
              >
                Create new form
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

                <div className="mt-4 w-full flex items-center justify-end">
                  <Button className="mr-4" onClick={() => setOpen(false)}>
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
