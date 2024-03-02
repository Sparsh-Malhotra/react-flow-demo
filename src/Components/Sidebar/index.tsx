import { memo, useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context";

interface ISidebarProps {
  mode: "add" | "edit";
  onChangeMessage: (value: string) => void;
}

const Sidebar = memo(({ mode, onChangeMessage }: ISidebarProps) => {
  const { nodes, selectedNode } = useContext(AppContext) || {};

  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setText(
        nodes.filter((node) => node.id === selectedNode)?.[0]?.data.label || ""
      );
    }
  }, [selectedNode]);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-r border-gray-400 py-4 w-[18%] h-full flex flex-col items-center item gap-8">
      <p className="underline text-xl">
        {mode === "add" ? "Node Panel" : "Edit Message"}
      </p>
      {mode === "add" ? (
        <div
          className="border border-blue-400 px-4 py-2 rounded hover:bg-gray-100 cursor-grab select-none"
          onDragStart={(event) => onDragStart(event, "message")}
          draggable
        >
          Message
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4 py-2 w-full">
          <p className="text-gray-500">Text</p>
          <input
            className="border py-1 px-2"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => onChangeMessage(text)}
          >
            Edit Message
          </button>
        </div>
      )}
    </aside>
  );
});

export default Sidebar;
