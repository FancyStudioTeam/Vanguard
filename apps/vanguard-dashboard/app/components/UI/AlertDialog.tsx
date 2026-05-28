import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function AlertDialog({ ...props }: AlertDialogProps) {
	return <AlertDialogPrimitive.Root {...props} />;
}

export function AlertDialogClose({ ...props }: AlertDialogCloseProps) {
	return <AlertDialogPrimitive.Close {...props} />;
}

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
	return (
		<AlertDialogPrimitive.Portal>
			<AlertDialogPrimitive.Backdrop className='fixed inset-0 z-50 min-h-dvh backdrop-brightness-50 data-closed:animate-duration-100 data-closed:animate-fade-out data-open:animate-duration-150 data-open:animate-fade-in' />
			<AlertDialogPrimitive.Popup
				className={classNames(
					'fixed top-1/2 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-900 p-6 shadow-md shadow-neutral-950 data-closed:animate-duration-100 data-closed:animate-fade-out-down data-open:animate-duration-150 data-open:animate-fade-in-down',
				)}
				{...props}
			/>
		</AlertDialogPrimitive.Portal>
	);
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
	return (
		<AlertDialogPrimitive.Description
			className={classNames('text-neutral-400 text-sm')}
			{...props}
		/>
	);
}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
	return (
		<AlertDialogPrimitive.Title
			className={classNames('font-bold text-lg')}
			{...props}
		/>
	);
}

export function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
	return <AlertDialogPrimitive.Trigger {...props} />;
}

export type AlertDialogCloseProps = AlertDialogPrimitive.Close.Props;
export type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props;
export type AlertDialogDescriptionProps = AlertDialogPrimitive.Description.Props;
export type AlertDialogProps = AlertDialogPrimitive.Root.Props;
export type AlertDialogTitleProps = AlertDialogPrimitive.Title.Props;
export type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props;
