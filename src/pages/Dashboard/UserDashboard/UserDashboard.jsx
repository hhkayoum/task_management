import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { MdAddBox } from "react-icons/md";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const UserDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  const initialData = {
    todo: [
      { id: "1", content: "Task 1" },
      { id: "2", content: "Task 2" },
    ],
    doing: [
      { id: "3", content: "Task 3" },
      { id: "4", content: "Task 4" },
    ],
    done: [{ id: "5", content: "Task 5" }],
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    if (source === destination) {
      const column = [...initialData[source]];
      const items = reorder(
        column,
        result.source.index,
        result.destination.index
      );
      initialData[source] = items;
    } else {
      const sourceColumn = [...initialData[source]];
      const destColumn = [...initialData[destination]];
      const [removed] = sourceColumn.splice(result.source.index, 1);
      destColumn.splice(result.destination.index, 0, removed);
      initialData[source] = sourceColumn;
      initialData[destination] = destColumn;
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 md:gap-6 p-10">
        <div className="md:col-span-2 xl:col-span-3">
          <div className="my-2 gap-3 flex justify-center">
            <button
              onClick={openModal}
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 "
            >
              <span className="text-xl">
                <MdAddBox />
              </span>
              Add New Task
            </button>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md w-full max-w-3xl">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap pb-3">
                      <div className="w-full  px-4">
                        <label className="block  text-left text-gray-600 font-medium text-md mb-2 mt-8">
                          Task Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                          {...register("name", { required: true })}
                          name="name"
                          type="text"
                          placeholder="Task Name"
                        />
                        {errors.name && (
                          <span className="text-red-600 mt-2">
                            Task Name is required
                          </span>
                        )}
                      </div>

                      <div className="w-full  px-4">
                        <label className="block  text-left text-gray-600 font-medium text-md mb-2 mt-8">
                          Task Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                          {...register("description", { required: true })}
                          name="description"
                          type="text"
                          placeholder="Task Description"
                        />
                        {errors.description && (
                          <span className="text-red-600 mt-2">
                            Task Description is required
                          </span>
                        )}
                      </div>

                      <div className="w-full px-4">
                        <label className="block  text-left text-gray-600 font-medium text-md mb-2 mt-8">
                          Date
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholderText="Select a date"
                          required
                        />
                      </div>

                      <div className="flex justify-center w-full px-4 mt-12 mb-12 md:mb-0">
                        <button
                          className="bg-[#4734C0] hover:bg-[#4734C0] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline mr-8"
                          type="submit"
                        >
                          Add Task
                        </button>

                        <button
                          onClick={closeModal}
                          className="bg-black hover:bg-red-600 text-white font-bold  py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="xl:min-h-[80vh] border-2 border-white p-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h1 className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
                <div className="rounded-full w-4 h-4 bg-red-500 "></div>Todo (4)
              </h1>

              <div className="flex flex-col gap-5 mt-10">
                {initialData.todo.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="card w-full bg-base-100 shadow-sm rounded-sm"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="card-body">
                          <h2 className="card-title">{task.content}</h2>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="doing">
          {(provided) => (
            <div
              className="xl:min-h-[80vh] border-2 border-white p-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h1 className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
                <div className="rounded-full w-4 h-4 bg-yellow-500 "></div>Doing
                (6)
              </h1>
              <div className="flex flex-col gap-5 mt-10">
                {initialData.doing.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="card w-full bg-base-100 shadow-sm rounded-sm"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="card-body">
                          <h2 className="card-title">{task.content}</h2>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="done">
          {(provided) => (
            <div
              className="xl:min-h-[80vh] border-2 border-white p-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h1 className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
                <div className="rounded-full w-4 h-4 bg-blue-500 "></div>Done
                (7)
              </h1>

              <div className="flex flex-col gap-5 mt-10">
                {initialData.done.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="card w-full bg-base-100 shadow-sm rounded-sm"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="card-body">
                          <h2 className="card-title">{task.content}</h2>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default UserDashboard;
