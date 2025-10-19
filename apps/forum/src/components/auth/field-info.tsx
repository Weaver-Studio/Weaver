import { AnyFieldApi } from "@tanstack/react-form";


function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<div className="min-h-[1rem] text-sm text-red-500">
			{field.state.meta.isTouched &&
				field.state.meta.errors.map((error, index) => (
					<em key={index} className="block">
						{error.message}
					</em>
				))}
		</div>
	);
}

export default FieldInfo