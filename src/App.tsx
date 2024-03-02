import { useCallback, useContext, useRef, useState } from "react";
import "./App.css";
import { MessageNode, Navbar, Sidebar } from "./Components";
import { AppContext } from "./Context";
import ReactFlow, {
  Connection,
  Controls,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "react-toastify";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { message: MessageNode };

function App() {
  const {
    nodes,
    edges,
    mode,
    selectedNode,
    setNodes,
    onNodesChange,
    setEdges,
    onEdgesChange,
    setMode,
    setSelectedNode,
  } = useContext(AppContext) || {};

  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance<any, any>>();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleSaveNode = (value: string) => {
    if (value) {
      const updatedNodes = [...nodes].map((node) => {
        if (node.id === selectedNode) {
          node.data.label = value;
        }
        return node;
      });

      setNodes(updatedNodes);
      setMode("add");
      setSelectedNode("");
    } else {
      toast("Please enter some message", {
        type: "error",
        theme: "colored",
        position: "top-center",
      });
    }
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance!.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: "Message" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <main className="h-screen w-full flex flex-col">
      <ReactFlowProvider>
        <Navbar />
        <section className="flex h-full dndflow">
          <Sidebar mode={mode} onChangeMessage={handleSaveNode} />

          <div
            className="px-3 py-1 reactflow-wrapper w-full h-full"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onInit={setReactFlowInstance}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            >
              <Controls />
            </ReactFlow>
          </div>
        </section>
      </ReactFlowProvider>
    </main>
  );
}

export default App;
