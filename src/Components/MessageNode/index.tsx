import { memo, useContext } from "react";
import {
  Handle,
  NodeProps,
  Position,
  ReactFlowState,
  getOutgoers,
  useNodeId,
  useStore,
} from "reactflow";
import { AppContext } from "../../Context";

const selector = (s: ReactFlowState) => ({
  nodeInternals: s.nodeInternals,
});

const MessageNode = memo((props: NodeProps) => {
  const {
    data: { label },
    id,
  } = props;

  const { selectedNode, nodes, edges, setMode, setSelectedNode } =
    useContext(AppContext) || {};

  const { nodeInternals } = useStore(selector);
  const nodeId = useNodeId();

  const handleEditNode = () => {
    setMode!("edit");
    setSelectedNode!(id);
  };

  const isHandleConnectable = () => {
    const node = nodeInternals.get(nodeId!);
    const outgoers = getOutgoers(node!, nodes!, edges!);

    return outgoers.length < 1;
  };

  return (
    <div
      className={`shadow border rounded-xl overflow-hidden w-[180px] ${
        selectedNode === id && "border-2 border-black"
      }`}
      onClick={handleEditNode}
    >
      <Handle type="target" position={Position.Left} isConnectable />
      <div className="bg-[#B2F0E3] px-3 py-1">
        <p className="text-xs font-bold">Send Message</p>
      </div>
      <p className="px-3 py-2 text-sm">{label}</p>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isHandleConnectable()}
      />
    </div>
  );
});

export default MessageNode;
