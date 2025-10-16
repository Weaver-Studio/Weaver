import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FieldInfo from "./field-info";

import { AnyFieldApi } from "@tanstack/react-form";

function FormFieldChild({
	field,
	label,
	type = "text",
}: {
	field: AnyFieldApi;
	label: string;
	type?: React.HTMLInputTypeAttribute;
}) {
	return (
		<div className="w-full flex flex-col gap-1">
			<Label htmlFor={field.name}>{label}:</Label>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value as string}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				type={type}
			/>
			<FieldInfo field={field} />
		</div>
	);
}

export default FormFieldChild