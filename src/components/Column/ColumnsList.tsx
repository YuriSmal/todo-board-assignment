import {Column, type IColumn} from "@components/Column";
import type {COMPLETION_FILTER} from "../../context";
import { searchValidator, filterValidator, shouldFilter } from '../../utils';

type ColumnsListProps = {
    columns: IColumn[];
    searchTerm: string;
    completionFilter: COMPLETION_FILTER;
};

export const ColumnsList = (props: ColumnsListProps) => {
    const { columns, completionFilter, searchTerm } = props;

    const filteredColumns = columns
        .map(col => {
            const filteredTasks = col.tasks.filter(task =>
                (!searchTerm || searchValidator(task, searchTerm)) &&
                (completionFilter && filterValidator(task, completionFilter))
            );
            return { ...col, tasks: filteredTasks };
        })
        .filter(col => !shouldFilter(searchTerm, completionFilter) || col.tasks.length > 0);
    return (
        <>
            {!filteredColumns.length && <p className="column-empty">No tasks found</p>}
            {filteredColumns.map(col => (
                <Column key={col.id} column={col} />
            ))}
        </>
    )
}