import ForceGraph2D from "react-force-graph-2d";

export default function GraphView({ graph }) {
  if (!graph || !graph.nodes) return <p>No graph data</p>;

  return (
    <ForceGraph2D
      graphData={{
        nodes: graph.nodes,
        links: graph.edges
      }}

      width={800}
      height={400}

      nodeAutoColorBy="id"
      nodeRelSize={8}

      // 🔥 NODE LABELS
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 14 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = "black";
        ctx.fillText(label, node.x + 8, node.y + 8);
      }}

      // 🔥 EDGE LABELS
      linkCanvasObject={(link, ctx) => {
        const label = link.label;
        if (!label) return;

        const midX = (link.source.x + link.target.x) / 2;
        const midY = (link.source.y + link.target.y) / 2;

        ctx.font = "10px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(label, midX, midY);
      }}

      // 🔥 ZOOM + INTERACTION
      enableZoomInteraction={true}
      enablePanInteraction={true}
      cooldownTicks={100}
    />
  );
}