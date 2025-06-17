import type { ITask } from "@components/Task";
import type { COMPLETION_FILTER } from "../context";

export const generateId = () => Math.random().toString(36);

export const searchValidator = (task: ITask, term: string) =>
    task.title.toLowerCase().includes(term.toLowerCase());

export const filterValidator = (task: ITask, filter: COMPLETION_FILTER) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
};

export const shouldFilter = (searchTerm: string, completionFilter: COMPLETION_FILTER) => searchTerm.trim() !== '' || (completionFilter && completionFilter !== 'all');

export const highlightMatch = (text: string, query: string): string => {
    if (!query) return text;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return text.replace(regex, '<mark>$1</mark>');
}