import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setChecked, uncheck } from "../app/questionSlice";

type Props = {
    multiple: boolean;
    text: string;
    id: number;
};

function Question({ multiple, text, id }: Props) {
    const dispatch = useAppDispatch();
    const [checkedQ, setCheckedQ] = useState(false);
    const canBeChecked = useAppSelector((state) => state.question.checked);

    useEffect(() => {
        if (!canBeChecked?.includes(id)) {
            setCheckedQ(false);
        }
    }, [canBeChecked]);

    function handleClick() {
        if (checkedQ) {
            dispatch(uncheck(id));
            setCheckedQ(false);
        } else {
            setCheckedQ(true);
            dispatch(setChecked(id));
        }
    }

    return (
        <div
            onClick={() => handleClick()}
            className={`flex flex-row bg-gray-500 p-3 gap-4 items-center cursor-pointer rounded-md ${
                !multiple && "p-4"
            } ${!checkedQ ? "hover:bg-gray-700" : "hover:bg-yellow-700 bg-yellow-600"}`}
        >
            {multiple && (
                <div className="flex items-center justify-center w-8 h-8 border-2 border-white border-solid">
                    {checkedQ && <p className="mb-2 text-3xl">x</p>}
                </div>
            )}
            <p>{text}</p>
        </div>
    );
}

export default Question;
