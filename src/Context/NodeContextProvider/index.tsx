import { PropsWithChildren, createContext, useState } from "react";
import {
  EdgeChange,
  NodeChange,
  useEdgesState,
  useNodesState,
} from "reactflow";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

export interface IAppContext {
  nodes: any[];
  edges: any[];
  mode: "add" | "edit";
  selectedNode: string;
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
  onNodesChange: OnChange<NodeChange>;
  setEdges: React.Dispatch<React.SetStateAction<any[]>>;
  onEdgesChange: OnChange<EdgeChange>;
  setMode: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  setSelectedNode: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext>({
  nodes: [],
  edges: [],
  mode: "add",
  selectedNode: "",
  setNodes: () => {},
  onNodesChange: () => {},
  setEdges: () => {},
  onEdgesChange: () => {},
  setMode: () => {},
  setSelectedNode: () => {},
});

const NodeContextProvider = ({ children }: PropsWithChildren) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    localStorage.getItem("nodes")
      ? JSON.parse(localStorage.getItem("nodes")!)
      : []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    localStorage.getItem("edges")
      ? JSON.parse(localStorage.getItem("edges")!)
      : []
  );
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedNode, setSelectedNode] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default NodeContextProvider;
