import { startTransition, type FormEvent } from "react";

// Passing an action to <form action> makes React reset the whole form after
// every submit. That clears what the user typed and unticks Radix checkboxes
// even when the submit failed validation. Submitting through onSubmit keeps
// the inputs as they are while useActionState still tracks pending state.
export function submitWithoutReset(dispatch: (formData: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };
}
