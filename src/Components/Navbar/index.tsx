import { useContext } from "react";
import { ReactFlowState, getOutgoers, useStore } from "reactflow";
import { AppContext } from "../../Context";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const selector = (s: ReactFlowState) => ({
  nodeInternals: s.nodeInternals,
});

const Navbar = () => {
  const { nodeInternals } = useStore(selector);
  const { nodes, edges } = useContext(AppContext) || {};

  const handleSaveFlow = () => {
    if (nodes && edges) {
      if (nodes.length > 1) {
        let countOfEndNodes = 0;
        nodes.forEach((node) => {
          const nodeData = nodeInternals.get(node.id);
          const outgoers = getOutgoers(nodeData!, nodes, edges);

          if (outgoers.length === 0) countOfEndNodes++;
        });

        if (countOfEndNodes > 1) {
          toast("Cannot Save Flow", {
            type: "error",
            position: "top-center",
            theme: "colored",
          });
        } else {
          console.log(nodes, edges);
          localStorage.setItem("nodes", JSON.stringify(nodes));
          localStorage.setItem("edges", JSON.stringify(edges));
        }
      }
    }
  };

  return (
    <nav className="bg-[#e3e3e3] px-12 py-2 w-full flex items-center justify-start">
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={handleSaveFlow}
      >
        Save Changes
      </button>
    </nav>
  );
};

export default Navbar;
