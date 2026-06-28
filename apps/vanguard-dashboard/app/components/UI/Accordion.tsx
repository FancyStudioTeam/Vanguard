import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export function Accordion({ ...props }: AccordionProps) {
	return <AccordionPrimitive.Root {...props} />;
}

export function AccordionHeader({ ...props }: AccordionHeaderProps) {
	return <AccordionPrimitive.Header {...props} />;
}

export function AccordionItem({ ...props }: AccordionItemProps) {
	return <AccordionPrimitive.Item {...props} />;
}

export function AccordionPanel({ ...props }: AccordionPanelProps) {
	return <AccordionPrimitive.Panel {...props} />;
}

export function AccordionTrigger({ ...props }: AccordionTriggerProps) {
	return <AccordionPrimitive.Trigger {...props} />;
}

export type AccordionHeaderProps = AccordionPrimitive.Header.Props;
export type AccordionItemProps = AccordionPrimitive.Item.Props;
export type AccordionPanelProps = AccordionPrimitive.Panel.Props;
export type AccordionProps = AccordionPrimitive.Root.Props;
export type AccordionTriggerProps = AccordionPrimitive.Trigger.Props;
