import { ITodoListItem } from "@app/types/ITodoListItem";
import { ITodoList } from "@app/types/ITodoList";

export const TodoListDataMock: Array<ITodoListItem> = [
  {
    title: "Test card #1",
    description: "Test card #1 description",
  },
  {
    title: "Test card #2",
    description: "Test card #2 description",
  },
  {
    title: "Test card #3",
    description: "Test card #3 description",
  },
  {
    title: "Test card #4",
    description: "Test card #4 description",
  },
];

export const EditableTodoListMock: ITodoList = {
  title: "Test todo list",
  editable: true,
  items: TodoListDataMock,
};
