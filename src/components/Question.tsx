import React, { useState } from "react";

type Props = {
    multiple: boolean;
    text: string;
};

function Question({ multiple, text }: Props) {
    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked);
    }

    return (
        <div
            onClick={() => handleClick()}
            className={`flex flex-row bg-gray-500 p-3 gap-4 items-center cursor-pointer rounded-md ${
                !multiple && "p-4"
            } ${!checked ? "hover:bg-gray-700" : "hover:bg-yellow-700 bg-yellow-600"}`}
        >
            {multiple && (
                <div className="flex justify-center items-center w-8 h-8 border-solid border-white border-2">
                    {checked && <p className="text-3xl mb-2">x</p>}
                </div>
            )}
            <p>{text}</p>
        </div>
    );
}

export default Question;
