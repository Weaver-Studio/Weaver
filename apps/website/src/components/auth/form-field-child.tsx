import type { AnyFieldApi } from "@tanstack/react-form";
import { Input } from "@weaver/ui/components/ui/input";
import { Label } from "@weaver/ui/components/ui/label";
import FieldInfo from "./field-info";

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
    <div className="flex w-full flex-col gap-1">
      <Label htmlFor={field.name}>{label}:</Label>
      <Input
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        type={type}
        value={field.state.value as string}
      />
      <FieldInfo field={field} />
    </div>
  );
}

export default FormFieldChild;
