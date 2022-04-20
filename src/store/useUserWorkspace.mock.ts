import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import { ITodoList } from "@app/types/todo/ITodoList";
import { IUserWorkspace } from "@app/types/workspace/IUserWorkspace";

const TodoList1DataMock: Array<ITodoListItem> = [
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
const TodoList2DataMock: Array<ITodoListItem> = [
  {
    title: "weonasda;smd;amsd",
    description: "Test card #1 description",
  },
  {
    title: "",
    description: "Test card #2 description",
  },
  {
    title: "asdasdas",
    description: "Test card #3 description",
  },
  {
    title: "*&T@#*$@#&g3t91sss4",
    description: "Test card #4 description",
  },
];

const EditableTodoListMock: ITodoList = {
  title: "Test todo list #1",
  editable: true,
  items: TodoList1DataMock,
};
const NotEditableTodoListMock: ITodoList = {
  title: "Test todo list #2",
  editable: false,
  items: TodoList2DataMock,
};

export const useUserWorkspaceMock: IUserWorkspace = {
  todoLists: [EditableTodoListMock, NotEditableTodoListMock],
};
