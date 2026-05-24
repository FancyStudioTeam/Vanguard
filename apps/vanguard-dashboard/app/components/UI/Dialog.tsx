import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Dialog({ disablePointerDismissal = true, ...props }: DialogProps) {
	return (
		<DialogPrimitive.Root
			disablePointerDismissal={disablePointerDismissal}
			{...props}
		/>
	);
}

export function DialogClose({ ...props }: DialogCloseProps) {
	return <DialogPrimitive.Close {...props} />;
}

export function DialogContent({ className, ...props }: DialogContentProps) {
	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Backdrop className='fixed inset-0 z-50 min-h-dvh backdrop-brightness-50 data-closed:animate-duration-100 data-closed:animate-fade-out data-open:animate-duration-150 data-open:animate-fade-in' />
			<DialogPrimitive.Popup
				className={classNames(
					'fixed top-1/2 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl border-2 border-neutral-800 bg-neutral-900 p-6 shadow-md shadow-neutral-950 data-closed:animate-duration-100 data-closed:animate-fade-out-down data-open:animate-duration-150 data-open:animate-fade-in-down',
					className,
				)}
				{...props}
			/>
		</DialogPrimitive.Portal>
	);
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			className={classNames('text-neutral-400 text-sm', className)}
			{...props}
		/>
	);
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
	return (
		<DialogPrimitive.Title
			className={classNames('font-bold text-lg')}
			{...props}
		/>
	);
}

export function DialogTrigger({ ...props }: DialogTriggerProps) {
	return <DialogPrimitive.Trigger {...props} />;
}

export type DialogCloseProps = DialogPrimitive.Close.Props;
export type DialogContentProps = DialogPrimitive.Popup.Props;
export type DialogDescriptionProps = DialogPrimitive.Description.Props;
export type DialogProps = DialogPrimitive.Root.Props;
export type DialogTitleProps = DialogPrimitive.Title.Props;
export type DialogTriggerProps = DialogPrimitive.Trigger.Props;
