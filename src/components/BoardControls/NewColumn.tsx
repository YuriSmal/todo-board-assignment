import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "@components/Common";
import { EVENT_KEY } from "../../constants";

type NewColumnProps = {
    addColumn: (title: string) => void;
}

export const NewColumn = (props: NewColumnProps) => {
    const { addColumn } = props;
    const [title, setTitle] = useState('');

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 20) {
            setTitle(e.target.value);
        }
    }

    const handleAddColumn = () => {
        if (!title.trim()) return;
        addColumn(title);
        setTitle('')
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === EVENT_KEY.Enter) {
            if (!title.trim()) return;
            addColumn(title);
            setTitle('');
        }
    }


    return (
        <div className="add-column">
            <input
                type="text"
                placeholder="New column title"
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
            />
            <Button text='Add Column' onClick={handleAddColumn} />
        </div>
    )
};