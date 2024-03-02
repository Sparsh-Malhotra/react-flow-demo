import { useCallback, useContext, useRef, useState } from "react";
import "./App.css";
import { Navbar, Sidebar } from "./Components";
import { AppContext } from "./Context";
import ReactFlow, {
  Connection,
  Controls,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

function App() {
  const { nodes, edges, setNodes, onNodesChange, setEdges, onEdgesChange } =
    useContext(AppContext) || {};

  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance<any, any>>();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges!((eds) => addEdge(params, eds)),
    []
  );

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
        data: { label: `${type} node` },
      };

      setNodes!((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <main className="h-screen w-full flex flex-col">
      <Navbar />
      <section className="flex h-full dndflow">
        <Sidebar />
        <ReactFlowProvider>
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
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </section>
    </main>
  );
}

export default App;
