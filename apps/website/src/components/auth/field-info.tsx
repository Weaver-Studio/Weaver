import type { AnyFieldApi } from "@tanstack/react-form";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="min-h-[1rem] text-red-500 text-sm">
      {field.state.meta.isTouched &&
        field.state.meta.errors.map((error) => (
          <em className="block" key={error.message}>
            {error.message}
          </em>
        ))}
    </div>
  );
}

export default FieldInfo;
