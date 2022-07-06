import React, {ChangeEvent, KeyboardEvent} from "react";

type UniversalInputPropsType = {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
    placeholder: string
}

export const UniversalInput = (props: UniversalInputPropsType) => {
    return (
        <input
            value={props.value}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            placeholder={props.placeholder}
        />
    )
}