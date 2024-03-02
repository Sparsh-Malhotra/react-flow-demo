import { PropsWithChildren, createContext } from "react";
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
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
  onNodesChange: OnChange<NodeChange>;
  setEdges: React.Dispatch<React.SetStateAction<any[]>>;
  onEdgesChange: OnChange<EdgeChange>;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

const NodeContextProvider = ({ children }: PropsWithChildren) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <AppContext.Provider
      value={{ nodes, edges, setNodes, onNodesChange, setEdges, onEdgesChange }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default NodeContextProvider;
