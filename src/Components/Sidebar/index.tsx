const Sidebar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-r border-gray-400 py-4 w-[18%] h-full flex flex-col items-center item gap-8">
      <p className="underline text-xl">Node Panel</p>
      <div
        className="border border-blue-400 px-4 py-2 rounded hover:bg-gray-100 cursor-grab select-none"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Message Node
      </div>
    </aside>
  );
};

export default Sidebar;
