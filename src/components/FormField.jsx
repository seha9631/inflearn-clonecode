import { TextInput } from '@mantine/core';

function FormField({ label, placeholder, value, onChange, error, ...props }) {
    return (
        <TextInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={error}
            {...props}
        />
    );
}

export default FormField;